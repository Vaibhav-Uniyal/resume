import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as docx from 'docx';
import mammoth from 'mammoth';
// Import both PDF parsing libraries for redundancy
import pdfParse from 'pdf-parse';
import * as pdfjs from 'pdfjs-dist';

// Destructure the docx library to get the components we need
const { Document, Packer, Paragraph, HeadingLevel, AlignmentType } = docx;

// Set up the worker for PDF.js (only used on server)
// @ts-ignore - The types for pdfjs-dist are not perfect
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

// Disable canvas usage for server-side parsing to avoid binary module issues
// @ts-ignore - The types for pdfjs-dist are not perfect
if (pdfjs.disableWorker !== undefined) {
  // @ts-ignore
  pdfjs.disableWorker = true;
}

// Function to convert text to PDF
async function textToPdf(text: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  const lines = text.split('\n');
  const fontSize = 11;
  const lineHeight = fontSize * 1.2;
  let y = page.getHeight() - 50;
  
  for (const line of lines) {
    if (line.trim() === '') {
      y -= lineHeight;
      continue;
    }
    
    // Handle lines that might be too long
    const textWidth = font.widthOfTextAtSize(line, fontSize);
    const maxWidth = page.getWidth() - 100; // 50px margin on each side
    
    if (textWidth > maxWidth) {
      // Break the line into multiple parts
      const words = line.split(' ');
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        
        if (testWidth > maxWidth) {
          // Draw the current line and start a new one
          page.drawText(currentLine, {
            x: 50,
            y,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
          });
          y -= lineHeight;
          currentLine = word;
          
          // Add a new page if needed
          if (y < 50) {
            const newPage = pdfDoc.addPage();
            y = newPage.getHeight() - 50;
          }
        } else {
          currentLine = testLine;
        }
      }
      
      // Draw any remaining text
      if (currentLine) {
        page.drawText(currentLine, {
          x: 50,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
        y -= lineHeight;
      }
    } else {
      // Draw the entire line
      page.drawText(line, {
        x: 50,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    }
    
    // Add a new page if needed
    if (y < 50) {
      const newPage = pdfDoc.addPage();
      y = newPage.getHeight() - 50;
    }
  }
  
  return pdfDoc.save();
}

// Function to convert text to DOCX
async function textToDocx(text: string): Promise<Buffer> {
  const lines = text.split('\n');
  const paragraphs = [];
  
  let isHeading = true;
  for (const line of lines) {
    if (line.trim() === '') {
      paragraphs.push(new Paragraph({ text: '', spacing: { after: 200 } }));
      continue;
    }
    
    // First non-empty line is treated as a heading
    if (isHeading) {
      paragraphs.push(
        new Paragraph({
          text: line,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        })
      );
      isHeading = false;
    } 
    // Lines starting with - are treated as bullet points
    else if (line.trim().startsWith('-')) {
      paragraphs.push(
        new Paragraph({
          text: line.trim().substring(1).trim(),
          bullet: { level: 0 },
          spacing: { after: 120 },
        })
      );
    } 
    // Empty lines are treated as paragraph breaks
    else {
      paragraphs.push(
        new Paragraph({
          text: line,
          spacing: { after: 120 },
        })
      );
    }
  }
  
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });
  
  return await Packer.toBuffer(doc);
}

// Function to extract text from DOCX
async function docxToText(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

// Function to extract text from PDF using pdf-parse
async function pdfToTextWithPdfParse(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF with pdf-parse:', error);
    throw new Error('Failed to extract text from PDF with pdf-parse');
  }
}

// Function to extract text from PDF using PDF.js
async function pdfToTextWithPdfJs(buffer: Buffer): Promise<string> {
  try {
    // Use a simplified approach that doesn't rely on canvas
    // @ts-ignore - The types for pdfjs-dist are not perfect
    const pdf = await pdfjs.getDocument({ data: buffer, disableWorker: true }).promise;
    let text = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        // @ts-ignore - The types for pdfjs-dist are not perfect
        .map(item => item.str)
        .join(' ');
      
      text += pageText + '\n\n';
    }
    
    return text;
  } catch (error) {
    console.error('Error extracting text from PDF with PDF.js:', error);
    throw new Error('Failed to extract text from PDF with PDF.js');
  }
}

// Combined function to extract text from PDF using multiple methods for reliability
async function pdfToText(buffer: Buffer): Promise<string> {
  try {
    // Try with PDF.js first
    return await pdfToTextWithPdfJs(buffer);
  } catch (error) {
    console.log('PDF.js extraction failed, trying pdf-parse as fallback');
    try {
      // If PDF.js fails, try with pdf-parse as fallback
      return await pdfToTextWithPdfParse(buffer);
    } catch (fallbackError) {
      // If both fail, throw a comprehensive error
      console.error('Both PDF extraction methods failed:', error, fallbackError);
      throw new Error('Failed to extract text from PDF. The file may be corrupted, password-protected, or in an unsupported format.');
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const targetFormat = formData.get('targetFormat') as string;
    
    if (!file || !targetFormat) {
      return NextResponse.json(
        { error: 'File and target format are required' },
        { status: 400 }
      );
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const fileExtension = path.extname(fileName).toLowerCase();
    
    console.log(`Processing file: ${fileName}, target format: ${targetFormat}`);
    
    // Get the file content as text
    let text = '';
    
    try {
      if (fileExtension === '.txt') {
        text = buffer.toString('utf-8');
        console.log('Successfully extracted text from TXT file');
      } else if (fileExtension === '.docx') {
        text = await docxToText(buffer);
        console.log('Successfully extracted text from DOCX file');
      } else if (fileExtension === '.pdf') {
        text = await pdfToText(buffer);
        console.log('Successfully extracted text from PDF file');
      } else {
        return NextResponse.json(
          { error: `Unsupported file format: ${fileExtension}. Please upload a PDF, DOCX, or TXT file.` },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Error extracting text from file:', error);
      return NextResponse.json(
        { error: `Failed to extract text from ${fileExtension.substring(1).toUpperCase()} file. The file may be corrupted or in an unsupported format.` },
        { status: 400 }
      );
    }
    
    if (!text || text.trim() === '') {
      return NextResponse.json(
        { error: 'No text content could be extracted from the file. Please try a different file.' },
        { status: 400 }
      );
    }
    
    // Convert to target format
    let resultBuffer: Buffer | Uint8Array;
    let contentType = '';
    let outputFileName = '';
    
    try {
      if (targetFormat === 'txt') {
        resultBuffer = Buffer.from(text, 'utf-8');
        contentType = 'text/plain';
        outputFileName = 'resume.txt';
        console.log('Successfully converted to TXT');
      } else if (targetFormat === 'docx') {
        resultBuffer = await textToDocx(text);
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        outputFileName = 'resume.docx';
        console.log('Successfully converted to DOCX');
      } else if (targetFormat === 'pdf') {
        resultBuffer = await textToPdf(text);
        contentType = 'application/pdf';
        outputFileName = 'resume.pdf';
        console.log('Successfully converted to PDF');
      } else {
        return NextResponse.json(
          { error: `Unsupported target format: ${targetFormat}` },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error(`Error converting to ${targetFormat}:`, error);
      return NextResponse.json(
        { error: `Failed to convert to ${targetFormat.toUpperCase()}. Please try a different format.` },
        { status: 500 }
      );
    }
    
    // Return the converted file
    const response = new NextResponse(resultBuffer);
    response.headers.set('Content-Type', contentType);
    response.headers.set('Content-Disposition', `attachment; filename="${outputFileName}"`);
    
    return response;
  } catch (error) {
    console.error('Unexpected error during file conversion:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during file conversion. Please try again with a different file or format.' },
      { status: 500 }
    );
  }
}

// Keep GET endpoint for backward compatibility, now redirects to download-message.html
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const format = searchParams.get('format');
  const filename = searchParams.get('filename');
  
  if (!format || !filename) {
    return NextResponse.json(
      { error: 'Format and filename are required' },
      { status: 400 }
    );
  }
  
  // Redirect to an explanation that POST should be used
  return NextResponse.redirect(new URL('/sample-files/download-message.html', request.url));
} 