// import React, { useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { MapPin, Clock, Calendar, Download } from 'lucide-react';

// // Extract data outside component to prevent recreation on every render
// const EVENTS_DATA = [
//   {
//     id: 'ward-congress',
//     date: '2026-02-18',
//     title: 'APC Ward Congresses (Lagos State)',
//     desc: 'The fundamental step in electing party leadership across all 245 wards in Lagos State. A critical day for grassroots democracy.',
//     location: 'Various Ward Secretariats, Lagos',
//     time: '10:00 AM - 4:00 PM',
//     type: 'Official'
//   },
//   {
//     id: 'lga-congress',
//     date: '2026-02-21',
//     title: 'LGA Congresses & Delegate Elections',
//     desc: 'Election of local government party officials and the selection of three delegates from each LGA for the National Convention.',
//     location: 'APC LGA Party Secretariats',
//     time: '10:00 AM - 5:00 PM',
//     type: 'Official'
//   },
//   {
//     id: 'state-congress',
//     date: '2026-03-03',
//     title: 'Lagos State APC Congress',
//     desc: 'Pastor Cornelius Ojelabi presides over the state-wide congress to elect the State Executive Committee at the Party Secretariat.',
//     location: 'Mobolaji Johnson Stadium, Lagos Island.',
//     time: '10:00 AM Prompt',
//     type: 'Official'
//   },
//   {
//     id: 'national-convention',
//     date: '2026-03-27',
//     dateEnd: '2026-03-28',
//     title: 'APC National Convention',
//     desc: 'The grand finale in Abuja where national leaders are elected and the party\'s direction for the 2027 general elections is ratified.',
//     location: 'Eagle Square, Abuja (FCT)',
//     time: 'Day & Night Session',
//     type: 'National'
//   }
// ];

// // Utility function to format dates
// const formatDisplayDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return new Intl.DateTimeFormat('en-US', {
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric'
//   }).format(date);
// };

// // Utility to get short date for timeline
// const getShortDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return new Intl.DateTimeFormat('en-US', {
//     month: 'short',
//     day: 'numeric'
//   }).format(date);
// };

// // Check if event is past
// const isPastEvent = (dateStr) => {
//   const eventDate = new Date(dateStr);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   return eventDate < today;
// };

// // Generate calendar download link
// const generateCalendarLink = (event) => {
//   const startDate = event.date.replace(/-/g, '');
//   const endDate = event.dateEnd ? event.dateEnd.replace(/-/g, '') : startDate;
//   const title = encodeURIComponent(event.title);
//   const description = encodeURIComponent(event.desc);
//   const location = encodeURIComponent(event.location);
  
//   return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;
// };

// const EventCard = ({ event, index }) => {
//   const isPast = isPastEvent(event.date);
//   const displayDate = formatDisplayDate(event.date);
//   const shortDate = getShortDate(event.date);
  
//   // Animation variants with reduced motion support
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6, delay: index * 0.1 }
//     }
//   };

//   return (
//     <motion.div
//       className={`relative flex flex-col md:flex-row items-center justify-between gap-8 ${
//         index % 2 === 0 ? 'md:flex-row-reverse' : ''
//       }`}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, margin: "-100px" }}
//       variants={cardVariants}
//     >
//       {/* Timeline Center Dot */}
//       <div 
//         className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-emerald-700 rounded-full -translate-x-1/2 z-10 hidden md:flex items-center justify-center shadow-lg"
//         aria-hidden="true"
//       >
//         <div className={`w-2 h-2 rounded-full ${isPast ? 'bg-gray-400' : 'bg-amber-400'}`} />
//       </div>

//       {/* Content Card */}
//       <div className="w-full md:w-[45%]">
//         <motion.article
//           className={`bg-white p-8 rounded-sm shadow-2xl transition-all group ${
//             isPast 
//               ? 'border-gray-300 opacity-75' 
//               : 'border-emerald-700 hover:shadow-2xl'
//           }`}
//           whileHover={!isPast ? { y: -5 } : {}}
//           role="article"
//           aria-label={`${event.title} on ${displayDate}`}
//         >
//           <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
//             <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
//               isPast 
//                 ? 'bg-gray-100 text-gray-500'
//                 : event.type === 'National'
//                   ? 'bg-amber-50 text-amber-700'
//                   : 'bg-emerald-50 text-emerald-700'
//             }`}>
//               {isPast ? 'Past' : event.type}
//             </span>
//             <time 
//               dateTime={event.date}
//               className="text-gray-400 text-sm font-bold"
//             >
//               {displayDate}
//             </time>
//           </div>
          
//           <h3 className={`text-2xl font-black text-gray-900 mb-4 transition-colors ${
//             !isPast && 'group-hover:text-emerald-700'
//           }`}>
//             {event.title}
//           </h3>
          
//           <p className="text-gray-600 mb-6 leading-relaxed">
//             {event.desc}
//           </p>

//           <div className="space-y-3 pt-6 border-t border-gray-100">
//             <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
//               <MapPin size={18} className="text-amber-500 shrink-0" aria-hidden="true" />
//               <span>{event.location}</span>
//             </div>
//             <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
//               <Clock size={18} className="text-amber-500 shrink-0" aria-hidden="true" />
//               <span>{event.time}</span>
//             </div>
//           </div>

//           {/* Add to Calendar Button */}
//           {!isPast && (
//             <div className="mt-6 pt-6 border-t border-gray-100">
//               <a
//                 href={generateCalendarLink(event)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wide hover:bg-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
//                 aria-label={`Add ${event.title} to calendar`}
//               >
//                 <Calendar size={16} aria-hidden="true" />
//                 Add to Calendar
//               </a>
//             </div>
//           )}
//         </motion.article>
//       </div>

//       {/* Date Side (Desktop only) */}
//       <div className="hidden md:block w-[45%]" aria-hidden="true">
//         <div className={`text-4xl font-black uppercase ${
//           index % 2 === 0 ? 'text-left' : 'text-right'
//         } ${isPast ? 'text-gray-100' : 'text-gray-200'}`}>
//           {shortDate}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const Event = () => {
//   const allEvents = EVENTS_DATA;

//   return (
//     <section 
//       id="events" 
//       className="py-24 bg-gray-50 overflow-hidden"
//       aria-labelledby="events-heading"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <motion.header
//           className="text-center mb-20"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="flex justify-center items-center gap-2 text-amber-500 font-bold uppercase tracking-widest mb-4">
//             <span>2026 Political Timetable</span>
//           </div>
//           <h2 
//             id="events-heading"
//             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-emerald-800 mb-6 uppercase" 
//             style={{ fontFamily: 'Impact, sans-serif' }}
//           >
//             Upcoming <span className="text-gray-900">Milestones</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Participate in the democratic process that shapes the future of our party and our state.
//           </p>
//         </motion.header>

//         <div className="relative">
//           {/* Vertical Timeline Line */}
//           <div 
//             className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden md:block" 
//             aria-hidden="true"
//           />

//           <div className="space-y-16">
//             {allEvents.map((event, index) => (
//               <EventCard 
//                 key={event.id} 
//                 event={event} 
//                 index={index}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Event;












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
    time: 'Day & Night Session',
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