// import { motion } from 'framer-motion';
// import { ChevronRight } from 'lucide-react';
// import assets from '../assets/assets';
// import { useNavigate } from 'react-router-dom';

// const Hero = ({ scrollToSection }) => {

//     const navigate = useNavigate()
//   return (
//     <section id="home" className="relative min-h-screen flex items-center bg-[#008A44] overflow-hidden text-white pt-20">
      
//       {/* Background Particles - Hidden on small screens for performance */}
//       <div className="absolute inset-0 opacity-10 hidden md:block">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-white rounded-full"
//             initial={{ x: Math.random() * 100 + "%", y: "100%" }}
//             animate={{ y: "-10%" }}
//             transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
//           />
//         ))}
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 z-10 w-full">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
//           {/* 1. Left Content: Text & Logo */}
//           <motion.div 
//             className="flex-1 text-center lg:text-left"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             {/* APC LOGO */}
//             <motion.img 
//               src={assets.apc2}
//               alt="APC Logo"
//               className="w-24 h-24 md:w-32 md:h-32 mb-8 mx-auto lg:mx-0 drop-shadow-lg"
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             />

//             <h2 className="text-amber-400 font-bold tracking-widest uppercase mb-2 text-sm md:text-base">
//               Official Website of the
//             </h2>
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
//               APC Chairman <br className="hidden md:block"/> 
//               <span className="text-white">Lagos State</span>
//             </h1>

//             <p className="text-lg md:text-xl mb-10 text-gray-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
//               Leading the charge for a Greater Lagos. Join Pastor Cornelius Ojelabi 
//               and the APC family in building a sustainable future for all Lagosians.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <button 
//                 onClick={() => navigate('/join')}
//                 className="bg-amber-400 cursor-pointer text-gray-900 px-8 py-4 rounded-full font-extrabold flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300"
//               >
//                 JOIN THE MOVEMENT
//               </button>
             
//             </div>
//           </motion.div>

//           {/* 2. Right Content: Chairman Image (Responsive) */}
//           <motion.div 
//             className="flex-1 relative w-full max-w-md lg:max-w-none"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             {/* The Chairman's Image */}
//             <div className="relative z-10">
//               <img
//                 src={assets.oj18} // Replace with actual photo
//                 alt="Pastor Cornelius Ojelabi"
//                 className="w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl"
//               />
//               {/* Subtle Gradient Overlay to blend bottom */}
//               <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#008A44] to-transparent lg:hidden" />
//             </div>
            
//             {/* Decorative background circle */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-amber-400/20 rounded-full blur-3xl -z-10" />
//           </motion.div>

//         </div>
//       </div>

//       {/* Bottom Wave Decor */}
//       <div className="absolute bottom-0 w-full leading-none">
//         <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-gray-50">
//           <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
//         </svg>
//       </div>
//     </section>
//   );
// }

// export default Hero;








import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ChevronRight, Star, Trophy, Sparkles } from 'lucide-react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import CongratsTicker from './CongratsTicker';

// ── Animated counter ──────────────────────────────────────────────────────────
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};


// ── Main Hero ─────────────────────────────────────────────────────────────────
const Hero = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [countersStarted, setCountersStarted] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageScale   = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.18]);
  const textY        = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setCountersStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  const memberCount = useCounter(4,   1800, countersStarted);
  const lgaCount    = useCounter(20,  1400, countersStarted);
  const wardCount   = useCounter(245, 2000, countersStarted);

  const stats = [
    { value: memberCount, suffix: 'M+', label: 'Members' },
    { value: lgaCount,    suffix: '',   label: 'LGAs' },
    { value: wardCount,   suffix: '',   label: 'Wards' },
  ];

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#030f06] pt-18"
    >
      {/* ── Congratulatory ticker — top of hero, below navbar ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative z-20 w-full"
      >
        <CongratsTicker speed={50} />
      </motion.div>

      {/* ── Background image with scale parallax ── */}
      <motion.div
        style={{ scale: imageScale, opacity: imageOpacity }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img
          src={assets.oj25}
          alt=""
          className="w-full h-full object-cover object-[65%_top] lg:object-[75%_top]"
          aria-hidden="true"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Layered gradients ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-[#030f06] via-[#030f06]/75 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#030f06] via-transparent to-[#030f06]/40" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-linear-to-b from-[#030f06]/70 to-transparent" />
      </div>

      {/* ── Noise grain ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '192px',
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div className="absolute top-1/4 left-[15%] w-125 h-125 bg-[#008A44]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-[10%] w-75 h-75 bg-amber-400/8 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* ── Vertical accent rule ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-5 sm:left-8 lg:left-10 top-0 bottom-0 w-px bg-white/6 origin-top z-10 hidden lg:block"
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ y: textY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col justify-end flex-1 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 pb-16 pt-10 lg:pt-16"
      >
        <div className="max-w-3xl">

          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center gap-4 mb-7"
          >
            <motion.img
              src={assets.apc2}
              alt="APC Logo"
              className="h-11 w-auto drop-shadow-xl"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="h-px flex-1 max-w-12 bg-linear-to-r from-amber-400/70 to-transparent" />
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.35em]">
              Official Website
            </span>
          </motion.div>

          {/* Headline — staggered line reveals */}
          <div className="overflow-hidden mb-1">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/40 text-sm sm:text-base font-black uppercase tracking-[0.4em] mb-3"
            >
              APC Chairman
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[0.88] uppercase text-white"
              style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                fontSize: 'clamp(4rem, 12vw, 10rem)',
              }}
            >
              Lagos
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.76, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[0.88] uppercase"
              style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                WebkitTextStroke: '2px #008A44',
                color: 'transparent',
              }}
            >
              State
            </motion.h1>
          </div>

          {/* Name card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex items-center gap-4 mt-8 mb-8"
          >
            <div className="w-0.5 h-14 bg-linear-to-b from-amber-400 to-amber-400/0 shrink-0" />
            <div>
              <p className="text-white text-xl sm:text-2xl font-black leading-snug">
                Pastor Cornelius Ojelabi
              </p>
              <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] mt-1 leading-snug">
                Re-elected Lagos State APC Chairman&nbsp;·&nbsp;Chairman of APC Chairmen Nationwide
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="text-white/50 text-base sm:text-lg max-w-lg mb-10 leading-[1.8] font-light"
          >
            Leading the charge for a Greater Lagos — building a sustainable,
            inclusive future for all&nbsp;22 million Lagosians under the Renewed Hope agenda.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            <button
              onClick={() => navigate('/join')}
              className="group relative overflow-hidden bg-amber-400 text-gray-900 px-7 py-3.5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/25"
            >
              <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Join the Movement
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="group relative overflow-hidden border border-white/15 text-white/70 hover:text-white px-7 py-3.5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 cursor-pointer transition-all duration-200 backdrop-blur-sm hover:border-white/30"
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Discover More</span>
            </button>
          </motion.div>

        </div>
      </motion.div>


      {/* Bottom white fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;