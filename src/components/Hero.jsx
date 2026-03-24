// import { motion, useScroll, useTransform } from 'framer-motion';
// import { ArrowDown, ChevronRight, Star, Trophy, Sparkles } from 'lucide-react';
// import assets from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
// import { useRef, useEffect, useState } from 'react';
// import CongratsTicker from './CongratsTicker';

// // ── Animated counter ────
// const useCounter = (target, duration = 2000, start = false) => {
//   const navigate = useNavigate();
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     if (!start) return;
//     let startTime = null;
//     const step = (ts) => {
//       if (!startTime) startTime = ts;
//       const progress = Math.min((ts - startTime) / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setCount(Math.floor(eased * target));
//       if (progress < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   }, [target, duration, start]);
//   return count;
// };

// // ── Main Hero ──
// const Hero = ({ scrollToSection }) => {
//   const navigate = useNavigate();
//   const ref = useRef(null);
//   const [countersStarted, setCountersStarted] = useState(false);

//   const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
//   const imageScale   = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
//   const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.18]);
//   const textY        = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
//   const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

//   useEffect(() => {
//     const t = setTimeout(() => setCountersStarted(true), 900);
//     return () => clearTimeout(t);
//   }, []);

//   const memberCount = useCounter(4,   1800, countersStarted);
//   const lgaCount    = useCounter(20,  1400, countersStarted);
//   const wardCount   = useCounter(245, 2000, countersStarted);

//   const stats = [
//     { value: memberCount, suffix: 'M+', label: 'Members' },
//     { value: lgaCount,    suffix: '',   label: 'LGAs' },
//     { value: wardCount,   suffix: '',   label: 'Wards' },
//   ];

//   return (
//     <section
//       ref={ref}
//       id="home"
//       className="relative min-h-screen flex flex-col overflow-hidden bg-[#030f06] pt-18"
//     >
//       {/* ── Congratulatory ticker — top of hero, below navbar ── */}
//       <motion.div
//         initial={{ opacity: 0, y: -16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.4 }}
//         className="relative z-20 w-full"
//       >
//         <CongratsTicker speed={50} />
//       </motion.div>

//       {/* ── Background image with scale parallax ── */}
//       <motion.div
//         style={{ scale: imageScale, opacity: imageOpacity }}
//         className="absolute inset-0 z-0 origin-center"
//       >
//         <img
//           src={assets.oj25}
//           alt=""
//           className="w-full h-full object-cover object-[65%_top] lg:object-[75%_top]"
//           aria-hidden="true"
//           fetchPriority="high"
//         />
//       </motion.div>

//       {/* ── Layered gradients ── */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <div className="absolute inset-0 bg-linear-to-r from-[#030f06] via-[#030f06]/75 to-transparent" />
//         <div className="absolute inset-0 bg-linear-to-t from-[#030f06] via-transparent to-[#030f06]/40" />
//         <div className="absolute top-0 left-0 right-0 h-48 bg-linear-to-b from-[#030f06]/70 to-transparent" />
//       </div>

//       {/* ── Noise grain ── */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: '192px',
//         }}
//       />

//       {/* ── Ambient glow orbs ── */}
//       <div className="absolute top-1/4 left-[15%] w-125 h-125 bg-[#008A44]/15 rounded-full blur-[140px] pointer-events-none z-0" />
//       <div className="absolute bottom-1/3 right-[10%] w-75 h-75 bg-amber-400/8 rounded-full blur-[100px] pointer-events-none z-0" />

//       {/* ── Vertical accent rule ── */}
//       <motion.div
//         initial={{ scaleY: 0 }}
//         animate={{ scaleY: 1 }}
//         transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="absolute left-5 sm:left-8 lg:left-10 top-0 bottom-0 w-px bg-white/6 origin-top z-10 hidden lg:block"
//       />

//       {/* ── Main content ── */}
//       <motion.div
//         style={{ y: textY, opacity: contentOpacity }}
//         className="relative z-10 flex flex-col justify-end flex-1 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 pb-16 pt-10 lg:pt-16"
//       >
//         <div className="max-w-3xl">

//           {/* Kicker */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.55 }}
//             className="flex items-center gap-4 mb-7"
//           >
//             <motion.img
//               src={assets.apc2}
//               alt="APC Logo"
//               className="h-11 w-auto drop-shadow-xl"
//               animate={{ rotate: [0, 2, -2, 0] }}
//               transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
//             />
//             <div className="h-px flex-1 max-w-12 bg-linear-to-r from-amber-400/70 to-transparent" />
//             <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.35em]">
//               Official Website
//             </span>
//           </motion.div>

//           {/* Headline — staggered line reveals */}
//           <div className="overflow-hidden mb-1">
//             <motion.p
//               initial={{ y: '110%' }}
//               animate={{ y: 0 }}
//               transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
//               className="text-white/40 text-sm sm:text-base font-black uppercase tracking-[0.4em] mb-3"
//             >
//               APC Chairman
//             </motion.p>
//           </div>

//           <div className="overflow-hidden">
//             <motion.h1
//               initial={{ y: '110%' }}
//               animate={{ y: 0 }}
//               transition={{ duration: 1, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
//               className="font-black leading-[0.88] uppercase text-white"
//               style={{
//                 fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
//                 fontSize: 'clamp(4rem, 12vw, 10rem)',
//               }}
//             >
//               Lagos
//             </motion.h1>
//           </div>

//           <div className="overflow-hidden">
//             <motion.h1
//               initial={{ y: '110%' }}
//               animate={{ y: 0 }}
//               transition={{ duration: 1, delay: 0.76, ease: [0.22, 1, 0.36, 1] }}
//               className="font-black leading-[0.88] uppercase"
//               style={{
//                 fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
//                 fontSize: 'clamp(4rem, 12vw, 10rem)',
//                 WebkitTextStroke: '2px #008A44',
//                 color: 'transparent',
//               }}
//             >
//               State
//             </motion.h1>
//           </div>

//           {/* CTAs */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 1.2 }}
//             className="flex flex-wrap gap-3 mb-14"
//           >
//             <button
//               onClick={() => navigate('/join')}
//               className="group relative overflow-hidden bg-amber-400 text-gray-900 px-7 py-3.5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/25"
//             >
//               <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
//               <span className="relative z-10 flex items-center gap-2">
//                 Volunteer
//                 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
//               </span>
//             </button>

//                {/* Book Appointment CTA */}
//             <button
//               onClick={() => navigate('/appointment')}
//               className="group relative overflow-hidden bg-[#008A44] text-white px-7 py-3.5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 cursor-pointer shadow-lg shadow-[#008A44]/30 transition-all duration-200"
//             >
//               <span className="absolute inset-0 bg-[#005e2c] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
//               <span className="relative z-10 flex items-center gap-2">
//                 Book Appointment
//                 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
//               </span>
//             </button>
//           </motion.div>

//         </div>
//       </motion.div>

//       {/* Bottom white fade into next section */}
//       <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent z-10 pointer-events-none" />
//     </section>
//   );
// };

// export default Hero;


import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import CongratsTicker from './CongratsTicker';

// ── Animated counter ────────────────────────────────────────────────────────
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

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [countersStarted, setCountersStarted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageScale    = useTransform(scrollYProgress, [0, 1],    [1.05, 1.18]);
  const imageOpacity  = useTransform(scrollYProgress, [0, 0.8],  [0.55, 0.18]);
  const textY         = useTransform(scrollYProgress, [0, 1],    ['0%', '18%']);
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
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#030f06]"
      // pt handled per breakpoint below via the content div
    >
      {/* ── Ticker — sits just below navbar ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        // Push below a fixed navbar; adjust the top value to match your navbar height
        className="relative z-20 w-full mt-16 sm:mt-[72px]"
      >
        <CongratsTicker speed={50} />
      </motion.div>

      {/* ── Background image ── */}
      <motion.div
        style={{ scale: imageScale, opacity: imageOpacity }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img
          src={assets.oj25}
          alt=""
          // On mobile keep the subject centred; shift right on larger screens
          className="w-full h-full object-cover object-[center_top] sm:object-[65%_top] lg:object-[75%_top]"
          aria-hidden="true"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Layered gradients ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Stronger left fade on mobile so text always readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030f06] via-[#030f06]/85 to-[#030f06]/40 sm:via-[#030f06]/75 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030f06] via-transparent to-[#030f06]/40" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#030f06]/70 to-transparent" />
      </div>

      {/* ── Noise grain ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '192px',
        }}
      />

      {/* ── Ambient glow orbs — reduced on mobile to avoid covering text ── */}
      <div className="absolute top-1/4 left-[5%] sm:left-[15%] w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-[#008A44]/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-[5%] sm:right-[10%] w-[180px] sm:w-[300px] h-[180px] sm:h-[300px] bg-amber-400/8 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none z-0" />

      {/* ── Vertical accent rule — desktop only ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-8 lg:left-10 top-0 bottom-0 w-px bg-white/6 origin-top z-10 hidden lg:block"
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ y: textY, opacity: contentOpacity }}
        className="
          relative z-10 flex flex-col justify-end flex-1 w-full
          max-w-7xl mx-auto
          px-5 sm:px-8 lg:px-14
          pb-10 sm:pb-14 lg:pb-16
          pt-6  sm:pt-10 lg:pt-16
        "
      >
        <div className="max-w-xs xs:max-w-sm sm:max-w-xl lg:max-w-3xl">

          {/* ── Kicker ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center gap-3 mb-5 sm:mb-7"
          >
            <motion.img
              src={assets.apc2}
              alt="APC Logo"
              className="h-8 sm:h-11 w-auto drop-shadow-xl"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-amber-400/70 to-transparent" />
            <span className="text-amber-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.35em]">
              Official Website
            </span>
          </motion.div>

          {/* ── Eyebrow label ── */}
          <div className="overflow-hidden mb-1">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/40 text-xs sm:text-sm font-black uppercase tracking-[0.35em] sm:tracking-[0.4em] mb-2 sm:mb-3"
            >
              APC Chairman
            </motion.p>
          </div>

          {/* ── Headline ── */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[0.88] uppercase text-white"
              style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                // clamp: 3rem on very small (≈48px) → scales with vw → caps at 10rem
                fontSize: 'clamp(3rem, 14vw, 10rem)',
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
                fontSize: 'clamp(3rem, 14vw, 10rem)',
                WebkitTextStroke: 'clamp(1px, 0.2vw, 2px) #008A44',
                color: 'transparent',
              }}
            >
              State
            </motion.h1>
          </div>

          {/* ── CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-col xs:flex-row flex-wrap gap-3 mt-6 sm:mt-8 mb-10 sm:mb-14"
          >
            <button
              onClick={() => navigate('/join')}
              className="
                group relative overflow-hidden
                bg-amber-400 text-gray-900
                px-6 sm:px-7 py-3 sm:py-3.5
                rounded-full font-black text-[10px] sm:text-[11px]
                uppercase tracking-[0.2em]
                flex items-center justify-center gap-2
                cursor-pointer shadow-lg shadow-amber-400/25
                w-full xs:w-auto
              "
            >
              <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Volunteer
                <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>

            <button
              onClick={() => navigate('/appointment')}
              className="
                group relative overflow-hidden
                bg-[#008A44] text-white
                px-6 sm:px-7 py-3 sm:py-3.5
                rounded-full font-black text-[10px] sm:text-[11px]
                uppercase tracking-[0.2em]
                flex items-center justify-center gap-2
                cursor-pointer shadow-lg shadow-[#008A44]/30
                transition-all duration-200
                w-full xs:w-auto
              "
            >
              <span className="absolute inset-0 bg-[#005e2c] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Book Appointment
                <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </span>