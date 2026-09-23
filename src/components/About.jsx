import { motion } from 'framer-motion';

import lead800 from '../assets/gallery/ojtinubu-800.jpg';
import lead1280 from '../assets/gallery/ojtinubu-1280.jpg';

/*
  TODO: this section is capped by missing facts, not layout. Each step needs
  its years, the Local Government, the constituency and the ministry. Titles
  alone read as vague; dates and places are what turn a list into a record.

  The layout below is built to absorb that detail — each row has room for a
  `detail` line — so adding it is a data edit, not a redesign.
*/
const PATH = [
  { title: 'Local Government Chairman', detail: null },
  { title: 'Member, National Assembly', detail: null },
  { title: 'Lagos State Commissioner', detail: null },
  { title: 'APC Chairman, Lagos State', detail: null, current: true },
];

/*
  One photograph, not four. The Gallery below carries 45 with a lightbox, so
  repeating a grid here only made the page look like it had less to show than
  it does. This is the frame that earns its place: him with the President.
*/
const LEAD = {
  src: lead1280,
  srcSet: `${lead800} 800w, ${lead1280} 1280w`,
  alt: 'Pastor Cornelius Ojelabi with President Bola Ahmed Tinubu',
  width: 1280,
  height: 852,
};

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
};

const About = () => (
  <section id="about" className="bg-white py-20 sm:py-28">
    <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">

      <motion.div {...reveal} className="mb-12 flex items-center gap-3 sm:mb-16">
        <span className="h-px w-7 bg-[#008A44] sm:w-10" />
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#008A44] sm:text-[11px]">
          Profile
        </h2>
      </motion.div>

      <div className="lg:flex lg:items-start lg:gap-16">

        {/* ── Identity + record ── */}
        <motion.div {...reveal} className="lg:w-[52%] lg:shrink-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-gray-400">
            Pastor
          </p>

          <h3
            className="mt-2 font-black uppercase leading-[0.88] text-gray-900"
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            }}
          >
            <span className="block">Cornelius</span>
            <span className="block text-[#008A44]">Ojelabi</span>
          </h3>

          <div className="mt-6 border-l-2 border-[#D4A574] pl-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gray-900 sm:text-base">
              APC Chairman, Lagos State
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Chairman, Forum of APC State Chairmen of Nigeria
            </p>
          </div>

          {/* The record: hairlines and numerals, no cards. */}
          <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
            The path
          </p>

          <ol className="mt-5 border-t border-gray-200">
            {PATH.map(({ title, detail, current }, i) => (
              <li
                key={title}
                className="flex items-baseline gap-5 border-b border-gray-200 py-5"
              >
                <span
                  className={`shrink-0 text-xs font-black tabular-nums ${
                    current ? 'text-[#008A44]' : 'text-gray-300'
                  }`}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="min-w-0 flex-1">
                  <h4
                    className={`text-base font-bold leading-snug sm:text-lg ${
                      current ? 'text-[#008A44]' : 'text-gray-900'
                    }`}
                  >
                    {title}
                  </h4>
                  {detail && <p className="mt-1 text-sm text-gray-500">{detail}</p>}
                </div>

                {current && (
                  <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.2em] text-[#008A44]">
                    Now
                  </span>
                )}
              </li>
            ))}
          </ol>
        </motion.div>

        {/* ── The photograph ── */}
        <motion.figure {...reveal} className="mt-12 min-w-0 flex-1 lg:sticky lg:top-28 lg:mt-0">
          <img
            src={LEAD.src}
            srcSet={LEAD.srcSet}
            sizes="(max-width: 1024px) 100vw, 45vw"
            alt={LEAD.alt}
            width={LEAD.width}
            height={LEAD.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 border-t border-gray-200 pt-3 text-xs leading-relaxed text-gray-500">
            {LEAD.alt}
          </figcaption>
        </motion.figure>
      </div>
    </div>
  </section>
);

export default About;
