import React, { useState, useRef } from 'react';
import {Header} from './layout/Header';
// import Footer from './layout/Footer';
import {HeroSection} from './Dashboard/HeroSection';
import {AnalysisResults} from './Dashboard/AnalysisResults';
import {ImageUploadSection} from './Dashboard/ImageUploadSection';
import {QuickActions} from './Dashboard/QuickActions';
import {FeatureShowcase} from './Dashboard/FeatureShowcase';

// Main Dashboard Component
const Dashboard = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      simulateClassification();
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const simulateClassification = () => {
    setIsClassifying(true);
    setShowResult(false);
    
    setTimeout(() => {
      const mockResult = {
        isMoroccan: Math.random() > 0.2,
        confidence: (87 + Math.random() * 10).toFixed(1),
        region: "Fès",
        period: "14th Century",
        pattern: "Taqsim (8-point star)",
        colors: ["Cobalt Blue", "White", "Green"],
        technique: "Hand-cut faience",
        description: "This exquisite Zellij features the classic Taqsim pattern, where 8-pointed stars interlock with cross-shaped tiles. The deep cobalt blue represents infinity and wisdom in Islamic art.",
        culturalContext: "Originating in Fès during the 10th century, this pattern has adorned palaces and mosques for over a millennium. Each tile is hand-cut by master craftsmen called Maâlems.",
        significance: "The geometric precision reflects the Islamic concept of divine order and mathematical perfection in creation."
      };
      
      setClassificationResult(mockResult);
      setIsClassifying(false);
      setShowResult(true);
    }, 3000);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <HeroSection />

        {/* Main Analysis Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <ImageUploadSection
              uploadedImage={uploadedImage}
              isClassifying={isClassifying}
              dragOver={dragOver}
              setDragOver={setDragOver}
              handleImageUpload={handleImageUpload}
              handleDrop={handleDrop}
              resetUpload={resetUpload}
              fileInputRef={fileInputRef}
            />
          </div>
          <QuickActions />
        </div>

        <AnalysisResults 
          classificationResult={classificationResult} 
          showResult={showResult} 
        />

        <FeatureShowcase />
      </div>

    </div>
  );
};

export default Dashboard;