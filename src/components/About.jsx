import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Briefcase, Heart, BookOpen, Users, MapPin, ChevronRight } from 'lucide-react';
import assets from '../assets/assets';

const About = () => {
  // 1. Array of images for the slideshow
  const slides = [assets.oj34, assets.oj26, assets.oj27, assets.oj21, assets.oj30, assets.oj32, assets.oj39, assets.oj30];
  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. Automatic slide transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Changes every 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);
  const achievements = [
    {
      icon: Users,
      title: 'Grassroots Impact', 
      stat: 'Local Governance',
      desc: 'Pioneered accessible healthcare and daycare centers during his tenure as Chairman of Ojo LG.'
    },
    {
      icon: Briefcase,
      title: 'State Transformation',
      stat: 'Rural Development',
      desc: 'Modernized neighborhood safety and expanded road networks across Lagos as State Commissioner.'
    },
    {
      icon: BookOpen,
      title: 'Human Capital',
      stat: 'Ojelabi Foundation',
      desc: 'Empowering the next generation through academic scholarships and regional sports championships.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Animated Slideshow Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#008A44]/10 rounded-full blur-3xl" />

            <div className="relative z-10 overflow-hidden rounded-4xl shadow-2xl border-8 border-white bg-gray-100 aspect-4/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={slides[currentSlide]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={`Pastor Cornelius Ojelabi - slide ${currentSlide + 1}`}
                />
              </AnimatePresence>

              {/* Progress Bars for Slides */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, idx) => (
                  <div key={idx} className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
                    {idx === currentSlide && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-white"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Experience Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden md:block z-30"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <p className="text-[#008A44] font-black text-3xl italic">25+</p>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-tight">Years of Public Service</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 text-[#008A44] font-bold uppercase tracking-widest mb-4">
              <div className="w-10 h-0.5 bg-[#008A44]"></div>
              <span>The People's Chairman</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Impact, sans-serif' }}>
              Meet Pastor <br />
              <span className="text-[#008A44]">Cornelius Ojelabi</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
              <p>
                A graduate of History and International Relations from LASU, Pastor Cornelius Ojelabi is a seasoned administrator who rose through the ranks—from a Sunday School teacher to a federal lawmaker and Lagos State Commissioner.
              </p>
              <p>
                As the State Chairman of the APC, he is the <strong>"manager of men"</strong> tasked with unifying the party and driving the Renewed Hope agenda across Lagos.
              </p>
            </div>

            {/* Achievement Grid */}

            <div className="grid gap-6">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }} // Staggered entry
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
                  }}
                  className="group flex gap-6 p-6 rounded-3xl bg-gray-50/50 border border-gray-100 transition-all duration-300 cursor-default"
                >
                  <div className="relative">
                    {/* <div className="w-16 h-16 bg-[#008A44] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                      <item.icon size={30} />
                    </div> */}
                    {/* Decorative dot */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008A44] mb-1">
                      {item.stat}
                    </span>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;