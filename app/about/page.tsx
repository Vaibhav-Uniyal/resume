'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Lead Developer',
    bio: 'Passionate about creating innovative solutions and helping job seekers succeed in their careers.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'AI Specialist',
    bio: 'Expert in machine learning and natural language processing, dedicated to improving resume optimization algorithms.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f004d] via-[#2e0066] via-[#330033] to-[#00001a] animate-gradient-bg font-['Poppins']">
      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          color: white;
        }
        .flip-card {
          perspective: 1000px;
          height: 300px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1rem;
          padding: 1.5rem;
        }
        .flip-card-front {
          background: linear-gradient(145deg, rgba(50, 0, 80, 0.9), rgba(30, 0, 50, 0.8));
          box-shadow: 0 0 20px rgba(183, 0, 255, 0.4), 0 0 40px rgba(100, 0, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .flip-card-back {
          background: linear-gradient(145deg, rgba(50, 0, 80, 0.9), rgba(30, 0, 50, 0.8));
          box-shadow: 0 0 20px rgba(183, 0, 255, 0.4), 0 0 40px rgba(100, 0, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transform: rotateY(180deg);
        }
        .gradient-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          background: linear-gradient(to right, #ff00cc, #3333ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold gradient-text mb-8 text-center">About Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold gradient-text mb-4">Our Mission</h2>
                  <p className="text-gray-300">Click to learn more about our mission</p>
                </div>
                <div className="flip-card-back flex flex-col items-center justify-center">
                  <p className="text-gray-300">
                    Our mission is to revolutionize the job application process by providing AI-powered resume optimization tools that help candidates stand out in today's competitive job market.
                  </p>
                </div>
              </div>
            </div>

            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold gradient-text mb-4">Our Vision</h2>
                  <p className="text-gray-300">Click to learn more about our vision</p>
                </div>
                <div className="flip-card-back flex flex-col items-center justify-center">
                  <p className="text-gray-300">
                    We envision a world where every job seeker has access to powerful tools that help them present their skills and experience in the most compelling way possible.
                  </p>
                </div>
              </div>
            </div>

            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold gradient-text mb-4">Our Technology</h2>
                  <p className="text-gray-300">Click to learn more about our technology</p>
                </div>
                <div className="flip-card-back flex flex-col items-center justify-center">
                  <p className="text-gray-300">
                    We leverage cutting-edge AI and machine learning technologies to analyze resumes and provide personalized recommendations for improvement.
                  </p>
                </div>
              </div>
            </div>

            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold gradient-text mb-4">Our Team</h2>
                  <p className="text-gray-300">Click to learn more about our team</p>
                </div>
                <div className="flip-card-back flex flex-col items-center justify-center">
                  <p className="text-gray-300">
                    Our team consists of passionate professionals dedicated to making the job search process more efficient and effective for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 