import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Play, X, Clock, Link2, Check, Quote } from 'lucide-react';

import SectionLabel from './SectionLabel';
import LagosMark from './LagosMark';

/*
  The newsroom. Articles come from the admin API and carry no images, so the
  design leans on type and colour instead: a headline ticker, a lead story
  set large, numbered "more stories", and a card grid for the rest.

  Each story is shareable: opening one puts ?story=<id> in the address bar,
  and loading the site with that parameter opens it straight away.
*/

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };

const CATEGORY = {
  'Official Statement': { colour: '#008A44', soft: 'bg-emerald-50 text-emerald-800' },
  Mobilization: { colour: '#0239AE', soft: 'bg-blue-50 text-blue-800' },
  Registration: { colour: '#D97706', soft: 'bg-amber-50 text-amber-800' },
  Obituary: { colour: '#4B5563', soft: 'bg-gray-100 text-gray-700' },
};
const cat = (c) => CATEGORY[c] || CATEGORY['Official Statement'];

const VIDEO = {
  id: 'RhQ0YFfNF6c',
  title: 'Building a Greater Lagos Together',
  description: 'Pastor Cornelius Ojelabi outlines the strategic vision for the 2026–2027 political cycle.',
};

const _raw = import.meta.env.VITE_API_URL;
const API_BASE = _raw && _raw !== 'undefined' ? _raw.replace(/\/$/, '') : 'https://apcbackend.vercel.app/api';

// ── helpers ────────────────────────────────────────────────────────────────

// Dates arrive as "YYYY-MM-DD" or free text like "Mar 9, 2026".
const parseDate = (s) => {
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
};
const fmtDate = (s, opts = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  const d = parseDate(s);
  return d ? new Intl.DateTimeFormat('en-GB', opts).format(d) : s;
};

const paragraphsOf = (a) => (a.fullContent?.paragraphs ?? a.paragraphs ?? []).filter(Boolean);
const authorOf = (a) => a.fullContent?.author ?? a.author ?? '';
const roleOf = (a) => a.fullContent?.role ?? a.role ?? '';
const idOf = (a) => String(a._id ?? a.id);

const readMinutes = (a) => {
  const words = paragraphsOf(a).join(' ').split(/\s+/).filter(Boolean).length || a.excerpt?.split(/\s+/).length || 0;
  return Math.max(1, Math.round(words / 200));
};

const initials = (name) =>
  name
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w) && !/^(Hon|Mogaji|Dr|Pastor|Chief|Sen|Mr|Mrs)\.?$/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('') || 'AP';

const storyUrl = (a) => `${window.location.origin}/?story=${encodeURIComponent(idOf(a))}`;

// ── pieces ─────────────────────────────────────────────────────────────────

const CategoryTag = ({ category, onDark = false }) => (
  <span
    className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] ${
      onDark ? 'text-white/80' : 'text-gray-500'
    }`}
  >
    <span className="h-2 w-2" style={{ backgroundColor: cat(category).colour }} />
    {category}
  </span>
);

const Byline = ({ article, onDark = false }) => {
  const author = authorOf(article);
  if (!author) return null;
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${
          onDark ? 'bg-white/10 text-white' : 'bg-gray-900 text-white'
        }`}
      >
        {initials(author)}
      </span>
      <div className="min-w-0">
        <p className={`truncate text-sm font-bold ${onDark ? 'text-white' : 'text-gray-900'}`}>{author}</p>
        {roleOf(article) && (
          <p className={`truncate text-xs ${onDark ? 'text-white/50' : 'text-gray-500'}`}>{roleOf(article)}</p>
        )}
      </div>
    </div>
  );
};

const Ticker = ({ articles, onOpen }) => {
  if (articles.length === 0) return null;
  const loop = [...articles, ...articles];
  return (
    <div className="flex items-stretch overflow-hidden bg-[#04100A] text-white">
      <span className="relative z-10 flex shrink-0 items-center gap-2 bg-[#EB001F] px-4 text-[10px] font-black uppercase tracking-[0.22em] sm:px-6">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        Latest
      </span>
      <div className="group relative flex-1 overflow-hidden">
        <ul className="news-marquee flex w-max items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((a, i) => (
            <li key={`${idOf(a)}-${i}`} className="flex items-center" aria-hidden={i >= articles.length || undefined}>
              <button
                type="button"
                tabIndex={i >= articles.length ? -1 : 0}
                onClick={() => onOpen(a)}
                className="whitespace-nowrap px-6 py-3.5 text-[13px] font-bold text-white/85 transition-colors hover:text-[#4ADE80]"
              >
                {a.title}
              </button>
              <span className="text-[#D4A574]" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const LeadStory = ({ article, onOpen }) => {
  const d = parseDate(article.date);
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative isolate flex h-full flex-col overflow-hidden bg-[#04100A] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transition-opacity duration-500 group-hover:opacity-100 opacity-80"
        style={{
          background:
            'radial-gradient(70% 60% at 100% 0%, rgba(0,138,68,0.45), transparent 70%), radial-gradient(50% 50% at 0% 100%, rgba(212,165,116,0.16), transparent 70%)',
        }}
      />
      <Quote
        aria-hidden="true"
        className="absolute -right-6 -top-6 -z-10 h-56 w-56 rotate-180 text-white/[0.04] sm:h-72 sm:w-72"
        strokeWidth={1}
      />
      <LagosMark className="h-1.5 w-full" />

      <div className="flex flex-1 flex-col p-6 sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="inline-block bg-[#D4A574] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#111]">
              Top story
            </span>
            <div className="mt-4">
              <CategoryTag category={article.category} onDark />
            </div>
          </div>
          {d && (
            <div className="text-right leading-none">
              <span className="block text-white" style={{ ...BEBAS, fontSize: 'clamp(3.5rem, 8vw, 5.5rem)' }}>
                {d.getDate()}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                {fmtDate(article.date, { month: 'short', year: 'numeric' })}
              </span>
            </div>
          )}
        </div>

        <h3
          className="mt-8 font-black leading-[1.08] tracking-tight text-white sm:mt-10"
          style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.6rem)' }}
        >
          <button type="button" onClick={() => onOpen(article)} className="text-left outline-none after:absolute after:inset-0 focus-visible:underline">
            {article.title}
          </button>
        </h3>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/65 line-clamp-4">{article.excerpt}</p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-10">
          <Byline article={article} onDark />
          <span className="relative z-10 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#4ADE80]">
            <Clock size={13} /> {readMinutes(article)} min read
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4ADE80] text-[#04100A] transition-transform duration-300 group-hover:-rotate-45">
              <ArrowRight size={18} />
            </span>
          </span>
        </div>
      </div>
    </motion.article>
  );
};

const VideoCard = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden bg-[#04100A]">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO.id}?rel=0&modestbranding=1&autoplay=1`}
          title={VIDEO.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 text-left"
          aria-label={`Play video: ${VIDEO.title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${VIDEO.id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#04100A] via-[#04100A]/50 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EB001F] shadow-2xl transition-transform group-hover:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#EB001F]/40 motion-reduce:animate-none" />
            <Play size={22} className="relative ml-1 fill-white text-white" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-5">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A574]">Watch</span>
            <span className="mt-1 block text-lg font-black leading-tight text-white">{VIDEO.title}</span>
          </span>
        </button>
      )}
    </div>
  );
};

const NumberedStory = ({ article, n, onOpen }) => (
  <li className="group relative flex gap-4 border-t border-gray-900/10 py-5">
    <span
      className="w-12 shrink-0 leading-none text-transparent transition-colors duration-300 group-hover:text-[#008A44]"
      style={{ ...BEBAS, fontSize: '3rem', WebkitTextStroke: '1.5px #008A44' }}
      aria-hidden="true"
    >
      {String(n).padStart(2, '0')}
    </span>
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <CategoryTag category={article.category} />
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">{fmtDate(article.date)}</span>
      </div>
      <h4 className="mt-1.5 font-black leading-snug text-gray-900 transition-colors group-hover:text-[#008A44]">
        <button type="button" onClick={() => onOpen(article)} className="text-left outline-none after:absolute after:inset-0 focus-visible:underline">
          {article.title}
        </button>
      </h4>
    </div>
  </li>
);

const StoryCard = ({ article, onOpen, i }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
    className="group relative flex flex-col bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
  >
    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.25] transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: cat(article.category).colour }} />
    <div className="flex items-center justify-between gap-3">
      <CategoryTag category={article.category} />
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">{fmtDate(article.date)}</span>
    </div>
    <h4 className="mt-4 text-lg font-black leading-snug text-gray-900 transition-colors group-hover:text-[#008A44]">
      <button type="button" onClick={() => onOpen(article)} className="text-left outline-none after:absolute after:inset-0 focus-visible:underline">
        {article.title}
      </button>
    </h4>
    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">{article.excerpt}</p>
    <div className="mt-auto flex items-center justify-between pt-6 text-[10px] font-black uppercase tracking-[0.18em]">
      <span className="text-gray-400">{readMinutes(article)} min read</span>
      <span className="inline-flex items-center gap-1 text-[#008A44]">
        Read <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </div>
  </motion.article>
);

// ── reader ─────────────────────────────────────────────────────────────────

const ShareBar = ({ article }) => {
  const [copied, setCopied] = useState(false);
  const url = storyUrl(article);
  const text = `${article.title} | APC Lagos`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked; nothing to do */ }
  };
  const btn = 'inline-flex h-9 items-center gap-1.5 px-3 text-[10px] font-black uppercase tracking-[0.14em] transition-colors';
  return (
    <div className="flex flex-wrap gap-2">
      <a className={`${btn} bg-[#25D366] text-white hover:bg-[#1da851]`} href={`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a className={`${btn} bg-black text-white hover:bg-gray-800`} href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
        Post on X
      </a>
      <a className={`${btn} bg-[#1877F2] text-white hover:bg-[#0f63d1]`} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
      <button type="button" onClick={copy} className={`${btn} border border-gray-300 text-gray-700 hover:border-gray-900`}>
        {copied ? <Check size={13} /> : <Link2 size={13} />} {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  );
};

const Reader = ({ article, onClose }) => {
  const scroller = useRef(null);
  const [progress, setProgress] = useState(0);
  const paras = paragraphsOf(article);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 1);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reader-title"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { type: 'spring', damping: 28, stiffness: 260 } }}
        exit={{ y: 40, opacity: 0, transition: { duration: 0.15 } }}
        className="relative flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl sm:max-h-[90vh]"
      >
        {/* reading progress */}
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gray-100">
          <div className="h-full bg-[#008A44] transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
        </div>

        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-4 z-20 flex h-10 w-10 items-center justify-center bg-white/90 text-gray-700 shadow ring-1 ring-gray-200 transition-colors hover:bg-gray-900 hover:text-white"
        >
          <X size={18} />
        </button>

        <div ref={scroller} onScroll={onScroll} className="overflow-y-auto overscroll-contain">
          <header className="relative isolate overflow-hidden bg-[#04100A] px-6 pb-8 pt-12 text-white sm:px-12 sm:pt-14">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10"
              style={{ background: 'radial-gradient(70% 80% at 100% 0%, rgba(0,138,68,0.4), transparent 70%)' }}
            />
            <CategoryTag category={article.category} onDark />
            <h2 id="reader-title" className="mt-4 pr-8 text-2xl font-black leading-tight sm:text-4xl">
              {article.title}
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Byline article={article} onDark />
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                {fmtDate(article.date, { day: 'numeric', month: 'long', year: 'numeric' })} · {readMinutes(article)} min read
              </span>
            </div>
          </header>
          <LagosMark className="h-1 w-full" />

          <div className="px-6 py-8 sm:px-12 sm:py-10">
            {paras.length === 0 && <p className="text-gray-700">{article.excerpt}</p>}
            {paras.map((p, i) =>
              p.split(/\n{2,}/).map((chunk, j) => (
                <p
                  key={`${i}-${j}`}
                  className={`mb-5 text-[15px] leading-[1.8] text-gray-700 sm:text-[17px] ${
                    i === 0 && j === 0
                      ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-[#008A44]'
                      : ''
                  }`}
                >
                  {chunk.trim()}
                </p>
              )),
            )}

            <div className="mt-10 border-t border-gray-200 pt-6">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Share this story</p>
              <ShareBar article={article} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── skeleton ───────────────────────────────────────────────────────────────

const Skeleton = () => (
  <div className="grid animate-pulse gap-6 lg:grid-cols-12">
    <div className="h-[420px] bg-gray-900/10 lg:col-span-7" />
    <div className="space-y-4 lg:col-span-5">
      <div className="aspect-video bg-gray-900/10" />
      {[0, 1, 2].map((i) => <div key={i} className="h-16 bg-gray-900/5" />)}
    </div>
  </div>
);

// ── section ────────────────────────────────────────────────────────────────

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let alive = true;
    fetch(`${API_BASE}/news?limit=10`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load news');
        return r.json();
      })
      .then((d) => {
        if (!alive) return;
        const list = d.data || [];
        setArticles(list);
        // Deep link: /?story=<id> opens that story once the list arrives.
        const id = new URLSearchParams(window.location.search).get('story');
        const hit = id && list.find((a) => idOf(a) === id);
        if (hit) {
          setSelected(hit);
          requestAnimationFrame(() => document.getElementById('news')?.scrollIntoView({ block: 'start' }));
        }
      })
      .catch((e) => {
        // A CORS refusal surfaces here as "Failed to fetch": check the API allowlist.
        console.error('News failed to load from', API_BASE, e);
        if (alive) setError(e.message);
      })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const open = useCallback((a) => {
    setSelected(a);
    const url = new URL(window.location.href);
    url.searchParams.set('story', idOf(a));
    window.history.replaceState(null, '', url);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('story');
    window.history.replaceState(null, '', url);
  }, []);

  const categories = useMemo(() => [...new Set(articles.map((a) => a.category))], [articles]);
  const shown = useMemo(
    () => (filter === 'all' ? articles : articles.filter((a) => a.category === filter)),
    [articles, filter],
  );
  const [lead, ...rest] = shown;
  const side = rest.slice(0, 3);
  const grid = rest.slice(3);

  return (
    <>
      <section id="news" aria-labelledby="news-heading" className="bg-[#F5F3EE]">
        <Ticker articles={articles.slice(0, 6)} onOpen={open} />

        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24 lg:px-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel as="p" tone="green" className="mb-5">Newsroom · Lagos APC</SectionLabel>
              <h2
                id="news-heading"
                className="uppercase leading-[0.86] text-gray-900"
                style={{ ...BEBAS, fontSize: 'clamp(3.25rem, 9vw, 7.5rem)' }}
              >
                Making
                <br />
                <span className="text-[#008A44]">Headlines</span>
              </h2>
            </div>

            <div className="lg:max-w-md">
              <p className="text-base leading-relaxed text-gray-600">
                Statements, campaign updates and press releases from the Lagos State chapter.
              </p>
              {categories.length > 1 && (
                <div role="group" aria-label="Filter stories" className="mt-5 flex flex-wrap gap-2">
                  {['all', ...categories].map((c) => {
                    const active = filter === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setFilter(c)}
                        className={`min-h-9 px-4 text-[10px] font-black uppercase tracking-[0.16em] transition-colors ${
                          active ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900'
                        }`}
                      >
                        {c === 'all' ? 'All stories' : c}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            {loading && <Skeleton />}

            {!loading && error && (
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="flex min-h-64 flex-col justify-center bg-white p-10 lg:col-span-7">
                  <p className="text-lg font-black text-gray-900">The newsroom is taking a breather.</p>
                  <p className="mt-2 text-sm text-gray-500">Stories could not be loaded just now. Please check back shortly.</p>
                </div>
                <div className="lg:col-span-5"><VideoCard /></div>
              </div>
            )}

            {!loading && !error && !lead && (
              <p className="bg-white p-10 text-center text-sm text-gray-500">No stories published yet.</p>
            )}

            {!loading && !error && lead && (
              <>
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-7">
                    <LeadStory article={lead} onOpen={open} />
                  </div>
                  <div className="lg:col-span-5">
                    <VideoCard />
                    <p className="mt-3 text-xs leading-relaxed text-gray-500">{VIDEO.description}</p>
                    {side.length > 0 && (
                      <>
                        <p className="mb-1 mt-8 text-[10px] font-black uppercase tracking-[0.22em] text-gray-900">More stories</p>
                        <ol>
                          {side.map((a, i) => (
                            <NumberedStory key={idOf(a)} article={a} n={i + 2} onOpen={open} />
                          ))}
                        </ol>
                      </>
                    )}
                  </div>
                </div>

                {grid.length > 0 && (
                  <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {grid.map((a, i) => (
                      <StoryCard key={idOf(a)} article={a} onOpen={open} i={i} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>{selected && <Reader article={selected} onClose={close} />}</AnimatePresence>
    </>
  );
};

export default News;
