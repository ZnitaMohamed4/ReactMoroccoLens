import React, { useState, useRef } from 'react';

const Dashboard = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        simulateClassification();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateClassification = () => {
    setIsClassifying(true);
    setShowResult(false);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        isMoroccan: Math.random() > 0.3,
        confidence: (85 + Math.random() * 10).toFixed(1),
        region: "Fès",
        period: "16th Century",
        pattern: "Khatam (8-point star)",
        description: "This Zellij pattern represents the traditional geometric artistry of Fès, featuring intricate 8-point star formations that symbolize divine perfection in Islamic art.",
        culturalContext: "Zellij is a form of mosaic tilework made from individually hand-chiseled tile pieces, set into a plaster base. This ancient art form has been practiced in Morocco for over 1,000 years."
      };
      
      setClassificationResult(mockResult);
      setIsClassifying(false);
      setShowResult(true);
    }, 2500);
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setClassificationResult(null);
    setShowResult(false);
    setIsClassifying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-800 via-orange-700 to-amber-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🏺</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">Morocco Lens</h1>
                <p className="text-orange-100 text-lg">Discover the Beauty of Moroccan Craftsmanship</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-white/90">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-sm">AI-Powered Recognition</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Classification Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Upload Section */}
          <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Zellij Recognition</h2>
              <p className="text-orange-100">Upload your Zellij image for instant cultural analysis</p>
            </div>
            
            <div className="p-8">
              {!uploadedImage ? (
                <div 
                  className="border-3 border-dashed border-orange-300 rounded-2xl p-12 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 transition-all duration-300"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Zellij Image</h3>
                  <p className="text-gray-600 mb-4">Drag & drop or click to select your image</p>
                  <p className="text-sm text-gray-500">Supports JPG, PNG, WebP (Max 10MB)</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded Zellij" 
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={resetUpload}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {isClassifying && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-4 animate-spin">
                        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"></div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Your Zellij...</h3>
                      <p className="text-gray-600">Our AI is examining the patterns and cultural markers</p>
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

          {/* Results Section */}
          <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Classification Results</h2>
              <p className="text-emerald-100">Detailed analysis and cultural insights</p>
            </div>
            
            <div className="p-8">
              {!showResult ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">Awaiting Analysis</h3>
                  <p className="text-gray-400">Upload an image to see the magical results</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  {/* Classification Badge */}
                  <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold ${
                    classificationResult?.isMoroccan 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <span className="mr-2">
                      {classificationResult?.isMoroccan ? '🎯' : '❌'}
                    </span>
                    {classificationResult?.isMoroccan ? 'Authentic Moroccan Zellij' : 'Not Moroccan Zellij'}
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Confidence</h4>
                        <p className="text-2xl font-bold text-orange-600">{classificationResult?.confidence}%</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Region</h4>
                        <p className="text-xl text-gray-700">{classificationResult?.region}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Period</h4>
                        <p className="text-gray-700">{classificationResult?.period}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Pattern</h4>
                        <p className="text-gray-700">{classificationResult?.pattern}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                        <p className="text-gray-700 leading-relaxed">{classificationResult?.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Cultural Context</h4>
                        <p className="text-gray-700 leading-relaxed">{classificationResult?.culturalContext}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Explore Gallery */}
          <div className="group bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="relative h-48 bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Explore Gallery</h3>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Discover a curated collection of authentic Moroccan crafts, each with its unique story and cultural significance.
              </p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                <span>Browse Collection</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Cultural Quiz */}
          <div className="group bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="relative h-48 bg-gradient-to-br from-emerald-600 to-teal-600 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Cultural Quiz</h3>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Test your knowledge of Moroccan culture, traditions, and craftsmanship through our interactive quiz experience.
              </p>
              <div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors">
                <span>Start Quiz</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;