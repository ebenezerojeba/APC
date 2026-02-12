import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const Event = () => {
  // Official APC 2026 Congress & Convention Schedule
  const upcomingEvents = [
    {
      date: 'February 18, 2026',
      title: 'APC Ward Congresses (Lagos State)',
      desc: 'The fundamental step in electing party leadership across all 245 wards in Lagos State. A critical day for grassroots democracy.',
      location: 'Various Ward Secretariats, Lagos',
      time: '08:00 AM - 4:00 PM',
      type: 'Official'
    },
    {
      date: 'February 21, 2026',
      title: 'LGA Congresses & Delegate Elections',
      desc: 'Election of local government party officials and the selection of three delegates from each LGA for the National Convention.',
      location: 'APC LGA Party Secretariats',
      time: '09:00 AM - 5:00 PM',
      type: 'Official'
    },
    {
      date: 'March 3, 2026',
      title: 'Lagos State APC Congress',
      desc: 'Pastor Cornelius Ojelabi presides over the state-wide congress to elect the State Executive Committee at the Party Secretariat.',
      location: 'Acme Road, Ogba, Ikeja',
      time: '10:00 AM Prompt',
      type: 'Official'
    },
    {
      date: 'March 27 - 28, 2026',
      title: 'APC National Convention',
      desc: 'The grand finale in Abuja where national leaders are elected and the party’s direction for the 2027 general elections is ratified.',
      location: 'Eagle Square, Abuja (FCT)',
      time: 'Day & Night Session',
      type: 'National'
    }
  ];

  return (
    <section id="events" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-2 text-amber-500 font-bold uppercase tracking-widest mb-4">
            {/* <AlertCircle size={20} /> */}
            <span>2026 Political Timetable</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-emerald-800 mb-6 uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
            Upcoming <span className="text-gray-900">Milestones</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Participate in the democratic process that shapes the future of our party and our state.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col md:flex-row items-center justify-between gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Center Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-emerald-700 rounded-full -translate-x-1/2 z-10 hidden md:flex items-center justify-center shadow-lg">
                   <div className="w-2 h-2 bg-amber-400 rounded-full" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[45%]">
                  <motion.div
                    className="bg-white p-8 rounded-sm shadow-xl border-x-2 border-emerald-700 hover:shadow-2xl transition-all group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                        {event.type}
                      </span>
                      <span className="text-gray-400 text-sm font-bold">{event.date}</span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {event.desc}
                    </p>

                    <div className="space-y-3 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                        <MapPin size={18} className="text-amber-500" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                        <Clock size={18} className="text-amber-500" />
                        {event.time}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Date Side (Desktop only) */}
                <div className="hidden md:block w-[45%]">
                  <div className={`text-4xl font-black text-gray-200 uppercase ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    {event.date.split(',')[0]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Event;