import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Train, Shield, Users, Globe, ChevronDown } from 'lucide-react';
import assets from '../assets/assets';

const MOTTO = 'Justice, Peace and Unity';

const aimsAndObjectives = [
  'Promote and foster the unity, political stability and national consciousness of the people of Nigeria.',
  'Promote true federalism in the Federal Republic of Nigeria.',
  'Organize Chapters of the Party throughout the Federal Republic of Nigeria and beyond.',
  'Sponsor eligible candidates and canvass for votes for election into all elective offices in all tiers of government.',
  'Consciously pursue the implementation of the policies and programmes of the Party, members appointed or elected into government, legislative houses and Boards throughout the Federation.',
  'Evolve, develop and promote an economic policy direction which guarantees public participation in, and where necessary, control of the major means of production, distribution and exchange.',
  'Protect the interest of farmers, workers, women, youth and persons with Disabilities in Nigeria and to faithfully strive to obtain for them the greatest possible return for their labour and full participation in the Nigerian enterprise.',
  'Promote and uphold the practice of internal democracy at all levels of the Partys organisation.',
  'Institutionalise, maintain and foster representative democracy, discipline and strict observance of rule of Law in the Federation of Nigeria.',
  'Co-operate with any political or other organisations whose aims and objectives are in harmony with those of the Party and in conformity with the provisions of the Constitution of the Federal Republic of Nigeria.',
  'Actively condemn and resist all forms of oppression and exploitation of Nigerians.',
  'Promote social, political and economic freedoms and the general welfare of the people, with a view to permanently ensuring the establishment of peace, freedom, dignity of labour, equity, fraternity and happiness for all the people of Nigeria.',
  'Foster and defend the freedom of the Press and the fundamental freedoms and human rights of all Nigerians and the people of the world in general.',
  'Pursue a dynamic foreign policy aimed at friendly and reciprocal relations with other countries, good governance and democratic freedom for people of African descent.',
  'Work consciously to promote the development of science, technology and local expertise.',
  'Do anything ancillary or conducive to the promotion of the aforementioned aims and objectives.',
];

const partyOrganisationLevels = [
  'The Polling Unit',
  'The Ward',
  'The Local Government Area / Area Council',
  'The Senatorial District',
  'The State',
  'The Zone',
  'The National',
];

const partyOrgans = [
  'National Convention',
  'Board of Trustees',
  'National Executive Committee',
  'National Working Committee',
  'Zonal Committee',
  'State Congress',
  'State Executive Committee',
  'State Working Committee',
  'Senatorial District Committee',
  'Local Government Area / Area Council Congress',
  'Local Government Area / Area Council Executive Committee',
  'The Ward Congress',
  'The Ward Executive Committee',
  'The Polling Unit Committee',
];

// ─ Sub-section accordion ─

const Accordion = ({ title, icon: Icon, color, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[#008A44]/50 transition-colors duration-300"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-linear-to-br from-[#008A44]/0 group-hover:from-[#008A44]/8 transition-all duration-500 rounded-2xl sm:rounded-3xl pointer-events-none" />

      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 text-left relative z-10"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-linear-to-br ${color} flex items-center justify-center shadow-lg shrink-0`}>
            <Icon size={15} className="text-white sm:hidden" />
            <Icon size={18} className="text-white hidden sm:block" />
          </div>
          <span className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight">{title}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-white/40 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6 lg:pb-7 relative z-10">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// - Main Vision component ─

const Vision = () => {
  return (
    <section
      id="vision"
      className="py-16 sm:py-20 lg:py-28 bg-[#041a0b] text-white overflow-hidden relative"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow — scaled down on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 sm:w-125 lg:w-200 h-50 sm:h-75 lg:h-100 bg-[#008A44]/15 blur-[80px] lg:blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12 lg:mb-16">

          {/* President floating image — sits above heading on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative shrink-0 order-first lg:order-last"
          >
            {/* Extra bottom margin on mobile to give room for the name badge */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 mb-12 sm:mb-10">
              <div className="absolute inset-0 rounded-full border-2 border-[#008A44]/40 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-400 rounded-full" />
              </div>
              <div className="absolute inset-3 rounded-full overflow-hidden border-4 border-[#008A44]/30 bg-[#041a0b]">
                <img
                  src={assets.asiwaju}
                  alt="President Bola Ahmed Tinubu"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              {/* Name badge — narrower on mobile so it doesn't overflow */}
              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-amber-400 text-[#008A44] text-[8px] sm:text-[9px] font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] px-3 sm:px-5 py-1.5 sm:py-2 rounded-2xl whitespace-nowrap shadow-xl text-center leading-tight w-max max-w-[90vw]">
                <span className="block">H.E Bola Ahmed Tinubu, GCFR</span>
                <span className="block text-[7px] sm:text-[7.5px] font-bold tracking-widest text-[#005a2b] mt-0.5">
                  President, Federal Republic of Nigeria
                </span>
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-auto"
          >
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <div className="h-px w-10 sm:w-12 bg-amber-400" />
            </div>
            {/*
              clamp: 2.6rem (mobile 320px) → scales with viewport → capped at 7rem (desktop).
              Mid-range uses a tighter max so it doesn't balloon at 768px.
            */}
            <h2
              className="text-[clamp(2.6rem,10vw,7rem)] font-black leading-[0.92] uppercase"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
            >
              Our Vision <br />
              <span className="text-[#008A44]">for Lagos</span>
            </h2>
          </motion.div>
        </div>

        {/* ── Motto banner ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 sm:mb-10 lg:mb-14"
        >

          <div className="inline-flex items-start sm:items-center gap-3 sm:gap-5 bg-linear-to-r from-[#008A44]/20 to-amber-400/10 border border-[#008A44]/40 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 lg:py-5 max-w-full">
            <Shield size={18} className="text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <div className="min-w-0">
              <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] sm:tracking-[0.35em] text-amber-400 mb-0.5">
                Party Motto
              </p>
              <p
                className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-wide leading-tight"
                style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
              >
                {MOTTO}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/50 text-base sm:text-lg lg:text-xl max-w-2xl mb-8 sm:mb-10 lg:mb-14 leading-relaxed font-light border-l-2 border-[#008A44] pl-4 sm:pl-6"
        >
          A comprehensive agenda for sustainable development and inclusive growth under the leadership
          of the APC and the Renewed Hope administration — rooted in the party's founding constitution.
        </motion.p>

        {/* ── Accordions ── */}
        <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">

          {/* Aims & Objectives */}
          <Accordion
            title="Aims & Objectives"
            icon={BookOpen}
            color="from-[#008A44] to-emerald-600"
            defaultOpen={true}
          >
            <ol className="space-y-2.5 sm:space-y-3 mt-1">
              {aimsAndObjectives.map((aim, i) => (
                <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-white/65 text-xs sm:text-sm leading-snug">
                  <span className="mt-0.5 shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#008A44]/20 border border-[#008A44]/50 text-[#008A44] text-[9px] sm:text-[10px] font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                  {aim}
                </li>
              ))}
            </ol>
          </Accordion>

          {/* Party Organisation */}
          <Accordion
            title="Party Organisation — 7 Levels"
            icon={Train}
            color="from-amber-500 to-amber-400"
          >
            <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-4 font-bold">
              Seven Levels of Organisation
            </p>
            <ol className="space-y-2 sm:space-y-2.5">
              {partyOrganisationLevels.map((level, i) => (
                <li key={i} className="flex items-center gap-2.5 sm:gap-3 text-white/70 text-xs sm:text-sm">
                  <span className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[9px] sm:text-[10px] font-black flex items-center justify-center">
                    {['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'][i]}
                  </span>
                  {level}
                </li>
              ))}
            </ol>
            <p className="mt-4 sm:mt-5 text-white/35 text-[11px] sm:text-xs leading-snug border-t border-white/10 pt-3 sm:pt-4">
              Each level shall have a functional secretariat, except the Senatorial District and Polling Unit.
            </p>
          </Accordion>

          {/* Party Organs */}
          <Accordion
            title="Party Organs — 14 Principal Organs"
            icon={Users}
            color="from-emerald-700 to-[#008A44]"
          >
            <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-4 font-bold">
              Principal Organs
            </p>
            {/* Single column on mobile, 2-col on sm+ */}
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {partyOrgans.map((organ, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-white/65 text-xs sm:text-sm leading-snug">
                  <span className="mt-0.5 shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-700/25 border border-emerald-600/40 text-emerald-400 text-[9px] sm:text-[10px] font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                  {organ}
                </li>
              ))}
            </ol>
          </Accordion>

          {/* Other Bodies */}
          <Accordion
            title="Other Bodies"
            icon={Globe}
            color="from-sky-600 to-sky-500"
          >
            <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-4 font-bold">
              Other Bodies
            </p>
            <ol className="space-y-2 sm:space-y-2.5">
              {['Board of Trustee', 'National Caucus', 'Zonal Caucus', 'State Caucus', 'Local Government Area / Area Council Caucus'].map((body, i) => (
                <li key={i} className="flex items-center gap-2.5 sm:gap-3 text-white/70 text-xs sm:text-sm">
                  <span className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-sky-600/15 border border-sky-500/30 text-sky-400 text-[9px] sm:text-[10px] font-black flex items-center justify-center">
                    {['i', 'ii', 'iii', 'iv', 'v'][i]}
                  </span>
                  {body}
                </li>
              ))}
            </ol>
          </Accordion>
        </div>

        {/* ── Stat bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          // 2-col on all sizes; 4-col from md. Each cell stays readable either way.
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { stat: '20/37',   label: 'LGAs/LCDAs' },
            { stat: '13,325',  label: 'Polling Units' },
            { stat: '1.2M+',  label: 'Members' },
            { stat: '2027', label: 'General Election' },
          ].map(({ stat, label }) => (
            <div
              key={label}
              className="bg-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-5 lg:px-6 py-4 sm:py-5 border border-white/10 text-center"
            >
              <p
                className="text-2xl sm:text-3xl font-black text-[#008A44] leading-none mb-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stat}
              </p>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 leading-tight">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;