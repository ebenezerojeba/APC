// import React from 'react'
// import { motion } from 'framer-motion';
// import { BookOpen, ChevronRight, Heart, Train } from 'lucide-react';
// import assets from '../assets/assets';

// const Vision = () => {
//   const visionItems = [
//     {
//       title: 'Party Vision & Mission',
//       icon: Train,
//       items: [
//         'Commitment to transparent governance, unity, and positive change',
//         'Focus on inclusive economic growth and job creation',
//         'Prioritization of education, healthcare, and infrastructure',
//       ]
//     },
//     {
//       title: 'Leadership & Structure',
//       icon: Heart,
//       items: [
//         'Strengthening democratic institutions and inclusive leadership',
//         'Promoting diversity and inclusion in leadership roles',
//         'Capacity building for party members and officials',
//       ]
//     },
//     {
//       title: 'Empowerment Initiatives',
//       icon: BookOpen,
//       items: [
//         'Youth and Women Empowerment Programs as central pillars',
//         'Skills development and vocational training',
//         'Support for small and medium enterprises (SMEs)',
//       ]
//     },
//   ];

//   return (
//     <section id="vision" className="relative py-24 bg-[#008A44] text-white overflow-hidden">
//       {/* Diagonal background accent */}
//       <motion.div
//         className="absolute top-0 left-0 w-full h-32 bg-white"
//         style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//       />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header Section: Aligns Title and Image */}
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          
//           <motion.div
//             className="text-left lg:w-3/5"
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight" style={{ fontFamily: 'Impact, sans-serif' }}>
//               Our Vision <span className='text-amber-400'>for</span> Lagos
//             </h2>
//             <p className="text-xl md:text-2xl opacity-90 max-w-xl border-l-4 border-amber-400 pl-6">
//               A comprehensive agenda for sustainable development and inclusive growth under the leadership of the APC.
//             </p>
//           </motion.div>

//           <motion.div 
//             className="lg:w-2/5 flex justify-center lg:justify-end"
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="relative w-64 h-64 md:w-80 md:h-80">
//               {/* Decorative Ring */}
//               <div className="absolute inset-0 border-4 border-amber-400/30 rounded-full animate-pulse" />
              
//               {/* Image Container */}
//               <div className="absolute inset-2 overflow-hidden rounded-full border-4 border-white shadow-2xl bg-white/10">
//                 <img 
//                   src={assets.asiwaju} 
//                   alt="President Bola Ahmed Tinubu"
//                   className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
//                   loading="lazy"
//                 />
//               </div>
              
//               {/* Floating Label */}
//               <motion.div 
//                 className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-[#008A44] px-6 py-2 rounded-full font-bold whitespace-nowrap shadow-xl text-sm md:text-base"
//                 initial={{ y: 20, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 H.E. BOLA AHMED TINUBU
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Vision Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {visionItems.map((vision, index) => (
//             <motion.div
//               key={vision.title}
//               className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-white/20 flex flex-col h-full"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1, duration: 0.6 }}
//               whileHover={{ 
//                 y: -10, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.15)',
//                 borderColor: 'rgba(251, 191, 36, 1)',
//               }}
//             >
//               <h3 className="text-2xl font-black text-amber-400 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
//                 {vision.title}
//               </h3>
//               <ul className="space-y-4 grow">
//                 {vision.items.map((item, i) => (
//                   <motion.li
//                     key={i}
//                     className="flex items-start gap-3"
//                     initial={{ opacity: 0, x: -10 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 * i }}
//                   >
//                     <ChevronRight className="text-amber-400 shrink-0 mt-1" size={18} />
//                     <span className="text-white/90 leading-snug">{item}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Vision;



import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Train, ArrowUpRight } from 'lucide-react';
import assets from '../assets/assets';

const visionItems = [
  {
    number: '01',
    title: 'Party Vision & Mission',
    icon: Train,
    color: 'from-[#008A44] to-emerald-600',
    items: [
      'Commitment to transparent governance, unity, and positive change',
      'Focus on inclusive economic growth and job creation',
      'Prioritization of education, healthcare, and infrastructure',
    ]
  },
  {
    number: '02',
    title: 'Leadership & Structure',
    icon: Heart,
    color: 'from-amber-500 to-amber-400',
    items: [
      'Strengthening democratic institutions and inclusive leadership',
      'Promoting diversity and inclusion in leadership roles',
      'Capacity building for party members and officials',
    ]
  },
  {
    number: '03',
    title: 'Empowerment Initiatives',
    icon: BookOpen,
    color: 'from-emerald-700 to-[#008A44]',
    items: [
      'Youth and Women Empowerment Programs as central pillars',
      'Skills development and vocational training',
      'Support for small and medium enterprises (SMEs)',
    ]
  },
];

const Vision = () => {
  return (
    <section id="vision" className="py-28 bg-[#041a0b] text-white overflow-hidden relative">
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#008A44]/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-amber-400" />
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.35em]">Strategic Direction</span>
            </div>
            <h2 
              className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] uppercase"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
            >
              Our Vision <br />
              <span className="text-[#008A44]">for Lagos</span>
            </h2>
          </motion.div>

          {/* President image - floating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative shrink-0"
          >
            <div className="relative w-44 h-44 lg:w-52 lg:h-52">
              <div className="absolute inset-0 rounded-full border-2 border-[#008A44]/40 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full" />
              </div>
              <div className="absolute inset-3 rounded-full overflow-hidden border-4 border-[#008A44]/30 bg-[#041a0b]">
                <img
                  src={assets.asiwaju}
                  alt="President Bola Ahmed Tinubu"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-400 text-[#008A44] text-[9px] font-black uppercase tracking-[0.2em] px-5 py-1.5 rounded-full whitespace-nowrap shadow-xl">
                H.E. Bola Ahmed Tinubu
              </div>
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/50 text-xl max-w-2xl mb-16 leading-relaxed font-light border-l-2 border-[#008A44] pl-6"
        >
          A comprehensive agenda for sustainable development and inclusive growth under the leadership of the APC and the Renewed Hope administration.
        </motion.p>

        {/* Vision cards — horizontal scrollable on mobile, 3-col on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden hover:border-[#008A44]/50 transition-colors duration-400 cursor-default"
            >
              {/* Hover gradient fill */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#008A44]/0 to-[#008A44]/0 group-hover:from-[#008A44]/10 group-hover:to-transparent transition-all duration-500 rounded-3xl" />

              {/* Number + icon header */}
              <div className="flex items-start justify-between mb-8 relative z-10">
                <span 
                  className="text-6xl font-black text-white/5 leading-none select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {item.number}
                </span>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <item.icon size={20} className="text-white" />
                </div>
              </div>

              <h3 className="text-xl font-black text-white mb-5 relative z-10 leading-tight">{item.title}</h3>

              <ul className="space-y-3.5 relative z-10">
                {item.items.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-snug group-hover:text-white/75 transition-colors">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { stat: '20', label: 'LGAs', suffix: '' },
            { stat: '245', label: 'Party Wards', suffix: '' },
            { stat: '4M+', label: 'Members', suffix: '' },
            { stat: '2027', label: 'General Election', suffix: '' },
          ].map(({ stat, label, suffix }, i) => (
            <div key={label} className="bg-white/5 rounded-2xl px-6 py-5 border border-white/10 text-center">
              <p className="text-3xl font-black text-[#008A44] leading-none mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {stat}{suffix}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;