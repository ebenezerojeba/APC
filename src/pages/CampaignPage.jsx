import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Star } from 'lucide-react';

import { RALLIES } from '../data/campaign';
import { daysUntil, fmt, useNow } from '../components/campaign/dates';
import PollCountdowns from '../components/campaign/PollCountdowns';
import RallyTracker from '../components/campaign/RallyTracker';
import PresidentialTour from '../components/campaign/PresidentialTour';
import LagosTrail from '../components/campaign/LagosTrail';
import RallyGuidelines from '../components/campaign/RallyGuidelines';
import PromiseTeaser from '../components/campaign/PromiseTeaser';
import LagosMark from '../components/LagosMark';
import SectionLabel from '../components/SectionLabel';

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };
const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const SECTIONS = [
  ['lagos-promise', 'The Lagos PROMISE'],
  ['rallies', 'Nationwide rallies'],
  ['presidential-tour', 'Presidential tour'],
  ['lagos-trail', 'Lagos itinerary'],
  ['rally-guidelines', 'Rally guidelines'],
];

const CampaignPage = () => {
  const now = useNow();
  const nextRally = RALLIES.find((r) => daysUntil(r.date, now) >= 0);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Campaign 2027 | APC Lagos';
    return () => { document.title = prev; };
  }, []);

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#04100A] pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              'radial-gradient(60% 50% at 85% 20%, rgba(0,138,68,0.35), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(212,165,116,0.18), transparent 70%)',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 bottom-0 -z-10 select-none leading-[0.75] text-white/[0.035]"
          style={{ ...BEBAS, fontSize: 'clamp(12rem, 34vw, 30rem)' }}
        >
          2027
        </span>

        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">
          <SectionLabel as="p" tone="gold" className="mb-6">Campaign 2027 · Renewed Hope</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="uppercase leading-[0.85] text-white"
            style={{ ...BEBAS, fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
          >
            On The
            <br />
            <span className="text-[#4ADE80]">Campaign Trail</span>
          </motion.h1>

          <div className="mt-10 grid gap-10 2xl:grid-cols-[1fr_auto] 2xl:items-end">
            <div>
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Countdown to the polls</p>
              <PollCountdowns layout="row" />
            </div>

            {nextRally && (
              <button
                type="button"
                onClick={() => jump('rallies')}
                className="group border border-white/15 bg-white/[0.04] p-5 text-left transition-colors hover:border-[#D4A574] sm:max-w-md 2xl:w-80"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">Next presidential campaign rally</p>
                <p className="mt-2 leading-none text-white" style={{ ...BEBAS, fontSize: '2.5rem' }}>{nextRally.city}</p>
                <p className="mt-1 text-sm text-white/60">
                  {fmt(nextRally.date, { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                {nextRally.president && (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#D4A574]">
                    <Star size={12} className="fill-current" /> With the President
                  </p>
                )}
              </button>
            )}
          </div>

          <nav aria-label="On this page" className="mt-14 flex flex-wrap gap-2 border-t border-white/12 pt-6">
            {SECTIONS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => jump(id)}
                className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white hover:bg-white hover:text-[#0b0b0b]"
              >
                {label} <ArrowDown size={12} />
              </button>
            ))}
          </nav>
        </div>
      </section>
      <LagosMark className="h-1.5 w-full" />

      <PromiseTeaser />
      <RallyTracker />
      <PresidentialTour />
      <LagosTrail />
      <RallyGuidelines />
    </main>
  );
};

export default CampaignPage;
