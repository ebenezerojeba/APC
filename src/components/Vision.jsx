import React from 'react'
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Heart, Train } from 'lucide-react';
import assets from '../assets/assets';

const Vision = () => {
  const visionItems = [
    {
      title: 'Party Vision & Mission',
      icon: Train,
      items: [
        'Commitment to transparent governance, unity, and positive change',
        'Focus on inclusive economic growth and job creation',
        'Prioritization of education, healthcare, and infrastructure',
      ]
    },
    {
      title: 'Leadership & Structure',
      icon: Heart,
      items: [
        'Strengthening democratic institutions and inclusive leadership',
        'Promoting diversity and inclusion in leadership roles',
        'Capacity building for party members and officials',
      ]
    },
    {
      title: 'Empowerment Initiatives',
      icon: BookOpen,
      items: [
        'Youth and Women Empowerment Programs as central pillars',
        'Skills development and vocational training',
        'Support for small and medium enterprises (SMEs)',
      ]
    },
  ];

  return (
    <section id="vision" className="relative py-24 bg-[#008A44] text-white overflow-hidden">
      {/* Diagonal background accent */}
      <motion.div
        className="absolute top-0 left-0 w-full h-32 bg-white"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section: Aligns Title and Image */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          
          <motion.div
            className="text-left lg:w-3/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight" style={{ fontFamily: 'Impact, sans-serif' }}>
              Our Vision <span className='text-amber-400'>for</span> Lagos
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-xl border-l-4 border-amber-400 pl-6">
              A comprehensive agenda for sustainable development and inclusive growth under the leadership of the APC.
            </p>
          </motion.div>

          <motion.div 
            className="lg:w-2/5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Decorative Ring */}
              <div className="absolute inset-0 border-4 border-amber-400/30 rounded-full animate-pulse" />
              
              {/* Image Container */}
              <div className="absolute inset-2 overflow-hidden rounded-full border-4 border-white shadow-2xl bg-white/10">
                <img 
                  src={assets.asiwaju} 
                  alt="President Bola Ahmed Tinubu"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              
              {/* Floating Label */}
              <motion.div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-[#008A44] px-6 py-2 rounded-full font-bold whitespace-nowrap shadow-xl text-sm md:text-base"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                H.E. BOLA AHMED TINUBU
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Vision Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visionItems.map((vision, index) => (
            <motion.div
              key={vision.title}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-white/20 flex flex-col h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -10, 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderColor: 'rgba(251, 191, 36, 1)',
              }}
            >
              <h3 className="text-2xl font-black text-amber-400 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {vision.title}
              </h3>
              <ul className="space-y-4 grow">
                {vision.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <ChevronRight className="text-amber-400 shrink-0 mt-1" size={18} />
                    <span className="text-white/90 leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Vision;
