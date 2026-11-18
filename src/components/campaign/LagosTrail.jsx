import { useMemo, useState } from 'react';
import { Clock, MapPin, CalendarPlus, CheckCircle2, Megaphone, Users, Handshake, Vote } from 'lucide-react';

import { LAGOS_ITINERARY, KINDS, toDate } from '../../data/campaign';
import { daysUntil, fmt, fmtDay, fmtDayNum, fmtMonth, relative, calendarLink, startOfToday, useNow } from './dates';
import SectionLabel from '../SectionLabel';

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };

const KIND_STYLE = {
  rally: { icon: Megaphone, cls: 'bg-[#008A44] text-white' },
  townhall: { icon: Users, cls: 'bg-[#0239AE] text-white' },
  engagement: { icon: Handshake, cls: 'bg-amber-100 text-amber-800' },
  poll: { icon: Vote, cls: 'bg-[#EB001F] text-white' },
};

const KIND_SINGULAR = { rally: 'Rally', townhall: 'Town hall', engagement: 'Engagement', poll: 'Election day' };

// Monday of the week containing `iso`, as an ISO string.
const weekOf = (iso) => {
  const d = toDate(iso);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const sortKey = (e) => {
  const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(e.time);
  if (!m) return `${e.date} 99`;
  let h = +m[1] % 12;
  if (m[3].toUpperCase() === 'PM') h += 12;
  return `${e.date} ${String(h).padStart(2, '0')}${m[2]}`;
};

const ITEMS = [...LAGOS_ITINERARY].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
const WEEKS = [...new Set(ITEMS.map((e) => weekOf(e.date)))];

const weekLabel = (wk) => {
  const end = toDate(wk);
  end.setDate(end.getDate() + 6);
  const endIso = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;
  return `${fmt(wk, { day: 'numeric', month: 'short' })} – ${fmt(endIso, { day: 'numeric', month: 'short' })}`;
};

const ItemRow = ({ e, now }) => {
  const k = KIND_STYLE[e.kind];
  const Icon = k.icon;
  const d = daysUntil(e.dateEnd || e.date, now);
  const done = d < 0;

  return (
    <li
      className={`group flex gap-4 border bg-white p-4 transition-shadow sm:gap-5 sm:p-5 ${
        e.highlight ? 'border-[#D4A574] shadow-[0_0_0_1px_#D4A574]' : 'border-gray-200 hover:shadow-lg hover:shadow-black/5'
      } ${done ? 'opacity-55' : ''}`}
    >
      <div className="w-[6.5rem] shrink-0 sm:w-28">
        <p className="flex items-center gap-1 text-xs font-black tabular-nums text-gray-900">
          <Clock size={12} className="text-gray-400" /> {e.time}
        </p>
        <span className={`mt-2 inline-flex items-center gap-1 px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] ${k.cls}`}>
          <Icon size={11} /> {KIND_SINGULAR[e.kind]}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="font-black leading-snug text-gray-900">{e.title}</h4>
        <p className="mt-1 flex items-start gap-1.5 text-sm text-gray-500">
          <MapPin size={14} className="mt-0.5 shrink-0 text-amber-500" /> {e.venue}
        </p>
        {e.note && <p className="mt-1.5 text-xs font-bold text-[#008A44]">{e.note}</p>}
        {e.dateEnd && (
          <p className="mt-1.5 text-xs font-bold text-gray-500">
            {fmt(e.date, { day: 'numeric', month: 'short' })} – {fmt(e.dateEnd, { day: 'numeric', month: 'short' })}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between gap-2">
        {done ? (
          <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.14em] text-gray-400">
            <CheckCircle2 size={12} /> Done
          </span>
        ) : e.kind === 'poll' ? null : e.confirmed ? (
          <span className="text-[9px] font-black uppercase tracking-[0.14em] text-[#008A44]">Confirmed</span>
        ) : (
          <span className="text-[9px] font-black uppercase tracking-[0.14em] text-gray-400">To be confirmed</span>
        )}
        {!done && (
          <a
            href={calendarLink({ title: e.title, date: e.date, dateEnd: e.dateEnd, venue: e.venue, details: `${e.time}. ${e.note || ''}` })}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Add ${e.title} to your calendar`}
            className="inline-flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-500 transition-colors hover:border-[#008A44] hover:bg-[#008A44] hover:text-white"
          >
            <CalendarPlus size={15} />
          </a>
        )}
      </div>
    </li>
  );
};

/*
  Lagos rallies and election days, from the Campaign Secretariat schedule,
  as one horizontal road. Only what is still ahead, so it shortens itself.
*/
const RallyRoad = ({ now }) => {
  const stops = ITEMS.filter(
    (e) => (e.kind === 'rally' || e.kind === 'poll') && daysUntil(e.dateEnd || e.date, now) >= 0,
  );
  if (stops.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">
          Rallies &amp; election days
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
          {stops.length} ahead · scroll →
        </span>
      </div>
      <div className="-mx-5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0" tabIndex={0} aria-label="Upcoming Lagos rallies and election days">
        <ol className="flex w-max gap-3">
          {stops.map((e, i) => {
            const poll = e.kind === 'poll';
            const d = daysUntil(e.date, now);
            return (
              <li
                key={`${e.date}-${e.title}`}
                className={`relative flex w-56 flex-col overflow-hidden p-4 ${
                  poll
                    ? 'bg-[#EB001F] text-white'
                    : i === 0
                      ? 'bg-[#04100A] text-white'
                      : e.highlight
                        ? 'bg-[#008A44] text-white'
                        : 'border border-gray-200 bg-white text-gray-900'
                }`}
              >
                <div className="flex items-baseline gap-2">
                  <span className="leading-none tabular-nums" style={{ ...BEBAS, fontSize: '2.75rem' }}>
                    {fmtDayNum(e.date)}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] opacity-60">
                    {fmtDay(e.date)} · {fmtMonth(e.date)}
                  </span>
                </div>
                <p className="mt-2 font-black leading-snug">{e.title}</p>
                <p className="mt-1 flex items-start gap-1 text-xs opacity-70">
                  <MapPin size={12} className="mt-0.5 shrink-0" /> {e.venue}
                </p>
                <p className="mt-auto pt-3 text-[10px] font-black uppercase tracking-[0.16em] opacity-80">
                  {e.time !== 'TBC' && e.time !== 'All day' ? `${e.time} · ` : ''}
                  {relative(d)}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

const LagosTrail = () => {
  const now = useNow();
  const todayIso = (() => {
    const t = startOfToday(now);
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
  })();
  const thisWeek = weekOf(todayIso);
  const defaultWeek = WEEKS.find((w) => w >= thisWeek) || WEEKS.at(-1);

  const [week, setWeek] = useState(defaultWeek);
  const [kind, setKind] = useState('all');

  const counts = useMemo(() => {
    const c = { all: ITEMS.length };
    ITEMS.forEach((e) => { c[e.kind] = (c[e.kind] || 0) + 1; });
    return c;
  }, []);

  const days = useMemo(() => {
    const list = ITEMS.filter((e) => (week === 'all' || weekOf(e.date) === week) && (kind === 'all' || e.kind === kind));
    const m = new Map();
    list.forEach((e) => {
      if (!m.has(e.date)) m.set(e.date, []);
      m.get(e.date).push(e);
    });
    return [...m.entries()];
  }, [week, kind]);

  const upNext = ITEMS.filter((e) => daysUntil(e.date, now) >= 0 && e.kind !== 'poll').slice(0, 1)[0];

  return (
    <section id="lagos-trail" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel tone="green" className="mb-6">Lagos Campaign Trail</SectionLabel>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="uppercase leading-[0.88] text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
              Every Ward.
              <br />
              <span className="text-[#008A44]">Every Voice.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-500">
              Town halls in all 20 LGAs, senatorial rallies across the State, and engagements with
              professionals, faith groups, women and youth, on the road to the polls.
            </p>
          </div>

          {upNext && (
            <div className="border-l-4 border-[#D4A574] bg-white p-5 shadow-sm lg:max-w-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A574]">
                Up next · {relative(daysUntil(upNext.date, now))}
              </p>
              <p className="mt-2 font-black leading-snug text-gray-900">{upNext.title}</p>
              <p className="mt-1 text-sm text-gray-500">
                {fmt(upNext.date, { weekday: 'long', day: 'numeric', month: 'long' })} · {upNext.time}
              </p>
            </div>
          )}
        </div>

        <RallyRoad now={now} />

        {/* Week picker */}
        <div className="-mx-5 mt-12 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div role="group" aria-label="Choose a week" className="flex w-max gap-2">
            {[...WEEKS, 'all'].map((w) => {
              const active = week === w;
              const current = w === thisWeek;
              return (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeek(w)}
                  aria-pressed={active}
                  className={`min-h-11 whitespace-nowrap px-4 text-[10px] font-bold uppercase tracking-[0.14em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#008A44] ${
                    active ? 'bg-gray-900 text-white' : 'border border-gray-300 bg-white text-gray-600 hover:border-gray-900'
                  }`}
                >
                  {w === 'all' ? 'Full plan' : weekLabel(w)}
                  {current && <span className={`ml-2 ${active ? 'text-[#4ADE80]' : 'text-[#008A44]'}`}>● This week</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div role="group" aria-label="Filter by type" className="mt-3 flex flex-wrap gap-2">
          {[['all', 'Everything'], ...Object.entries(KINDS)].map(([id, label]) => {
            const active = kind === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setKind(id)}
                aria-pressed={active}
                className={`min-h-9 rounded-full px-4 text-[11px] font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#008A44] ${
                  active ? 'bg-[#008A44] text-white' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-[#008A44]'
                }`}
              >
                {label} <span className={active ? 'text-white/60' : 'text-gray-400'}>{counts[id] || 0}</span>
              </button>
            );
          })}
        </div>

        {/* Days */}
        <div className="mt-10 space-y-8">
          {days.map(([date, items]) => {
              const d = daysUntil(date, now);
              return (
                <div key={date} className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                  <div className="flex items-baseline gap-3 sm:w-24 sm:shrink-0 sm:flex-col sm:items-start sm:gap-0">
                    <span className={`leading-none tabular-nums ${d === 0 ? 'text-[#008A44]' : 'text-gray-900'}`} style={{ ...BEBAS, fontSize: '3.25rem' }}>
                      {fmtDayNum(date)}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                      {fmtDay(date)} · {fmtMonth(date)}
                    </span>
                    {d === 0 && (
                      <span className="mt-1 bg-[#008A44] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.16em] text-white">Today</span>
                    )}
                  </div>
                  <ul className="min-w-0 flex-1 space-y-3">
                    {items.map((e) => <ItemRow key={`${e.date}-${e.title}`} e={e} now={now} />)}
                  </ul>
                </div>
              );
            })}
          {days.length === 0 && (
            <p className="border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
              Nothing of this type in the selected week. Try “Full plan”.
            </p>
          )}
        </div>

        <p className="mt-10 text-[11px] leading-relaxed text-gray-400">
          Sources: PBAT-KOH 2027 Campaign Secretariat schedule and KOH Team Executive Master Activity Plan. Items marked “To be confirmed” are planned
          but not yet approved; times and venues may change.
        </p>
      </div>
    </section>
  );
};

export default LagosTrail;
