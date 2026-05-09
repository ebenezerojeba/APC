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
    location: 'Mobolaji Johnson Arena, Onikan Lagos',
    time: '10:00 AM Prompt',
    type: 'Official',
    typeColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'southwest-zone-congress',
    date: '2026-03-25',
    title: 'Southwest Zone Congress',
    subtitle: 'Zonal Executive Committee',
    desc: 'Delegates across the zone gather to elect the Zonal Executive Committee and strengthen party structure at the zonal level.',
    location: 'Mobolaji Johnson Arena, Onikan Lagos',
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
  },
  {
    id: 'notice-election',
    date: '2026-04-20',
    title: 'Notice of Election to State Chapters',
    subtitle: 'Revised 2027 Timetable',
    desc: 'Formal notice of election issued to all APC State Chapters in accordance with the Constitution of the Federal Republic of Nigeria 1999 (as amended) and the Electoral Act 2026.',
    location: 'APC National Secretariat, Buhari House, Abuja',
    time: 'All Day',
    type: 'National',
    typeColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'sale-of-forms',
    date: '2026-04-25',
    dateEnd: '2026-05-02',
    title: 'Sale of Forms',
    subtitle: 'APC National Secretariat',
    desc: 'Sale of Expression of Interest and Nomination forms for all elective positions — House of Assembly, House of Representatives, Senate, Governorship, and Presidential — at the APC National Secretariat.',
    location: 'APC National Secretariat, Abuja',
    time: 'Business Hours',
    type: 'National',
    typeColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'form-submission',
    date: '2026-05-04',
    title: 'Last Day for Form Submission',
    subtitle: 'Completed Forms & Documents',
    desc: 'Deadline for submission of all completed nomination forms and accompanying documents to the APC National Secretariat.',
    location: 'APC National Secretariat, Abuja',
    time: 'End of Business Day',
    type: 'Deadline',
    typeColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'screening-aspirants',
    date: '2026-05-06',
    dateEnd: '2026-05-08',
    title: 'Screening of Aspirants',
    subtitle: 'State Assembly, Reps, Senate, Governorship',
    desc: 'Screening of aspirants for State House of Assembly, House of Representatives, Senate, and Governorship positions from Wednesday 6th to Friday 8th May. Presidential screening holds Saturday 9th May.',
    location: 'APC National Secretariat, Abuja',
    time: '9:00 AM',
    type: 'Screening',
    typeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'screening-presidential',
    date: '2026-05-09',
    title: 'Screening of Presidential Aspirants',
    subtitle: 'Presidential Aspirants',
    desc: 'Screening of all Presidential aspirants at the APC National Secretariat, Abuja.',
    location: 'APC National Secretariat, Abuja',
    time: '9:00 AM',
    type: 'Screening',
    typeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'screening-results',
    date: '2026-05-11',
    title: 'Publication of Screening Results',
    subtitle: 'All Positions',
    desc: 'Publication of screening results for all categories: State House of Assembly, House of Representatives, Senate, Governorship, and Presidential aspirants.',
    location: 'APC National Secretariat, Abuja',
    time: 'All Day',
    type: 'National',
    typeColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'screening-appeals',
    date: '2026-05-12',
    dateEnd: '2026-05-13',
    title: 'Screening Appeals',
    subtitle: 'All Categories',
    desc: 'Window for screening appeals for all positions — State House of Assembly, House of Representatives, Senate, Governorship, and Presidential.',
    location: 'APC National Secretariat, Abuja',
    time: '9:00 AM – 5:00 PM',
    type: 'Deadline',
    typeColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'primary-house-reps',
    date: '2026-05-15',
    title: 'Primary Election — House of Representatives',
    subtitle: 'Across All Federal Constituencies',
    desc: 'Conduct of primary elections for APC House of Representatives candidates across all federal constituencies nationwide.',
    location: 'Federal Constituencies Nationwide',
    time: '9:00 AM',
    type: 'Primary',
    typeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'primary-senate',
    date: '2026-05-18',
    title: 'Primary Election — Senate',
    subtitle: 'Senatorial Districts Nationwide',
    desc: 'Conduct of APC primary elections for Senate candidates across all 109 senatorial districts. Election appeals for House of Representatives also begin today.',
    location: 'Senatorial Districts Nationwide',
    time: '9:00 AM',
    type: 'Primary',
    typeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'primary-state-assembly',
    date: '2026-05-20',
    title: 'Primary Election — State House of Assembly',
    subtitle: 'State Constituencies Nationwide',
    desc: 'Conduct of APC primary elections for State House of Assembly candidates across all states. Senate election appeals also hold today.',
    location: 'State Constituencies Nationwide',
    time: '9:00 AM',
    type: 'Primary',
    typeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'primary-governorship',
    date: '2026-05-21',
    title: 'Primary Election — Governorship',
    subtitle: 'All APC States',
    desc: 'Governorship primary elections across APC-controlled states. State House of Assembly election appeals also hold today.',
    location: 'State Party Secretariats Nationwide',
    time: '9:00 AM',
    type: 'Primary',
    typeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'primary-presidential',
    date: '2026-05-23',
    title: 'Primary Election — Presidential',
    subtitle: 'APC Presidential Primary',
    desc: "The pinnacle of the party's primary process — election of the APC Presidential candidate ahead of the 2027 General Elections. Governorship election appeals also hold today.",
    location: 'TBC — Abuja, FCT',
    time: '10:00 AM',
    type: 'Primary',
    typeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'appeal-presidential',
    date: '2026-05-25',
    title: 'Presidential Election Appeal',
    subtitle: 'Final Appeals Window',
    desc: 'Last window for appeals arising from the Presidential primary election.',
    location: 'APC National Secretariat, Abuja',
    time: 'End of Business Day',
    type: 'Deadline',
    typeColor: 'bg-red-100 text-red-700',
  },
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