import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Download } from 'lucide-react';

// Extract data outside component to prevent recreation on every render
const EVENTS_DATA = [
  {
    id: 'ward-congress',
    date: '2026-02-18',
    title: 'APC Ward Congresses (Lagos State)',
    desc: 'The fundamental step in electing party leadership across all 245 wards in Lagos State. A critical day for grassroots democracy.',
    location: 'Various Ward Secretariats, Lagos',
    time: '08:00 AM - 4:00 PM',
    type: 'Official'
  },
  {
    id: 'lga-congress',
    date: '2026-02-21',
    title: 'LGA Congresses & Delegate Elections',
    desc: 'Election of local government party officials and the selection of three delegates from each LGA for the National Convention.',
    location: 'APC LGA Party Secretariats',
    time: '09:00 AM - 5:00 PM',
    type: 'Official'
  },
  {
    id: 'state-congress',
    date: '2026-03-03',
    title: 'Lagos State APC Congress',
    desc: 'Pastor Cornelius Ojelabi presides over the state-wide congress to elect the State Executive Committee at the Party Secretariat.',
    location: 'Acme Road, Ogba, Ikeja',
    time: '10:00 AM Prompt',
    type: 'Official'
  },
  {
    id: 'national-convention',
    date: '2026-03-27',
    dateEnd: '2026-03-28',
    title: 'APC National Convention',
    desc: 'The grand finale in Abuja where national leaders are elected and the party\'s direction for the 2027 general elections is ratified.',
    location: 'Eagle Square, Abuja (FCT)',
    time: 'Day & Night Session',
    type: 'National'
  }
];

// Utility function to format dates
const formatDisplayDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Utility to get short date for timeline
const getShortDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Check if event is past
const isPastEvent = (dateStr) => {
  const eventDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
};

// Generate calendar download link
const generateCalendarLink = (event) => {
  const startDate = event.date.replace(/-/g, '');
  const endDate = event.dateEnd ? event.dateEnd.replace(/-/g, '') : startDate;
  const title = encodeURIComponent(event.title);
  const description = encodeURIComponent(event.desc);
  const location = encodeURIComponent(event.location);
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;
};

const EventCard = ({ event, index }) => {
  const isPast = isPastEvent(event.date);
  const displayDate = formatDisplayDate(event.date);
  const shortDate = getShortDate(event.date);
  
  // Animation variants with reduced motion support
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-center justify-between gap-8 ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
    >
      {/* Timeline Center Dot */}
      <div 
        className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-emerald-700 rounded-full -translate-x-1/2 z-10 hidden md:flex items-center justify-center shadow-lg"
        aria-hidden="true"
      >
        <div className={`w-2 h-2 rounded-full ${isPast ? 'bg-gray-400' : 'bg-amber-400'}`} />
      </div>

      {/* Content Card */}
      <div className="w-full md:w-[45%]">
        <motion.article
          className={`bg-white p-8 rounded-sm shadow-2xl transition-all group ${
            isPast 
              ? 'border-gray-300 opacity-75' 
              : 'border-emerald-700 hover:shadow-2xl'
          }`}
          whileHover={!isPast ? { y: -5 } : {}}
          role="article"
          aria-label={`${event.title} on ${displayDate}`}
        >
          <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
            <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
              isPast 
                ? 'bg-gray-100 text-gray-500'
                : event.type === 'National'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-emerald-50 text-emerald-700'
            }`}>
              {isPast ? 'Past' : event.type}
            </span>
            <time 
              dateTime={event.date}
              className="text-gray-400 text-sm font-bold"
            >
              {displayDate}
            </time>
          </div>
          
          <h3 className={`text-2xl font-black text-gray-900 mb-4 transition-colors ${
            !isPast && 'group-hover:text-emerald-700'
          }`}>
            {event.title}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {event.desc}
          </p>

          <div className="space-y-3 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
              <MapPin size={18} className="text-amber-500 shrink-0" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
              <Clock size={18} className="text-amber-500 shrink-0" aria-hidden="true" />
              <span>{event.time}</span>
            </div>
          </div>

          {/* Add to Calendar Button */}
          {!isPast && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <a
                href={generateCalendarLink(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wide hover:bg-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label={`Add ${event.title} to calendar`}
              >
                <Calendar size={16} aria-hidden="true" />
                Add to Calendar
              </a>
            </div>
          )}
        </motion.article>
      </div>

      {/* Date Side (Desktop only) */}
      <div className="hidden md:block w-[45%]" aria-hidden="true">
        <div className={`text-4xl font-black uppercase ${
          index % 2 === 0 ? 'text-left' : 'text-right'
        } ${isPast ? 'text-gray-100' : 'text-gray-200'}`}>
          {shortDate}
        </div>
      </div>
    </motion.div>
  );
};

const Event = () => {
  const allEvents = EVENTS_DATA;

  return (
    <section 
      id="events" 
      className="py-24 bg-gray-50 overflow-hidden"
      aria-labelledby="events-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.header
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center items-center gap-2 text-amber-500 font-bold uppercase tracking-widest mb-4">
            <span>2026 Political Timetable</span>
          </div>
          <h2 
            id="events-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-emerald-800 mb-6 uppercase" 
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            Upcoming <span className="text-gray-900">Milestones</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Participate in the democratic process that shapes the future of our party and our state.
          </p>
        </motion.header>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden md:block" 
            aria-hidden="true"
          />

          <div className="space-y-16">
            {allEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;