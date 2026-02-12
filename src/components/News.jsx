import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Calendar, Newspaper } from 'lucide-react';

const News = () => {
  // Real 2026 Lagos APC News Items
  const newsArticles = [
    {
      date: 'Feb 10, 2026',
      category: 'Mobilization',
      title: 'Ojelabi Urges Unity at Lagos East Mega Rally',
      desc: 'Lagos APC Chairman, Pastor Cornelius Ojelabi, calls for internal cohesion and grassroots mobilization to consolidate the party’s achievements.'
    },
    {
      date: 'Feb 5, 2026',
      category: 'Registration',
      title: 'Lagos Leads in Nationwide APC E-Registration',
      desc: 'The Chairman commends the Ikorodu division and others for record-breaking numbers in the ongoing digital party membership enrollment.'
    },
    {
      date: 'Jan 28, 2026',
      category: 'Governance',
      title: 'Chairman Reviews Local Govt Election Readiness',
      desc: 'Official briefing confirming election schedules for all 20 LGAs and 37 LCDAs, emphasizing the party’s commitment to grassroots democracy.'
    }
  ];

  return (
    <section id="news" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider mb-2">
              <Newspaper size={20} />
              <span>Media Center</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#008A44] uppercase leading-none" style={{ fontFamily: 'Impact, sans-serif' }}>
              Latest From The <br/> <span className="text-gray-900">Secretariat</span>
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#008A44] font-bold border-b-2 border-[#008A44] pb-1 hover:text-amber-500 hover:border-amber-500 transition-all">
            View All Press Releases <ChevronRight size={20} />
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* 1. Featured Video Section (Occupies 2 columns on large screens) */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                src="https://www.youtube-nocookie.com/embed/M4o-bai6SxU?rel=0"
                title="Lagos APC Chairman"
                allowFullScreen
              ></iframe>
              {/* Custom Overlay (Shows before play) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none p-8 flex flex-col justify-end">
                <span className="bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-md w-fit mb-3">FEATURED VIDEO</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 italic">Building a Greater Lagos Together</h3>
                <p className="text-gray-300 text-sm max-w-lg">Pastor Cornelius Ojelabi outlines the strategic vision for the 2026-2027 political cycle.</p>
              </div>
            </div>
          </motion.div>

          {/* 2. News Feed Column */}
          <div className="space-y-8">
            {newsArticles.map((news, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 text-xs font-bold text-amber-600 mb-2 uppercase">
                  <Calendar size={14} />
                  {news.date}
                  <span className="text-gray-300">|</span>
                  <span className="text-[#008A44]">{news.category}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#008A44] transition-colors mb-2">
                  {news.title}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {news.desc}
                </p>
                <div className="mt-4 w-10 h-1 bg-gray-100 group-hover:w-20 group-hover:bg-amber-400 transition-all duration-300"></div>
              </motion.div>
            ))}
            
            <button className="w-full md:hidden bg-[#008A44] text-white py-4 rounded-xl font-bold">
              Read More News
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;