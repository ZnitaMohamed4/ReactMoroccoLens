import React from "react";
import { Star, MapPin, Clock, Book, Sparkles, Users } from "lucide-react";

// Analysis Results Component
export const AnalysisResults = ({ classificationResult, showResult }) => {
  if (!showResult || !classificationResult) return null;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-12 animate-in slide-in-from-bottom duration-500">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-white" />
            <div>
              <h3 className="text-xl font-bold text-white">Analysis Complete</h3>
              <p className="text-emerald-100">Detailed cultural insights revealed</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-bold ${
            classificationResult.isMoroccan 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {classificationResult.confidence}% Confidence
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <h4 className="font-bold text-gray-800">Origin</h4>
            </div>
            <p className="text-lg font-semibold text-blue-700">{classificationResult.region}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <h4 className="font-bold text-gray-800">Period</h4>
            </div>
            <p className="text-lg font-semibold text-purple-700">{classificationResult.period}</p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <h4 className="font-bold text-gray-800">Pattern</h4>
            </div>
            <p className="text-lg font-semibold text-amber-700">{classificationResult.pattern}</p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-gray-800">Technique</h4>
            </div>
            <p className="text-lg font-semibold text-emerald-700">{classificationResult.technique}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center">
              <Book className="w-5 h-5 mr-2 text-blue-600" />
              Pattern Description
            </h4>
            <p className="text-gray-700 leading-relaxed">{classificationResult.description}</p>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-indigo-600" />
              Cultural Significance
            </h4>
            <p className="text-gray-700 leading-relaxed">{classificationResult.significance}</p>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-emerald-600" />
              Historical Context
            </h4>
            <p className="text-gray-700 leading-relaxed">{classificationResult.culturalContext}</p>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
            <h4 className="font-bold text-gray-800 mb-3">Color Palette</h4>
            <div className="flex flex-wrap gap-2">
              {classificationResult.colors?.map((color, index) => (
                <span key={index} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                  {color}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
