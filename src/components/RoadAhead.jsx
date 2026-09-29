import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';

import { TIMETABLE, TRACKS, POLL_DATES, TIMETABLE_META } from '../data/electionTimetable';
import SectionLabel from './SectionLabel';

const FILTERS = [{ id: 'all', label: 'All activities' }, ...Object.entries(TRACKS).map(([id, label]) => ({ id, label }))];

const TRACK_STYLE = {
  general: 'text-white/45',
  presidential: 'text-[#4ADE80]',
  governorship: 'text-[#D4A574]',
};

const RoadAhead = () => {
  const [filter, setFilter] = useState('all');

  const rows = useMemo(
    () => (filter === 'all' ? TIMETABLE : TIMETABLE.filter((e) => e.track === filter)),
    [filter],
  );

  return (
    <section id="road-ahead" className="bg-[#04100A] py-20 sm:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">

        <SectionLabel tone="gold" className="mb-10 sm:mb-14">
          The Road Ahead
        </SectionLabel>

        <div className="lg:flex lg:gap-16">
          {/* Poll dates, lifted out of the table because they are the two
              dates everything else is counting down to. */}
          <div className="lg:w-[34%] lg:shrink-0">
            <p
              className="font-black leading-[0.82] text-white"
              style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                fontSize: 'clamp(4rem, 13vw, 9rem)',
              }}
            >
              2027
            </p>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-white/70">
              General Election
            </p>

            <dl className="mt-9 border-t border-white/12">
              {POLL_DATES.map((p) => (
                <div key={p.track} className="border-b border-white/12 py-5">
                  <dt className={`text-[10px] font-bold uppercase tracking-[0.2em] ${TRACK_STYLE[p.track]}`}>
                    {TRACKS[p.track]}
                  </dt>
                  <dd className="mt-1.5 text-xl font-bold text-white sm:text-2xl">{p.date}</dd>
                  <dd className="mt-0.5 text-xs uppercase tracking-[0.18em] text-white/40">
                    Polling day
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={TIMETABLE_META.fileUrl}
              download={TIMETABLE_META.fileName}
              className="mt-8 inline-flex min-h-11 items-center gap-2 border border-white/25 px-6 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-white outline-none transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#0b0b0b] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04100A] sm:text-[11px]"
            >
              <Download size={14} />
              Download timetable
            </a>

            <p className="mt-6 text-[11px] leading-relaxed text-white/30">
              Source: {TIMETABLE_META.source}. Dates are as published and are subject to revision
              by the Commission.
            </p>
          </div>

          {/* The timetable */}
          <div className="mt-12 min-w-0 flex-1 lg:mt-0">
            <div
              role="group"
              aria-label="Filter timetable by election"
              className="flex flex-wrap gap-2"
            >
              {FILTERS.map(({ id, label }) => {
                const active = filter === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFilter(id)}
                    aria-pressed={active}
                    className={`min-h-11 px-4 text-[10px] font-bold uppercase tracking-[0.16em] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04100A] ${
                      active
                        ? 'bg-[#D4A574] text-[#111]'
                        : 'border border-white/15 text-white/55 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <ol className="mt-7 border-t border-white/12">
              {rows.map((e, i) => (
                <li
                  key={`${e.date}-${e.track}-${i}`}
                  className={`flex flex-col gap-1.5 border-b border-white/12 py-5 sm:flex-row sm:gap-7 ${
                    e.isPoll ? 'bg-white/[0.03]' : ''
                  }`}
                >
                  <div className="sm:w-52 sm:shrink-0">
                    <p
                      className={`text-sm font-bold tabular-nums ${
                        e.isPoll ? 'text-[#D4A574]' : 'text-white'
                      }`}
                    >
                      {e.date}
                    </p>
                    <p className={`mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${TRACK_STYLE[e.track]}`}>
                      {TRACKS[e.track]}
                    </p>
                  </div>

                  <p className="min-w-0 flex-1 text-sm leading-relaxed text-white/70">
                    {e.activity}
                    {/* The source sentence stops here; not completed on their behalf. */}
                    {e.truncatedInSource && (
                      <span className="ml-1 text-white/30" title="Text is incomplete in the source document">
                        […]
                      </span>
                    )}
                    {e.isPoll && (
                      <span className="ml-2 inline-block border border-[#D4A574]/50 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#D4A574]">
                        Poll
                      </span>
                    )}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadAhead;
