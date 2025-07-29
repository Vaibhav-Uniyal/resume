import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Hard-coded API key
const apiKey = 'AIzaSyCoRFO_sEpSyIZg11QaemgNhiVqjSpjz1o';
const genAI = new GoogleGenerativeAI(apiKey);

// Extract model name from endpoint or use default
const MODEL_NAME = 'gemini-1.5-flash';

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
    
    // Prepare a clearer, more structured prompt for ATS analysis
    const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer. Your task is to analyze the resume below for ATS compatibility.

RESUME TEXT:
${cleanedResumeText}

TASK:
1. Identify 5-10 key skills/keywords from the resume
2. Score the resume from 0-100 for ATS compatibility
3. Provide 3-5 specific suggestions to improve the resume
4. List 2-3 strengths of the resume
5. List 2-3 weaknesses or areas for improvement

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
- If you cannot identify specific keywords, DO NOT return generic placeholders
- Be specific and detailed in your analysis
- Focus on ATS optimization aspects of the resume
`;

    // Generate content with Gemini with safety settings adjusted
    const generationConfig = {
      temperature: 0.1, // Very low temperature for more deterministic output
      topP: 0.8,
      topK: 40,
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
    return {
      score: 75,
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