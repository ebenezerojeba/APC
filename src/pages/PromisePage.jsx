import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Search, X, Quote, CheckCircle2, Sparkles, ChevronDown } from 'lucide-react';

import {
  PROMISE_META as META,
  PREFACE,
  MILESTONES,
  ETHOS,
  PRINCIPLES,
  RUNNING_MATE,
  BIG_NUMBERS,
  PILLARS,
  PLEDGE_COUNT,
  CHAPTER_COUNT,
} from '../data/lagosPromise';
import LagosMark from '../components/LagosMark';
import SectionLabel from '../components/SectionLabel';

/*
  The Lagos PROMISE: Dr Kadri Obafemi Hamzat's manifesto, as a page people
  can actually explore. Seven pillars spell P-R-O-M-I-S-E; each opens into its
  chapters and pledges. A search box looks across all of them.
*/

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };
const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const TypeBadge = ({ type }) =>
  type === 'commitment' ? (
    <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#008A44]">
      <CheckCircle2 size={11} /> Commitment
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#B45309]">
      <Sparkles size={11} /> Aspiration
    </span>
  );

// Bold the figures in a pledge so the numbers jump out.
const withFigures = (text) =>
  text.split(/(₦?\d[\d,.]*\s?(?:per cent|%|km|megawatts|million|billion|trillion|hours|days|hectare)?)/g).map((part, i) =>
    i % 2 ? <strong key={i} className="font-black text-gray-900">{part}</strong> : part,
  );

const Pledge = ({ p, colour }) => (
  <li className="relative border-l-2 bg-white py-4 pl-5 pr-4 shadow-sm ring-1 ring-gray-900/5" style={{ borderColor: colour }}>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h5 className="text-[13px] font-black uppercase tracking-[0.06em] text-gray-900">Pledge of {p.title}</h5>
      <TypeBadge type={p.type} />
    </div>
    <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{withFigures(p.text)}</p>
  </li>
);

const Chapter = ({ c, colour, open, onToggle }) => (
  <div className="border-t border-gray-900/10">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="group flex w-full items-start gap-4 py-6 text-left outline-none focus-visible:bg-gray-50"
    >
      <span className="w-12 shrink-0 pt-1 text-sm font-black tabular-nums" style={{ color: colour }}>{c.code}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-xl font-black leading-tight text-gray-900 sm:text-2xl">{c.title}</span>
        <span className="mt-1 block text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
          {c.pledges.length ? `${c.pledges.length} pledge${c.pledges.length > 1 ? 's' : ''}` : 'Overview'}
        </span>
      </span>
      <ChevronDown size={22} className={`mt-1 shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && (
      <div className="pb-8 sm:pl-16">
        {(c.quote || c.tagline) && (
          <blockquote className="relative mb-6 max-w-3xl pl-9 text-lg leading-relaxed text-gray-700 sm:text-xl">
            <Quote size={24} className="absolute left-0 top-0.5 rotate-180" style={{ color: colour }} />
            {c.quote || c.tagline}
            {c.quote && (
              <footer className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-gray-400">{META.candidate}</footer>
            )}
          </blockquote>
        )}
        {c.pledges.length > 0 && (
          <ul className="grid gap-3 lg:grid-cols-2">
            {c.pledges.map((p) => <Pledge key={p.title + p.text.slice(0, 10)} p={p} colour={colour} />)}
          </ul>
        )}
      </div>
    )}
  </div>
);

const PromisePage = () => {
  const [active, setActive] = useState(() => {
    const m = /^#pillar-([PROMISE])$/.exec(window.location.hash);
    return m ? m[1] : 'P';
  });
  const [openCh, setOpenCh] = useState(() => new Set(['P.1']));
  const [query, setQuery] = useState('');
  const [onlyCommitments, setOnlyCommitments] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = 'The Lagos PROMISE | Dr Kadri Obafemi Hamzat';
    return () => { document.title = prev; };
  }, []);

  const pillar = PILLARS.find((p) => p.letter === active);

  const choose = (letter, scroll = true) => {
    setActive(letter);
    const first = PILLARS.find((p) => p.letter === letter).chapters[0].code;
    setOpenCh(new Set([first]));
    window.history.replaceState(null, '', `#pillar-${letter}`);
    if (scroll) jump('pillars');
  };

  const toggle = (code) =>
    setOpenCh((s) => {
      const n = new Set(s);
      if (n.has(code)) n.delete(code); else n.add(code);
      return n;
    });

  // Search across every pledge in every pillar.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    return PILLARS.flatMap((p) =>
      p.chapters.flatMap((c) =>
        c.pledges
          .filter((x) => (!onlyCommitments || x.type === 'commitment'))
          .filter((x) => `${x.title} ${x.text} ${c.title}`.toLowerCase().includes(q))
          .map((x) => ({ ...x, pillar: p, chapter: c })),
      ),
    );
  }, [query, onlyCommitments]);

  const shownChapters = pillar.chapters.map((c) => ({
    ...c,
    pledges: onlyCommitments ? c.pledges.filter((x) => x.type === 'commitment') : c.pledges,
  }));
  const pillarCount = pillar.chapters.reduce((n, c) => n + c.pledges.length, 0);

  return (
    <main className="bg-[#F5F3EE]">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-black pt-28 text-white sm:pt-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(45% 60% at 10% 15%, rgba(2,57,174,0.45), transparent 70%), radial-gradient(35% 45% at 0% 100%, rgba(0,138,68,0.35), transparent 70%)' }}
        />

        <div className="mx-auto grid max-w-[1500px] items-end gap-6 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:px-20">
          <div className="pb-14 lg:pb-24">
            <SectionLabel as="p" tone="gold" className="mb-6">{META.yoruba} · Manifesto 2027–2031</SectionLabel>
            <h1 className="uppercase leading-[0.84]" style={{ ...BEBAS, fontSize: 'clamp(3.5rem, 11vw, 9.5rem)' }}>
              The Lagos
              <br />
              <span className="bg-gradient-to-r from-[#4ADE80] via-[#FFC700] to-[#EB001F] bg-clip-text text-transparent">Promise</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-bold text-white sm:text-xl">{META.subtitle}.</p>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/55">
              {META.candidate} · {META.office}
            </p>

            <dl className="mt-9 grid max-w-lg grid-cols-3 border-y border-white/15">
              {[[PILLARS.length, 'Pillars'], [CHAPTER_COUNT, 'Chapters'], [PLEDGE_COUNT, 'Pledges']].map(([v, l]) => (
                <div key={l} className="py-4 pr-4">
                  <dd className="leading-none" style={{ ...BEBAS, fontSize: '2.75rem' }}>{v}</dd>
                  <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{l}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-3 min-[460px]:flex-row">
              <button
                type="button"
                onClick={() => jump('pillars')}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#FFC700] px-7 text-[11px] font-black uppercase tracking-[0.22em] text-black transition-colors hover:bg-white"
              >
                Explore the pledges <ArrowDown size={15} />
              </button>
              {/* <a
                href={META.fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/30 px-7 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                Full manifesto <ArrowUpRight size={15} />
              </a> */}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md self-end lg:max-w-none">
            <img
              src={META.hero}
              alt={META.candidate}
              className="relative z-10 mx-auto block w-full max-w-[560px] object-contain [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
              fetchPriority="high"
            />
          </div>
        </div>
        <LagosMark className="relative z-20 h-1.5 w-full" />
      </section>

      {/* ── P R O M I S E ────────────────────────────────────────────── */}
      <section aria-label="The seven pillars" className="bg-[#04100A] text-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-7">
          {PILLARS.map((p) => (
            <button
              key={p.letter}
              type="button"
              onClick={() => choose(p.letter)}
              className="group relative flex flex-col items-center border-r border-white/10 px-1 pb-5 pt-6 text-center outline-none last:border-r-0 focus-visible:bg-white/10"
            >
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ backgroundColor: p.colour }} />
              <span className="leading-none transition-transform duration-300 group-hover:-translate-y-1" style={{ ...BEBAS, fontSize: 'clamp(2.75rem, 8vw, 6.5rem)', color: p.colour === '#0239AE' ? '#5B8DEF' : p.colour }}>
                {p.letter}
              </span>
              <span className="mt-2 hidden text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-white/70 sm:block">{p.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Big numbers ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24 lg:px-20">
        <SectionLabel tone="green" className="mb-5">By 2031</SectionLabel>
        <h2 className="max-w-3xl uppercase leading-[0.9] text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}>
          Promises you can <span className="text-[#008A44]">count</span>
        </h2>
        <p className="mt-4 max-w-xl text-gray-600">
          “Measure before you promise.” Every pledge starts from a baseline, so Lagosians can check the result.
        </p>
        <ul className="mt-12 grid grid-cols-2 gap-px bg-gray-900/10 lg:grid-cols-4">
          {BIG_NUMBERS.map((n, i) => (
            <li key={n.label} className="group bg-[#F5F3EE] p-5 transition-colors hover:bg-white sm:p-7">
              <p className="leading-none" style={{ ...BEBAS, fontSize: 'clamp(2.75rem, 6vw, 4.5rem)', color: PILLARS[i % PILLARS.length].colour === '#0239AE' ? '#0239AE' : PILLARS[i % PILLARS.length].colour }}>
                {n.value}<span className="ml-1 text-[0.45em] text-gray-400">{n.unit}</span>
              </p>
              <p className="mt-3 text-sm leading-snug text-gray-600">{n.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Pillar explorer ──────────────────────────────────────────── */}
      <section id="pillars" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel tone="green" className="mb-5">The pledges</SectionLabel>
              <h2 className="uppercase leading-[0.9] text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}>
                Seven pillars. <span className="text-[#008A44]">{PLEDGE_COUNT} pledges.</span>
              </h2>
            </div>
            <div className="w-full max-w-md">
              <label className="relative block">
                <span className="sr-only">Search the pledges</span>
                <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search: water, schools, ferries, women…"
                  className="h-12 w-full border border-gray-300 bg-white pl-11 pr-10 text-[15px] outline-none transition-colors focus:border-gray-900"
                />
                {query && (
                  <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-900">
                    <X size={16} />
                  </button>
                )}
              </label>
              <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" checked={onlyCommitments} onChange={(e) => setOnlyCommitments(e.target.checked)} className="h-4 w-4 accent-[#008A44]" />
                Show firm commitments only
              </label>
            </div>
          </div>

          {results ? (
            <div className="mt-10">
              <p className="mb-5 text-sm font-bold text-gray-500">
                {results.length} pledge{results.length === 1 ? '' : 's'} mention “{query.trim()}”
              </p>
              {results.length === 0 && (
                <p className="border border-dashed border-gray-300 p-8 text-center text-gray-500">Nothing found. Try a shorter word.</p>
              )}
              <ul className="grid gap-3 lg:grid-cols-2">
                {results.map((r) => (
                  <li key={r.chapter.code + r.title} className="border-l-2 bg-white py-4 pl-5 pr-4 shadow-sm ring-1 ring-gray-900/5" style={{ borderColor: r.pillar.colour }}>
                    <button type="button" onClick={() => { setQuery(''); choose(r.pillar.letter); setOpenCh(new Set([r.chapter.code])); }} className="text-left text-[10px] font-black uppercase tracking-[0.16em] hover:underline" style={{ color: r.pillar.colour }}>
                      {r.pillar.name} · {r.chapter.code} {r.chapter.title}
                    </button>
                    <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-[13px] font-black uppercase tracking-[0.06em] text-gray-900">Pledge of {r.title}</h5>
                      <TypeBadge type={r.type} />
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{withFigures(r.text)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div role="tablist" aria-label="Pillars" className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
                {PILLARS.map((p) => {
                  const on = p.letter === active;
                  return (
                    <button
                      key={p.letter}
                      role="tab"
                      type="button"
                      aria-selected={on}
                      onClick={() => choose(p.letter, false)}
                      className={`inline-flex min-h-11 shrink-0 items-center gap-2 px-4 text-[11px] font-black uppercase tracking-[0.14em] transition-colors ${on ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      style={on ? { backgroundColor: p.colour } : undefined}
                    >
                      <span className="text-base leading-none" style={BEBAS}>{p.letter}</span> {p.name}
                    </button>
                  );
                })}
              </div>

              {/* Pillar banner */}
              <div key={pillar.letter} className="relative isolate mt-6 flex min-h-[300px] items-end overflow-hidden bg-black text-white sm:min-h-[380px]">
                <img src={pillar.photo} alt={pillar.photoAlt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover animate-[promise-zoom_12s_ease-out_both]" />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/55 to-black/10" />
                <span aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 w-2/3 bg-gradient-to-r from-black/70 to-transparent" />
                <span className="absolute left-0 top-0 h-1.5 w-full" style={{ backgroundColor: pillar.colour }} />
                <div className="flex w-full flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
                  <div className="flex items-end gap-5">
                    <span className="leading-[0.75]" style={{ ...BEBAS, fontSize: 'clamp(6rem, 16vw, 11rem)', color: pillar.colour === '#0239AE' ? '#5B8DEF' : pillar.colour }}>
                      {pillar.letter}
                    </span>
                    <div className="pb-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60">Pillar {PILLARS.indexOf(pillar) + 1} of 7</p>
                      <h3 className="uppercase leading-none" style={{ ...BEBAS, fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>{pillar.name}</h3>
                    </div>
                  </div>
                  <p className="pb-2 text-sm font-bold text-white/80">
                    {pillar.chapters.length} chapters · {pillarCount} pledges
                  </p>
                </div>
              </div>

              {/* Chapters */}
              <div className="mt-4">
                {shownChapters.map((c) => (
                  <Chapter key={c.code} c={c} colour={pillar.colour} open={openCh.has(c.code)} onToggle={() => toggle(c.code)} />
                ))}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-900/10 pt-6">
                  <button type="button" onClick={() => setOpenCh(new Set(pillar.chapters.map((c) => c.code)))} className="text-xs font-black uppercase tracking-[0.18em] text-gray-500 hover:text-gray-900">
                    Open all chapters
                  </button>
                  {PILLARS.indexOf(pillar) < PILLARS.length - 1 && (
                    <button
                      type="button"
                      onClick={() => choose(PILLARS[PILLARS.indexOf(pillar) + 1].letter)}
                      className="group inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.12em] text-gray-900"
                    >
                      Next: {PILLARS[PILLARS.indexOf(pillar) + 1].name}
                      <span className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-1" style={{ backgroundColor: PILLARS[PILLARS.indexOf(pillar) + 1].colour }}>
                        <ArrowDown size={16} className="-rotate-90" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── The engineer ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-black text-white">
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-20 lg:py-24">
          <img src={META.engineer} alt={`${META.candidate} in a safety vest and hard hat`} loading="lazy" className="mx-auto w-full max-w-sm [mask-image:linear-gradient(to_bottom,black_85%,transparent)]" />
          <div>
            <SectionLabel tone="gold" className="mb-6">The engineer’s argument</SectionLabel>
            <blockquote className="text-2xl font-black leading-snug sm:text-3xl lg:text-4xl">
              “{PREFACE}”
              <footer className="mt-4 text-[11px] font-black uppercase tracking-[0.2em] text-white/50">{META.candidate}</footer>
            </blockquote>
            <ol className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title} className="bg-black p-5">
                  <span className="text-sm font-black tabular-nums text-[#FFC700]">0{i + 1}</span>
                  <p className="mt-1 font-black uppercase tracking-wide">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Omoluabi + endorsement ───────────────────────────────────── */}
      <section className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-20 lg:py-24">
        <div>
          <SectionLabel tone="green" className="mb-5">The Ọmọlúàbí ethos</SectionLabel>
          <h2 className="uppercase leading-[0.9] text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            The operating <span className="text-[#008A44]">standard</span>
          </h2>
          <ul className="mt-8 space-y-px bg-gray-900/10">
            {ETHOS.map((e) => (
              <li key={e.name} className="flex gap-5 bg-[#F5F3EE] py-5 pr-4">
                <span className="w-32 shrink-0 leading-none text-gray-900" style={{ ...BEBAS, fontSize: '2.5rem' }}>{e.name}</span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#008A44]">{e.meaning}</p>
                  {e.text && <p className="mt-1 text-[15px] leading-relaxed text-gray-600">{e.text}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative overflow-hidden bg-black text-white">
          <img src={META.president} alt={`${META.candidate} greeting President Bola Ahmed Tinubu`} loading="lazy" className="h-full max-h-[560px] w-full object-cover" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FFC700]">The road to 2027</p>
            <ol className="mt-4 space-y-3">
              {MILESTONES.map((m) => (
                <li key={m.date} className="flex gap-4">
                  <span className="w-28 shrink-0 text-sm font-black tabular-nums">{m.date}</span>
                  <span className="text-sm text-white/80">{m.text}</span>
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>
      </section>

      {/* ── Running mate ─────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.7fr_1.3fr] lg:px-20">
          <div className="relative mx-auto w-full max-w-xs overflow-hidden bg-black">
            <img src={RUNNING_MATE.photo} alt={RUNNING_MATE.name} loading="lazy" className="w-full" />
            <LagosMark className="absolute bottom-0 h-1.5 w-full" />
          </div>
          <div>
            <SectionLabel tone="green" className="mb-5">Standing with him</SectionLabel>
            <h2 className="uppercase leading-[0.9] text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              {RUNNING_MATE.name}
            </h2>
            <p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-[#008A44]">{RUNNING_MATE.role}</p>
            <ul className="mt-6 space-y-3">
              {RUNNING_MATE.lines.map((l) => (
                <li key={l} className="flex gap-3 text-[15px] leading-relaxed text-gray-600">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-[#008A44]" /> {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Close ────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#04100A] py-20 text-center text-white sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(50% 70% at 50% 100%, rgba(0,138,68,0.4), transparent 70%)' }} />
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FFC700]">{META.slogan}</p>
        <p className="mx-auto mt-6 max-w-4xl px-5 uppercase leading-[0.9]" style={{ ...BEBAS, fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}>
          This is our Lagos.
          <br />
          <span className="text-[#4ADE80]">Èkó ò ní bàjé.</span>
        </p>
        <p className="mt-6 text-white/60">{META.start}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 px-5 sm:flex-row">
          {/* <a href={META.fullUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 bg-[#FFC700] px-7 text-[11px] font-black uppercase tracking-[0.22em] text-black hover:bg-white">
            Read the full manifesto <ArrowUpRight size={15} />
          </a> */}
          <Link to="/campaign" className="inline-flex min-h-12 items-center gap-2 border border-white/30 px-7 text-[11px] font-black uppercase tracking-[0.22em] hover:border-white hover:bg-white hover:text-black">
            The campaign
          </Link>
        </div>
        <p className="mx-auto mt-10 max-w-xl px-5 text-[11px] leading-relaxed text-white/35">
          Source: The Lagos PROMISE (abridged edition). The full manifesto, with the complete policy framework, is published at koh2027.ng.
        </p>
      </section>
    </main>
  );
};

export default PromisePage;
