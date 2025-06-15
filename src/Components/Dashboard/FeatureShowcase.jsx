import React from 'react';
import { Image, Users, Award } from 'lucide-react';

// Feature Showcase Component
export const FeatureShowcase = () => {
  const features = [
    {
      title: "Pattern Gallery",
      description: "Explore our curated collection of 500+ authentic Zellij patterns from across Morocco's historic sites.",
      icon: Image,
      gradient: "from-violet-600 to-purple-700",
      textColor: "text-violet-600",
      hoverColor: "group-hover:text-violet-700",
      action: "Explore Gallery"
    },
    {
      title: "Master Craftsmen",
      description: "Meet the Maâlems (master craftsmen) and learn about their techniques passed down through generations.",
      icon: Users,
      gradient: "from-cyan-600 to-blue-700",
      textColor: "text-cyan-600",
      hoverColor: "group-hover:text-cyan-700",
      action: "Meet the Masters"
    },
    {
      title: "Learning Path",
      description: "Follow guided tutorials and interactive lessons to understand Zellij geometry and symbolic meanings.",
      icon: Award,
      gradient: "from-emerald-600 to-teal-700",
      textColor: "text-emerald-600",
      hoverColor: "group-hover:text-emerald-700",
      action: "Start Learning"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div key={index} className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer">
          <div className={`relative h-48 bg-gradient-to-br ${feature.gradient} overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 leading-relaxed mb-4">
              {feature.description}
            </p>
            <div className={`flex items-center ${feature.textColor} font-semibold ${feature.hoverColor} transition-colors`}>
              <span>{feature.action}</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};