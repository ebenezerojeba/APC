import { Star } from 'lucide-react';
import { RALLIES, ZONES, toDate } from '../../data/campaign';
import { daysUntil, fmt, useNow } from './dates';
import SectionLabel from '../SectionLabel';

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };
const STOPS = RALLIES.filter((r) => r.president);

/*
  The twelve stops with the President, as one horizontal route. The gap
  between stops (in days) sits on the connector, which is the figure the
  original itinerary table was built around.
*/
const PresidentialTour = () => {
  const now = useNow();
  const nextIdx = STOPS.findIndex((s) => daysUntil(s.date, now) >= 0);

  return (
    <section id="presidential-tour" className="overflow-hidden bg-[#0B1F14] py-20 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">
        <SectionLabel tone="gold" className="mb-6">Presidential Visibility Itinerary</SectionLabel>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="uppercase leading-[0.9] text-white" style={{ ...BEBAS, fontSize: 'clamp(2.75rem, 7vw, 5rem)' }}>
            On Tour With <span className="text-[#D4A574]">The President</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-white/55">
            Twelve rallies, every geopolitical zone, from the flag-off in Kaduna to the closing rally in Lagos.
          </p>
        </div>
      </div>

      <div className="mt-12 overflow-x-auto pb-4 [scrollbar-width:thin]" tabIndex={0} aria-label="Presidential rally stops, scroll sideways">
        <ol className="flex w-max gap-0 px-5 sm:px-8 lg:px-20">
          {STOPS.map((s, i) => {
            const past = nextIdx === -1 || i < nextIdx;
            const isNext = i === nextIdx;
            const gap = i > 0 ? daysUntil(s.date, toDate(STOPS[i - 1].date)) : null;
            return (
              <li key={s.no} className="flex items-start">
                {gap !== null && (
                  <div className="flex w-16 flex-col items-center pt-[22px] sm:w-24">
                    <span className={`h-px w-full ${past || isNext ? 'bg-[#D4A574]' : 'border-t border-dashed border-white/25'}`} />
                    <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">{gap} days</span>
                  </div>
                )}
                <div className={`w-40 sm:w-44 ${past ? 'opacity-50' : ''}`}>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${
                      isNext
                        ? 'animate-pulse border-[#D4A574] bg-[#D4A574] text-[#111]'
                        : past
                          ? 'border-[#D4A574] bg-[#D4A574]/20 text-[#D4A574]'
                          : 'border-white/25 text-white/60'
                    }`}
                  >
                    <Star size={16} className="fill-current" />
                  </span>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                    {fmt(s.date, { weekday: 'short', day: 'numeric', month: 'short' })}
                  </p>
                  <p className="mt-1 leading-none text-white" style={{ ...BEBAS, fontSize: '1.9rem' }}>{s.city}</p>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ZONES[s.zone].colour }} />
                    {ZONES[s.zone].label}
                  </p>
                  {s.note && <p className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#D4A574]">{s.note}</p>}
                  {isNext && <p className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#4ADE80]">Next stop</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default PresidentialTour;
