# Resume Optimizer

A modern web application that helps job seekers optimize their resumes for ATS (Applicant Tracking Systems) using AI-powered analysis and suggestions.

## Features

- **Resume Upload**: Support for PDF and DOCX files
- **ATS Scoring**: Get instant feedback on your resume's ATS compatibility
- **Job-Specific Optimization**: Tailor your resume for specific job positions
- **AI-Powered Suggestions**: Receive intelligent recommendations for improvement
- **Side-by-Side Comparison**: Compare original and optimized versions
- **Easy Download**: Export your optimized resume in various formats

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- OpenAI API for resume optimization
- React Dropzone for file uploads
- Mammoth.js for DOCX parsing

## Prerequisites

- Node.js 16.8 or later
- npm or yarn
- OpenAI API key

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resume-optimizer.git
   cd resume-optimizer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Upload your resume (PDF or DOCX format)
2. Enter the job title and description you're targeting
3. Review the AI-powered optimization suggestions
4. Compare the original and optimized versions
5. Download your optimized resume

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT API
- The Next.js team for the amazing framework
- All contributors and users of this project 