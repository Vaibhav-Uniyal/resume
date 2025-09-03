import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// API key and endpoint from environment variables
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const apiEndpoint = process.env.NEXT_PUBLIC_GEMINI_API_ENDPOINT;

if (!apiKey) {
  console.error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set');
  throw new Error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set');
}

// Initialize with API key
const genAI = new GoogleGenerativeAI(apiKey);

// Use Gemini 2.0 Flash model
const MODEL_NAME = 'gemini-2.0-flash';

console.log(`Using Gemini model: ${MODEL_NAME}`);

interface ATSAnalysisResult {
  score: number;
  keywords: string[];
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}

export async function analyzeResumeWithGemini(resumeText: string): Promise<ATSAnalysisResult> {
  try {
    console.log("Starting resume analysis with Gemini API");
    
    // Create a generative model instance with the correct model name
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Prepare resume text - clean it up
    const cleanedResumeText = resumeText
      .trim()
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
      .slice(0, 12000); // Limit text length to avoid token limits
    
    // Log the first 100 chars of the resume for debugging
    console.log(`Resume text (first 100 chars): ${cleanedResumeText.substring(0, 100)}...`);
    
    // Add random element to force variation
    const randomSeed = Math.floor(Math.random() * 1000);
    
    // Prepare a clearer, more structured prompt for ATS analysis
    const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer. Analyze the resume text provided below with strict ATS parsing rules.  
Analysis ID: ${randomSeed}

RESUME TEXT:
${cleanedResumeText}

TASK:
1. Extract exactly 8-12 hard skills, technical keywords, or domain-specific terms from the resume (no soft skills like "communication" unless explicitly mentioned).
2. Score the resume from 0 to 100 for ATS compatibility based on:
   - Keyword density and relevance (40%)
   - Formatting & structure (20%)
   - Use of measurable achievements/metrics (20%)
   - Section completeness (education, experience, skills, etc.) (20%)
3. Provide 3-5 concrete and actionable suggestions to improve ATS compatibility (e.g., "Add more industry-specific keywords such as X", not vague tips).
4. List 2-3 clear strengths of the resume that support ATS optimization.
5. List 2-3 weaknesses or areas that could reduce ATS performance.

SCORING GUIDELINES:
- Excellent resumes (90-100): Strong keywords, quantifiable achievements, perfect formatting
- Good resumes (70-89): Good keywords, some achievements, clean formatting
- Average resumes (50-69): Basic keywords, minimal achievements, decent formatting
- Poor resumes (30-49): Few keywords, no achievements, poor formatting
- Very poor resumes (0-29): Missing sections, no relevant keywords, bad formatting

OUTPUT FORMAT:
Return ONLY a JSON object in the following structure without any extra text:

{
  "score": number,
  "keywords": string[],
  "suggestions": string[],
  "strengths": string[],
  "weaknesses": string[]
}

STRICT RULES:
- Do not invent keywords not found in the resume.
- Always return between 8–12 keywords.
- CRITICAL: Vary your scores significantly! Do NOT return 78 or similar scores repeatedly.
- Use the full range 0-100. Be aggressive with scoring differences.
- Ensure the score breakdown is internally consistent with the evaluation criteria.
- Do not include explanatory text outside the JSON.
- Each resume should get a UNIQUE score based on its content quality.
`;

    // Generate content with Gemini with safety settings adjusted
    const generationConfig = {
      temperature: 1.0, // Maximum temperature for maximum variation
      topP: 0.9,
      topK: 50,
      maxOutputTokens: 1024,
    };
    
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];

    console.log("Sending request to Gemini API...");
    console.log("Resume text length:", cleanedResumeText.length, "characters");
    console.log("API Key present:", !!apiKey);
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });

    const response = await result.response;
    const text = response.text();
    
    console.log("Received response from Gemini API");
    
    // Clean the response to ensure it's valid JSON
    const cleanedText = text.trim()
      .replace(/```json|```|\n/g, '')
      .replace(/^[^{]*({.*})[^}]*$/, '$1'); // Extract just the JSON part
    
    console.log(`Cleaned response text: ${cleanedText.substring(0, 100)}...`);
    
    try {
      // Parse the JSON response directly
      const parsedResponse = JSON.parse(cleanedText) as ATSAnalysisResult;
      console.log("Successfully parsed JSON response");
      
      // Validate all fields exist and are proper arrays/values
      const validatedResponse = {
        score: typeof parsedResponse.score === 'number' ? parsedResponse.score : 75,
        keywords: Array.isArray(parsedResponse.keywords) ? parsedResponse.keywords : [],
        suggestions: Array.isArray(parsedResponse.suggestions) ? parsedResponse.suggestions : [],
        strengths: Array.isArray(parsedResponse.strengths) ? parsedResponse.strengths : [],
        weaknesses: Array.isArray(parsedResponse.weaknesses) ? parsedResponse.weaknesses : []
      };
      
      // Check if we got actual content or just empty arrays
      const hasRealContent = 
        validatedResponse.keywords.length > 0 && 
        validatedResponse.suggestions.length > 0 && 
        validatedResponse.strengths.length > 0 && 
        validatedResponse.weaknesses.length > 0;
      
      if (!hasRealContent) {
        console.log("Response had empty arrays, using backup approach");
        // If we got empty arrays, try a different approach
        throw new Error("Empty response values");
      }
      
      console.log("Returning validated response");
      return validatedResponse;
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      console.log('Raw response:', text);
      
      // Try to extract information line by line if JSON parsing failed
      try {
        console.log("Attempting alternate parsing approach...");
        
        // Make another attempt with a different prompt
        const simplifiedPrompt = `
Analyze this resume for ATS compatibility:

${cleanedResumeText.substring(0, 5000)}

Answer these questions clearly:
1. What score would you give this resume for ATS compatibility (0-100)?
2. What are 5 key skills/keywords from this resume?
3. What are 3 specific suggestions to improve this resume?
4. What are 2 strengths of this resume?
5. What are 2 weaknesses of this resume?`;

        const backupResult = await model.generateContent(simplifiedPrompt);
        const backupResponse = await backupResult.response;
        const backupText = backupResponse.text();
        
        console.log("Received backup response");
        
        // Extract information through text parsing
        const scoreMatch = backupText.match(/score[^\d]*(\d+)/i);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;
        
        console.log("Backup parsing - Raw text:", backupText.substring(0, 200));
        console.log("Backup parsing - Score match:", scoreMatch);
        console.log("Backup parsing - Extracted score:", score);
        
        // Extract lists by looking for numbered points
        const keywordsSection = backupText.match(/keywords?[^\n]*\n((?:\s*[-\d.•]+[^\n]+\n?)+)/i);
        const suggestionsSection = backupText.match(/suggestions?[^\n]*\n((?:\s*[-\d.•]+[^\n]+\n?)+)/i);
        const strengthsSection = backupText.match(/strengths?[^\n]*\n((?:\s*[-\d.•]+[^\n]+\n?)+)/i);
        const weaknessesSection = backupText.match(/weaknesses?[^\n]*\n((?:\s*[-\d.•]+[^\n]+\n?)+)/i);
        
        // Parse list items
        const parseListItems = (text: string | undefined): string[] => {
          if (!text) return [];
          return text
            .split(/\n/)
            .map((line: string) => line.replace(/^\s*[-\d.•]+\s*/, '').trim())
            .filter((item: string) => item.length > 0);
        };
        
        const keywords = keywordsSection ? parseListItems(keywordsSection[1]) : ["Communication", "Leadership", "Project Management"];
        const suggestions = suggestionsSection ? parseListItems(suggestionsSection[1]) : ["Add more keywords relevant to your field", "Quantify your achievements"];
        const strengths = strengthsSection ? parseListItems(strengthsSection[1]) : ["Clear structure", "Included relevant experience"];
        const weaknesses = weaknessesSection ? parseListItems(weaknessesSection[1]) : ["Could use more industry keywords", "Needs more measurable results"];
        
        console.log("Created structured data from text response");
        return { score, keywords, suggestions, strengths, weaknesses };
      } catch (backupError) {
        console.error("Both parsing approaches failed:", backupError);
        throw new Error('Failed to parse Gemini API response');
      }
    }
  } catch (error) {
    console.error('Error analyzing resume with Gemini:', error);
    // Return reasonable default values in case of error
    // Generate a more varied fallback score based on content length and basic analysis
    const contentLength = resumeText.length;
    const fallbackScore = Math.min(90, Math.max(40, Math.floor(contentLength / 200) + 40));
    
    return {
      score: fallbackScore,
      keywords: ["Resume Analysis Error", "Skills Not Detected", "Experience", "Education"],
      suggestions: [
        "Try uploading a clearer version of your resume",
        "Ensure your resume is in a standard format",
        "Add more specific skills and keywords to your resume"
      ],
      strengths: [
        "Resume submitted successfully",
        "Format appears to be standard"
      ],
      weaknesses: [
        "AI couldn't fully analyze your resume",
        "Consider adding more detailed information"
      ]
    };
  }
} 

// New function to analyze PDF directly with Gemini
export async function analyzeResumePDFWithGemini(pdfBuffer: Buffer): Promise<ATSAnalysisResult> {
  try {
    console.log("Starting PDF resume analysis with Gemini API");
    
    // Create a generative model instance
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Add random element to force variation
    const randomSeed = Math.floor(Math.random() * 1000);
    
    // Prepare the prompt for ATS analysis
    const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer. Your task is to analyze the PDF resume for ATS compatibility.
Analysis ID: ${randomSeed}

TASK:
1. Identify 5-10 key skills/keywords from the resume
2. Score the resume from 0-100 for ATS compatibility based on:
   - Keyword density and relevance (40%)
   - Formatting & structure (20%) 
   - Use of measurable achievements/metrics (20%)
   - Section completeness (education, experience, skills, etc.) (20%)
3. Provide 3-5 specific suggestions to improve the resume
4. List 2-3 strengths of the resume
5. List 2-3 weaknesses or areas for improvement

SCORING GUIDELINES - BE AGGRESSIVE WITH SCORING:
- Excellent resumes (85-100): Strong keywords, quantifiable achievements, perfect formatting, 5+ years experience
- Good resumes (65-84): Good keywords, some achievements, clean formatting, 2-4 years experience
- Average resumes (45-64): Basic keywords, minimal achievements, decent formatting, 1-2 years experience
- Poor resumes (25-44): Few keywords, no achievements, poor formatting, entry-level
- Very poor resumes (0-24): Missing sections, no relevant keywords, bad formatting, no experience

IMPORTANT: Vary your scores significantly! Do NOT default to 78. Use the full range 0-100 based on actual content quality.

RESPONSE FORMAT:
Respond ONLY with a JSON object using this exact structure:
{
  "score": number,
  "keywords": string[],
  "suggestions": string[],
  "strengths": string[],
  "weaknesses": string[]
}

IMPORTANT NOTES:
- DO NOT include any explanatory text outside the JSON
- CRITICAL: Vary your scores significantly! Do NOT return 78 or similar scores repeatedly.
- Use the full range 0-100. Be aggressive with scoring differences.
- If you cannot identify specific keywords, DO NOT return generic placeholders
- Be specific and detailed in your analysis
- Focus on ATS optimization aspects of the resume
- Each resume should get a UNIQUE score based on its content quality.
`;

    // Generate content with Gemini with safety settings
    const generationConfig = {
      temperature: 1.0, // Maximum temperature for maximum variation
      topP: 0.9,
      topK: 50,
      maxOutputTokens: 1024,
    };
    
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];

    console.log("Sending PDF to Gemini API...");
    console.log("PDF Buffer size:", pdfBuffer.length, "bytes");
    console.log("API Key present:", !!apiKey);
    
    // Send PDF directly to Gemini - Correct syntax for multimodal content
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          {
            inlineData: {
              data: pdfBuffer.toString('base64'),
              mimeType: 'application/pdf'
            }
          },
          {
            text: prompt
          }
        ]
      }],
      generationConfig,
      safetySettings,
    });

    const response = await result.response;
    const text = response.text();
    
    console.log("Received response from Gemini API");
    
    // Clean the response to ensure it's valid JSON
    const cleanedText = text.trim()
      .replace(/```json|```|\n/g, '')
      .replace(/^[^{]*({.*})[^}]*$/, '$1'); // Extract just the JSON part
    
    console.log(`Cleaned response text: ${cleanedText.substring(0, 100)}...`);
    
    try {
      // Parse the JSON response directly
      const parsedResponse = JSON.parse(cleanedText) as ATSAnalysisResult;
      console.log("Successfully parsed JSON response");
      
      // Validate all fields exist and are proper arrays/values
      const validatedResponse = {
        score: typeof parsedResponse.score === 'number' ? parsedResponse.score : 75,
        keywords: Array.isArray(parsedResponse.keywords) ? parsedResponse.keywords : [],
        suggestions: Array.isArray(parsedResponse.suggestions) ? parsedResponse.suggestions : [],
        strengths: Array.isArray(parsedResponse.strengths) ? parsedResponse.strengths : [],
        weaknesses: Array.isArray(parsedResponse.weaknesses) ? parsedResponse.weaknesses : []
      };
      
      console.log("Returning validated response");
      return validatedResponse;
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      console.log('Raw response:', text);
      
      // Fallback to default values if JSON parsing fails
      // Generate a more varied fallback score based on content length and basic analysis
      const contentLength = pdfBuffer.length;
      const fallbackScore = Math.min(90, Math.max(40, Math.floor(contentLength / 2000) + 40));
      
      return {
        score: fallbackScore,
        keywords: ["PDF Analysis Error", "Skills Not Detected", "Experience", "Education"],
        suggestions: [
          "Try uploading a clearer version of your resume",
          "Ensure your resume is in a standard format",
          "Add more specific skills and keywords to your resume"
        ],
        strengths: [
          "Resume submitted successfully",
          "Format appears to be standard"
        ],
        weaknesses: [
          "AI couldn't fully analyze your resume",
          "Consider adding more detailed information"
        ]
      };
    }
  } catch (error) {
    console.error('Error analyzing PDF resume with Gemini:', error);
    // Return reasonable default values in case of error
    // Generate a more varied fallback score based on content length and basic analysis
    const contentLength = pdfBuffer.length;
    const fallbackScore = Math.min(90, Math.max(40, Math.floor(contentLength / 2000) + 40));
    
    return {
      score: fallbackScore,
      keywords: ["PDF Analysis Error", "Skills Not Detected", "Experience", "Education"],
      suggestions: [
        "Try uploading a clearer version of your resume",
        "Ensure your resume is in a standard format",
        "Add more specific skills and keywords to your resume"
      ],
      strengths: [
        "Resume submitted successfully",
        "Format appears to be standard"
      ],
      weaknesses: [
        "AI couldn't fully analyze your resume",
        "Consider adding more detailed information"
      ]
    };
  }
} 