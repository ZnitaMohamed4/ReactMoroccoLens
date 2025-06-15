import React from 'react';
import { Camera, Upload, Sparkles } from 'lucide-react';

// Image Upload Component
export const ImageUploadSection = ({ 
  uploadedImage, 
  isClassifying, 
  dragOver, 
  setDragOver, 
  handleImageUpload, 
  handleDrop, 
  resetUpload, 
  fileInputRef 
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      <div className="bg-gradient-to-r from-[#9A5442] to-[#C5A645] p-6">
        <div className="flex items-center space-x-3">
          <Camera className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-xl font-bold text-white font-poppins">Pattern Recognition</h3>
            <p className="text-white/80 font-poppins">Advanced AI analysis of Zellij patterns</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {!uploadedImage ? (
          <div 
            className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
              dragOver 
                ? 'border-[#C5A645] bg-[#C5A645]/10 scale-105' 
                : 'border-gray-300 hover:border-[#C5A645] hover:bg-[#C5A645]/5'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#9A5442] to-[#C5A645] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-white" />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-[#2A2A2A] mb-2 font-poppins">Drop your Zellij image here</h4>
            <p className="text-[#2A2A2A] mb-4 font-poppins">or click to browse from your device</p>
            <div className="flex justify-center space-x-4 text-sm text-[#2A2A2A] font-poppins">
              <span className="bg-gray-100 px-3 py-1 rounded-full">JPG</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">PNG</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">WebP</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={uploadedImage} 
                alt="Uploaded Zellij" 
                className="w-full h-80 object-cover"
              />
              <button
                onClick={resetUpload}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {isClassifying && (
              <div className="text-center py-8">
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-[#C5A645]/30 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#C5A645] animate-spin"></div>
                  <Sparkles className="w-8 h-8 text-[#C5A645] animate-pulse" />
                </div>
                <h4 className="text-xl font-bold text-[#2A2A2A] mb-2 font-poppins">Analyzing Zellij Pattern...</h4>
                <p className="text-[#2A2A2A] font-poppins">Our AI is examining geometric patterns, colors, and cultural markers</p>
                <div className="mt-4 bg-[#C5A645]/10 rounded-full p-2 max-w-md mx-auto">
                  <div className="bg-[#C5A645] h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                </div>
              </div>
            )}
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};