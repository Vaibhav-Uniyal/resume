'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleInterviewQuestions = () => {
    router.push('/interview-questions');
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-sm py-2">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
            
            {/* Desktop navigation links */}
            <div className="hidden md:flex ml-10 space-x-1">
              {/* <NavDropdown text="Resume" links={[
                { href: '/resume-templates', label: 'Templates' },
                { href: '/resume-examples', label: 'Examples' },
                { href: '/resume-builder', label: 'Builder' }
              ]} /> */}
              
              <NavLink href="/interview-questions">
                Interview Questions
              </NavLink>
              
              <NavLink href="/format-resume" className="text-[#9333EA] hover:text-[#7928CA] bg-[#FAF5FF] hover:bg-[#F3E8FF] rounded-md">
                Format Resume
              </NavLink>
              
              <NavLink href="/about">
                About Us
              </NavLink>
            </div>
          </div>
          
          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <button 
                onClick={() => signOut({ callbackUrl: '/' })} 
                className="text-gray-700 hover:text-[#9333EA] transition-colors duration-200 px-4 py-2 rounded-md"
              >
                Sign out
              </button>
            ) : (
              <Link 
                href="/login"
                className="text-gray-700 hover:text-[#9333EA] transition-colors duration-200 px-4 py-2 rounded-md border border-gray-300"
              >
                Sign in
              </Link>
            )}
            
            <Link
              href={session ? "/dashboard" : "/signup"}
              className="px-5 py-2 bg-[#35C687] hover:bg-[#2DAD75] text-white rounded-md transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#9333EA] focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            {/* <MobileNavLink href="/resume-builder"></MobileNavLink> */}
            <MobileNavLink href="/interview-questions">Interview Questions</MobileNavLink>
            <MobileNavLink href="/format-resume" className="text-[#9333EA] bg-[#FAF5FF] rounded-md">Format Resume</MobileNavLink>
            <MobileNavLink href="/about">About Us</MobileNavLink>
            
            {session ? (
              <button 
                onClick={() => signOut({ callbackUrl: '/' })} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#9333EA] rounded-md transition-colors duration-200"
              >
                Sign out
              </button>
            ) : (
              <Link 
                href="/login" 
                className="block px-3 py-2 text-gray-700 hover:text-[#9333EA] rounded-md transition-colors duration-200"
              >
                Sign in
              </Link>
            )}
            
            <Link
              href={session ? "/dashboard" : "/signup"}
              className="block px-3 py-2 text-white bg-[#35C687] hover:bg-[#2DAD75] rounded-md transition-colors duration-200 mt-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, onClick, className }: { href: string; children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <Link href={href} className={`px-3 py-2 text-gray-700 hover:text-[#9333EA] rounded-md text-sm font-medium transition-colors duration-200 ${className || ''}`} onClick={onClick}>
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`block px-3 py-2 text-gray-700 hover:text-[#9333EA] rounded-md text-base font-medium transition-colors duration-200 ${className || ''}`}>
      {children}
    </Link>
  );
}

function NavDropdown({ text, links }: { text: string; links: { href: string; label: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button 
        className="px-3 py-2 text-gray-700 hover:text-[#9333EA] rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {text}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#9333EA]"
                role="menuitem"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 