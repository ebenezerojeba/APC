// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CheckCircle2 } from 'lucide-react';
// import assets from '../assets/assets';

// // Replace the single constant with a function
// const DISPLAY_MS = (index) => index < 1 ? 4000 : 1200;  // 4s for first two, 1.2s for rest  // how long each slide is fully visible
// const TRANSITION_S = 0.25;  // crossfade duration in seconds (must be < DISPLAY_MS/1000)

// const About = () => {
//   const slides = useMemo(() => [
//     assets.ojtinubu, assets.ojgroup, assets.oj34, assets.oj26, assets.oj27, assets.oj21, assets.oj30, assets.chair1, assets.chair2, assets.chair3,
//     assets.chair4, assets.chair5, assets.chair6, assets.chair7, assets.chair8,
//     assets.chair9, assets.chair10, assets.chair11, assets.chair12, assets.chair13, assets.chair14,
//   ], []);

//   const [currentSlide, setCurrentSlide] = useState(0);
//   // progress bar: resets to 0 on each new slide, fills to 1 over DISPLAY_MS
//   const [progress, setProgress] = useState(0);
//   const rafRef   = useRef(null);
//   const startRef = useRef(null);

//   useEffect(() => {
//     const animate = (ts) => {
//       if (!startRef.current) startRef.current = ts;
//       const elapsed = ts - startRef.current;
//       const duration = DISPLAY_MS(currentSlide);          // ← use function
//       const p = Math.min(elapsed / duration, 1);          // ← use duration
//       setProgress(p);

//       if (p < 1) {
//         rafRef.current = requestAnimationFrame(animate);
//       } else {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//       }
//     };

//     startRef.current = null;
//     setProgress(0);
//     rafRef.current = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(rafRef.current);
//   }, [currentSlide, slides.length]);

//   return (
//     <section id="about" className="py-24 bg-white overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-12 gap-12 items-start">

//           {/* ── LEFT: Slideshow ─────────────────────────────────────────────── */}
//           <div className="lg:col-span-5 lg:sticky lg:top-24">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               className="relative"
//             >
//               {/* Decorative flare */}
//               <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#008A44]/10 rounded-full blur-3xl" />

//               {/* Frame */}
//               <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl aspect-4/5 bg-gray-100">

//                 {/* Slides — stacked via absolute positioning; only two rendered at once */}
//                 <AnimatePresence initial={false}>
//                   <motion.img
//                     key={currentSlide}
//                     src={slides[currentSlide]}
//                     // Preload next image off-screen
//                     onLoad={() => {
//                       const next = new Image();
//                       next.src = slides[(currentSlide + 1) % slides.length];
//                     }}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: TRANSITION_S, ease: 'easeInOut' }}
//                     className="absolute inset-0 w-full h-full object-cover"
//                     alt="Pastor Cornelius Ojelabi"
//                   />
//                 </AnimatePresence>

//                 {/* Progress bar strip — driven by rAF, no framer-motion needed */}
//                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
//                   <div
//                     className="h-full bg-white origin-left"
//                     style={{
//                       transform: `scaleX(${progress})`,
//                       transition: 'none', // rAF handles it
//                     }}
//                   />
//                 </div>

//                 {/* Dot indicators */}
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
//                   {slides.map((_, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setCurrentSlide(idx)}
//                       className={`rounded-full transition-all duration-300 ${
//                         idx === currentSlide
//                           ? 'w-4 h-1.5 bg-white'
//                           : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* ── RIGHT: Biography ────────────────────────────────────────────── */}
//           <div className="lg:col-span-7">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <div className="flex items-center gap-3 text-[#008A44] font-bold uppercase tracking-widest mb-4 text-sm">
//                 <div className="w-8 h-1 bg-[#008A44]" />
//                 <span>Leadership Profile</span>
//               </div>

//               <h2
//                 className="text-4xl md:text-6xl font-black text-gray-900 mb-2 leading-tight uppercase"
//                 style={{ fontFamily: 'Impact, sans-serif' }}
//               >
//                 Pastor <span className="text-[#008A44]">Cornelius Ojelabi</span>
//               </h2>
//               <p className="text-[#008A44] font-bold text-lg md:text-xl mb-10 border-l-4 border-amber-400 pl-4">
//                 APC Lagos State Chairman & Chairman of APC Chairmen Nationwide
//               </p>

//               <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
//                 <p className="first-letter:text-6xl first-letter:font-black first-letter:text-[#008A44] first-letter:mr-2.5 first-letter:float-left">
//                Pastor Cornelius Ojelabi is a respected public servant and seasoned administrator whose life’s work embodies dedication, resilience, and a strong commitment to inclusive governance. Before venturing into politics, he distinguished himself as a great teacher, shaping minds and inspiring many. A graduate of History and International Relations from Lagos State University (LASU), he steadily advanced through the ranks of leadership—beginning as a Local Government Chairman, moving on to the National Assembly as a federal lawmaker, and later serving with distinction as Lagos State Commissioner. His journey reflects both his passion for education and his remarkable contributions to public service.
//                 </p>

//                 <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex gap-6 items-start">
//                   <p className="italic font-medium text-gray-800">
//                    With decades of experience in both legislative and executive roles, Pastor Ojelabi has earned a reputation as an omoluabi—a person of integrity who unites diverse interests, strengthens institutions, and lays foundations for sustainable progress. His leadership is defined by vision, competence, and a deep commitment to service.
//                   </p>
//                 </div>

//                 <p>
//                   As Chairman of the All Progressives Congress (APC) in Lagos State,
//                   Pastor Ojelabi carries the responsibility of steering the party toward
//                   cohesion and growth. Beyond Lagos, he also serves as Chairman of all
//                   APC State Chairmen across Nigeria, a role that places him at the center
//                   of national party coordination.
//                 </p>

//                 <div className="relative p-8 rounded-3xl bg-neutral-900 text-white overflow-hidden shadow-2xl">
//                   <div className="relative z-10 flex flex-col gap-4">
//                     <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-tighter text-sm">
//                       <CheckCircle2 size={16} />
//                       <span>The Mission</span>
//                     </div>
//                     <p className="text-xl font-semibold leading-relaxed">
//                       In this capacity, he is instrumental in driving the Renewed Hope
//                       agenda throughout the country, ensuring that the APC remains a
//                       vehicle for development, stability, and opportunity nationwide.
//                     </p>
//                     <div className="h-px w-full bg-white/10 my-2" />
//                     <p className="text-gray-400 font-medium italic">
//                       "His mission is anchored in service, his administration in
//                       competence, and his vision in building a stronger, more united
//                       Nigeria."
//                     </p>
//                   </div>
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#008A44]/30 blur-[80px] rounded-full" />
//                 </div>
//               </div>

//               {/* Credentials */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12">
//                 {[
//                   { label: 'Education', val: 'LASU Alumnus' },
//                   { label: 'Focus',     val: 'Renewed Hope' },
//                 ].map((stat, i) => (
//                   <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
//                     <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</p>
//                     <p className="font-bold text-gray-900">{stat.val}</p>
//                   </div>
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

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Landmark, Gavel, Briefcase, Flag } from 'lucide-react';
import assets from '../assets/assets';

const DISPLAY_MS = (index) => (index < 1 ? 4000 : 1200);
const TRANSITION_S = 0.25;

// ── Career timeline ─────────────────────────────────────────────────────────
// TODO: fill in exact years for each stage — placeholders below are ordinal
// only. Real dates are what make this section a credibility asset rather
// than another paragraph of prose.
const TIMELINE = [
  {
    icon: GraduationCap,
    period: 'TODO: years',
    title: 'Classroom Teacher',
    desc: 'Began his working life shaping students before entering public office — the grounding for his focus on education policy today.',
  },
  {
    icon: Landmark,
    period: 'TODO: years',
    title: 'Local Government Chairman',
    desc: 'First elective office: chief executive of his Local Government Area, running grassroots administration and constituency service.',
  },
  {
    icon: Gavel,
    period: 'TODO: years',
    title: 'Member, National Assembly',
    desc: 'Represented his constituency federally, sponsoring and reviewing legislation as a federal lawmaker.',
  },
  {
    icon: Briefcase,
    period: 'TODO: years',
    title: 'Lagos State Commissioner',
    desc: 'Served in the Lagos State Executive Council, running a ministry portfolio at state-government scale.',
  },
  {
    icon: Flag,
    period: 'Present',
    title: 'APC Chairman, Lagos State',
    desc: "Chairs the party's structure across Lagos and, nationally, all APC State Chairmen — coordinating the Renewed Hope agenda.",
    current: true,
  },
];

const About = () => {
  const slides = useMemo(() => [
    assets.ojtinubu, assets.ojgroup, assets.oj34, assets.oj26, assets.oj27, assets.oj21, assets.oj30, assets.chair1, assets.chair2, assets.chair3,
    assets.chair4, assets.chair5, assets.chair6, assets.chair7, assets.chair8,
    assets.chair9, assets.chair10, assets.chair11, assets.chair12, assets.chair13, assets.chair14,
  ], []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef   = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const duration = DISPLAY_MS(currentSlide);
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    };

    startRef.current = null;
    setProgress(0);
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [currentSlide, slides.length]);

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section intro ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-2xl"
        >
          <div className="flex items-center gap-3 text-[#008A44] font-bold uppercase tracking-widest mb-4 text-sm">
            <div className="w-8 h-1 bg-[#008A44]" />
            <span>The Man</span>
          </div>
          <h2
            className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight uppercase"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            Pastor <span className="text-[#008A44]">Cornelius Ojelabi</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            A graduate of History and International Relations from Lagos State
            University, his path from the classroom to the party chairmanship
            is a record of steady, elected service — not a title handed down.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* ── LEFT: Slideshow ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#008A44]/10 rounded-full blur-3xl" />

              <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl aspect-4/5 bg-gray-100">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide]}
                    onLoad={() => {
                      const next = new Image();
                      next.src = slides[(currentSlide + 1) % slides.length];
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: TRANSITION_S, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Pastor Cornelius Ojelabi"
                  />
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                  <div
                    className="h-full bg-white origin-left"
                    style={{ transform: `scaleX(${progress})`, transition: 'none' }}
                  />
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Show photo ${idx + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? 'w-4 h-1.5 bg-white'
                          : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Credentials — moved here from the old grid so it reads as "about the photo subject" */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { label: 'Education', val: 'LASU Alumnus' },
                { label: 'Focus',     val: 'Renewed Hope' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</p>
                  <p className="font-bold text-gray-900">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Career timeline ── */}
          <div className="lg:col-span-7">
            <div className="relative pl-2">
              {/* Spine */}
              <div className="absolute left-[27px] top-3 bottom-3 w-px bg-gray-200" aria-hidden="true" />

              <ol className="space-y-8">
                {TIMELINE.map(({ icon: Icon, period, title, desc, current }, i) => (
                  <motion.li
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative flex gap-5"
                  >
                    <div
                      className={`relative z-10 w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center border-2 ${
                        current
                          ? 'bg-[#008A44] border-[#008A44] shadow-lg shadow-[#008A44]/25'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <Icon size={22} className={current ? 'text-white' : 'text-[#008A44]'} />
                    </div>

                    <div className="pt-1">
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{period}</p>
                      <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                        {title}
                        {current && (
                          <span className="ml-2 inline-block align-middle text-[10px] font-black uppercase tracking-widest text-[#008A44] bg-[#008A44]/10 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Mission quote — kept from the original, it's genuinely his voice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative mt-12 p-8 rounded-3xl bg-neutral-900 text-white overflow-hidden shadow-2xl"
            >
              <div className="relative z-10 flex flex-col gap-3">
                <p className="text-xl font-semibold leading-relaxed">
                  "His mission is anchored in service, his administration in
                  competence, and his vision in building a stronger, more
                  united Nigeria."
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#008A44]/30 blur-[80px] rounded-full" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;