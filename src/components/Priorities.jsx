import { motion } from 'framer-motion';

/* ───────────────────────────────────────────────────────────────────────────
   SCAFFOLD — not yet real content.

   This is the one section of the site no other political site can copy: what
   Ojelabi himself intends to do with the Lagos chapter. It needs his words,
   not ours, so the copy below is deliberately instructional rather than
   plausible-sounding filler.

   To publish:
     1. Replace LEAD and every entry in PRIORITIES with his actual commitments.
     2. Set PUBLISHED to true.

   Until then the section renders in development only — placeholder copy can
   never reach the live site, the way the old "TODO: years" strings did.
   ─────────────────────────────────────────────────────────────────────────── */
const PUBLISHED = false;

const LEAD =
  'One or two sentences in his voice on what this chairmanship is for. Not the party’s aims — his.';

const PRIORITIES = [
  {
    title: 'Priority one',
    body: 'One sentence: what he will do, and how anyone outside the party would know it had happened.',
  },
  {
    title: 'Priority two',
    body: 'Name something concrete — a structure, a programme, a number, a deadline.',
  },
  {
    title: 'Priority three',
    body: 'Where the previous two are internal to the party, make this one about Lagosians.',
  },
  {
    title: 'Priority four',
    body: 'Optional. Cut this entry entirely if there are only three — three strong planks beat four padded ones.',
  },
];

const Priorities = () => {
  // Dev-only until the copy is real. Remove this guard when PUBLISHED is true.
  if (!PUBLISHED && !import.meta.env.DEV) return null;

  return (
    <section id="priorities" className="overflow-hidden bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {!PUBLISHED && (
          <p className="mb-8 inline-block rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700">
            Draft — visible in development only
          </p>
        )}

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
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
          <p className="mt-5 text-lg leading-relaxed text-gray-600">{LEAD}</p>
        </motion.header>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:gap-x-20">
          {PRIORITIES.map(({ title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <span
                className="text-sm font-black tabular-nums text-[#008A44]"
                aria-hidden="true"
              >
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

      </div>
    </section>
  );
};

export default Priorities;
