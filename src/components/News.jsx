import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Newspaper, Play } from 'lucide-react';

const News = () => {
  const [playing, setPlaying] = useState(false);

  const newsArticles = [
    {
      date: 'Feb 10, 2026',
      category: 'Mobilization',
      title: 'Ojelabi Urges Unity at Lagos East Mega Rally',
      desc: 'Lagos APC Chairman, Pastor Cornelius Ojelabi, calls for internal cohesion and grassroots mobilization to consolidate the partys achievements.'
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
      desc: 'Official briefing confirming election schedules for all 20 LGAs and 37 LCDAs, emphasizing the party\'s commitment to grassroots democracy.'
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
              Latest From The <br /> <span className="text-gray-900">Secretariat</span>
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#008A44] font-bold border-b-2 border-[#008A44] pb-1 hover:text-amber-500 hover:border-amber-500 transition-all">
            View All Press Releases <ChevronRight size={20} />
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Featured Video */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/RFKid4BdQbg?rel=0&modestbranding=1${playing ? '&autoplay=1' : ''}`}
                title="Lagos APC Chairman"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Overlay — hides completely once user taps play */}
              {!playing && (
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 cursor-pointer"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }}
                  onClick={() => setPlaying(true)}
                >
                  {/* Play button — centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/60 hover:bg-white/30 transition-all">
                      <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Text — bottom, hidden on small screens when it would cover controls */}
                  <div className="hidden sm:block">
                    <span className="bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-md w-fit mb-3 inline-block">
                      FEATURED VIDEO
                    </span>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-2 italic">
                      Building a Greater Lagos Together
                    </h3>
                    <p className="text-gray-300 text-sm max-w-lg">
                      Pastor Cornelius Ojelabi outlines the strategic vision for the 2026-2027 political cycle.
                    </p>
                  </div>

                  {/* On mobile: just show the badge, no text blocking the video area */}
                  <div className="sm:hidden">
                    <span className="bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-md w-fit inline-block">
                      FEATURED VIDEO
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Caption below video on mobile (moved out of the overlay) */}
            <div className="sm:hidden mt-3 px-1">
              <h3 className="text-lg font-bold text-gray-900 italic">Building a Greater Lagos Together</h3>
              <p className="text-gray-500 text-sm mt-1">
                Pastor Cornelius Ojelabi outlines the strategic vision for the 2026-2027 political cycle.
              </p>
            </div>
          </motion.div>

          {/* News Feed */}
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
                <p className="text-gray-600 text-sm line-clamp-2">{news.desc}</p>
                <div className="mt-4 w-10 h-1 bg-gray-100 group-hover:w-20 group-hover:bg-amber-400 transition-all duration-300" />
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