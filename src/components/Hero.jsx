// import { motion, useScroll, useTransform } from 'framer-motion';
// import { ChevronRight } from 'lucide-react';
// import assets from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
// import { useRef } from 'react';
// import CongratsTicker from './CongratsTicker';

// // ── Manifesto lines ───────────────────────────────────────────────────────────
// const MANIFESTO = [
//   {
//     text: 'Asiwaju 2027',
//     cls: 'text-amber-400 font-black uppercase tracking-[0.18em] text-[13px] sm:text-[15px]',
//     delay: 0.88,
//   },
//   {
//     text: 'My Party, Your Party, Our Party.',
//     cls: 'text-white/80 font-medium italic text-[12px] sm:text-[13px] tracking-wide',
//     delay: 0.98,
//   },
//   {
//     text: 'We win under the Renewed Hope Agenda.',
//     cls: 'text-white/80 font-medium italic text-[12px] sm:text-[13px] tracking-wide',
//     delay: 1.06,
//   },
//   {
//     text: 'Renewed Hope Delivered. Greater Horizons Ahead.',
//     cls: 'text-white font-semibold text-[12px] sm:text-[13px] tracking-wide',
//     delay: 1.14,
//   },
// ];

// // ── Hero ──────────────────────────────────────────────────────────────────────
// const Hero = ({ scrollToSection }) => {
//   const navigate = useNavigate();
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ['start start', 'end start'],
//   });

//   const imageScale     = useTransform(scrollYProgress, [0, 1],    [1.05, 1.18]);
//   const imageOpacity   = useTransform(scrollYProgress, [0, 0.8],  [0.55, 0.18]);
//   const textY          = useTransform(scrollYProgress, [0, 1],    ['0%', '18%']);
//   const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

//   return (
//     <section
//       ref={ref}
//       id="home"
//       className="relative flex flex-col overflow-hidden bg-[#030f06]"
//       style={{ minHeight: '100dvh' }}
//     >
//       {/* ── Ticker ── */}
//       <motion.div
//         initial={{ opacity: 0, y: -16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.4 }}
//         className="relative z-20 w-full mt-16"
//       >
//         <CongratsTicker speed={50} />
//       </motion.div>

//       {/* ── Background image ── */}
//       <motion.div
//         style={{ scale: imageScale, opacity: imageOpacity }}
//         className="absolute inset-0 z-0 origin-center"
//       >
//         <img
//           src={assets.oj25}
//           alt=""
//           className="w-full h-full object-cover object-[center_top] sm:object-[65%_top] lg:object-[75%_top]"
//           aria-hidden="true"
//           fetchPriority="high"
//         />
//       </motion.div>

//       {/* ── Gradients ── */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <div className="absolute inset-0 bg-linear-to-r from-[#030f06] via-[#030f06]/90 to-[#030f06]/60 sm:via-[#030f06]/75 sm:to-transparent" />
//         <div className="absolute inset-0 bg-linear-to-t from-[#030f06] via-transparent to-[#030f06]/40" />
//         <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-[#030f06]/70 to-transparent" />
//       </div>

//       {/* ── Noise grain ── */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: '192px',
//         }}
//       />

//       {/* ── Ambient orbs ── */}
//       <div className="absolute top-1/4 left-[5%] sm:left-[15%] w-56 h-56 sm:w-[500px] sm:h-[500px] bg-[#008A44]/15 rounded-full blur-[80px] sm:blur-[140px] pointer-events-none z-0" />
//       <div className="absolute bottom-1/3 right-[5%] sm:right-[10%] w-40 h-40 sm:w-[300px] sm:h-[300px] bg-amber-400/8 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none z-0" />

//       {/* ── Vertical rule — desktop only ── */}
//       <motion.div
//         initial={{ scaleY: 0 }}
//         animate={{ scaleY: 1 }}
//         transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="absolute left-8 lg:left-10 top-0 bottom-0 w-px bg-white/6 origin-top z-10 hidden lg:block"
//       />

//       {/* ── Main content ── */}
//       <motion.div
//         style={{ y: textY, opacity: contentOpacity }}
//         className="
//           relative z-10 flex flex-col flex-1
//           justify-center sm:justify-end
//           w-full max-w-7xl mx-auto
//           px-5 pt-4 pb-8
//           sm:px-8 sm:pt-10 sm:pb-14
//           lg:px-14 lg:pt-16 lg:pb-16
//         "
//       >
//         <div className="w-full max-w-3xl">

//           {/* ── Kicker ── */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.55 }}
//             className="flex items-center gap-3 mb-4 sm:mb-7"
//           >
//             <motion.img
//               src={assets.apc2}
//               alt="APC Logo"
//               className="h-7 sm:h-11 w-auto drop-shadow-xl"
//               animate={{ rotate: [0, 2, -2, 0] }}
//               transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
//             />
//             <div className="h-px w-8 sm:w-12 bg-linear-to-r from-amber-400/70 to-transparent" />
//             <span className="text-amber-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.35em]">
//               Official Website
//             </span>
//           </motion.div>

//           {/* ── Eyebrow ── */}
//           <div className="overflow-hidden mb-1">
//             <motion.p
//               initial={{ y: '110%' }}
//               animate={{ y: 0 }}
//               transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
//               className="text-white/40 text-[10px] sm:text-sm font-black uppercase tracking-[0.35em] mb-1.5 sm:mb-3"
//             >
//               APC Chairman
//             </motion.p>
//           </div>

//           {/* ── Headline ── */}
//           <div className="overflow-hidden">
//             <motion.h1
//               initial={{ y: '110%' }}
//               animate={{ y: 0 }}
//               transition={{ duration: 1, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
//               className="font-black leading-[0.88] uppercase text-white"
//               style={{
//                 fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
//                 fontSize: 'clamp(2.8rem, 15vw, 10rem)',
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
//                 fontSize: 'clamp(2.8rem, 15vw, 10rem)',
//                 WebkitTextStroke: 'clamp(1px, 0.25vw, 2px) #008A44',
//                 color: 'transparent',
//               }}
//             >
//               State
//             </motion.h1>
//           </div>

//           {/* ── Manifesto block ──────────────────────────────────────────────
//                Green left-bar accent with 4 staggered lines fills the dead
//                space between the headline and CTAs on mobile. Each line clips
//                out of overflow-hidden to keep the reveal crisp.
//           ── */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3, delay: 0.85 }}
//             className="
//               relative mt-5 sm:mt-6
//               pl-3.5 sm:pl-4
//               flex flex-col gap-[7px] sm:gap-2
//             "
//           >
//             {/* Left accent bar — grows in sync with the first line reveal */}
//             <motion.span
//               initial={{ scaleY: 0 }}
//               animate={{ scaleY: 1 }}
//               transition={{ duration: 0.6, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
//               className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#008A44]/70 origin-top"
//             />

//             {MANIFESTO.map(({ text, cls, delay }) => (
//               <div key={text} className="overflow-hidden">
//                 <motion.p
//                   initial={{ y: '110%', opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
//                   className={cls}
//                 >
//                   {text}
//                 </motion.p>
//               </div>
//             ))}
//           </motion.div>

//           {/* ── CTAs ── */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 1.3 }}
//             className="flex flex-col min-[480px]:flex-row flex-wrap gap-3 mt-6 sm:mt-8"
//           >
//             <button
//               onClick={() => navigate('/join')}
//               className="group relative overflow-hidden bg-amber-400 text-gray-900 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-400/25 w-full min-[480px]:w-auto"
//             >
//               <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
//               <span className="relative z-10 flex items-center gap-2">
//                 Volunteer
//                 <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
//               </span>
//             </button>

//             <button
//               onClick={() => navigate('/appointment')}
//               className="group relative overflow-hidden bg-[#008A44] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#008A44]/30 transition-all duration-200 w-full min-[480px]:w-auto"
//             >
//               <span className="absolute inset-0 bg-[#005e2c] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
//               <span className="relative z-10 flex items-center gap-2">
//                 Book Appointment
//                 <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
//               </span>
//             </button>
//           </motion.div>

//         </div>
//       </motion.div>

//       {/* ── Bottom fade ── */}
//       <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-linear-to-t from-white to-transparent z-10 pointer-events-none" />
//     </section>
//   );
// };

// export default Hero;




import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import CongratsTicker from './CongratsTicker';

// ── Manifesto lines ───────────────────────────────────────────────────────────
const MANIFESTO = [
  {
    text: 'Asiwaju 2027',
    cls: 'text-amber-400 font-black uppercase tracking-[0.18em] text-[11px] xs:text-[12px] sm:text-[14px] md:text-[15px]',
    delay: 0.88,
  },
  {
    text: 'My Party, Your Party, Our Party.',
    cls: 'text-white/80 font-medium italic text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] tracking-wide',
    delay: 0.98,
  },
  {
    text: 'We win under the Renewed Hope Agenda.',
    cls: 'text-white/80 font-medium italic text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] tracking-wide',
    delay: 1.06,
  },
  {
    text: 'Renewed Hope Delivered. Greater Horizons Ahead.',
    cls: 'text-white font-semibold text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] tracking-wide',
    delay: 1.14,
  },
];

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageScale     = useTransform(scrollYProgress, [0, 1],    [1.05, 1.18]);
  const imageOpacity   = useTransform(scrollYProgress, [0, 0.8],  [0.55, 0.18]);
  const textY          = useTransform(scrollYProgress, [0, 1],    ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex flex-col overflow-hidden bg-[#030f06]"
      style={{ minHeight: '100dvh' }}
    >
      {/* ── Ticker ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative z-20 w-full mt-14 sm:mt-16"
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
          className="w-full h-full object-cover object-[center_top] sm:object-[65%_top] lg:object-[75%_top]"
          aria-hidden="true"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Gradients ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-[#030f06] via-[#030f06]/92 to-[#030f06]/65 sm:via-[#030f06]/80 sm:to-[#030f06]/40 lg:to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#030f06] via-transparent to-[#030f06]/40" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-[#030f06]/70 to-transparent" />
      </div>

      {/* ── Noise grain ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '192px',
        }}
      />

      {/* ── Ambient orbs ── */}
      {/* Sizes clamped so orbs don't bleed off-screen on tiny viewports */}
      <div className="absolute top-1/4 left-[4%] xs:left-[6%] sm:left-[15%] w-40 h-40 xs:w-48 xs:h-48 sm:w-105 sm:h-105 lg:w-125 lg:h-125 bg-[#008A44]/15 rounded-full blur-[70px] sm:blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-[4%] xs:right-[6%] sm:right-[10%] w-28 h-28 xs:w-36 xs:h-36 sm:w-65 sm:h-65 lg:w-75 lg:h-75 bg-amber-400/8 rounded-full blur-[50px] sm:blur-[100px] pointer-events-none z-0" />

      {/* ── Vertical rule — desktop only ── */}
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
          relative z-10 flex flex-col flex-1
          justify-center
          sm:justify-end
          w-full max-w-7xl mx-auto
          px-4 xs:px-5 pt-2 pb-20
          sm:px-8 sm:pt-10 sm:pb-16
          md:pb-20
          lg:px-14 lg:pt-16 lg:pb-20
          xl:pb-24
        "
      >
        {/* Cap the text block width so it doesn't sprawl on ultrawide */}
        <div className="w-full max-w-[min(100%,48rem)]">

          {/* ── Kicker ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center gap-2 xs:gap-3 mb-3 sm:mb-6 md:mb-7"
          >
            <motion.img
              src={assets.apc2}
              alt="APC Logo"
              className="h-6 xs:h-7 sm:h-9 md:h-11 w-auto drop-shadow-xl"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="h-px w-6 xs:w-8 sm:w-10 md:w-12 bg-linear-to-r from-amber-400/70 to-transparent shrink-0" />
            <span className="text-amber-400 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em] sm:tracking-[0.35em] whitespace-nowrap">
              Official Website
            </span>
          </motion.div>

          {/* ── Eyebrow ── */}
          <div className="overflow-hidden mb-0.5 sm:mb-1">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/40 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.32em] sm:tracking-[0.35em] mb-1 sm:mb-2 md:mb-3"
            >
              APC Chairman
            </motion.p>
          </div>

          {/* ── Headline ── */}
          {/*
            clamp floor lowered to 2.4rem so "Lagos" never overflows on 320px.
            Middle value kept at 13vw for fluid scaling.
            Ceiling 10rem stays the same.
          */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[0.88] uppercase text-white"
              style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                fontSize: 'clamp(2.4rem, 13vw, 10rem)',
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
                fontSize: 'clamp(2.4rem, 13vw, 10rem)',
                WebkitTextStroke: 'clamp(1px, 0.22vw, 2px) #008A44',
                color: 'transparent',
              }}
            >
              State
            </motion.h1>
          </div>

          {/* ── Manifesto block ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.85 }}
            className="
              relative mt-4 xs:mt-5 sm:mt-6
              pl-3 xs:pl-3.5 sm:pl-4
              flex flex-col gap-1.25 xs:gap-[7px] sm:gap-2
            "
          >
            {/* Left accent bar */}
            <motion.span
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#008A44]/70 origin-top"
            />

            {MANIFESTO.map(({ text, cls, delay }) => (
              <div key={text} className="overflow-hidden">
                <motion.p
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
                  className={cls}
                >
                  {text}
                </motion.p>
              </div>
            ))}
          </motion.div>

          {/* ── CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex flex-col min-[400px]:flex-row flex-wrap gap-2.5 xs:gap-3 mt-5 xs:mt-6 sm:mt-8"
          >
            <button
              onClick={() => navigate('/join')}
              className="
                group relative overflow-hidden
                bg-amber-400 text-gray-900
                px-5 xs:px-6 sm:px-7
                py-2.5 xs:py-3 sm:py-3.5
                rounded-full font-black
                text-[9px] xs:text-[10px] sm:text-[11px]
                uppercase tracking-[0.2em]
                flex items-center justify-center gap-2
                cursor-pointer shadow-lg shadow-amber-400/25
                w-full min-[400px]:w-auto
                min-h-[40px] xs:min-h-[44px]
              "
            >
              <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Volunteer
                <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>

            <button
              onClick={() => navigate('/appointment')}
              className="
                group relative overflow-hidden
                bg-[#008A44] text-white
                px-5 xs:px-6 sm:px-7
                py-2.5 xs:py-3 sm:py-3.5
                rounded-full font-black
                text-[9px] xs:text-[10px] sm:text-[11px]
                uppercase tracking-[0.2em]
                flex items-center justify-center gap-2
                cursor-pointer shadow-lg shadow-[#008A44]/30
                transition-all duration-200
                w-full min-[400px]:w-auto
                min-h-10 xs:min-h-[44px]
              "
            >
              <span className="absolute inset-0 bg-[#005e2c] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Book Appointment
                <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Bottom fade ── */}
      {/* Taller on mobile so it doesn't clip the CTAs */}
      <div className="absolute bottom-0 left-0 right-0 h-20 xs:h-16 sm:h-24 bg-linear-to-t from-white to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;