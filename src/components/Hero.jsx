import { ChevronRight, Facebook, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import assets from '../assets/assets';

// Same destinations already published in the Contact section.
const SOCIALS = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/18C16eC7YF/?mibextid=wwXIfr' },
  { icon: Twitter, label: 'Twitter/X', href: 'https://x.com/apcchairman' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/apcchairmanlagos?igsh=dHpiNzBuczFveXE5' },
];

// The photograph is already cropped to the subject, so the only treatment left
// is dissolving its lower edge into the section background instead of ending
// on a hard rectangle.
const PORTRAIT_FADE = {
  maskImage: 'linear-gradient(to bottom, #000 0%, #000 68%, transparent 97%)',
  WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 68%, transparent 97%)',
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#06170D]"
      style={{ minHeight: '100dvh' }}
    >
      {/* ── Ambient wash ──────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-[10%] top-[4%] h-[62vh] w-[62vh] rounded-full bg-[#00A651]/15 blur-[120px]" />
        <div className="absolute bottom-[8%] left-[-8%] h-[38vh] w-[38vh] rounded-full bg-[#D4A574]/10 blur-[110px]" />
      </div>

      {/* ── Portrait ──────────────────────────────────────────────────────
          A background layer at every breakpoint, inset below the fixed navbar
          so his cap and face are never covered.

          Narrow screens go full-bleed. From lg the viewport is far wider than
          this 0.47 portrait, so filling it would show only a vertical sliver —
          instead he sits right-anchored at a readable size with the copy
          clear of him on the left. */}
      <div
        className="absolute inset-x-0 bottom-0 top-20 lg:left-auto lg:right-[3%] lg:top-24 lg:w-[min(40vw,540px)] xl:right-[6%]"
        aria-hidden="true"
      >
        <img
          src={assets.heroPortrait}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[50%_6%] contrast-[1.04] saturate-[0.96] sm:object-[50%_8%] lg:object-[50%_10%]"
          style={PORTRAIT_FADE}
        />
        {/* Settle the photograph into the green ground so the red carpet stops
            reading as a separate block of colour. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06170D] via-[#06170D]/25 to-transparent" />
        {/* Dissolve the side edges from lg up, where the photo no longer bleeds
            off-screen — without these it reads as a pasted rectangle. */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,#06170D_0%,transparent_30%)] lg:block" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_left,#06170D_0%,transparent_16%)] lg:block" />
      </div>

      {/* ── Legibility scrim ──────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-t from-[#06170D] via-[#06170D]/88 to-[#06170D]/40 lg:bg-gradient-to-r lg:from-[#06170D] lg:via-[#06170D]/88 lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#06170D] to-transparent" />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-5 pb-20 pt-28 sm:px-8 sm:pb-24 lg:justify-center lg:px-14 lg:pb-24 lg:pt-32"
        style={{ minHeight: '100dvh' }}
      >
        <div className="w-full lg:max-w-[46%] xl:max-w-[48%]">
          {/* Affiliation */}
          <div className="mb-5 flex flex-wrap items-center gap-3 sm:mb-7">
            <img src={assets.apc2} alt="" aria-hidden="true" className="h-7 w-auto sm:h-8" />
            <span className="h-px w-8 bg-gradient-to-r from-[#D4A574]/80 to-transparent sm:w-10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A574] sm:text-[11px]">
              Chairman · APC Lagos State
            </span>
          </div>

          {/* Name */}
          <h1
            className="font-black leading-[0.92] text-white"
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: 'clamp(2.75rem, 9.5vw, 7rem)',
            }}
          >
            <span className="block">Cornelius</span>
            <span className="block text-[#4ADE80]">Ojelabi</span>
          </h1>

          <span className="mt-5 block h-px w-24 bg-gradient-to-r from-[#00A651] to-transparent sm:mt-6 sm:w-32" />

          {/* National role */}
          <div className="mt-6 border-l-2 border-[#00A651] pl-4 sm:mt-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Also serving as</p>
            <p className="mt-1 text-sm font-bold leading-snug text-white sm:text-base">
              Chairman, Forum of APC State Chairmen of Nigeria
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap sm:mt-10">
            <button
              type="button"
              onClick={() => navigate('/join')}
              className="group flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#D4A574] px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#111] outline-none transition-colors duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06170D] min-[400px]:w-auto sm:text-[11px]"
            >
              Volunteer
              <ChevronRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/appointment')}
              className="group flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white outline-none transition-colors duration-200 hover:border-[#00A651] hover:bg-[#00A651] focus-visible:ring-2 focus-visible:ring-[#00A651] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06170D] min-[400px]:w-auto sm:text-[11px]"
            >
              Book Appointment
              <ChevronRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Socials */}
          <div className="mt-8 flex items-center gap-4 sm:mt-10">
            <span className="h-px w-6 bg-white/25" />
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full p-1.5 text-white/50 outline-none transition-colors duration-200 hover:text-[#D4A574] focus-visible:ring-2 focus-visible:ring-[#D4A574]"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hand-off into the white About section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white sm:h-20" />
    </section>
  );
};

export default Hero;
