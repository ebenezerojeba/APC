import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Users, Briefcase, Landmark, ClipboardList, Megaphone } from 'lucide-react';
import { CIRCULAR } from '../../data/campaign';
import SectionLabel from '../SectionLabel';

const BEBAS = { fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" };
const ICONS = [Briefcase, Users, Landmark, ClipboardList, Megaphone];

const RallyGuidelines = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="rally-guidelines" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel tone="green" className="mb-6">Circular · {CIRCULAR.date}</SectionLabel>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h2 className="uppercase leading-[0.9] text-gray-900" style={{ ...BEBAS, fontSize: 'clamp(2.75rem, 6vw, 4.5rem)' }}>
              Who Goes <span className="text-[#008A44]">Where</span>
            </h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-gray-400">{CIRCULAR.title}</p>
            <blockquote className="mt-6 border-l-4 border-amber-400 pl-5 text-lg leading-relaxed text-gray-700">
              {CIRCULAR.purpose}
            </blockquote>
            <p className="mt-6 text-xs leading-relaxed text-gray-500">
              Issued by {CIRCULAR.from}.
              <br />
              Ref: {CIRCULAR.ref}
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-6 inline-flex min-h-11 items-center gap-2 bg-gray-900 px-6 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#008A44] focus-visible:ring-2 focus-visible:ring-[#008A44] focus-visible:ring-offset-2"
            >
              <FileText size={14} /> Read the circular
            </button>
          </div>

          <ol className="space-y-3">
            {CIRCULAR.rules.map((r, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.li
                  key={r.who}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-4 border border-gray-200 p-5 transition-colors hover:border-[#008A44]/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#008A44]/10 text-[#008A44]">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-black uppercase tracking-wide text-gray-900">{r.who}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{r.rule}</p>
                    {r.exception && <p className="mt-2 text-xs italic text-gray-400">{r.exception}</p>}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={CIRCULAR.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/80 p-4 sm:p-8"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          >
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="fixed right-4 top-4 flex h-11 w-11 items-center justify-center bg-white text-gray-900"
            >
              <X size={20} />
            </button>
            <img
              src={CIRCULAR.image}
              alt={`Circular ${CIRCULAR.ref}: ${CIRCULAR.title}`}
              className="h-auto w-full max-w-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RallyGuidelines;
