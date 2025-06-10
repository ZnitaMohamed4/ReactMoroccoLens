import React, { useState, useRef, useEffect } from "react";
import { marRobot } from "../assets";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you with Moroccan culture today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage = { from: "user", text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: "This is a placeholder response about Moroccan culture and traditions." }
      ]);
    }, 1500);
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-3 max-w-16">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!open && (
        <button
          className="group relative bg-gradient-to-br from-amber-600 via-orange-700 to-red-800 text-white rounded-full p-4 shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          <div className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">
            💬
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
        </button>
      )}
      
      {/* Chat Window */}
      {open && (
        <div className={`bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex flex-col animate-in slide-in-from-bottom-4 duration-300 transition-all ${
          isExpanded ? 'w-96 h-[500px]' : 'w-80 h-96'
        }`}>
          {/* Header */}
          <div className="relative bg-gradient-to-r from-amber-600 via-orange-700 to-red-800 p-4 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={marRobot} 
                    alt="AI Assistant" 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7C5.9 7 5 7.9 5 9V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V9H21ZM8 12C8.6 12 9 11.6 9 11S8.6 10 8 10 7 10.4 7 11 7.4 12 8 12ZM16 12C16.6 12 17 11.6 17 11S16.6 10 16 10 15 10.4 15 11 15.4 12 16 12ZM12 17.5C10.67 17.5 9.69 16.5 10.26 15.5H13.74C14.31 16.5 13.33 17.5 12 17.5Z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Morocco Lens Assistant</h3>
                  <p className="text-white/80 text-xs">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 z-10 relative"
                  aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
                  title={isExpanded ? "Minimize" : "Expand"}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    {isExpanded ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    )}
                  </svg>
                </button>
                <button 
                  onClick={() => setOpen(false)} 
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 z-10 relative"
                  aria-label="Close chatbot"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 transform -skew-x-12"></div>
          </div>
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-lg ${
                    msg.from === "bot"
                      ? "bg-white text-gray-800 rounded-bl-md border border-gray-100 shadow-gray-200/50"
                      : "bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-br-md shadow-amber-500/30"
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  {msg.from === "bot" && (
                    <div className="flex items-center mt-1 space-x-1">
                      <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">AI Assistant</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white rounded-2xl rounded-bl-md border border-gray-100 shadow-lg shadow-gray-200/50">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-white/80 backdrop-blur-sm border-t border-gray-100 rounded-b-2xl">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200 placeholder-gray-500"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Ask about Moroccan culture..."
                  disabled={isTyping}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400 text-xs">✨</span>
                </div>
              </div>
              <button
                className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:from-amber-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-amber-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;