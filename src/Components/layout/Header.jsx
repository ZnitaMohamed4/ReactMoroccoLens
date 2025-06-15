import React, { useState, useRef } from 'react';
import { Users } from 'lucide-react';

// Header Component
export const Header = () => {
  return (
    
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-10 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#9A5442] to-[#C5A645] rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <div>
              <h1 className="font-poppins font-bold text-2xl text-[#2A2A2A] hover:text-[#C5A645] transition-colors cursor-pointer drop-shadow-lg">
                <span className="text-[#9A5442]">Turathii</span>
                <span className="text-gradient"> IA</span>
              </h1>
              <p className="text-[#2A2A2A] text-sm font-poppins">Discover the Art of Moroccan Mosaics</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-[#2A2A2A] font-poppins">
              <Users className="w-4 h-4 text-[#C5A645]" />
              <span className="text-sm">1,247 patterns analyzed today</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};