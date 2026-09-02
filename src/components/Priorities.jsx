import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/*
  DRAFTED COPY — needs the Chairman's sign-off before it is treated as his word.

  Written to the office he actually holds. A party chairman does not build
  roads or run ministries; his powers are structure, membership, primaries and
  discipline. Promises borrowed from a governor's manifesto would read as
  filler here, which is why none appear below.

  No figures are asserted (ward counts, membership targets, dates) because
  none could be verified. Add them where they exist — a real number in any of
  these four would sharpen it considerably.
*/

const LEAD =
  'A party is only as strong as its weakest ward. My job is not to speak for Lagos — the people we elect do that. It is to make sure the structure that puts them there is honest, organised, and answerable.';

const PRIORITIES = [
  {
    title: 'Structure to the last polling unit',
    body: 'Lagos is won and lost at the polling unit, not the podium. Every ward executive active, reachable and accountable for its own units — not a name on a list at the secretariat.',
  },
  {
    title: 'A membership register worth the name',
    body: 'A verified register, kept current and held digitally, so the party knows who its members are and where they vote. A party that cannot count its own members cannot plan for them.',
  },
  {
    title: 'Primaries that settle arguments',
    body: 'Congresses and primaries run to a published rulebook, with results aspirants can accept. Most defections begin with a primary somebody could not trust; a grievance heard early costs far less than a court case later.',
  },
  {
    title: 'A party that answers to Lagosians',
    body: 'Structure exists to serve residents, not itself. Ward-level channels that carry complaints up to the officials we elected — and report back on what came of them.',
  },
];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
};

const Priorities = () => (
  <section id="priorities" className="overflow-hidden bg-gray-50 py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <motion.header {...reveal} className="max-w-3xl">
        <div className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#008A44]">
          <span className="h-1 w-8 bg-[#008A44]" />
          The Agenda
        </div>
        <h2
          className="text-4xl font-black uppercase leading-tight text-gray-900 md:text-6xl"
          style={{ fontFamily: 'Impact, sans-serif' }}
        >
          Priorities
        </h2>
        <blockquote className="mt-6 border-l-4 border-amber-400 pl-5 text-lg leading-relaxed text-gray-700 sm:text-xl">
          {LEAD}
          <footer className="mt-3 text-sm font-bold uppercase tracking-widest text-gray-400">
            Pastor Cornelius Ojelabi
          </footer>
        </blockquote>
      </motion.header>

      <div className="mt-12 grid gap-x-12 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:gap-x-20">
        {PRIORITIES.map(({ title, body }, i) => (
          <motion.div
            key={title}
            {...reveal}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <span className="text-sm font-black tabular-nums text-[#008A44]" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="mt-2 mb-4 block h-px w-full bg-gray-200" />

            <h3 className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
              {title}
            </h3>
            <p className="mt-2 leading-relaxed text-gray-600">{body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div {...reveal} className="mt-12 sm:mt-16">
        <Link
          to="/join"
          className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#008A44] px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white outline-none transition-colors duration-200 hover:bg-[#04140B] focus-visible:ring-2 focus-visible:ring-[#008A44] focus-visible:ring-offset-2"
        >
          Join the work
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </motion.div>

    </div>
  </section>
);

export default Priorities;
