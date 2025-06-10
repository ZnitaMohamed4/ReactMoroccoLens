import React from "react";

const Button = ({ styles, onClick  }) => (
  <button 
    type="button" 
    className={`py-4 px-6 font-poppins font-semibold text-[18px] text-black 
      bg-orange-gradient rounded-xl shadow-lg transition-all duration-300 
      hover:scale-105 hover:shadow-orange-500/50 active:scale-95 ${styles}`}
      onClick={onClick}
  >
    Start Exploring →
  </button>
);

export default Button;
