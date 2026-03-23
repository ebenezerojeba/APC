import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, BookOpen, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

/* ─── useWindowWidth ─────────────────────────────────────────────────────── */
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 375
  );
  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);
  return width;
};

/* ─── Documents config ───────────────────────────────────────────────────── */
// Place both PDFs inside your /public folder so they're served as static assets:
//   /public/ElectoralAct2026.pdf
//   /public/ElectionGuidelines2027.pdf
//
// Then reference them as '/ElectoralAct2026.pdf' etc. (root-relative paths).
const DOCS = [
  {
    id: 'guidelines',
    icon: FileText,
    tag: 'Quick Reference',
    title: 'Pre-Election Guidelines 2027',
    desc: 'Key provisions on disqualification, nominations, withdrawals, consensus rules, and election offences — distilled from the relevant statutes.',
    pages: '5 pages',
    size: '~7 KB',
    accent: '#008A44',
    src: '/ElectionGuidelines2027.pdf',
  },
  {
    id: 'act',
    icon: BookOpen,
    tag: 'Full Statute',
    title: 'Electoral Act 2026',
    desc: 'The complete Electoral Act 2026 as enacted by the National Assembly — 124 pages covering every aspect of federal, state, and FCT electoral conduct.',
    pages: '124 pages',
    size: '1.4 MB',
    accent: '#e63946',
    src: '/ElectoralAct2026.pdf',
  },
];

/* ─── PDF Viewer Modal ───────────────────────────────────────────────────── */
const ViewerModal = ({ doc, onClose }) => {
  const w = useWindowWidth();
  const isSm = w >= 640;
  const isLg = w >= 1024;

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.88)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isSm ? 24 : 12,
        }}
      >
        {/* Modal panel — stop propagation so clicks inside don't close */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: isLg ? 1000 : 760,
            height: isLg ? '88vh' : isSm ? '85vh' : '90vh',
            background: '#111',
            borderRadius: isSm ? 20 : 12,
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Modal top bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: isSm ? '14px 20px' : '10px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              flexShrink: 0,
            }}
          >
            {/* Accent dot */}
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: doc.accent, flexShrink: 0,
            }} />

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                margin: 0,
                fontSize: isSm ? 14 : 12,
                fontWeight: 700,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {doc.title}
              </p>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                {doc.pages} · {doc.size}
              </p>
            </div>

            {/* Open in new tab */}
            <a
              href={doc.src}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34, height: 34,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.60)',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <Maximize2 size={14} />
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34, height: 34,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.60)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* PDF iframe — fills remaining space */}
          <iframe
            src={`${doc.src}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
            title={doc.title}
            style={{
              flex: 1,
              width: '100%',
              border: 'none',
              background: '#1a1a1a',
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── Document Card ──────────────────────────────────────────────────────── */
const DocCard = ({ doc, onOpen, isSm, isLg }) => {
  const Icon = doc.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: isSm ? 24 : 16,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(8px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: isLg ? 32 : isSm ? 24 : 18,
        gap: isSm ? 20 : 14,
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: doc.accent,
      }} />

      {/* Icon + tag row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: isSm ? 48 : 40,
          height: isSm ? 48 : 40,
          borderRadius: isSm ? 14 : 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${doc.accent}22`,
          border: `1px solid ${doc.accent}40`,
          flexShrink: 0,
        }}>
          <Icon size={isSm ? 22 : 18} style={{ color: doc.accent }} />
        </div>

        <span style={{
          fontSize: 9,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: doc.accent,
          fontFamily: 'monospace',
        }}>
          {doc.tag}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 style={{
          margin: '0 0 8px',
          fontFamily: 'Impact, "Arial Black", sans-serif',
          fontSize: 'clamp(1.1rem, 3.5vw, 1.45rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 1.1,
          color: '#fff',
          overflowWrap: 'break-word',
        }}>
          {doc.title}
        </h3>

        <p style={{
          margin: 0,
          fontSize: isSm ? 14 : 13,
          fontWeight: 300,
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.7,
        }}>
          {doc.desc}
        </p>
      </div>

      {/* Meta pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[doc.pages, doc.size].map((label) => (
          <span key={label} style={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.40)',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6,
            padding: '3px 9px',
          }}>
            {label}
          </span>
        ))}
      </div>

      {/* View button */}
      <button
        onClick={() => onOpen(doc)}
        style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          padding: isSm ? '13px 20px' : '11px 16px',
          borderRadius: isSm ? 14 : 10,
          background: doc.accent,
          border: 'none',
          color: '#fff',
          fontSize: isSm ? 12 : 11,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          cursor: 'pointer',
          transition: 'opacity 0.2s, transform 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.02)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <BookOpen size={isSm ? 15 : 13} />
        View Document
      </button>
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
const DocumentsViewer = () => {
  const [activeDoc, setActiveDoc] = useState(null);
  const w = useWindowWidth();
  const isSm = w >= 640;
  const isLg = w >= 1024;
  const secPadV = isLg ? 96 : isSm ? 72 : 56;

  return (
    <>
      <section
        id="documents"
        style={{
          position: 'relative',
          paddingTop: secPadV,
          paddingBottom: secPadV,
          background: '#030f06',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glows */}
        <div style={{
          position: 'absolute', top: '20%', right: isLg ? '8%' : '0',
          width: isLg ? 420 : isSm ? 300 : 200,
          height: isLg ? 420 : isSm ? 300 : 200,
          background: 'rgba(0,138,68,0.09)', borderRadius: '50%',
          filter: `blur(${isLg ? 130 : 90}px)`, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: isLg ? '5%' : '0',
          width: isLg ? 300 : 200,
          height: isLg ? 300 : 200,
          background: 'rgba(230,57,70,0.07)', borderRadius: '50%',
          filter: `blur(${isLg ? 100 : 70}px)`, pointerEvents: 'none',
        }} />

        {/* Noise grain */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '192px',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          maxWidth: 896,
          margin: '0 auto',
          paddingLeft: 'clamp(16px, 4vw, 32px)',
          paddingRight: 'clamp(16px, 4vw, 32px)',
        }}>

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: isLg ? 52 : isSm ? 36 : 26 }}
          >
            {/* Kicker */}
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: isSm ? 12 : 8,
              color: '#008A44', fontWeight: 900,
              textTransform: 'uppercase', letterSpacing: '0.18em',
              marginBottom: isSm ? 18 : 12,
              fontSize: isSm ? 11 : 9,
            }}>
              <div style={{
                width: isSm ? 32 : 20, height: 4,
                background: '#008A44', borderRadius: 2, flexShrink: 0,
              }} />
              <span>Official Documents</span>
            </div>

            <h2 style={{
              margin: '0 0 12px',
              fontFamily: 'Impact, "Arial Black", sans-serif',
              fontSize: 'clamp(2rem, 8.5vw, 5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.92,
              color: '#fff',
              overflowWrap: 'break-word',
            }}>
              Read the <span style={{ color: '#008A44' }}>Full Laws.</span>
            </h2>

            <p style={{
              margin: 0,
              fontSize: 'clamp(13px, 2.2vw, 17px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.50)',
              lineHeight: 1.78,
              maxWidth: 520,
              borderLeft: '4px solid #f59e0b',
              paddingLeft: isSm ? 16 : 12,
            }}>
              Access the complete Electoral Act 2026 and the pre-election
              guidelines directly — readable in your browser, no download required.
            </p>
          </motion.div>

          {/* Cards grid — single column on mobile, 2 cols on sm+ */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isSm ? '1fr 1fr' : '1fr',
            gap: isSm ? 16 : 10,
          }}>
            {DOCS.map((doc) => (
              <DocCard
                key={doc.id}
                doc={doc}
                onOpen={setActiveDoc}
                isSm={isSm}
                isLg={isLg}
              />
            ))}
          </div>

          {/* Helper note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              marginTop: isSm ? 20 : 14,
              textAlign: 'center',
              fontSize: isSm ? 12 : 11,
              color: 'rgba(255,255,255,0.25)',
              fontWeight: 300,
              fontStyle: 'italic',
            }}
          >
            Documents open in-browser. Use the ⊠ icon inside the viewer to open in a new tab.
          </motion.p>
        </div>

        {/* Bottom white fade — matching Hero & ElectoralGuidelines */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: isLg ? 96 : isSm ? 72 : 52,
          background: 'linear-gradient(to top, #ffffff, transparent)',
          pointerEvents: 'none',
        }} />
      </section>

      {/* Modal — rendered outside section so it overlays everything */}
      {activeDoc && (
        <ViewerModal doc={activeDoc} onClose={() => setActiveDoc(null)} />
      )}
    </>
  );
};

export default DocumentsViewer;