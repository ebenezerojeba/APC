import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROMISE_META as META, PILLARS, PLEDGE_COUNT } from '../../data/lagosPromise';

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };
const tone = (c) => (c === '#0239AE' ? '#5B8DEF' : c);

// Band on the Campaign page that leads into /lagos-promise.
const PromiseTeaser = () => (
  <section id="lagos-promise" className="relative isolate overflow-hidden bg-black text-white">
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{ background: 'radial-gradient(50% 90% at 10% 20%, rgba(2,57,174,0.5), transparent 70%)' }}
    />
    <div className="mx-auto grid max-w-[1500px] items-end gap-8 px-5 pt-16 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-20 lg:pt-20">
      <div className="pb-14 lg:pb-20">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFC700]">
          {META.yoruba} · The governorship manifesto
        </p>
        <h2 className="mt-4 uppercase leading-[0.86]" style={{ ...BEBAS, fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
          The Lagos Promise
        </h2>
        <p className="mt-4 max-w-xl text-white/70">
          {META.candidate}’s plan for 2027–2031: {PLEDGE_COUNT} pledges across seven pillars, each with a
          baseline Lagosians can check.
        </p>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {PILLARS.map((p) => (
            <Link
              key={p.letter}
              to={`/lagos-promise#pillar-${p.letter}`}
              title={p.name}
              className="group flex h-16 w-14 flex-col items-center justify-center bg-white/[0.06] transition-colors hover:bg-white/15 sm:h-20 sm:w-[4.5rem]"
            >
              <span className="leading-none transition-transform group-hover:-translate-y-0.5" style={{ ...BEBAS, fontSize: '2.6rem', color: tone(p.colour) }}>
                {p.letter}
              </span>
              <span className="hidden text-[8px] font-bold uppercase tracking-[0.1em] text-white/50 sm:block">
                {p.name.split(' ')[0]}
              </span>
            </Link>
          ))}
        </div>

        <Link
          to="/lagos-promise"
          className="group mt-9 inline-flex min-h-12 items-center gap-3 bg-[#FFC700] px-7 text-[11px] font-black uppercase tracking-[0.22em] text-black transition-colors hover:bg-white"
        >
          Explore the PROMISE
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <img
        src={META.hero}
        alt={META.candidate}
        loading="lazy"
        className="mx-auto hidden w-full max-w-sm self-end [mask-image:linear-gradient(to_bottom,black_80%,transparent)] sm:block"
      />
    </div>
  </section>
);

export default PromiseTeaser;
