import styles from "../style";
import videoBg from "../assets/Morocco-bg1.mp4"; // Import your video
import { Link } from "react-scroll"; 
import Button from "./Button";
import { useNavigate } from "react-router-dom";
// import GetStarted from "./GetStarted";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section 
      id="home" 
      className={`flex md:flex-row flex-col min-h-screen relative overflow-hidden mt-12`}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-[0]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src={videoBg} type="video/mp4" />
        </video>
        {/* Optional: Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Centered Content */}
        <div 
          className={`absolute inset-0 bg-black/40 flex items-start justify-center text-center z-[1] pt-[9%]`}
        >
          <div>
            <h1 className="font-poppins font-extrabold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] tracking-wide drop-shadow-lg">
              Discover the Art of <br className="sm:block hidden" />{" "}
              <span className="text-gradient">Zellij</span>{" "}
            </h1>
            <p className="font-poppins italic text-lg text-white/80 mt-4 tracking-wide drop-shadow-sm">
              Morocco's Ancient Mosaic Mastery
            </p>
            <Button styles={"mt-10"} onClick={() => navigate("/dashboard")} />
          </div>
        </div>
    </section>
  );
};

export default Hero;