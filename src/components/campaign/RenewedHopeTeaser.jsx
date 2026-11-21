import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RH_META as META, RH_PILLARS, RH_COMMITMENT_COUNT } from '../../data/renewedHope';

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };
const bright = (c) => ({ '#0239AE': '#5B8DEF', '#7E1D3A': '#E35A84', '#008A44': '#4ADE80', '#C2410C': '#FB923C' }[c] || c);

// Band on the Campaign page that leads into /renewed-hope.
const RenewedHopeTeaser = () => (
  <section id="renewed-hope" className="relative isolate overflow-hidden bg-[#03130A] text-white">
    <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(50% 90% at 10% 20%, rgba(0,138,68,0.45), transparent 70%)' }} />
    <div className="mx-auto grid max-w-[1500px] items-end gap-8 px-5 pt-16 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-20 lg:pt-20">
      <div className="pb-14 lg:pb-20">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A574]">{META.agenda} · The presidential manifesto</p>
        <h2 className="mt-4 uppercase leading-[0.86]" style={{ ...BEBAS, fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
          From Reforms <span className="text-[#4ADE80]">to Prosperity</span>
        </h2>
        <p className="mt-4 max-w-xl text-white/70">
          {META.candidate}’s plan for 2027–2031: {RH_COMMITMENT_COUNT} commitments across four pillars, each with targets
          Nigerians can track.
        </p>
        <div className="mt-8 grid max-w-xl grid-cols-2 gap-1.5 sm:grid-cols-4">
          {RH_PILLARS.map((p) => (
            <Link key={p.n} to={`/renewed-hope#pillar-${p.n}`} className="group flex items-center gap-2 bg-white/[0.06] px-3 py-3 transition-colors hover:bg-white/15">
              <span className="leading-none" style={{ ...BEBAS, fontSize: '2.2rem', color: bright(p.colour) }}>{p.n}</span>
              <span className="text-[10px] font-bold uppercase leading-tight tracking-[0.1em] text-white/70">{p.short}</span>
            </Link>
          ))}
        </div>
        <Link to="/renewed-hope" className="group mt-9 inline-flex min-h-12 items-center gap-3 bg-[#4ADE80] px-7 text-[11px] font-black uppercase tracking-[0.22em] text-black transition-colors hover:bg-white">
          Read the manifesto
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <img src={META.hero} alt={META.candidate} loading="lazy" className="mx-auto hidden w-full max-w-xs self-end [mask-image:linear-gradient(to_bottom,black_75%,transparent)] sm:block" />
    </div>
  </section>
);

export default RenewedHopeTeaser;
