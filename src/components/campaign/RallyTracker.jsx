import { useMemo, useState } from 'react';
import { Star, Download, MapPin, CalendarPlus } from 'lucide-react';

import { RALLIES, ZONES, RALLY_CALENDAR_PDF } from '../../data/campaign';
import { daysUntil, fmt, fmtDay, fmtDayNum, relative, calendarLink, useNow } from './dates';
import SectionLabel from '../SectionLabel';

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };

const monthKey = (iso) => iso.slice(0, 7);

/*
  The 37-stop route as one strip: a tick per rally, coloured by zone, filled
  once held. Reads at a glance as "how far along the campaign is".
*/
const RouteStrip = ({ nextNo }) => (
  <div className="mt-8" aria-hidden="true">
    <div className="flex h-12 items-end gap-[3px] sm:gap-1">
      {RALLIES.map((r) => {
        const held = nextNo ? r.no < nextNo : true;
        const isNext = r.no === nextNo;
        return (
          <div key={r.no} className="relative flex flex-1 flex-col items-center justify-end">
            {r.president && <Star size={9} className="mb-1 fill-[#D4A574] text-[#D4A574]" />}
            <span
              className={`block w-full rounded-[1px] transition-all ${isNext ? 'h-9 animate-pulse' : r.president ? 'h-7' : 'h-5'}`}
              style={{
                backgroundColor: held || isNext ? ZONES[r.zone].colour : 'transparent',
                boxShadow: held || isNext ? 'none' : `inset 0 0 0 1px ${ZONES[r.zone].colour}80`,
              }}
            />
          </div>
        );
      })}
    </div>
    <div className="mt-2 flex justify-between text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
      <span>Kaduna · 24 Oct</span>
      <span>Lagos · 9 Jan</span>
    </div>
  </div>
);

const RallyCard = ({ rally, now, isNext }) => {
  const d = daysUntil(rally.date, now);
  const held = d < 0;
  const zone = ZONES[rally.zone];

  return (
    <li
      className={`group relative flex flex-col overflow-hidden border bg-white/[0.03] p-4 transition-colors sm:p-5 ${
        isNext ? 'border-[#D4A574] bg-[#D4A574]/[0.07]' : 'border-white/10 hover:border-white/30'
      } ${held ? 'opacity-55' : ''}`}
    >
      <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: zone.colour }} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="leading-none text-white tabular-nums" style={{ ...BEBAS, fontSize: '2.6rem' }}>
            {fmtDayNum(rally.date)}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
            {fmtDay(rally.date)}
          </span>
        </div>
        <span className="text-[10px] font-bold tabular-nums text-white/30">#{String(rally.no).padStart(2, '0')}</span>
      </div>

      <h4 className="mt-3 text-lg font-black uppercase leading-tight text-white">{rally.city}</h4>
      <p className="text-xs text-white/50">{rally.state === 'FCT' ? 'Federal Capital Territory' : `${rally.state} State`}</p>

      {rally.note && (
        <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#D4A574]">{rally.note}</p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-4">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/55">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: zone.colour }} />
          {zone.label}
        </span>
        {rally.president && (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#D4A574]">
            <Star size={11} className="fill-current" /> President
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <span
          className={`text-[10px] font-black uppercase tracking-[0.16em] ${
            held ? 'text-white/40' : d === 0 ? 'text-[#4ADE80]' : isNext ? 'text-[#D4A574]' : 'text-white/70'
          }`}
        >
          {held ? 'Held' : isNext && d !== 0 ? `Next · ${relative(d)}` : relative(d)}
        </span>
        {!held && (
          <a
            href={calendarLink({
              title: `APC Presidential Rally: ${rally.city}`,
              date: rally.date,
              venue: `${rally.city}, ${rally.state}`,
              details: 'APC Presidential Campaign Council rally.',
            })}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Add the ${rally.city} rally to your calendar`}
            className="inline-flex h-8 w-8 items-center justify-center text-white/40 transition-colors hover:text-white focus-visible:text-white"
          >
            <CalendarPlus size={15} />
          </a>
        )}
      </div>
    </li>
  );
};

const RallyTracker = () => {
  const now = useNow();
  const [zone, setZone] = useState('all');
  const [presidentOnly, setPresidentOnly] = useState(false);

  const next = RALLIES.find((r) => daysUntil(r.date, now) >= 0);
  const held = next ? next.no - 1 : RALLIES.length;
  const presidentialCount = RALLIES.filter((r) => r.president).length;
  const span = daysUntil(RALLIES.at(-1).date, new Date(2026, 9, 24));

  const rows = useMemo(
    () => RALLIES.filter((r) => (zone === 'all' || r.zone === zone) && (!presidentOnly || r.president)),
    [zone, presidentOnly],
  );

  const months = useMemo(() => {
    const m = new Map();
    rows.forEach((r) => {
      const k = monthKey(r.date);
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(r);
    });
    return [...m.entries()];
  }, [rows]);

  const zoneCounts = useMemo(() => {
    const c = {};
    RALLIES.forEach((r) => { c[r.zone] = (c[r.zone] || 0) + 1; });
    return c;
  }, []);

  const stats = [
    [RALLIES.length, 'Rallies'],
    ['36 + FCT', 'States covered'],
    [presidentialCount, 'With the President'],
    [span, 'Days on the road'],
  ];

  return (
    <section id="rallies" className="bg-[#04100A] py-20 sm:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">
        <SectionLabel tone="gold" className="mb-6">Nationwide Rally Calendar</SectionLabel>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="uppercase leading-[0.88] text-white" style={{ ...BEBAS, fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
            37 Stops.
            <br />
            <span className="text-[#4ADE80]">One Nation.</span>
          </h2>
          <dl className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4 lg:w-[56%]">
            {stats.map(([v, l]) => (
              <div key={l} className="bg-[#04100A] p-4 sm:p-5">
                <dd className="leading-none text-white" style={{ ...BEBAS, fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>{v}</dd>
                <dt className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">{l}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Progress */}
        <div className="mt-12 border-t border-white/12 pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-sm font-bold text-white">
              <span className="tabular-nums text-[#4ADE80]">{held}</span>
              <span className="text-white/45"> of {RALLIES.length} rallies held</span>
            </p>
            {next && (
              <p className="text-sm text-white/60">
                Next: <span className="font-bold text-white">{next.city}</span> · {fmt(next.date, { weekday: 'long', day: 'numeric', month: 'long' })}
                {next.president && <Star size={12} className="ml-1.5 inline fill-[#D4A574] text-[#D4A574]" />}
              </p>
            )}
          </div>
          <RouteStrip nextNo={next?.no} />
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter rallies by zone" className="flex flex-wrap gap-2">
            {[['all', 'All zones', RALLIES.length], ...Object.entries(ZONES).map(([k, z]) => [k, z.label, zoneCounts[k]])].map(
              ([id, label, count]) => {
                const active = zone === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setZone(id)}
                    aria-pressed={active}
                    className={`inline-flex min-h-11 items-center gap-2 px-4 text-[10px] font-bold uppercase tracking-[0.14em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D4A574] ${
                      active ? 'bg-white text-[#0b0b0b]' : 'border border-white/15 text-white/60 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {id !== 'all' && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ZONES[id].colour }} />}
                    {label}
                    <span className={active ? 'text-black/40' : 'text-white/30'}>{count}</span>
                  </button>
                );
              },
            )}
          </div>
          <button
            type="button"
            onClick={() => setPresidentOnly((v) => !v)}
            aria-pressed={presidentOnly}
            className={`inline-flex min-h-11 items-center gap-2 self-start px-4 text-[10px] font-black uppercase tracking-[0.16em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D4A574] ${
              presidentOnly ? 'bg-[#D4A574] text-[#111]' : 'border border-[#D4A574]/50 text-[#D4A574] hover:bg-[#D4A574]/10'
            }`}
          >
            <Star size={13} className="fill-current" /> With the President only
          </button>
        </div>

        {/* Month groups */}
        <div className="mt-10 space-y-14">
          {months.map(([key, list]) => (
            <div key={key}>
              <div className="mb-5 flex items-baseline gap-4">
                <h3 className="uppercase leading-none text-white" style={{ ...BEBAS, fontSize: '2.25rem' }}>
                  {fmt(`${key}-01`, { month: 'long' })} <span className="text-white/30">{key.slice(0, 4)}</span>
                </h3>
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                  {list.length} {list.length === 1 ? 'rally' : 'rallies'}
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {list.map((r) => (
                  <RallyCard key={r.no} rally={r} now={now} isNext={r.no === next?.no} />
                ))}
              </ul>
            </div>
          ))}
          {months.length === 0 && <p className="text-white/50">No rallies match this filter.</p>}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/12 pt-6">
          <a
            href={RALLY_CALENDAR_PDF}
            download
            className="inline-flex min-h-11 items-center gap-2 border border-white/25 px-6 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#0b0b0b]"
          >
            <Download size={14} /> Download rally calendar (PDF)
          </a>
          <p className="flex items-center gap-1.5 text-[11px] text-white/35">
            <MapPin size={12} /> Source: APC Presidential Campaign Council. Dates subject to change.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RallyTracker;
