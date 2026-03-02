

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