import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Search, X, ChevronDown, Quote, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

import {
  RH_META as META,
  PRESIDENT_WORD,
  RESULTS,
  EXPECT_2031,
  DISCIPLINES,
  FIRST_100_DAYS,
  RH_PILLARS,
  RH_COMMITMENT_COUNT,
} from '../data/renewedHope';
import LagosMark from '../components/LagosMark';
import SectionLabel from '../components/SectionLabel';

/*
  The President's manifesto, "From Reforms to Prosperity", laid out like the
  Lagos PROMISE page: four pillars, each opening into its pledge, results so
  far, commitments and the measures Nigerians can track. One search box looks
  across every commitment.
*/

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };
const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
const bright = (c) => ({ '#0239AE': '#5B8DEF', '#7E1D3A': '#E35A84', '#008A44': '#4ADE80', '#C2410C': '#FB923C' }[c] || c);

const withFigures = (text, dark = false) =>
  text.split(/((?:US)?[$₦£]?\d[\d,.]*\s?(?:per cent|%|km|MW|million|billion|trillion|bn|tn|tonnes)?)/g).map((part, i) =>
    i % 2 ? <strong key={i} className={`font-black ${dark ? 'text-white' : 'text-gray-900'}`}>{part}</strong> : part,
  );

const TABS = [
  { id: 'commit', label: 'Commitments', icon: CheckCircle2 },
  { id: 'results', label: 'Results so far', icon: TrendingUp },
  { id: 'measure', label: 'How to measure it', icon: Target },
];

const Group = ({ g, colour, open, onToggle, idx }) => (
  <div className="border-t border-gray-900/10">
    <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-start gap-4 py-5 text-left outline-none focus-visible:bg-gray-50">
      <span className="w-9 shrink-0 pt-0.5 leading-none" style={{ ...BEBAS, fontSize: '2rem', color: colour }}>{String(idx + 1).padStart(2, '0')}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-black leading-snug text-gray-900 sm:text-xl">{g.title}</span>
        <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">{g.items.length} commitments</span>
      </span>
      <ChevronDown size={22} className={`mt-1 shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && (
      <ul className="space-y-2.5 pb-7 sm:pl-[3.25rem]">
        {g.items.map((it) => (
          <li key={it.slice(0, 40)} className="flex gap-3 bg-white p-4 text-[15px] leading-relaxed text-gray-600 shadow-sm ring-1 ring-gray-900/5">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: colour }} />
            <span>{withFigures(it)}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const RenewedHopePage = () => {
  const [active, setActive] = useState(() => {
    const m = /^#pillar-([1-4])$/.exec(window.location.hash);
    return m ? Number(m[1]) : 1;
  });
  const [tab, setTab] = useState('commit');
  const [open, setOpen] = useState(() => new Set([0]));
  const [query, setQuery] = useState('');

  useEffect(() => {
    const prev = document.title;
    document.title = 'Renewed Hope 2027–2031 | From Reforms to Prosperity';
    return () => { document.title = prev; };
  }, []);

  const pillar = RH_PILLARS.find((p) => p.n === active);
  const choose = (n, scroll = true) => {
    setActive(n);
    setOpen(new Set([0]));
    window.history.replaceState(null, '', `#pillar-${n}`);
    if (scroll) jump('rh-pillars');
  };
  const toggle = (i) => setOpen((s) => {
    const x = new Set(s);
    if (x.has(i)) x.delete(i); else x.add(i);
    return x;
  });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    return RH_PILLARS.flatMap((p) =>
      p.groups.flatMap((g) => g.items.filter((it) => it.toLowerCase().includes(q)).map((it) => ({ it, g, p }))),
    );
  }, [query]);

  return (
    <main className="overflow-x-hidden bg-[#F5F3EE]">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#03130A] pt-28 text-white sm:pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(50% 60% at 10% 15%, rgba(0,138,68,0.45), transparent 70%), radial-gradient(40% 50% at 0% 100%, rgba(212,165,116,0.18), transparent 70%)' }} />
        <div className="mx-auto grid max-w-[1500px] items-end gap-8 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-20">
          <div className="pb-14 lg:pb-24">
            <SectionLabel as="p" tone="gold" className="mb-6">{META.agenda}</SectionLabel>
            <h1 className="uppercase leading-[0.84]" style={{ ...BEBAS, fontSize: 'clamp(2.5rem, 12vw, 8.5rem)' }}>
              From Reforms
              <br />
              <span className="text-[#4ADE80]">to Prosperity</span>
            </h1>
            <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-[#D4A574]">{META.tagline}</p>
            <p className="mt-3 max-w-xl text-lg text-white/75">{META.document}. {META.candidate}.</p>

            <dl className="mt-9 grid max-w-lg grid-cols-3 border-y border-white/15">
              {[[RH_PILLARS.length, 'Pillars'], [RH_PILLARS.reduce((n, p) => n + p.groups.length, 0), 'Promise areas'], [RH_COMMITMENT_COUNT, 'Commitments']].map(([v, l]) => (
                <div key={l} className="py-4 pr-4">
                  <dd className="leading-none" style={{ ...BEBAS, fontSize: '2.75rem' }}>{v}</dd>
                  <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{l}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-3 min-[460px]:flex-row">
              <button type="button" onClick={() => jump('rh-pillars')} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#4ADE80] px-7 text-[11px] font-black uppercase tracking-[0.22em] text-black transition-colors hover:bg-white">
                Explore the commitments <ArrowDown size={15} />
              </button>
              <button type="button" onClick={() => jump('rh-2031')} className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/30 px-7 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-colors hover:border-white hover:bg-white hover:text-black">
                What to expect by 2031
              </button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm self-end lg:max-w-lg">
            <img src={META.hero} alt={META.candidate} fetchPriority="high" className="w-full object-cover [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
          </div>
        </div>
        <LagosMark className="relative h-1.5 w-full" />
      </section>

      {/* ── Four pillars strip ───────────────────────────────────────── */}
      <section aria-label="The four pillars" className="bg-[#03130A] text-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 lg:grid-cols-4">
          {RH_PILLARS.map((p) => (
            <button key={p.n} type="button" onClick={() => choose(p.n)} className="group relative flex items-center gap-4 border-b border-r border-white/10 px-5 py-5 text-left outline-none focus-visible:bg-white/10 sm:px-8">
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ backgroundColor: p.colour }} />
              <span className="leading-none transition-transform group-hover:-translate-y-0.5" style={{ ...BEBAS, fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: bright(p.colour) }}>{p.n}</span>
              <span>
                <span className="block text-sm font-black uppercase leading-tight tracking-wide">{p.short}</span>
                <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">{p.priorities}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Results so far ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <SectionLabel tone="green" className="mb-5">Renewed Hope delivered</SectionLabel>
            <h2 className="uppercase leading-[0.9] text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(2.25rem, 9vw, 5.5rem)' }}>
              From reforms <span className="text-[#008A44]">to results</span>
            </h2>
            <p className="mt-4 max-w-lg text-gray-600">Where the first term leaves the country, as reported in the manifesto. Every figure below is the baseline the next four years build on.</p>
          </div>
          <figure className="relative overflow-hidden">
            <img src={META.train} alt="President Tinubu and Vice President Shettima on a train" loading="lazy" className="aspect-[16/9] w-full object-cover" />
            <LagosMark className="absolute bottom-0 h-1.5 w-full" />
          </figure>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-px bg-gray-900/10 sm:grid-cols-3 lg:grid-cols-4">
          {RESULTS.map((r, i) => (
            <li key={r.label} className="bg-[#F5F3EE] p-5 transition-colors hover:bg-white sm:p-6">
              <p className="leading-none" style={{ ...BEBAS, fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', color: RH_PILLARS[i % 4].colour }}>{r.value}</p>
              <p className="mt-2 text-sm font-black uppercase tracking-wide text-gray-900">{r.label}</p>
              <p className="mt-1 text-[13px] leading-snug text-gray-500">{r.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── By 2031 ──────────────────────────────────────────────────── */}
      <section id="rh-2031" className="scroll-mt-24 bg-[#03130A] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">
          <SectionLabel tone="gold" className="mb-5">The promise</SectionLabel>
          <h2 className="max-w-4xl uppercase leading-[0.9]" style={{ ...BEBAS, fontSize: 'clamp(2.25rem, 9vw, 5.5rem)' }}>
            What Nigerians should <span className="text-[#4ADE80]">expect by 2031</span>
          </h2>
          <ol className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {EXPECT_2031.map((e, i) => (
              <li key={e.title} className="group bg-[#03130A] p-6 transition-colors hover:bg-white/[0.04]">
                <span className="leading-none text-white/20 transition-colors group-hover:text-[#4ADE80]" style={{ ...BEBAS, fontSize: '3.5rem' }}>{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 text-lg font-black leading-snug">{e.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{withFigures(e.text, true)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Pillar explorer ──────────────────────────────────────────── */}
      <section id="rh-pillars" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel tone="green" className="mb-5">The commitments</SectionLabel>
              <h2 className="uppercase leading-[0.9] text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(2.25rem, 9vw, 5.5rem)' }}>
                Four pillars. <span className="text-[#008A44]">{RH_COMMITMENT_COUNT} commitments.</span>
              </h2>
            </div>
            <label className="relative block w-full max-w-md">
              <span className="sr-only">Search the commitments</span>
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search: power, police, housing, loans…" className="h-12 w-full border border-gray-300 bg-white pl-11 pr-10 text-[15px] outline-none focus:border-gray-900" />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-900"><X size={16} /></button>
              )}
            </label>
          </div>

          {results ? (
            <div className="mt-10">
              <p className="mb-5 text-sm font-bold text-gray-500">{results.length} commitment{results.length === 1 ? '' : 's'} mention “{query.trim()}”</p>
              {results.length === 0 && <p className="border border-dashed border-gray-300 p-8 text-center text-gray-500">Nothing found. Try a shorter word.</p>}
              <ul className="grid gap-3 lg:grid-cols-2">
                {results.map(({ it, g, p }) => (
                  <li key={it.slice(0, 50)} className="border-l-2 bg-white py-4 pl-5 pr-4 shadow-sm ring-1 ring-gray-900/5" style={{ borderColor: p.colour }}>
                    <button type="button" onClick={() => { setQuery(''); choose(p.n); setTab('commit'); setOpen(new Set([p.groups.indexOf(g)])); }} className="text-left text-[10px] font-black uppercase tracking-[0.16em] hover:underline" style={{ color: p.colour }}>
                      Pillar {p.n} · {g.title}
                    </button>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{withFigures(it)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <div role="tablist" aria-label="Pillars" className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
                {RH_PILLARS.map((p) => {
                  const on = p.n === active;
                  return (
                    <button key={p.n} role="tab" type="button" aria-selected={on} onClick={() => choose(p.n, false)} className={`inline-flex min-h-11 shrink-0 items-center gap-2 px-4 text-[11px] font-black uppercase tracking-[0.14em] transition-colors ${on ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} style={on ? { backgroundColor: p.colour } : undefined}>
                      <span className="text-base leading-none" style={BEBAS}>{p.n}</span> {p.short}
                    </button>
                  );
                })}
              </div>

              {/* Banner */}
              <div key={pillar.n} className="relative isolate mt-6 flex min-h-[340px] items-end overflow-hidden bg-black text-white sm:min-h-[420px]">
                <img src={pillar.photo} alt={pillar.photoAlt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover animate-[promise-zoom_12s_ease-out_both]" />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/10" />
                <span className="absolute left-0 top-0 h-1.5 w-full" style={{ backgroundColor: pillar.colour }} />
                <div className="w-full p-6 sm:p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60">Pillar {pillar.n} of 4 · {pillar.priorities}</p>
                  <h3 className="mt-2 max-w-3xl uppercase leading-[0.92]" style={{ ...BEBAS, fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>{pillar.name}</h3>
                  <blockquote className="mt-5 max-w-3xl border-l-4 pl-4 text-base leading-relaxed text-white/85 sm:text-lg" style={{ borderColor: bright(pillar.colour) }}>
                    <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: bright(pillar.colour) }}>Our pledge</span>
                    {pillar.pledge}
                  </blockquote>
                </div>
              </div>

              {pillar.means && (
                <div className="mt-6 flex gap-4 bg-[#F5F3EE] p-5 sm:p-7">
                  <Quote size={26} className="shrink-0 rotate-180" style={{ color: pillar.colour }} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">What this means for Nigerians</p>
                    <p className="mt-2 leading-relaxed text-gray-700">{pillar.means}</p>
                  </div>
                </div>
              )}

              {/* Sub-tabs */}
              <div role="tablist" className="mt-8 grid grid-cols-3 border-b border-gray-200">
                {TABS.map(({ id, label, icon: Icon }) => {
                  const on = tab === id;
                  return (
                    <button key={id} role="tab" type="button" aria-selected={on} onClick={() => setTab(id)} className={`-mb-px flex min-h-12 flex-col items-center justify-center gap-1 border-b-2 px-2 text-[10px] font-black uppercase tracking-[0.12em] transition-colors sm:flex-row sm:gap-2 sm:text-[11px] ${on ? 'text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-700'}`} style={on ? { borderColor: pillar.colour } : undefined}>
                      <Icon size={16} style={on ? { color: pillar.colour } : undefined} /> {label}
                    </button>
                  );
                })}
              </div>

              {tab === 'commit' && (
                <div className="mt-2">
                  {pillar.groups.map((g, i) => (
                    <Group key={g.title} g={g} idx={i} colour={pillar.colour} open={open.has(i)} onToggle={() => toggle(i)} />
                  ))}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-900/10 pt-6">
                    <button type="button" onClick={() => setOpen(new Set(pillar.groups.map((_, i) => i)))} className="text-xs font-black uppercase tracking-[0.18em] text-gray-500 hover:text-gray-900">Open all</button>
                    {pillar.n < 4 && (
                      <button type="button" onClick={() => choose(pillar.n + 1)} className="group inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.12em] text-gray-900">
                        Next: {RH_PILLARS[pillar.n].short}
                        <span className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-1" style={{ backgroundColor: RH_PILLARS[pillar.n].colour }}>
                          <ArrowDown size={16} className="-rotate-90" />
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {tab === 'results' && (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {pillar.progress.map((c, i) => (
                    <li key={c.title} className="relative overflow-hidden bg-[#F5F3EE] p-5">
                      <span className="absolute right-3 top-1 leading-none text-gray-900/[0.06]" style={{ ...BEBAS, fontSize: '5rem' }}>{i + 1}</span>
                      <p className="relative text-lg font-black leading-snug text-gray-900">{c.title}</p>
                      {c.detail && <p className="relative mt-2 text-sm leading-relaxed text-gray-600">{c.detail}</p>}
                    </li>
                  ))}
                </ul>
              )}

              {tab === 'measure' && (
                <div className="mt-6">
                  <p className="mb-4 max-w-2xl text-sm text-gray-500">Each indicator will be published every year, so citizens can hold the government to it.</p>
                  {/* Table on wide screens, stacked cards on phones */}
                  <table className="hidden w-full border-collapse text-left md:table">
                    <thead>
                      <tr className="border-b-2 border-gray-900 text-[11px] font-black uppercase tracking-[0.14em] text-gray-500">
                        <th className="w-1/4 py-3 pr-4">What we will track</th>
                        <th className="w-[37%] py-3 pr-4">Where we are</th>
                        <th className="py-3">Where we will be</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pillar.measures.map((m) => (
                        <tr key={m.what} className="border-b border-gray-200 align-top">
                          <td className="py-4 pr-4 font-black text-gray-900">{m.what}</td>
                          <td className="py-4 pr-4 text-sm text-gray-500">{m.now}</td>
                          <td className="py-4 text-sm font-bold" style={{ color: pillar.colour }}>{m.target}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ul className="space-y-3 md:hidden">
                    {pillar.measures.map((m) => (
                      <li key={m.what} className="bg-[#F5F3EE] p-4">
                        <p className="font-black text-gray-900">{m.what}</p>
                        <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-gray-400">Now</p>
                        <p className="text-sm text-gray-600">{m.now}</p>
                        <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: pillar.colour }}>Target</p>
                        <p className="text-sm font-bold text-gray-900">{m.target}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── A word from the President ────────────────────────────────── */}
      <section className="bg-[#03130A] text-white">
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-20 lg:py-24">
          <img src={META.portrait} alt={META.candidate} loading="lazy" className="mx-auto w-full max-w-sm" />
          <div>
            <SectionLabel tone="gold" className="mb-6">A word from the President</SectionLabel>
            <div className="space-y-5 text-lg leading-relaxed text-white/80 sm:text-xl">
              {PRESIDENT_WORD.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
            <p className="mt-8 leading-none text-[#4ADE80]" style={{ ...BEBAS, fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{META.signoff}</p>
            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/50">{META.candidate}</p>
          </div>
        </div>
      </section>

      {/* ── How we will deliver ──────────────────────────────────────── */}
      <section className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-20 lg:py-24">
        <div>
          <SectionLabel tone="green" className="mb-5">How we will deliver</SectionLabel>
          <h2 className="uppercase leading-[0.9] text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            A promise a citizen <span className="text-[#008A44]">can check</span>
          </h2>
          <ol className="mt-8 space-y-px bg-gray-900/10">
            {DISCIPLINES.map((d, i) => (
              <li key={d.title} className="flex gap-4 bg-[#F5F3EE] py-5 pr-4">
                <span className="w-10 shrink-0 leading-none text-[#008A44]" style={{ ...BEBAS, fontSize: '2.5rem' }}>{i + 1}</span>
                <div>
                  <p className="font-black text-gray-900">{d.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-gray-600">{d.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:p-8">
          <p className="leading-none text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(4rem, 9vw, 6.5rem)' }}>100 <span className="text-[#008A44]">days</span></p>
          <p className="mt-1 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">In the first hundred days, we will:</p>
          <ol className="mt-6 space-y-3">
            {FIRST_100_DAYS.map((d, i) => (
              <li key={d} className="flex gap-3 text-[15px] leading-relaxed text-gray-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#008A44] text-xs font-black text-white">{i + 1}</span>
                {d}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Ticket ───────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-[0.6fr_1.4fr] lg:px-20">
          <div className="relative mx-auto w-full max-w-[260px] overflow-hidden">
            <img src={META.vp} alt={META.runningMate} loading="lazy" className="w-full" />
            <LagosMark className="absolute bottom-0 h-1.5 w-full" />
          </div>
          <div>
            <SectionLabel tone="green" className="mb-4">The ticket</SectionLabel>
            <h2 className="uppercase leading-[0.9] text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>{META.runningMate}</h2>
            <p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-[#008A44]">Running mate · {META.runningMateRole}</p>
            <img src={META.emblem} alt={META.motto} loading="lazy" className="mt-8 w-56 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* ── Close ────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#03130A] py-20 text-center text-white sm:py-28">
        <img src={META.road} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#03130A] via-[#03130A]/70 to-[#03130A]/40" />
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D4A574]">{META.motto}</p>
        <p className="mx-auto mt-6 max-w-4xl px-5 uppercase leading-[0.9]" style={{ ...BEBAS, fontSize: 'clamp(3rem, 9vw, 7rem)' }}>
          Peaceful. Prosperous.
          <br />
          <span className="text-[#4ADE80]">And free.</span>
        </p>
        <p className="mt-6 text-white/70">Presidential election · Saturday 16 January 2027</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 px-5 sm:flex-row">
          <Link to="/campaign" className="inline-flex min-h-12 items-center gap-2 bg-[#4ADE80] px-7 text-[11px] font-black uppercase tracking-[0.22em] text-black hover:bg-white">Follow the campaign</Link>
          <Link to="/lagos-promise" className="inline-flex min-h-12 items-center gap-2 border border-white/30 px-7 text-[11px] font-black uppercase tracking-[0.22em] hover:border-white hover:bg-white hover:text-black">The Lagos PROMISE</Link>
        </div>
        <p className="mx-auto mt-10 max-w-xl px-5 text-[11px] leading-relaxed text-white/35">Source: {META.document}, “From Reforms to Prosperity (Agenda 2027–2031)”. Figures are as reported in the manifesto.</p>
      </section>
    </main>
  );
};

export default RenewedHopePage;
