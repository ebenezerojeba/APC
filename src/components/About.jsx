import { motion } from 'framer-motion';
import assets from '../assets/assets';

// TODO: add real detail to each step — years, the Local Government, the
// constituency, the ministry. Titles alone read as vague; dates and places are
// what make this a record rather than a list.
const PATH = [
  { title: 'Local Government Chairman' },
  { title: 'Member, National Assembly' },
  { title: 'Lagos State Commissioner' },
  { title: 'APC Chairman, Lagos State', current: true },
];

// Four chosen for what they each show — proximity to the President, the party
// leadership, and him actually working a room. TODO: captions naming the event,
// place and date would add more than any amount of prose.
const LEAD = {
  src: assets.ojtinubu,
  alt: 'Pastor Cornelius Ojelabi with President Bola Ahmed Tinubu',
};

const PHOTOS = [
  { src: assets.ojgroup, alt: 'Pastor Cornelius Ojelabi with President Tinubu and party leaders' },
  { src: assets.chair1, alt: "Pastor Cornelius Ojelabi addressing a party stakeholders' meeting" },
  { src: assets.oj34, alt: 'Pastor Cornelius Ojelabi speaking at a party gathering' },
];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
};

const About = () => (
  <section id="about" className="overflow-hidden bg-white py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      {/* ── Header ── */}
      <motion.div {...reveal} className="max-w-3xl">
        <div className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#008A44]">
          <span className="h-1 w-8 bg-[#008A44]" />
          Profile
        </div>
        <h2
          className="text-4xl font-black uppercase leading-tight text-gray-900 md:text-6xl"
          style={{ fontFamily: 'Impact, sans-serif' }}
        >
          Pastor <span className="text-[#008A44]">Cornelius Ojelabi</span>
        </h2>
        <p className="mt-4 border-l-4 border-amber-400 pl-4 text-base font-bold text-[#008A44] sm:text-lg">
          APC Chairman, Lagos State
          <span className="block font-medium text-gray-500">
            Chairman, Forum of APC State Chairmen of Nigeria
          </span>
        </p>
      </motion.div>

      {/* ── The path ──────────────────────────────────────────────────────
          Four short steps laid out wide rather than stacked in a tall column,
          so the shape of the block matches the amount of content in it. */}
      <motion.div {...reveal} className="mt-12 sm:mt-16">
        <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gray-400">
          The path
        </p>

        {/* gap-px over a grey ground draws the hairline dividers */}
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
          {PATH.map(({ title, current }, i) => (
            <li
              key={title}
              className={`flex flex-col justify-between gap-6 p-6 ${
                current ? 'bg-[#008A44]' : 'bg-white'
              }`}
            >
              <span
                className={`text-sm font-black tabular-nums ${
                  current ? 'text-white/60' : 'text-gray-300'
                }`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div>
                <h3
                  className={`text-lg font-bold leading-snug ${
                    current ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {title}
                </h3>
                {current && (
                  <span className="mt-2 inline-block rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                    Now
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* ── Photographs ── */}
      <motion.div {...reveal} className="mt-12 sm:mt-16">
        <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gray-400">
          In office
        </p>

        <figure className="group overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={LEAD.src}
            alt={LEAD.alt}
            loading="lazy"
            decoding="async"
            className="aspect-3/2 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-2/1"
          />
        </figure>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {PHOTOS.map(({ src, alt }) => (
            <figure key={src} className="group overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="aspect-3/2 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </motion.div>

    </div>
  </section>
);

export default About;
