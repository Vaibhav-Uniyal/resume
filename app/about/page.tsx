'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../components/animations.css';

const teamMembers = [
  {
    name: 'Vaibhav Uniyal',
    role: 'Developer',
    bio: 'Im Vaibhav Uniyal, a dedicated third-year B.Tech student with a strong interest in backend development,  and machine learning.Skilled in Node.js, database systems, and API design, I focus on building robust systems that are both scalable and smart. My machine learning experience spans deep learning, computer vision, and NLP — with hands-on work in models like CycleGAN, Pix2Pix, YOLO, and transformers, applying them to real-world challenges from image transformation to language translation.',
    image: '/images/SAVE_20250423_161611.jpg',
  },
  {
    name: 'Vidisha Sharma',
    role: 'Developer',
    bio: 'Vidisha Sharma is a third-year B.Tech student specializing in Artificial Intelligence and Machine Learning. She is passionate about building intuitive user experiences and leveraging AI to solve real-world problems. Her strengths lie in NLP, deep learning, and full-stack development.A creative thinker with a strong eye for detail and design, Vidisha brings innovation to user experience and front-end development.',
    image: '/images/team/1732525431949.jpeg',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[#FAF5FF] font-['Poppins']">
      <Navbar />
      <main className="w-full pt-24 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="about-section">
            <h2>Meet Our Team</h2>
            
            <div className="flip-card-container">
              {teamMembers.map((member, index) => (
                <div className="flip-card" key={index}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <div className="team-card-image">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          onError={(e) => {
                            // Fallback to placeholder if image doesn't load
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=9333EA&color=fff&size=280`;
                          }}
                        />
                        <div className="team-card-name">
                          <h3>{member.name}</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flip-card-back">
                      <div className="team-card-bio">
                        <h3>{member.name}</h3>
                        <h4>{member.role}</h4>
                        <p>{member.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="team-description">
              <p>
                We are Vidisha and Vaibhav, third-year B.Tech students specializing in Artificial Intelligence and Machine Learning at Symbiosis Institute of Technology, Pune.

                With a shared passion for building impactful tech, we've teamed up to create ResuMate — a smart, user-friendly platform designed to simplify and elevate the resume-building experience.

                Blending our strengths in AI, backend development, and UI/UX design, we aim to bridge the gap between students and career opportunities through intelligent, accessible, and beautifully crafted tools.
              </p>
            </div>
            
            {/* Vision Section with Creative Element */}
            <motion.section 
              className="vision-section mt-20 bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full">
                {/* Animated Particles */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 15 + 5 + "px",
                      height: Math.random() * 15 + 5 + "px",
                      background: `rgba(147, 51, 234, ${Math.random() * 0.2 + 0.1})`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
                
                <div className="vision-content px-8 py-12 relative z-10">
                  <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
                  >
                    Our Vision
                  </motion.h3>
                  
                  <motion.div
                    className="vision-text relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-gray-700 text-lg mb-6">
                      We envision a world where every job seeker has the tools to present their best self to potential employers. 
                      Our mission is to democratize career opportunities by making professional resume creation accessible to everyone.
                    </p>
                    
                    {/* Interactive 3D Element */}
                    <div className="flex justify-center my-12">
                      <motion.div
                        className="w-60 h-60 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full relative shadow-xl flex items-center justify-center"
                        initial={{ rotateY: 0, scale: 0.8 }}
                        whileInView={{ rotateY: 360, scale: 1 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        viewport={{ once: true }}
                      >
                        <div className="absolute inset-4 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <div className="text-center">
                            <h4 className="text-xl font-bold text-purple-800">ResuMate</h4>
                            <p className="text-sm text-gray-600">Building futures, one resume at a time</p>
                          </div>
                        </div>
                        {/* Orbiting Elements */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
                            initial={{ rotate: (i * 120) }}
                            animate={{ rotate: (i * 120) + 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            style={{
                              transformOrigin: "center",
                            }}
                          >
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${
                              i === 0 ? "from-green-400 to-green-600" :
                              i === 1 ? "from-blue-400 to-blue-600" :
                              "from-amber-400 to-amber-600"
                            }`}></div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    
                    <p className="text-gray-700 text-lg">
                      By 2025, we aim to help over 1 million people land their dream jobs through our intelligent resume tools.
                      We're constantly evolving, learning, and improving to stay ahead of industry trends and deliver the most 
                      effective resume solutions possible.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </section>
        </div>
      </main>
    </div>
  );
} 