import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, ChevronDown } from 'lucide-react';

import {
  CONSTITUTION_META,
  SECTIONS,
  MOTTO,
  SLOGAN,
  PARTY_LEVELS,
  LEVELS_NOTE,
} from '../data/constitution';

const SectionList = ({ items }) => (
  <ol className="mt-5 space-y-4">
    {items.map((item, i) => {
      const text = typeof item === 'string' ? item : item.text;
      const children = typeof item === 'string' ? null : item.children;
      return (
        <li key={i} className="flex gap-4">
          <span className="mt-0.5 w-6 shrink-0 text-right text-xs font-bold tabular-nums text-[#008A44]">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="leading-relaxed text-gray-700">{text}</p>
            {children && (
              <ol className="mt-3 space-y-2 border-l-2 border-gray-200 pl-5">
                {children.map((c, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-xs font-bold text-gray-400">
                      {String.fromCharCode(97 + j)}
                    </span>
                    <p className="leading-relaxed text-gray-600">{c}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </li>
      );
    })}
  </ol>
);

/* The seven levels, drawn bottom-up the way the document lists them. */
const Hierarchy = () => (
  <ol className="mt-6">
    {PARTY_LEVELS.map((level, i) => (
      <li key={level} className="relative flex items-center gap-4 pb-6 last:pb-0">
        {i < PARTY_LEVELS.length - 1 && (
          <span className="absolute left-[15px] top-8 h-full w-px bg-gray-200" aria-hidden="true" />
        )}
        <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#008A44] text-[11px] font-bold text-white">
          {i + 1}
        </span>
        <span className="font-semibold text-gray-900">{level}</span>
      </li>
    ))}
  </ol>
);

const ConstitutionPage = () => {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      // Narrow band near the top, so "active" means the heading you are reading.
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white">
      {/* ── Document header ─────────────────────────────────────────── */}
      <header className="bg-[#04100A] px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 outline-none transition-colors hover:text-white focus-visible:text-white"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#D4A574]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574] sm:text-[11px]">
              Official Documents / 01
            </span>
          </div>

          <h1
            className="mt-5 font-black uppercase leading-[0.9] text-white"
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
            }}
          >
            <span className="block">APC</span>
            <span className="block text-[#4ADE80]">Constitution</span>
          </h1>

          <p className="mt-6 max-w-2xl leading-relaxed text-white/65">
            {CONSTITUTION_META.description}
          </p>

          {/* Motto and slogan, as stated at the head of the document */}
          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.25em] text-white/40">Motto</dt>
              <dd className="mt-1 text-sm font-bold uppercase tracking-wider text-white">{MOTTO}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.25em] text-white/40">Slogan</dt>
              <dd className="mt-1 text-sm font-bold uppercase tracking-wider text-[#D4A574]">{SLOGAN}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-white/55">
              <FileText size={18} className="shrink-0 text-[#D4A574]" />
              <span className="text-xs">
                {CONSTITUTION_META.fileType} · {CONSTITUTION_META.fileSize} ·{' '}
                {CONSTITUTION_META.category}
              </span>
            </div>
            <a
              href={CONSTITUTION_META.fileUrl}
              download={CONSTITUTION_META.fileName}
              className="group inline-flex min-h-11 items-center justify-center gap-2 border border-[#D4A574] bg-[#D4A574] px-6 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#0b0b0b] outline-none transition-colors duration-200 hover:bg-transparent hover:text-[#D4A574] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04100A] sm:text-[11px]"
            >
              <Download size={14} />
              Download document
            </a>
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="lg:flex lg:gap-14">

          {/* Contents — sticky on desktop, a native disclosure on mobile */}
          <nav aria-label="Document contents" className="lg:w-56 lg:shrink-0">
            <details className="group border-y border-gray-200 lg:hidden" open={false}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">
                Contents
                <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
              </summary>
              <ol className="pb-4">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex min-h-11 items-center gap-3 text-sm text-gray-600 hover:text-[#008A44]"
                    >
                      <span className="text-[10px] font-bold tabular-nums text-gray-400">{s.number}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <ol className="sticky top-28 hidden lg:block">
              {SECTIONS.map((s) => {
                const active = activeId === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={active ? 'true' : undefined}
                      className={`flex gap-3 border-l-2 py-2.5 pl-4 text-sm transition-colors ${
                        active
                          ? 'border-[#008A44] font-semibold text-[#008A44]'
                          : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900'
                      }`}
                    >
                      <span className="text-[10px] font-bold tabular-nums opacity-60">{s.number}</span>
                      {s.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Provisions */}
          <div className="min-w-0 flex-1">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-b border-gray-200 py-10 first:pt-6 last:border-b-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-black tabular-nums text-[#008A44]">
                    {section.number}
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 sm:text-3xl">
                    {section.title}
                  </h2>
                </div>

                {section.lead && (
                  <p className="mt-4 leading-relaxed text-gray-600">{section.lead}</p>
                )}

                {section.levels ? (
                  <>
                    <Hierarchy />
                    <p className="mt-6 border-l-2 border-[#D4A574] pl-4 text-sm leading-relaxed text-gray-500">
                      {LEVELS_NOTE}
                    </p>
                  </>
                ) : (
                  <SectionList items={section.items} />
                )}
              </section>
            ))}

            <p className="mt-10 border-t border-gray-200 pt-6 text-xs leading-relaxed text-gray-400">
              Provisions reproduced from {CONSTITUTION_META.fileName}. Text is presented as supplied,
              without paraphrase or interpretation. Download the document above for the source.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConstitutionPage;
