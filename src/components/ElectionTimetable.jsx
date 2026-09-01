import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Timetable data (INEC 2027 General Election) ──────────────────────────
const EVENTS = [
  { date: '2026-02-11', label: '11 Feb 2026', activity: 'Notice of Election', track: 'general' },
  { date: '2026-04-01', label: '1–21 Apr 2026', activity: "Submission of Political Parties' Register to the Commission", track: 'general' },
  { date: '2026-04-23', label: '23 Apr – 30 May 2026', activity: 'Conduct of Party Primaries and Resolution of Disputes', track: 'general' },
  { date: '2026-06-27', label: '27 Jun – 11 Jul 2026', activity: 'Submission of Forms EC9, EC9A, 9B and 9E on online nomination portal', track: 'presidential' },
  { date: '2026-07-18', label: '18 Jul – 8 Aug 2026', activity: 'Submission of Forms EC9, EC9A, 9B and 9E on online nomination portal', track: 'governorship' },
  { date: '2026-08-01', label: '1 Aug 2026', activity: 'Publication of Personal Particulars of Candidates (EC9) by the Commission', track: 'presidential' },
  { date: '2026-08-19', label: '19 Aug 2026', activity: 'Commencement of Campaign by Political Parties in Public', track: 'presidential' },
  { date: '2026-08-22', label: '22 Aug 2026', activity: 'Last day for withdrawal/replacement of candidate(s) by Political Parties', track: 'presidential' },
  { date: '2026-08-29', label: '29 Aug 2026', activity: 'Publication of Personal Particulars of Candidates (EC9) by the Commission', track: 'governorship' },
  { date: '2026-08-29', label: '29 Aug 2026', activity: 'Last day for submission of Nomination Forms (EC13A–13D)', track: 'presidential' },
  { date: '2026-09-09', label: '9 Sep 2026', activity: 'Commencement of Campaign by Political Parties', track: 'governorship' },
  { date: '2026-09-12', label: '12 Sep 2026', activity: 'Publication of final list of nominated candidates by the Commission', track: 'presidential' },
  { date: '2026-09-19', label: '19 Sep 2026', activity: 'Last day for withdrawal/replacement of candidate(s) by Political Parties', track: 'governorship' },
  { date: '2026-09-26', label: '26 Sep 2026', activity: 'Last day for submission of Nomination Forms (EC13A–13E) by Political Parties', track: 'governorship' },
  { date: '2026-10-10', label: '10 Oct 2026', activity: 'Publication of final list of nominated candidates by the Commission', track: 'governorship' },
  { date: '2026-12-10', label: '10 Dec 2026', activity: 'Last day for submission of names of polling agents to the Electoral Officer', track: 'presidential' },
  { date: '2026-12-15', label: '15 Dec 2026', activity: 'Publication of the official register of voters by the Commission', track: 'general' },
  { date: '2026-12-29', label: '29 Dec 2026', activity: 'Publication of Notice of Poll by the Commission', track: 'general' },
  { date: '2027-01-06', label: '6 Jan 2027', activity: 'Last day for submission of names of polling agents to the Electoral Officer', track: 'governorship' },
  { date: '2027-01-14', label: '14 Jan 2027', activity: 'Last day of Campaign by Political Parties', track: 'presidential' },
  { date: '2027-01-16', label: '16 Jan 2027', activity: 'Date of Election', track: 'presidential', milestone: true },
  { date: '2027-02-04', label: '4 Feb 2027', activity: 'Last day for campaigns by Political Parties', track: 'governorship' },
  { date: '2027-02-06', label: '6 Feb 2027', activity: 'Date of Election', track: 'governorship', milestone: true },
];

const TRACKS = {
  all: { label: 'All Events', color: '#f0b93a' },
  general: { label: 'General', color: '#f0b93a' },
  presidential: { label: 'Presidential & National Assembly', color: '#008A44' },
  governorship: { label: 'Governorship & State Assembly', color: '#2563eb' },
};

const TODAY = new Date(); // swap for a fixed Date if you want a static "as of" snapshot

const ElectionTimetable = () => {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(
    () => (filter === 'all' ? EVENTS : EVENTS.filter((e) => e.track === filter || e.track === 'general')),
    [filter]
  );

  return (
    <section id="timetable" className="relative bg-[#030f06] py-20 sm:py-28 overflow-hidden">
      {/* Ambient accent, consistent with hero */}
      <div className="absolute top-0 right-[10%] w-72 h-72 bg-[#008A44]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <span className="text-amber-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]">
            Roadmap to 2027
          </span>
          <h2
            className="text-white font-black uppercase mt-2 leading-[0.9]"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: 'clamp(2rem, 6vw, 3.75rem)' }}
          >
            Election Timetable
          </h2>
          <p className="text-white/50 mt-3 max-w-xl text-sm sm:text-base">
            Key dates on the Independent National Electoral Commission's calendar for the 2027 general election.
          </p>
        </div>

        {/* Track filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Object.entries(TRACKS)
            .filter(([key]) => key !== 'general')
            .map(([key, { label, color }]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-colors"
                style={
                  filter === key
                    ? { backgroundColor: color, borderColor: color, color: '#030f06' }
                    : { borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }
                }
              >
                {label}
              </button>
            ))}
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-8">
          <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-white/10" />

          <AnimatePresence mode="popLayout">
            {filtered.map((event, i) => {
              const eventDate = new Date(event.date);
              const isPast = eventDate < TODAY;
              const trackColor = TRACKS[event.track].color;

              return (
                <motion.div
                  key={`${event.date}-${event.activity}`}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.02 }}
                  className="relative pb-8 last:pb-0"
                >
                  {/* Node */}
                  <span
                    className="absolute -left-6 sm:-left-8 top-1 w-3.5 h-3.5 rounded-full border-2 border-[#030f06]"
                    style={{ backgroundColor: isPast ? 'rgba(255,255,255,0.25)' : trackColor }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wide shrink-0 sm:w-40"
                      style={{ color: isPast ? 'rgba(255,255,255,0.35)' : '#f0b93a' }}
                    >
                      {event.label}
                    </span>
                    <p className={`text-sm sm:text-base leading-snug ${isPast ? 'text-white/35' : 'text-white/85'}`}>
                      {event.activity}
                      {event.milestone && (
                        <span
                          className="ml-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase align-middle"
                          style={{ backgroundColor: trackColor, color: '#030f06' }}
                        >
                          Election Day
                        </span>
                      )}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ElectionTimetable;