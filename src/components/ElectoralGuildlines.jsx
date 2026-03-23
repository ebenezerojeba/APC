// import { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FileText, BookOpen, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

// /* ─── useWindowWidth ─────────────────────────────────────────────────────── */
// const useWindowWidth = () => {
//   const [width, setWidth] = useState(
//     typeof window !== 'undefined' ? window.innerWidth : 375
//   );
//   useEffect(() => {
//     const h = () => setWidth(window.innerWidth);
//     window.addEventListener('resize', h, { passive: true });
//     return () => window.removeEventListener('resize', h);
//   }, []);
//   return width;
// };

// /* ─── Documents config ───────────────────────────────────────────────────── */
// // Place both PDFs inside your /public folder so they're served as static assets:
// //   /public/ElectoralAct2026.pdf
// //   /public/ElectionGuidelines2027.pdf
// //
// // Then reference them as '/ElectoralAct2026.pdf' etc. (root-relative paths).
// const DOCS = [
//   {
//     id: 'guidelines',
//     icon: FileText,
//     tag: 'Quick Reference',
//     title: 'Pre-Election Guidelines 2027',
//     desc: 'Key provisions on disqualification, nominations, withdrawals, consensus rules, and election offences — distilled from the relevant statutes.',
//     pages: '5 pages',
//     size: '~7 KB',
//     accent: '#008A44',
//     src: '/ElectionGuidelines2027.pdf',
//   },
//   {
//     id: 'act',
//     icon: BookOpen,
//     tag: 'Full Statute',
//     title: 'Electoral Act 2026',
//     desc: 'The complete Electoral Act 2026 as enacted by the National Assembly — 124 pages covering every aspect of federal, state, and FCT electoral conduct.',
//     pages: '124 pages',
//     size: '1.4 MB',
//     accent: '#e63946',
//     src: '/ElectoralAct2026.pdf',
//   },
// ];

// /* ─── PDF Viewer Modal ───────────────────────────────────────────────────── */
// const ViewerModal = ({ doc, onClose }) => {
//   const w = useWindowWidth();
//   const isSm = w >= 640;
//   const isLg = w >= 1024;

//   // Lock body scroll while modal is open
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => { document.body.style.overflow = ''; };
//   }, []);

//   // Close on Escape
//   useEffect(() => {
//     const handler = (e) => { if (e.key === 'Escape') onClose(); };
//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   }, [onClose]);

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.2 }}
//         onClick={onClose}
//         style={{
//           position: 'fixed',
//           inset: 0,
//           background: 'rgba(0,0,0,0.88)',
//           zIndex: 9999,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: isSm ? 24 : 12,
//         }}
//       >
//         {/* Modal panel — stop propagation so clicks inside don't close */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.96, y: 16 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.96, y: 16 }}
//           transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
//           onClick={(e) => e.stopPropagation()}
//           style={{
//             width: '100%',
//             maxWidth: isLg ? 1000 : 760,
//             height: isLg ? '88vh' : isSm ? '85vh' : '90vh',
//             background: '#111',
//             borderRadius: isSm ? 20 : 12,
//             border: '1px solid rgba(255,255,255,0.10)',
//             display: 'flex',
//             flexDirection: 'column',
//             overflow: 'hidden',
//           }}
//         >
//           {/* Modal top bar */}
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 12,
//               padding: isSm ? '14px 20px' : '10px 14px',
//               borderBottom: '1px solid rgba(255,255,255,0.08)',
//               flexShrink: 0,
//             }}
//           >
//             {/* Accent dot */}
//             <div style={{
//               width: 10, height: 10, borderRadius: '50%',
//               background: doc.accent, flexShrink: 0,
//             }} />

//             <div style={{ flex: 1, minWidth: 0 }}>
//               <p style={{
//                 margin: 0,
//                 fontSize: isSm ? 14 : 12,
//                 fontWeight: 700,
//                 color: '#fff',
//                 whiteSpace: 'nowrap',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//               }}>
//                 {doc.title}
//               </p>
//               <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
//                 {doc.pages} · {doc.size}
//               </p>
//             </div>

//             {/* Open in new tab */}
//             <a
//               href={doc.src}
//               target="_blank"
//               rel="noopener noreferrer"
//               title="Open in new tab"
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: 34, height: 34,
//                 borderRadius: 8,
//                 background: 'rgba(255,255,255,0.06)',
//                 border: '1px solid rgba(255,255,255,0.10)',
//                 color: 'rgba(255,255,255,0.60)',
//                 textDecoration: 'none',
//                 flexShrink: 0,
//               }}
//             >
//               <Maximize2 size={14} />
//             </a>

//             {/* Close */}
//             <button
//               onClick={onClose}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: 34, height: 34,
//                 borderRadius: 8,
//                 background: 'rgba(255,255,255,0.06)',
//                 border: '1px solid rgba(255,255,255,0.10)',
//                 color: 'rgba(255,255,255,0.60)',
//                 cursor: 'pointer',
//                 flexShrink: 0,
//               }}
//             >
//               <X size={16} />
//             </button>
//           </div>

//           {/* PDF iframe — fills remaining space */}
//           <iframe
//             src={`${doc.src}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
//             title={doc.title}
//             style={{
//               flex: 1,
//               width: '100%',
//               border: 'none',
//               background: '#1a1a1a',
//             }}
//           />
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// /* ─── Document Card ──────────────────────────────────────────────────────── */
// const DocCard = ({ doc, onOpen, isSm, isLg }) => {
//   const Icon = doc.icon;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: '-40px' }}
//       transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//       style={{
//         position: 'relative',
//         border: '1px solid rgba(255,255,255,0.10)',
//         borderRadius: isSm ? 24 : 16,
//         background: 'rgba(255,255,255,0.03)',
//         backdropFilter: 'blur(8px)',
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'column',
//         padding: isLg ? 32 : isSm ? 24 : 18,
//         gap: isSm ? 20 : 14,
//       }}
//     >
//       {/* Top accent bar */}
//       <div style={{
//         position: 'absolute',
//         top: 0, left: 0, right: 0,
//         height: 3,
//         background: doc.accent,
//       }} />

//       {/* Icon + tag row */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//         <div style={{
//           width: isSm ? 48 : 40,
//           height: isSm ? 48 : 40,
//           borderRadius: isSm ? 14 : 10,
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           background: `${doc.accent}22`,
//           border: `1px solid ${doc.accent}40`,
//           flexShrink: 0,
//         }}>
//           <Icon size={isSm ? 22 : 18} style={{ color: doc.accent }} />
//         </div>

//         <span style={{
//           fontSize: 9,
//           fontWeight: 900,
//           textTransform: 'uppercase',
//           letterSpacing: '0.22em',
//           color: doc.accent,
//           fontFamily: 'monospace',
//         }}>
//           {doc.tag}
//         </span>
//       </div>

//       {/* Title */}
//       <div>
//         <h3 style={{
//           margin: '0 0 8px',
//           fontFamily: 'Impact, "Arial Black", sans-serif',
//           fontSize: 'clamp(1.1rem, 3.5vw, 1.45rem)',
//           fontWeight: 900,
//           textTransform: 'uppercase',
//           lineHeight: 1.1,
//           color: '#fff',
//           overflowWrap: 'break-word',
//         }}>
//           {doc.title}
//         </h3>

//         <p style={{
//           margin: 0,
//           fontSize: isSm ? 14 : 13,
//           fontWeight: 300,
//           color: 'rgba(255,255,255,0.55)',
//           lineHeight: 1.7,
//         }}>
//           {doc.desc}
//         </p>
//       </div>

//       {/* Meta pills */}
//       <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//         {[doc.pages, doc.size].map((label) => (
//           <span key={label} style={{
//             fontSize: 11,
//             fontWeight: 700,
//             fontFamily: 'monospace',
//             color: 'rgba(255,255,255,0.40)',
//             background: 'rgba(255,255,255,0.06)',
//             border: '1px solid rgba(255,255,255,0.08)',
//             borderRadius: 6,
//             padding: '3px 9px',
//           }}>
//             {label}
//           </span>
//         ))}
//       </div>

//       {/* View button */}
//       <button
//         onClick={() => onOpen(doc)}
//         style={{
//           marginTop: 'auto',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: 8,
//           width: '100%',
//           padding: isSm ? '13px 20px' : '11px 16px',
//           borderRadius: isSm ? 14 : 10,
//           background: doc.accent,
//           border: 'none',
//           color: '#fff',
//           fontSize: isSm ? 12 : 11,
//           fontWeight: 900,
//           textTransform: 'uppercase',
//           letterSpacing: '0.15em',
//           cursor: 'pointer',
//           transition: 'opacity 0.2s, transform 0.2s',
//         }}
//         onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.02)'; }}
//         onMouseLeave={(e) => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'scale(1)'; }}
//       >
//         <BookOpen size={isSm ? 15 : 13} />
//         View Document
//       </button>
//     </motion.div>
//   );
// };

// /* ─── Main Component ─────────────────────────────────────────────────────── */
// const DocumentsViewer = () => {
//   const [activeDoc, setActiveDoc] = useState(null);
//   const w = useWindowWidth();
//   const isSm = w >= 640;
//   const isLg = w >= 1024;
//   const secPadV = isLg ? 96 : isSm ? 72 : 56;

//   return (
//     <>
//       <section
//         id="documents"
//         style={{
//           position: 'relative',
//           paddingTop: secPadV,
//           paddingBottom: secPadV,
//           background: '#030f06',
//           overflow: 'hidden',
//         }}
//       >
//         {/* Ambient glows */}
//         <div style={{
//           position: 'absolute', top: '20%', right: isLg ? '8%' : '0',
//           width: isLg ? 420 : isSm ? 300 : 200,
//           height: isLg ? 420 : isSm ? 300 : 200,
//           background: 'rgba(0,138,68,0.09)', borderRadius: '50%',
//           filter: `blur(${isLg ? 130 : 90}px)`, pointerEvents: 'none',
//         }} />
//         <div style={{
//           position: 'absolute', bottom: '20%', left: isLg ? '5%' : '0',
//           width: isLg ? 300 : 200,
//           height: isLg ? 300 : 200,
//           background: 'rgba(230,57,70,0.07)', borderRadius: '50%',
//           filter: `blur(${isLg ? 100 : 70}px)`, pointerEvents: 'none',
//         }} />

//         {/* Noise grain */}
//         <div style={{
//           position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: '192px',
//         }} />

//         {/* Content */}
//         <div style={{
//           position: 'relative',
//           maxWidth: 896,
//           margin: '0 auto',
//           paddingLeft: 'clamp(16px, 4vw, 32px)',
//           paddingRight: 'clamp(16px, 4vw, 32px)',
//         }}>

//           {/* Section header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             style={{ marginBottom: isLg ? 52 : isSm ? 36 : 26 }}
//           >
//             {/* Kicker */}
//             <div style={{
//               display: 'flex', alignItems: 'center',
//               gap: isSm ? 12 : 8,
//               color: '#008A44', fontWeight: 900,
//               textTransform: 'uppercase', letterSpacing: '0.18em',
//               marginBottom: isSm ? 18 : 12,
//               fontSize: isSm ? 11 : 9,
//             }}>
//               <div style={{
//                 width: isSm ? 32 : 20, height: 4,
//                 background: '#008A44', borderRadius: 2, flexShrink: 0,
//               }} />
//               <span>Official Documents</span>
//             </div>

//             <h2 style={{
//               margin: '0 0 12px',
//               fontFamily: 'Impact, "Arial Black", sans-serif',
//               fontSize: 'clamp(2rem, 8.5vw, 5rem)',
//               fontWeight: 900,
//               textTransform: 'uppercase',
//               lineHeight: 0.92,
//               color: '#fff',
//               overflowWrap: 'break-word',
//             }}>
//               Read the <span style={{ color: '#008A44' }}>Full Laws.</span>
//             </h2>

//             <p style={{
//               margin: 0,
//               fontSize: 'clamp(13px, 2.2vw, 17px)',
//               fontWeight: 300,
//               color: 'rgba(255,255,255,0.50)',
//               lineHeight: 1.78,
//               maxWidth: 520,
//               borderLeft: '4px solid #f59e0b',
//               paddingLeft: isSm ? 16 : 12,
//             }}>
//               Access the complete Electoral Act 2026 and the pre-election
//               guidelines directly — readable in your browser, no download required.
//             </p>
//           </motion.div>

//           {/* Cards grid — single column on mobile, 2 cols on sm+ */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: isSm ? '1fr 1fr' : '1fr',
//             gap: isSm ? 16 : 10,
//           }}>
//             {DOCS.map((doc) => (
//               <DocCard
//                 key={doc.id}
//                 doc={doc}
//                 onOpen={setActiveDoc}
//                 isSm={isSm}
//                 isLg={isLg}
//               />
//             ))}
//           </div>

//           {/* Helper note */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             style={{
//               marginTop: isSm ? 20 : 14,
//               textAlign: 'center',
//               fontSize: isSm ? 12 : 11,
//               color: 'rgba(255,255,255,0.25)',
//               fontWeight: 300,
//               fontStyle: 'italic',
//             }}
//           >
//             Documents open in-browser. Use the ⊠ icon inside the viewer to open in a new tab.
//           </motion.p>
//         </div>

//         {/* Bottom white fade — matching Hero & ElectoralGuidelines */}
//         <div style={{
//           position: 'absolute', bottom: 0, left: 0, right: 0,
//           height: isLg ? 96 : isSm ? 72 : 52,
//           background: 'linear-gradient(to top, #ffffff, transparent)',
//           pointerEvents: 'none',
//         }} />
//       </section>

//       {/* Modal — rendered outside section so it overlays everything */}
//       {activeDoc && (
//         <ViewerModal doc={activeDoc} onClose={() => setActiveDoc(null)} />
//       )}
//     </>
//   );
// };

// export default DocumentsViewer;

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, FileText, UserMinus, Users, AlertTriangle, ChevronDown } from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'disqualification',
    issue: '01',
    icon: ShieldAlert,
    title: 'Disqualification of Candidates',
    lead: 'Who cannot run — and when they must step aside.',
    accent: '#e63946',
    items: [
      {
        ref: 'S66(1)(f) · 107(1)(f) · 137(1)(g) · 182(1)(g)',
        law: 'Nigerian Constitution',
        text: 'Government appointees wishing to contest elections must resign at least 30 days before the date of the election.',
      },
      {
        ref: 'S88',
        law: 'Electoral Act 2026',
        text: 'Political appointees are expressly prohibited from serving as a delegate or being voted for at party primaries.',
      },
      {
        ref: 'Art 31(iii)',
        law: 'APC Constitution 2022',
        text: 'Any party office holder must resign no later than 30 days before the primaries are held.',
      },
    ],
  },
  {
    id: 'submission',
    issue: '02',
    icon: FileText,
    title: 'Submission of Candidates List',
    lead: 'Deadlines, affidavits, and consequences for false information.',
    accent: '#008A44',
    items: [
      {
        ref: 'S29',
        law: 'Electoral Act 2026',
        text: 'Political parties must submit their candidates list in the prescribed form no later than 120 days before the election.',
      },
      {
        ref: 'S29',
        law: 'Electoral Act 2026',
        text: 'Each candidate must accompany the list with an affidavit sworn at the Federal High Court, a State High Court, or the FCT High Court, confirming fulfilment of all requirements.',
      },
      {
        ref: 'S29',
        law: 'Electoral Act 2026',
        text: 'Any aspirant who participated in the primaries and has reasonable grounds to believe a submitted document is false may file suit seeking a declaration of falsity.',
      },
      {
        ref: 'S29',
        law: 'Electoral Act 2026',
        text: 'If found false, both the candidate AND the sponsoring political party may be disqualified.',
        highlight: true,
      },
      {
        ref: 'S32',
        law: 'Electoral Act 2026',
        text: 'INEC shall publish the full names and addresses of all nominated candidates at least 60 days before the election.',
      },
      {
        ref: 'S33',
        law: 'Electoral Act 2026',
        text: 'A party shall not change or substitute a submitted candidate — except in the event of death.',
      },
    ],
  },
  {
    id: 'withdrawal',
    issue: '03',
    icon: UserMinus,
    title: 'Withdrawal of Candidate',
    lead: 'The formal process for stepping down — and the 90-day window.',
    accent: '#f59e0b',
    items: [
      {
        ref: 'S31',
        law: 'Electoral Act 2026',
        text: 'A candidate may withdraw by submitting a notice in writing, signed personally, together with a sworn affidavit, to the political party.',
      },
      {
        ref: 'S31',
        law: 'Electoral Act 2026',
        text: 'The party must forward the withdrawal notice and affidavit to INEC no later than 90 days before the election.',
      },
    ],
  },
  {
    id: 'consensus',
    issue: '04',
    icon: Users,
    title: 'Consensus Candidate',
    lead: 'When unanimity is required — and what happens without it.',
    accent: '#008A44',
    items: [
      {
        ref: 'S87',
        law: 'Electoral Act 2026',
        text: 'A party adopting a consensus candidate must obtain the written consent of all cleared aspirants, including their voluntary withdrawal from the race and their express endorsement of the chosen candidate.',
      },
      {
        ref: 'S87',
        law: 'Electoral Act 2026',
        text: 'If written consent cannot be secured from every cleared aspirant, the party must revert to direct primaries.',
        highlight: true,
      },
    ],
  },
  {
    id: 'offences',
    issue: '05',
    icon: AlertTriangle,
    title: 'Election Offences',
    lead: 'A comprehensive framework covering every stage of the electoral process.',
    accent: '#e63946',
    items: [
      {
        ref: 'SS118 – 133',
        law: 'Electoral Act 2026',
        text: 'Election offences span registration fraud, nomination irregularities, impersonation, bribery, undue influence, intimidation, disorderly conduct at polls, wrongful voting, and offences related to the recall process.',
      },
      {
        ref: 'SS118 – 133',
        law: 'Electoral Act 2026',
        text: 'Violations carry penalties ranging from fines to custodial sentences, and in some cases disqualification from holding public office.',
      },
    ],
  },
];

/* ─── useWindowWidth hook — drives inline responsive logic ─────────────── */
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 375
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
};

/* ─── Section Row ────────────────────────────────────────────────────────── */
const SectionRow = ({ section, index }) => {
  const [open, setOpen] = useState(false);
  const Icon = section.icon;
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);
  const w = useWindowWidth();

  // sm = 640, lg = 1024
  const isSm = w >= 640;
  const isLg = w >= 1024;

  const recalc = useCallback(() => {
    if (bodyRef.current && open) setHeight(bodyRef.current.scrollHeight);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) setHeight(open ? bodyRef.current.scrollHeight : 0);
  }, [open]);

  // Re-measure on resize so accordion doesn't clip after orientation change
  useEffect(() => {
    window.addEventListener('resize', recalc, { passive: true });
    return () => window.removeEventListener('resize', recalc);
  }, [recalc]);

  const iconSize    = isSm ? 44 : 38;       // px — badge width/height
  const iconStroke  = isSm ? 20  : 17;      // lucide icon size
  const chevronSize = isSm ? 36  : 30;      // chevron circle size
  const chevronIcon = isSm ? 16  : 13;
  const padH        = isLg ? 32  : isSm ? 24 : 16;   // horizontal padding px
  const padV        = isLg ? 28  : isSm ? 20 : 14;   // vertical padding px
  const gap         = isSm ? 20  : 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: isSm ? 24 : 16,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* ── Header button — full-width tap target ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`body-${section.id}`}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: `${padV}px ${padH}px`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-start',
          gap: `${gap}px`,
          textAlign: 'left',
          minHeight: 60,         // WCAG touch target
        }}
      >
        {/* Icon badge */}
        <div
          style={{
            flexShrink: 0,
            width: iconSize,
            height: iconSize,
            borderRadius: isSm ? 14 : 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2,
            background: `${section.accent}22`,
            border: `1px solid ${section.accent}40`,
            transition: 'transform 0.3s',
          }}
        >
          <Icon size={iconStroke} style={{ color: section.accent }} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0, paddingRight: 4 }}>
          <p
            style={{
              margin: '0 0 3px',
              fontSize: isSm ? 10 : 9,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
              color: section.accent,
              fontFamily: 'monospace',
            }}
          >
            §{section.issue}
          </p>

          <h3
            style={{
              margin: '0 0 4px',
              fontFamily: 'Impact, "Arial Black", sans-serif',
              fontSize: 'clamp(1rem, 3.8vw, 1.5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 1.1,
              color: '#fff',
              // Prevent ultra-long words overflowing on tiny screens
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            {section.title}
          </h3>

          {/* Lead — visible from 480px up via inline conditional */}
          {w >= 480 && (
            <p
              style={{
                margin: 0,
                fontSize: isSm ? 13 : 12,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.40)',
                lineHeight: 1.6,
              }}
            >
              {section.lead}
            </p>
          )}
        </div>

        {/* Chevron */}
        <div
          style={{
            flexShrink: 0,
            width: chevronSize,
            height: chevronSize,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <ChevronDown size={chevronIcon} style={{ color: 'rgba(255,255,255,0.4)' }} />
        </div>
      </button>

      {/* ── Collapsible body ── */}
      <div
        id={`body-${section.id}`}
        role="region"
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.38s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div ref={bodyRef}>
          {/* Divider */}
          <div
            style={{
              margin: `0 ${padH}px 16px`,
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          />

          <ul
            style={{
              margin: 0,
              padding: `0 ${padH}px ${isSm ? 28 : 18}px`,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: isSm ? 14 : 10,
            }}
          >
            {section.items.map((item, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: isSm ? 14 : 10,
                  alignItems: 'flex-start',
                  borderRadius: isSm ? 16 : 12,
                  padding: item.highlight ? (isSm ? '14px' : '10px') : 0,
                  background: item.highlight ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: item.highlight ? '1px solid rgba(255,255,255,0.10)' : '1px solid transparent',
                }}
              >
                {/* Ordinal */}
                <span
                  style={{
                    flexShrink: 0,
                    width: isSm ? 26 : 22,
                    height: isSm ? 26 : 22,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: isSm ? 11 : 10,
                    fontWeight: 900,
                    marginTop: 2,
                    background: section.accent,
                  }}
                >
                  {i + 1}
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Citation row — wraps on narrow screens */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: isSm ? 8 : 6,
                    }}
                  >
                    <code
                      style={{
                        fontSize: isSm ? 10 : 9,
                        fontWeight: 900,
                        letterSpacing: '0.02em',
                        padding: '2px 6px',
                        borderRadius: 5,
                        fontFamily: 'monospace',
                        // break-all so refs like "S66(1)(f) · 107(1)(f)..." wrap on 320px
                        wordBreak: 'break-all',
                        color: section.accent,
                        background: `${section.accent}18`,
                        border: `1px solid ${section.accent}30`,
                      }}
                    >
                      {item.ref}
                    </code>

                    <span
                      style={{
                        fontSize: isSm ? 11 : 10,
                        fontStyle: 'italic',
                        color: 'rgba(255,255,255,0.30)',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.law}
                    </span>

                    {item.highlight && (
                      <span
                        style={{
                          fontSize: isSm ? 10 : 9,
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: '#f59e0b',
                          background: 'rgba(245,158,11,0.10)',
                          border: '1px solid rgba(245,158,11,0.20)',
                          padding: '2px 6px',
                          borderRadius: 5,
                        }}
                      >
                        Key Provision
                      </span>
                    )}
                  </div>

                  {/* Provision text */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: isLg ? 16 : isSm ? 15 : 13.5,
                      fontWeight: 300,
                      color: 'rgba(255,255,255,0.70)',
                      lineHeight: 1.78,
                      // Prevent orphaned long words on narrow screens
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
const ElectoralGuidelines = () => {
  const w = useWindowWidth();
  const isSm = w >= 640;
  const isLg = w >= 1024;

  // Section vertical padding
  const secPadV = isLg ? 96 : isSm ? 80 : 64;

  return (
    <section
      id="electoral-guidelines"
      style={{
        position: 'relative',
        paddingTop: secPadV,
        paddingBottom: secPadV,
        background: '#030f06',
        overflow: 'hidden',
      }}
    >
      {/* ── Ambient glows — scale with screen so they don't bleed on mobile ── */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: isLg ? '10%' : '0%',
          width: isLg ? 500 : isSm ? 340 : 220,
          height: isLg ? 500 : isSm ? 340 : 220,
          background: 'rgba(0,138,68,0.10)',
          borderRadius: '50%',
          filter: `blur(${isLg ? 140 : isSm ? 100 : 70}px)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          right: isLg ? '5%' : '0%',
          width: isLg ? 350 : isSm ? 260 : 180,
          height: isLg ? 350 : isSm ? 260 : 180,
          background: 'rgba(251,191,36,0.06)',
          borderRadius: '50%',
          filter: `blur(${isLg ? 100 : isSm ? 80 : 60}px)`,
          pointerEvents: 'none',
        }}
      />

      {/* ── Noise grain ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '192px',
        }}
      />

      {/* ── Content container — fluid gutters, max-width centred ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 896,
          margin: '0 auto',
          // clamp: 16px on mobile → 32px on lg
          paddingLeft:  'clamp(16px, 4vw, 32px)',
          paddingRight: 'clamp(16px, 4vw, 32px)',
        }}
      >
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: isLg ? 56 : isSm ? 40 : 28 }}
        >
          {/* Kicker */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isSm ? 12 : 8,
              color: '#008A44',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: isSm ? 20 : 14,
              fontSize: isSm ? 11 : 9,
            }}
          >
            <div style={{ width: isSm ? 32 : 20, height: 4, background: '#008A44', borderRadius: 2, flexShrink: 0 }} />
            {/* Shorten kicker on narrow screens */}
            <span>{w >= 500 ? 'Pre-Election Bulletin · 2027 General Election' : 'Election Bulletin · 2027'}</span>
          </div>

          {/* Headline — clamp keeps it readable from 320px to 1280px+ */}
          <h2
            style={{
              margin: '0 0 14px',
              fontFamily: 'Impact, "Arial Black", sans-serif',
              fontSize: 'clamp(2rem, 8.5vw, 5.5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.92,
              color: '#fff',
              overflowWrap: 'break-word',
            }}
          >
            What Every Member{' '}
            <span style={{ color: '#008A44' }}>Must Know.</span>
          </h2>

          {/* Deck */}
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(13px, 2.2vw, 18px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.50)',
              lineHeight: 1.78,
              maxWidth: 540,
              borderLeft: '4px solid #f59e0b',
              paddingLeft: isSm ? 16 : 12,
            }}
          >
            Key provisions from the Nigerian Constitution, Electoral Act 2026, and APC
            Constitution 2022 — covering disqualifications, nominations, withdrawals,
            consensus rules, and election offences.
          </p>
        </motion.div>

        {/* ── Accordion cards ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isSm ? 12 : 8 }}>
          {SECTIONS.map((section, i) => (
            <SectionRow key={section.id} section={section} index={i} />
          ))}
        </div>

        {/* ── Disclaimer card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            position: 'relative',
            marginTop: isSm ? 32 : 20,
            padding: isLg ? '28px 32px' : isSm ? '20px 24px' : '16px',
            borderRadius: isSm ? 24 : 16,
            background: '#171717',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: isSm ? 16 : 12, alignItems: 'flex-start' }}>
            {/* Icon */}
            <div
              style={{
                flexShrink: 0,
                width: isSm ? 40 : 34,
                height: isSm ? 40 : 34,
                borderRadius: isSm ? 12 : 8,
                background: 'rgba(0,138,68,0.20)',
                border: '1px solid rgba(0,138,68,0.30)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 2,
              }}
            >
              <ShieldAlert size={isSm ? 18 : 15} style={{ color: '#008A44' }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: '0 0 6px',
                  fontSize: isSm ? 10 : 9,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: '#f59e0b',
                }}
              >
                Editorial Note
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: isSm ? 14 : 12.5,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.50)',
                  lineHeight: 1.8,
                  overflowWrap: 'break-word',
                }}
              >
                This bulletin is a summary for informational purposes. Members and aspirants
                should consult the full text of each cited statute for complete provisions.
                Legal advice should be sought where necessary.
              </p>
            </div>
          </div>

          {/* Glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: isSm ? 120 : 80,
              height: isSm ? 120 : 80,
              background: 'rgba(0,138,68,0.20)',
              borderRadius: '50%',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </div>

      {/* Bottom white fade — matching Hero */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: isLg ? 96 : isSm ? 72 : 52,
          background: 'linear-gradient(to top, #ffffff, transparent)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
};

export default ElectoralGuidelines;