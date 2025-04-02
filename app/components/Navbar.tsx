'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/login">Login</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative py-2">
      <span className="text-gray-300 hover:text-white transition-colors duration-200">
        {children}
      </span>
      <motion.span
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent via-primary to-secondary group-hover:w-full transition-all duration-300"
        whileHover={{ width: '100%' }}
        initial={{ width: '0%' }}
      />
    </Link>
  );
} 