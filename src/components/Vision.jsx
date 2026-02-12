import React from 'react'
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, ChevronRight, Heart, Music, ShieldCheck, Train } from 'lucide-react';
const Vision = () => {
const visionItems = [
    {
      title: 'Traffic & Transport',
      icon: Train,
      items: [
        'Completion of the Red Line Rail network',
        'Expansion of LagFerry water transport',
        'Smart Traffic Management (SCATS) integration',
        'Construction of the Fourth Mainland Bridge'
      ]
    },
    {
      title: 'Health & Environment',
      icon: Heart,
      items: [
        'Universal Health Coverage (Ilera Eko)',
        'Upgrade of General Hospitals to tertiary hubs',
        'Waste-to-Energy conversion projects',
        'Coastal resilience and flood prevention'
      ]
    },
    {
      title: 'Education & Technology',
      icon: BookOpen,
      items: [
        'EKOEXCEL 2.0 digital learning expansion',
        'Fiber optic connectivity for all public schools',
        'Establishment of Lagos Science & Tech parks',
        'Vocational training in emerging green skills'
      ]
    },
    // {
    //   title: '21st Century Economy',
    //   icon: BarChart3,
    //   items: [
    //     'Support for MSMEs via LSETF grants',
    //     'Development of the Lekki Free Trade Zone',
    //     'Agricultural hubs for food security',
    //     'Promotion of ease of doing business'
    //   ]
    // },
    // {
    //   title: 'Entertainment & Tourism',
    //   icon: Music,
    //   items: [
    //     'Film City Project in Ejinrin, Epe',
    //     'Global promotion of Afrobeat & creative arts',
    //     'Preservation of historical heritage sites',
    //     'Modernization of beach-front tourism'
    //   ]
    // },
    // {
    //   title: 'Security & Governance',
    //   icon: ShieldCheck,
    //   items: [
    //     'Strengthening of the Lagos Trust Fund',
    //     'State-wide CCTV & command center expansion',
    //     'Enhanced Social Inclusion (THEMES Plus)',
    //     'Transparency via digital citizen portals'
    //   ]
    // }
  ];

  return (
    <section id="vision" className="relative py-20 bg-[#008A44] text-white overflow-hidden">
      {/* Diagonal background accent */}
      <motion.div
        className="absolute top-0 left-0 w-full h-32 bg-white"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: 'Impact, sans-serif' }}>
            Our Vision for Lagos
          </h2>
          <p className="text-xl opacity-90">
            A comprehensive agenda for sustainable development and inclusive growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visionItems.map((vision, index) => (
            <motion.div
              key={vision.title}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-white/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -15, 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderColor: 'rgba(251, 191, 36, 1)',
                scale: 1.02
              }}
            >
              <h3 className="text-2xl font-black text-amber-400 mb-4" style={{ fontFamily: 'Impact, sans-serif' }}>
                {vision.title}
              </h3>
              <ul className="space-y-3">
                {vision.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <ChevronRight className="text-amber-400 shrink-0 mt-1" size={18} />
                    <span className="text-white/90">{item}</span>
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

export default Vision