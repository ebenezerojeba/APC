import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Hero = ({ scrollToSection }) => {

    const navigate = useNavigate()
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#008A44] overflow-hidden text-white pt-20">
      
      {/* Background Particles - Hidden on small screens for performance */}
      <div className="absolute inset-0 opacity-10 hidden md:block">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ x: Math.random() * 100 + "%", y: "100%" }}
            animate={{ y: "-10%" }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* 1. Left Content: Text & Logo */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* APC LOGO */}
            <motion.img 
              src={assets.apc} // Path to the logo you attached
              alt="APC Logo"
              className="w-24 h-24 md:w-32 md:h-32 mb-8 mx-auto lg:mx-0 drop-shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <h2 className="text-amber-400 font-bold tracking-widest uppercase mb-2 text-sm md:text-base">
              Official Website of the
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
              APC Chairman <br className="hidden md:block"/> 
              <span className="text-white">Lagos State</span>
            </h1>

            <p className="text-lg md:text-xl mb-10 text-gray-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Leading the charge for a Greater Lagos. Join Pastor Cornelius Ojelabi 
              and the APC family in building a sustainable future for all Lagosians.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/join')}
                className="bg-amber-400 cursor-pointer text-gray-900 px-8 py-4 rounded-full font-extrabold flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300"
              >
                JOIN THE MOVEMENT
              </button>
             
            </div>
          </motion.div>

          {/* 2. Right Content: Chairman Image (Responsive) */}
          <motion.div 
            className="flex-1 relative w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* The Chairman's Image */}
            <div className="relative z-10">
              <img
                src={assets.oj18} // Replace with actual photo
                alt="Pastor Cornelius Ojelabi"
                className="w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl"
              />
              {/* Subtle Gradient Overlay to blend bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#008A44] to-transparent lg:hidden" />
            </div>
            
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-amber-400/20 rounded-full blur-3xl -z-10" />
          </motion.div>

        </div>
      </div>

      {/* Bottom Wave Decor */}
      <div className="absolute bottom-0 w-full leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-gray-50">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;