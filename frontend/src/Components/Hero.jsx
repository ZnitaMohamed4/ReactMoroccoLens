import { useState, useEffect } from "react";
import styles from "../style";
import videoBg from "../assets/Morocco-bg1.mp4";
import { Link } from "react-scroll";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate content after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
        >
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlays for Professional Look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
      </div>

      {/* Loading State */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Subtitle */}
          <div className="mb-6">
            <span className="inline-block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase">
              Welcome to Morocco
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-poppins font-black text-white mb-6">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight">
              Discover
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Morocco's
              </span>
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight">
              Hidden Stories
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-8 leading-relaxed">
            Immerse yourself in the rich culture, breathtaking landscapes, 
            and timeless traditions of Morocco through an unforgettable journey.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Button 
              styles="hover:scale-105 transition-transform duration-300 shadow-2xl" 
              onClick={() => navigate("/dashboard")} 
            />
            
            {/* Secondary CTA */}
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="group flex items-center gap-2 text-white/90 hover:text-white font-medium cursor-pointer transition-colors duration-300"
            >
              <span>Learn More</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 border border-white/20 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-20 left-10 w-12 h-12 border border-white/20 rounded-full animate-pulse hidden lg:block"></div>
    </section>
  );
};

export default Hero;