

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Award, CheckCircle2 } from 'lucide-react';
import assets from '../assets/assets';

const About = () => {
  const slides = useMemo(() => [
    assets.oj34, assets.oj26, assets.oj27, assets.oj21, assets.oj30, 
    assets.oj32, assets.oj39, assets.chair1, assets.chair2, assets.chair3, 
    assets.chair4, assets.chair5, assets.chair6, assets.chair7, assets.chair8, 
    assets.chair9, assets.chair10, assets.chair11, assets.chair12, assets.chair13, assets.chair14
  ], []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const SLIDE_DURATION = 4000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Visual Media (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Decorative background flare */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#008A44]/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl aspect-4/5 bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Pastor Cornelius Ojelabi"
                  />
                </AnimatePresence>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-1.5 z-20">
                  {slides.map((_, idx) => (
                    <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                      {idx === currentSlide && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                          className="h-full bg-white"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              {/* <motion.div 
                className="absolute -bottom-6 -right-6 bg-[#008A44] text-white p-6 rounded-2xl shadow-xl z-20 hidden md:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Globe className="mb-2 opacity-80" size={24} />
                <p className="font-black text-xl leading-tight">National<br/>Leadership</p>
              </motion.div> */}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Full Biography Text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-[#008A44] font-bold uppercase tracking-widest mb-4 text-sm">
                <div className="w-8 h-1 bg-[#008A44]"></div>
                <span>Leadership Profile</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-2 leading-tight uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
                Pastor <span className="text-[#008A44]">Cornelius Ojelabi</span>
              </h2>
              <p className="text-[#008A44] font-bold text-lg md:text-xl mb-10 border-l-4 border-amber-400 pl-4">
                APC Lagos State Chairman & Chairman of APC Chairmen Nationwide
              </p>

              {/* The Bio Content - Clean, Professional Typography */}
              <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
                <p className="first-letter:text-6xl first-letter:font-black first-letter:text-[#008A44] first-letter:mr-2.5 first-letter:float-left">
                  Pastor Cornelius Ojelabi is a distinguished public servant and seasoned administrator whose career reflects dedication, resilience, and a commitment to inclusive governance. A graduate of History and International Relations from Lagos State University (LASU), he has steadily risen through the ranks of leadership—beginning as a Local Government Chairman, advancing to the National Assembly as a federal lawmaker, and later serving with distinction as Lagos State Commissioner.
                </p>

                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex gap-6 items-start">
                    {/* <Shield className="text-[#008A44] shrink-0 mt-1" size={28} /> */}
                    <p className="italic font-medium text-gray-800">
                      With decades of experience in both legislative and executive roles, Pastor Ojelabi has earned a reputation as a builder—one who unites diverse interests, strengthens institutions, and lays foundations for sustainable progress. His leadership is defined by vision, competence, and a deep commitment to service.
                    </p>
                </div>

                <p>
                  As Chairman of the All Progressives Congress (APC) in Lagos State, Pastor Ojelabi carries the responsibility of steering the party toward cohesion and growth. Beyond Lagos, he also serves as Chairman of all APC State Chairmen across Nigeria, a role that places him at the center of national party coordination.
                </p>

                <div className="relative p-8 rounded-3xl bg-neutral-900 text-white overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-tighter text-sm">
                            <CheckCircle2 size={16} />
                            <span>The Mission</span>
                        </div>
                        <p className="text-xl font-semibold leading-relaxed">
                          In this capacity, he is instrumental in driving the Renewed Hope agenda throughout the country, ensuring that the APC remains a vehicle for development, stability, and opportunity nationwide.
                        </p>
                        <div className="h-px w-full bg-white/10 my-2" />
                        <p className="text-gray-400 font-medium italic">
                          "His mission is anchored in service, his administration in competence, and his vision in building a stronger, more united Nigeria."
                        </p>
                    </div>
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#008A44]/30 blur-[80px] rounded-full" />
                </div>
              </div>

              {/* Quick Credentials Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12">
                {[
                  { label: "Education", val: "LASU Alumnus" },
                  // { label: "Experience", val: "25+ Years" },
                  { label: "Focus", val: "Renewed Hope" }
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</p>
                    <p className="font-bold text-gray-900">{stat.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;


// import React, { useState, useEffect, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Award, Globe, Landmark, Users } from 'lucide-react';
// import assets from '../assets/assets';

// const About = () => {
//   const slides = useMemo(() => [
//     assets.oj34, assets.oj26, assets.oj27, assets.oj21, assets.oj30,
//     assets.oj32, assets.oj39, assets.chair1, assets.chair2, assets.chair3,
//     assets.chair4, assets.chair5, assets.chair6, assets.chair7, assets.chair8,
//     assets.chair9, assets.chair10, assets.chair11, assets.chair12, assets.chair13, assets.chair14
//   ], []);

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const SLIDE_DURATION = 4000;

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, SLIDE_DURATION);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const credentials = [
//     { icon: Landmark, label: 'Local Government', value: 'Former Chairman' },
//     { icon: Globe, label: 'National Assembly', value: 'Federal Lawmaker' },
//     { icon: Award, label: 'Lagos State', value: 'Former Commissioner' },
//     { icon: Users, label: 'Nationwide', value: 'Chairman of Chairmen' },
//   ];

//   return (
//     <section id="about" className="py-28 bg-white overflow-hidden">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

//         {/* Section label */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="flex items-center gap-4 mb-20"
//         >
//           <div className="h-px w-12 bg-[#008A44]" />
//           <span className="text-[#008A44] text-[10px] font-black uppercase tracking-[0.35em]">
//             Leadership Profile
//           </span>
//         </motion.div>

//         <div className="grid lg:grid-cols-12 gap-16 items-start">

//           {/* Left: Slideshow */}
//           <div className="lg:col-span-5 lg:sticky lg:top-28">
//             <motion.div
//               initial={{ opacity: 0, x: -40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//               className="relative"
//             >
//               {/* Main image frame */}
//               <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl">
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={currentSlide}
//                     src={slides[currentSlide]}
//                     initial={{ opacity: 0, scale: 1.05 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.97 }}
//                     transition={{ duration: 0.9, ease: 'easeInOut' }}
//                     className="absolute inset-0 w-full h-full object-cover"
//                     alt="Pastor Cornelius Ojelabi"
//                   />
//                 </AnimatePresence>

//                 {/* Slide progress strip */}
//                 <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 z-10">
//                   <div className="flex gap-1">
//                     {slides.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setCurrentSlide(idx)}
//                         className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden"
//                       >
//                         {idx === currentSlide && (
//                           <motion.div
//                             initial={{ scaleX: 0, originX: 0 }}
//                             animate={{ scaleX: 1 }}
//                             transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
//                             className="h-full bg-white origin-left"
//                           />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Name card overlay */}
//                 <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
//                 <div className="absolute bottom-10 left-6 right-6 z-10">
//                   <p className="text-white font-black text-xl leading-tight">Pastor Cornelius Ojelabi</p>
//                   <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mt-1">APC Lagos State Chairman</p>
//                 </div>
//               </div>

//               {/* Floating stat card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20, x: 20 }}
//                 whileInView={{ opacity: 1, y: 0, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.4 }}
//                 className="absolute -bottom-8 -right-6 bg-[#008A44] text-white p-5 rounded-2xl shadow-2xl hidden lg:block"
//               >
//                 <p className="text-3xl font-black leading-none mb-1">4M+</p>
//                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Lagos APC Members</p>
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Right: Bio */}
//           <div className="lg:col-span-7 lg:pt-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 
//                 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-gray-900 leading-[0.95] mb-6 uppercase"
//                 style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
//               >
//                 Pastor <br />
//                 <span className="text-[#008A44]">Cornelius</span> <br />
//                 Ojelabi
//               </h2>

//               <p className="text-[#008A44] font-bold text-base mb-10 pl-5 border-l-[3px] border-amber-400 leading-snug">
//                 APC Lagos State Chairman &amp; Chairman of APC Chairmen Nationwide
//               </p>

//               {/* Credential grid */}
//               <div className="grid grid-cols-2 gap-3 mb-10">
//                 {credentials.map(({ icon: Icon, label, value }, i) => (
//                   <motion.div
//                     key={label}
//                     initial={{ opacity: 0, y: 16 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.08 }}
//                     className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100 hover:border-[#008A44]/20 hover:bg-[#008A44]/[0.03] transition-colors"
//                   >
//                     <div className="w-9 h-9 bg-[#008A44]/10 rounded-xl flex items-center justify-center shrink-0">
//                       <Icon size={16} className="text-[#008A44]" />
//                     </div>
//                     <div>
//                       <p className="text-[9px] font-black uppercase tracking-wider text-gray-400">{label}</p>
//                       <p className="text-sm font-bold text-gray-800 leading-tight">{value}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Bio text */}
//               <div className="space-y-5 text-gray-600 text-[15px] leading-[1.8]">
//                 <p>
//                   <span className="text-5xl font-black text-[#008A44] leading-none float-left mr-3 mt-1">P</span>
//                   astor Cornelius Ojelabi is a distinguished public servant and seasoned administrator whose career reflects dedication, resilience, and a commitment to inclusive governance. A graduate of History and International Relations from Lagos State University (LASU), he has steadily risen through the ranks of leadership—beginning as a Local Government Chairman, advancing to the National Assembly as a federal lawmaker, and later serving with distinction as Lagos State Commissioner.
//                 </p>

//                 <blockquote className="relative my-8 py-6 px-8 bg-gray-50 rounded-3xl border border-gray-100">
//                   <div className="absolute -top-3 left-8 bg-[#008A44] text-white text-2xl font-black leading-none w-8 h-8 rounded-lg flex items-center justify-center">"</div>
//                   <p className="italic text-gray-700 font-medium text-base leading-relaxed">
//                     With decades of experience in both legislative and executive roles, Pastor Ojelabi has earned a reputation as a builder—one who unites diverse interests, strengthens institutions, and lays foundations for sustainable progress.
//                   </p>
//                 </blockquote>

//                 <p>
//                   As Chairman of the All Progressives Congress (APC) in Lagos State, Pastor Ojelabi carries the responsibility of steering the party toward cohesion and growth. Beyond Lagos, he also serves as Chairman of all APC State Chairmen across Nigeria — a role that places him at the center of national party coordination.
//                 </p>

//                 {/* Mission card */}
//                 <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 mt-8">
//                   <div className="absolute top-0 right-0 w-48 h-48 bg-[#008A44]/25 blur-[60px] rounded-full pointer-events-none" />
//                   <div className="relative z-10">
//                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400 mb-4 block">The Mission</span>
//                     <p className="text-lg font-semibold leading-relaxed mb-4">
//                       Instrumental in driving the Renewed Hope agenda throughout the country, ensuring the APC remains a vehicle for development, stability, and opportunity nationwide.
//                     </p>
//                     <div className="h-px w-full bg-white/10 my-4" />
//                     <p className="text-gray-400 text-sm italic font-medium">
//                       "His mission is anchored in service, his administration in competence, and his vision in building a stronger, more united Nigeria."
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Education tag */}
//               <div className="flex flex-wrap gap-3 mt-10">
//                 {['LASU Alumnus', 'Renewed Hope Agenda', '25+ Years Service'].map((tag) => (
//                   <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;