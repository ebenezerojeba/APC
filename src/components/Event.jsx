import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, CheckCircle2, Circle } from 'lucide-react';

const EVENTS_DATA = [
  {
    id: 'ward-congress',
    date: '2026-02-18',
    title: 'APC Ward Congresses',
    subtitle: 'Lagos State — All 245 Wards',
    desc: 'The fundamental step in electing party leadership across all 245 wards in Lagos State. A critical day for grassroots democracy.',
    location: 'Various Ward Secretariats, Lagos',
    time: '10:00 AM – 4:00 PM',
    type: 'Official',
    typeColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'lga-congress',
    date: '2026-02-21',
    title: 'LGA Congresses',
    subtitle: 'Delegate Elections',
    desc: 'Election of local government party officials and selection of three delegates from each LGA for the National Convention.',
    location: 'APC LGA Party Secretariats',
    time: '10:00 AM – 5:00 PM',
    type: 'Official',
    typeColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'state-congress',
    date: '2026-03-03',
    title: 'Lagos State APC Congress',
    subtitle: 'State Executive Committee',
    desc: 'Pastor Cornelius Ojelabi presides over the state-wide congress to elect the State Executive Committee.',
    location: 'Mobolaji Johnson Stadium, Lagos Island',
    time: '10:00 AM Prompt',
    type: 'Official',
    typeColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'national-convention',
    date: '2026-03-27',
    dateEnd: '2026-03-28',
    title: 'APC National Convention',
    subtitle: 'Eagle Square, Abuja',
    desc: "The grand finale in Abuja where national leaders are elected and the party's direction for the 2027 general elections is ratified.",
    location: 'Eagle Square, Abuja (FCT)',
    time: '11:00 AM',
    type: 'National',
    typeColor: 'bg-amber-100 text-amber-700',
  }
];

const isPast = (dateStr) => {
  const d = new Date(dateStr);
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return d < t;
};

const formatDate = (dateStr) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(dateStr));

const formatShort = (dateStr) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(dateStr));

const calLink = (e) => {
  const s = e.date.replace(/-/g, '');
  const end = e.dateEnd ? e.dateEnd.replace(/-/g, '') : s;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.title)}&dates=${s}/${end}&details=${encodeURIComponent(e.desc)}&location=${encodeURIComponent(e.location)}`;
};

const EventCard = ({ event, index }) => {
  const past = isPast(event.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex gap-6 ${past ? 'opacity-50' : ''}`}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
          past 
            ? 'border-gray-300 bg-white' 
            : 'border-[#008A44] bg-white group-hover:bg-[#008A44]'
        }`}>
          {past 
            ? <CheckCircle2 size={18} className="text-gray-300" />
            : <Circle size={14} className="text-[#008A44] group-hover:text-white transition-colors" />
          }
        </div>
        {index < EVENTS_DATA.length - 1 && (
          <div className={`w-px flex-1 mt-3 ${past ? 'bg-gray-200' : 'bg-gray-200'}`} style={{ minHeight: '40px' }} />
        )}
      </div>

      {/* Card */}
      <div className={`flex-1 pb-10 rounded-none`}>
        {/* Date */}
        <time className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 block">
          {formatDate(event.date)}{event.dateEnd ? ` – ${formatDate(event.dateEnd)}` : ''}
        </time>

        <div className={`relative bg-white border-2 rounded-3xl p-7 shadow-sm transition-all duration-300 overflow-hidden ${
          past 
            ? 'border-gray-100' 
            : 'border-gray-100 group-hover:border-[#008A44]/30 group-hover:shadow-lg group-hover:shadow-[#008A44]/5'
        }`}>
          {/* Left accent bar */}
          {!past && (
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#008A44] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          )}

          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 ${
                past ? 'bg-gray-100 text-gray-400' : event.typeColor
              }`}>
                {past ? 'Completed' : event.type}
              </span>
              <h3 className="text-xl font-black text-gray-900 leading-tight">{event.title}</h3>
              <p className="text-[#008A44] font-bold text-sm mt-0.5">{event.subtitle}</p>
            </div>
            {/* Large ghost date */}
            <span 
              className="text-5xl font-black text-gray-100 leading-none hidden sm:block select-none shrink-0"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {formatShort(event.date)}
            </span>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-6">{event.desc}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <MapPin size={14} className="text-amber-500" />
              {event.location}
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <Clock size={14} className="text-amber-500" />
              {event.time}
            </div>
          </div>

          {!past && (
            <div className="mt-5">
              <a
                href={calLink(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-[#008A44] text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                {/* <Calendar size={13} /> */}
                Add to Calendar
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Event = () => (
  <section id="events" className="py-28 bg-gray-50 overflow-hidden" aria-labelledby="events-heading">
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-[#008A44]" />
          <span className="text-[#008A44] text-[10px] font-black uppercase tracking-[0.35em]">2026 Political Timetable</span>
        </div>
        <h2 
          id="events-heading"
          className="text-[clamp(3rem,8vw,6rem)] font-black text-gray-900 leading-[0.95] uppercase mb-6"
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
        >
          Upcoming <br />
          <span className="text-[#008A44]">Milestones</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
          Participate in the democratic process that shapes the future of our party and our state.
        </p>
      </motion.div>

      {/* Timeline */}
      <div>
        {EVENTS_DATA.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Event;