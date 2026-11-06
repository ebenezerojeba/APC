import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin } from 'lucide-react';

import { POLLS, RALLIES, LAGOS_ITINERARY, ZONES } from '../data/campaign';
import { daysUntil, fmt, relative, useNow } from './campaign/dates';
import Countdown from './campaign/Countdown';
import SectionLabel from './SectionLabel';

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };

/*
  Home-page teaser for /campaign: the countdown, the next national rally and
  the next few Lagos engagements. Everything is worked out from today's date,
  so it never needs editing as the weeks pass.
*/
const CampaignTrail = () => {
  const now = useNow();
  const poll = POLLS.find((p) => daysUntil(p.date, now) >= 0) || POLLS.at(-1);
  const upcoming = RALLIES.filter((r) => daysUntil(r.date, now) >= 0).slice(0, 4);
  const held = RALLIES.length - RALLIES.filter((r) => daysUntil(r.date, now) >= 0).length;
  const lagos = LAGOS_ITINERARY.filter((e) => daysUntil(e.date, now) >= 0 && e.kind !== 'poll').slice(0, 3);

  return (
    <section id="campaign" className="relative isolate overflow-hidden bg-[#04100A] py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(55% 60% at 100% 0%, rgba(0,138,68,0.3), transparent 70%)' }}
      />
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">
        <SectionLabel tone="gold" className="mb-6">Campaign 2027</SectionLabel>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="uppercase leading-[0.86] text-white" style={{ ...BEBAS, fontSize: 'clamp(3rem, 9vw, 7rem)' }}>
              The Road
              <br />
              <span className="text-[#4ADE80]">To Victory</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
              {RALLIES.length} rallies across all 36 States and the FCT, and a ward-by-ward push across Lagos.
              {held > 0 && ` ${held} held so far.`}
            </p>

            <p className="mt-9 text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A574]">
              {poll.short} election · {fmt(poll.date, { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <Countdown iso={poll.date} className="mt-4" />

            <Link
              to="/campaign"
              className="group mt-10 inline-flex min-h-12 items-center gap-3 bg-[#D4A574] px-7 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#0b0b0b] transition-colors hover:bg-white"
            >
              Follow the campaign
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="space-y-8">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Next presidential campaign rallies</p>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {upcoming.map((r, i) => (
                  <li key={r.no} className="flex items-center gap-4 py-3.5">
                    <span className="h-8 w-1 shrink-0" style={{ backgroundColor: ZONES[r.zone].colour }} />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 font-black uppercase text-white">
                        {r.city}
                        {r.president && <Star size={13} className="fill-[#D4A574] text-[#D4A574]" aria-label="With the President" />}
                      </p>
                      <p className="text-xs text-white/45">{fmt(r.date, { weekday: 'short', day: 'numeric', month: 'short' })} · {ZONES[r.zone].label}</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.14em] ${i === 0 ? 'text-[#4ADE80]' : 'text-white/40'}`}>
                      {relative(daysUntil(r.date, now))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {lagos.length > 0 && (
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Coming up in Lagos</p>
                <ul className="space-y-2">
                  {lagos.map((e) => (
                    <li key={`${e.date}-${e.title}`} className="border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#D4A574]">
                        {fmt(e.date, { weekday: 'short', day: 'numeric', month: 'short' })} · {e.time}
                      </p>
                      <p className="mt-1 font-bold leading-snug text-white">{e.title}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-white/45">
                        <MapPin size={12} /> {e.venue}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignTrail;
