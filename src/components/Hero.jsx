import { useCallback, useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

import { HERO_SLIDES, SLIDE_MS } from '../data/heroSlides';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import HeroBackdrop from './hero/HeroBackdrop';

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const Hero = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slide = HERO_SLIDES[index];

  const go = useCallback((i) => setIndex(((i % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  /*
    Auto-advance, but never against the visitor: it stops while the pointer is
    over the hero or a control has focus, and does not run at all when the OS
    asks for reduced motion.
  */
  useEffect(() => {
    if (reducedMotion || paused) return undefined;
    const t = setTimeout(() => go(index + 1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, reducedMotion, go]);

  /*
    No overflow-hidden on the section: on short landscape phones the copy is
    taller than 100dvh, and clipping would cut the CTAs off. The backdrop
    clips its own Ken Burns scale instead.
  */
  return (
    <section
      id="home"
      className="relative isolate flex flex-col bg-[#04100A]"
      style={{ minHeight: '100dvh' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <HeroBackdrop index={index} reducedMotion={reducedMotion} />

      {/* Vertical rule + place marker, left edge (desktop only) */}
      <div className="pointer-events-none absolute inset-y-0 left-7 z-10 hidden items-center lg:flex" aria-hidden="true">
        <div className="flex flex-col items-center gap-5">
          <span className="h-24 w-px bg-gradient-to-b from-transparent to-white/30" />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/40"
            style={{ writingMode: 'vertical-rl' }}
          >
            Lagos State
          </span>
          <span className="h-24 w-px bg-gradient-to-t from-transparent to-white/30" />
        </div>
      </div>

      {/* ── Composition ─────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-12 lg:px-20 lg:pb-16">

        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="h-px w-7 bg-[#D4A574] sm:w-10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574] sm:text-[11px]">
              APC Lagos State
            </span>
          </div>

          {/* Editorial scale: three deliberately different weights and sizes. */}
          <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/55 sm:text-sm">
            Pastor
          </p>

          <h1
            className="mt-2 font-black uppercase leading-[0.85] text-white sm:mt-3"
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              /* 2.5rem floor, not 3rem: if Bebas Neue fails the fallback is
                 Arial Black, which is far wider and overruns 320px screens. */
              fontSize: 'clamp(2.5rem, 10.5vw, 9.5rem)',
            }}
          >
            <span className="block">Cornelius</span>
            <span className="block text-[#4ADE80]">Ojelabi</span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-7">
            <span className="text-sm font-bold uppercase tracking-[0.28em] text-white sm:text-base">
              State Chairman
            </span>
            <span className="hidden h-3.5 w-px bg-white/25 sm:block" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/55 sm:text-xs">
              All Progressives Congress
            </span>
          </div>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/65 sm:mt-6 sm:text-[15px]">
            Leading the party&apos;s structure across Lagos State, and Chairman of the Forum of
            APC State Chairmen of Nigeria.
          </p>

          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row sm:mt-10">
            <button
              type="button"
              onClick={() => scrollTo('about')}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-none border border-[#D4A574] bg-[#D4A574] px-6 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#0b0b0b] outline-none transition-colors duration-200 hover:bg-transparent hover:text-[#D4A574] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04100A]"
            >
              Explore the Journey
            </button>
            <button
              type="button"
              onClick={() => scrollTo('gallery')}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-none border border-white/30 px-6 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-white outline-none transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#0b0b0b] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04100A]"
            >
              Leadership Moments
            </button>
          </div>
        </div>

        {/* ── Detail layer: chapter readout + progress ───────────────── */}
        <div className="mt-10 flex items-end justify-between gap-6 border-t border-white/12 pt-5 sm:mt-12 sm:pt-6">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black tabular-nums text-white sm:text-xl">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[11px] tabular-nums text-white/35">
                / {String(HERO_SLIDES.length).padStart(2, '0')}
              </span>
              <span className="ml-1 truncate text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A574] sm:text-[11px]">
                {slide.category}
              </span>
            </div>
            <p className="mt-1.5 truncate text-xs text-white/45">{slide.caption}</p>
          </div>

          {/* Chapter selector. Real buttons, so it is keyboard reachable. */}
          <div className="flex shrink-0 items-center gap-2">
            {HERO_SLIDES.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show chapter ${i + 1}: ${s.category}`}
                  aria-current={active ? 'true' : undefined}
                  className="group relative h-11 w-7 outline-none sm:w-10"
                >
                  <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden bg-white/20 transition-colors group-hover:bg-white/45 group-focus-visible:bg-white">
                    <span
                      className="block h-full bg-[#D4A574]"
                      style={{
                        width: active ? '100%' : '0%',
                        transition:
                          active && !reducedMotion && !paused
                            ? `width ${SLIDE_MS}ms linear`
                            : 'width 200ms ease',
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        onClick={() => scrollTo('lagos-data')}
        className="group relative z-10 mx-auto flex w-full items-center justify-center gap-2 pb-6 text-[9px] font-bold uppercase tracking-[0.35em] text-white/40 outline-none transition-colors hover:text-white focus-visible:text-white sm:text-[10px]"
      >
        Scroll to explore
        <ArrowDown
          size={12}
          className="transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none"
        />
      </button>
    </section>
  );
};

export default Hero;
