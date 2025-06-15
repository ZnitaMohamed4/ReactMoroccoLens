import React from "react";
import { MessageCircle, Book, MapPin, Award } from "lucide-react";

// Quick Actions Component
export const QuickActions = () => {
  const quickActions = [
    { icon: MessageCircle, label: "Chat with Mosaic", color: "from-blue-500 to-cyan-500", desc: "Ask our AI guide about Zellij patterns" },
    { icon: Book, label: "Pattern Library", color: "from-emerald-500 to-teal-500", desc: "Explore 500+ geometric patterns" },
    { icon: MapPin, label: "Find Artisans", color: "from-orange-500 to-red-500", desc: "Locate master craftsmen near you" },
    { icon: Award, label: "Learn Techniques", color: "from-purple-500 to-pink-500", desc: "Master the ancient art of Zellij" }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
      {quickActions.map((action, index) => (
        <div key={index} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{action.label}</h4>
              <p className="text-sm text-gray-600">{action.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};