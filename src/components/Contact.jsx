
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, useInView, AnimatePresence } from 'framer-motion';
// import {
//   MapPin, Phone, Mail, ArrowUpRight, Facebook, Twitter, Instagram,
//   CheckCircle2, Loader2, ChevronRight
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// // import assets from '../assets/assets'; // uncomment and use your asset path

// /* ─────────────────────────────────────────────
//    DATA
// ───────────────────────────────────────────── */
// const CONTACT_ITEMS = [
//   {
//     icon: MapPin,
//     label: 'Secretariat',
//     sublabel: 'Visit us',
//     value: 'APC Lagos State Secretariat, Acme Road, Ogba, Ikeja, Lagos',
//     href: 'https://maps.google.com',
//     tag: '01',
//   },
//   {
//     icon: Phone,
//     label: 'Enquiries',
//     sublabel: 'Call us',
//     value: '+234 (0) 803 000 0000',
//     href: 'tel:+2348030000000',
//     tag: '02',
//   },
//   {
//     icon: Mail,
//     label: 'Email',
//     sublabel: 'Write to us',
//     value: 'info@lagosapc.com',
//     href: 'mailto:info@lagosapc.com',
//     tag: '03',
//   },
// ];

// const SOCIALS = [
//   { icon: Facebook,  label: 'Facebook',   href: 'https://www.facebook.com/share/18C16eC7YF/?mibextid=wwXIfr' },
//   { icon: Twitter,   label: 'Twitter/X',  href: 'https://x.com/apcchairman' },
//   { icon: Instagram, label: 'Instagram',  href: 'https://www.instagram.com/apcchairmanlagos?igsh=dHpiNzBuczFveXE5' },
// ];

// /* ─────────────────────────────────────────────
//    HOOKS
// ───────────────────────────────────────────── */
// function useEmailSubscription() {
//   const [email, setEmail]   = useState('');
//   const [status, setStatus] = useState('idle'); // idle | loading | success | error

//   const submit = async (e) => {
//     e.preventDefault();
//     if (!email.trim()) return;
//     setStatus('loading');
//     await new Promise(r => setTimeout(r, 1200)); // replace with real API call
//     setStatus('success');
//     setEmail('');
//     setTimeout(() => setStatus('idle'), 4000);
//   };

//   return { email, setEmail, status, submit };
// }

// /* ─────────────────────────────────────────────
//    SUB-COMPONENTS
// ───────────────────────────────────────────── */

// /** Animated section number / line separator */
// function SectionLabel({ children }) {
//   return (
//     <div className="flex items-center gap-3 mb-5">
//       <span
//         className="contact-tag"
//         style={{
//           fontSize: '0.6rem',
//           fontWeight: 900,
//           letterSpacing: '0.3em',
//           textTransform: 'uppercase',
//           color: '#008A44',
//         }}
//       >
//         {children}
//       </span>
//       <div style={{ height: 1, flex: 1, maxWidth: 48, background: '#008A44', opacity: 0.6 }} />
//     </div>
//   );
// }

// /** Single contact row card */
// function ContactCard({ item, index }) {
//   const ref    = useRef(null);
//   const inView = useInView(ref, { once: true, margin: '-40px' });
//   const { icon: Icon, label, sublabel, value, href, tag } = item;

//   return (
//     <motion.a
//       ref={ref}
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: '1.25rem',
//         padding: '1.25rem 1.5rem',
//         background: 'transparent',
//         border: '1px solid rgba(0,0,0,0.08)',
//         borderRadius: '1rem',
//         textDecoration: 'none',
//         position: 'relative',
//         overflow: 'hidden',
//         cursor: 'pointer',
//         transition: 'border-color 0.25s ease',
//       }}
//       initial={{ opacity: 0, x: -24 }}
//       animate={inView ? { opacity: 1, x: 0 } : {}}
//       transition={{ duration: 0.5, delay: index * 0.12 }}
//       whileHover="hover"
//     >
//       {/* Hover fill */}
//       <motion.div
//         variants={{ hover: { scaleX: 1 } }}
//         initial={{ scaleX: 0 }}
//         style={{
//           position: 'absolute', inset: 0,
//           background: 'linear-gradient(90deg, rgba(0,138,68,0.05) 0%, rgba(0,138,68,0.02) 100%)',
//           transformOrigin: 'left',
//           borderRadius: '1rem',
//         }}
//         transition={{ duration: 0.3 }}
//       />

//       {/* Tag number — rotated */}
//       <span style={{
//         fontSize: '0.55rem',
//         fontWeight: 900,
//         color: 'rgba(0,0,0,0.18)',
//         letterSpacing: '0.1em',
//         fontFamily: "'Syne', sans-serif",
//         minWidth: 20,
//         userSelect: 'none',
//       }}>
//         {tag}
//       </span>

//       {/* Icon */}
//       <div style={{
//         width: 42, height: 42, borderRadius: '0.75rem',
//         background: '#008A44',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         flexShrink: 0,
//         boxShadow: '0 4px 14px rgba(0,138,68,0.25)',
//       }}>
//         <Icon size={16} color="#fff" />
//       </div>

//       {/* Text */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 2 }}>
//           {sublabel}
//         </p>
//         <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111', lineHeight: 1.3 }}>
//           {value}
//         </p>
//       </div>

//       {/* Arrow */}
//       <motion.div
//         variants={{ hover: { x: 2, y: -2 } }}
//         transition={{ type: 'spring', stiffness: 400 }}
//         style={{ color: '#d1d5db', flexShrink: 0 }}
//       >
//         <ArrowUpRight size={15} />
//       </motion.div>
//     </motion.a>
//   );
// }

// /** Newsletter input + submit */
// function NewsletterForm() {
//   const { email, setEmail, status, submit } = useEmailSubscription();

//   return (
//     <form onSubmit={submit} style={{ width: '100%' }}>
//       <div style={{ display: 'flex', gap: '0.625rem' }}>
//         <input
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="your@email.com"
//           required
//           disabled={status === 'loading' || status === 'success'}
//           style={{
//             flex: 1,
//             padding: '0.875rem 1.1rem',
//             background: 'rgba(255,255,255,0.08)',
//             border: '1px solid rgba(255,255,255,0.14)',
//             borderRadius: '0.75rem',
//             color: '#fff',
//             fontSize: '0.85rem',
//             fontWeight: 500,
//             outline: 'none',
//             fontFamily: "'DM Sans', sans-serif",
//             transition: 'border-color 0.2s, background 0.2s',
//           }}
//           onFocus={e => {
//             e.target.style.borderColor = '#008A44';
//             e.target.style.background  = 'rgba(255,255,255,0.12)';
//           }}
//           onBlur={e => {
//             e.target.style.borderColor = 'rgba(255,255,255,0.14)';
//             e.target.style.background  = 'rgba(255,255,255,0.08)';
//           }}
//         />
//         <button
//           type="submit"
//           disabled={status === 'loading' || status === 'success'}
//           style={{
//             padding: '0.875rem 1.35rem',
//             background: status === 'success' ? '#16a34a' : '#008A44',
//             border: 'none',
//             borderRadius: '0.75rem',
//             color: '#fff',
//             fontWeight: 800,
//             fontSize: '0.8rem',
//             letterSpacing: '0.04em',
//             cursor: status === 'loading' ? 'wait' : 'pointer',
//             display: 'flex', alignItems: 'center', gap: '0.4rem',
//             transition: 'background 0.2s, transform 0.15s',
//             fontFamily: "'Syne', sans-serif",
//             whiteSpace: 'nowrap',
//           }}
//         >
//           {status === 'loading' && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
//           {status === 'success' && <CheckCircle2 size={14} />}
//           {status === 'idle'    && 'Subscribe'}
//           {status === 'loading' && 'Sending…'}
//           {status === 'success' && 'You are in!'}
//         </button>
//       </div>

//       <AnimatePresence>
//         {status === 'success' && (
//           <motion.p
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#4ade80', fontWeight: 600 }}
//           >
//             Welcome aboard — expect your first briefing shortly.
//           </motion.p>
//         )}
//       </AnimatePresence>
//     </form>
//   );
// }

// const Contact = () => {
//   const navigate = useNavigate();
//   const sectionRef = useRef(null);
//   const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

//   /* Google Font injection (idiomatic for component-local use) */
//   useEffect(() => {
//     const link = document.createElement('link');
//     link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap';
//     link.rel  = 'stylesheet';
//     document.head.appendChild(link);
//     return () => document.head.removeChild(link);
//   }, []);

//   return (
//     <>
//       {/* Keyframe for spinner */}
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

//       <section
//         ref={sectionRef}
//         id="contact"
//         style={{
//           background: '#f9f7f4',
//           overflow: 'hidden',
//           position: 'relative',
//           fontFamily: "'DM Sans', sans-serif",
//         }}
//       >
//         {/* ── Noise texture overlay ── */}
//         <div
//           aria-hidden
//           style={{
//             position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
//             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
//             backgroundRepeat: 'repeat',
//             backgroundSize: '128px 128px',
//             opacity: 0.6,
//           }}
//         />

//         {/* ── Decorative geometric ring ── */}
//         <div
//           aria-hidden
//           style={{
//             position: 'absolute', top: '-10rem', right: '-10rem',
//             width: '40rem', height: '40rem', borderRadius: '50%',
//             border: '1px solid rgba(0,138,68,0.08)',
//             pointerEvents: 'none', zIndex: 0,
//           }}
//         />
//         <div
//           aria-hidden
//           style={{
//             position: 'absolute', top: '-6rem', right: '-6rem',
//             width: '30rem', height: '30rem', borderRadius: '50%',
//             border: '1px solid rgba(0,138,68,0.06)',
//             pointerEvents: 'none', zIndex: 0,
//           }}
//         />

//         {/* ── Left rail accent ── */}
//         <motion.div
//           aria-hidden
//           initial={{ scaleY: 0 }}
//           animate={inView ? { scaleY: 1 } : {}}
//           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
//           style={{
//             position: 'absolute', left: 0, top: 0, bottom: 0,
//             width: 4, background: 'linear-gradient(to bottom, #008A44, rgba(0,138,68,0))',
//             transformOrigin: 'top', zIndex: 1,
//           }}
//         />

//         {/* ── Inner ── */}
//         <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '7rem 2rem' }}>

//           {/* ═══════════ HEADER ═══════════ */}
//           <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', marginBottom: '4.5rem' }}>
//             <motion.div
//               initial={{ opacity: 0, y: 32 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.7 }}
//             >
//               <SectionLabel>Get in Touch</SectionLabel>
//               <h2
//                 style={{
//                   fontFamily: "'Syne', sans-serif",
//                   fontWeight: 900,
//                   fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
//                   lineHeight: 0.92,
//                   textTransform: 'uppercase',
//                   color: '#0a0a0a',
//                   letterSpacing: '-0.02em',
//                   margin: 0,
//                 }}
//               >
//                 Connect with<br />
//                 <span style={{ color: '#008A44', WebkitTextStroke: '0px', display: 'inline-block' }}>
//                   The Secretariat
//                 </span>
//               </h2>
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.7, delay: 0.15 }}
//               style={{ maxWidth: 360, color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.75, margin: 0, paddingBottom: '0.5rem' }}
//             >
//               Questions, partnerships, or press enquiries — reach out to the APC Lagos State administrative office directly.
//             </motion.p>
//           </div>

//           {/* ═══════════ BODY GRID ═══════════ */}
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
//               gap: '2.5rem',
//               alignItems: 'start',
//             }}
//           >

//             {/* ── LEFT: Contact cards + socials ── */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
//               {CONTACT_ITEMS.map((item, i) => (
//                 <ContactCard key={item.label} item={item} index={i} />
//               ))}

//               {/* Socials strip */}
//               <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: 0.42 }}
//                 style={{
//                   marginTop: '0.25rem',
//                   padding: '1.1rem 1.5rem',
//                   background: '#fff',
//                   border: '1px solid rgba(0,0,0,0.07)',
//                   borderRadius: '1rem',
//                   display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//                   gap: '1rem',
//                 }}
//               >
//                 <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9ca3af', margin: 0 }}>
//                   Follow our activities
//                 </p>
//                 <div style={{ display: 'flex', gap: '0.5rem' }}>
//                   {SOCIALS.map(({ icon: Icon, label, href }) => (
//                     <motion.a
//                       key={label}
//                       href={href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label={label}
//                       whileHover={{ scale: 1.1, y: -2 }}
//                       whileTap={{ scale: 0.93 }}
//                       style={{
//                         width: 38, height: 38,
//                         borderRadius: '0.625rem',
//                         border: '1px solid rgba(0,0,0,0.1)',
//                         background: '#fff',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         color: '#374151', textDecoration: 'none',
//                         transition: 'background 0.2s, border-color 0.2s, color 0.2s',
//                       }}
//                       onMouseEnter={e => {
//                         e.currentTarget.style.background     = '#008A44';
//                         e.currentTarget.style.borderColor    = '#008A44';
//                         e.currentTarget.style.color          = '#fff';
//                       }}
//                       onMouseLeave={e => {
//                         e.currentTarget.style.background     = '#fff';
//                         e.currentTarget.style.borderColor    = 'rgba(0,0,0,0.1)';
//                         e.currentTarget.style.color          = '#374151';
//                       }}
//                     >
//                       <Icon size={15} />
//                     </motion.a>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>

//             {/* ── RIGHT: Newsletter + Volunteer ── */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

//               {/* Newsletter dark card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.65, delay: 0.2 }}
//                 style={{
//                   position: 'relative',
//                   background: '#080f09',
//                   borderRadius: '1.5rem',
//                   padding: '2.5rem',
//                   overflow: 'hidden',
//                   border: '1px solid rgba(255,255,255,0.04)',
//                 }}
//               >
//                 {/* Green mesh glow */}
//                 <div style={{
//                   position: 'absolute', top: '-4rem', right: '-4rem',
//                   width: '20rem', height: '20rem', borderRadius: '50%',
//                   background: 'radial-gradient(circle, rgba(0,138,68,0.18) 0%, transparent 70%)',
//                   pointerEvents: 'none',
//                 }} />
//                 {/* Subtle grid pattern */}
//                 <div style={{
//                   position: 'absolute', inset: 0, pointerEvents: 'none',
//                   backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
//                   backgroundSize: '40px 40px',
//                 }} />

//                 {/* Watermark ring */}
//                 <div style={{
//                   position: 'absolute', bottom: '-3rem', left: '-3rem',
//                   width: '12rem', height: '12rem', borderRadius: '50%',
//                   border: '24px solid rgba(0,138,68,0.06)',
//                   pointerEvents: 'none',
//                 }} />

//                 <div style={{ position: 'relative', zIndex: 1 }}>
//                   <SectionLabel>Stay Informed</SectionLabel>

//                   <h3 style={{
//                     fontFamily: "'Syne', sans-serif",
//                     fontWeight: 900,
//                     fontSize: '1.7rem',
//                     color: '#fff',
//                     lineHeight: 1.15,
//                     margin: '0 0 0.75rem',
//                     letterSpacing: '-0.01em',
//                   }}>
//                     Join the Progress
//                   </h3>
//                   <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.87rem', lineHeight: 1.7, margin: '0 0 2rem' }}>
//                     Receive the Chairman's weekly briefing and official party updates directly in your inbox.
//                   </p>

//                   <NewsletterForm />
//                 </div>
//               </motion.div>

//               {/* Volunteer card — amber editorial */}
//               <motion.div
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.65, delay: 0.3 }}
//                 onClick={() => navigate('/join')}
//                 role="link"
//                 tabIndex={0}
//                 onKeyDown={e => e.key === 'Enter' && navigate('/join')}
//                 style={{
//                   position: 'relative',
//                   background: '#fff',
//                   border: '1px solid rgba(0,0,0,0.07)',
//                   borderRadius: '1.5rem',
//                   padding: '2.5rem',
//                   cursor: 'pointer',
//                   overflow: 'hidden',
//                   display: 'flex', flexDirection: 'column',
//                 }}
//               >
//                 {/* Top accent bar */}
//                 <div style={{
//                   position: 'absolute', top: 0, left: 0, right: 0,
//                   height: 4,
//                   background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
//                   borderRadius: '1.5rem 1.5rem 0 0',
//                 }} />

//                 {/* Hover wash */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   style={{
//                     position: 'absolute', inset: 0,
//                     background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 100%)',
//                     borderRadius: '1.5rem',
//                     pointerEvents: 'none',
//                   }}
//                 />

//                 <div style={{ position: 'relative', zIndex: 1 }}>
//                   {/* Top row */}
//                   <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
//                     <div>
//                       <span style={{
//                         display: 'inline-block',
//                         background: '#fef3c7',
//                         color: '#92400e',
//                         fontSize: '0.58rem',
//                         fontWeight: 800,
//                         letterSpacing: '0.2em',
//                         textTransform: 'uppercase',
//                         padding: '0.3rem 0.75rem',
//                         borderRadius: '2rem',
//                         marginBottom: '1rem',
//                         border: '1px solid rgba(245,158,11,0.2)',
//                       }}>
//                         Get Involved
//                       </span>
//                       <h3 style={{
//                         fontFamily: "'Syne', sans-serif",
//                         fontWeight: 900,
//                         fontSize: '1.6rem',
//                         color: '#0a0a0a',
//                         lineHeight: 1.1,
//                         margin: 0,
//                         textTransform: 'uppercase',
//                         letterSpacing: '-0.01em',
//                       }}>
//                         Renewed Hope<br />Agenda
//                       </h3>
//                     </div>
//                     {/* Arrow badge */}
//                     <motion.div
//                       whileHover={{ rotate: 15, scale: 1.1 }}
//                       style={{
//                         width: 40, height: 40,
//                         background: '#f59e0b',
//                         borderRadius: '0.625rem',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         flexShrink: 0,
//                       }}
//                     >
//                       <ArrowUpRight size={18} color="#fff" />
//                     </motion.div>
//                   </div>

//                   <p style={{ color: '#6b7280', fontSize: '0.87rem', lineHeight: 1.7, margin: '0 0 2rem' }}>
//                     Building a better, smarter, and more inclusive Lagos for every single Lagosian.
//                   </p>

//                   {/* CTA row */}
//                   <motion.button
//                     whileHover={{ gap: '0.75rem' }}
//                     style={{
//                       width: '100%',
//                       background: '#0a0a0a',
//                       border: 'none',
//                       borderRadius: '0.875rem',
//                       padding: '1rem',
//                       color: '#fff',
//                       fontFamily: "'Syne', sans-serif",
//                       fontWeight: 800,
//                       fontSize: '0.8rem',
//                       letterSpacing: '0.12em',
//                       textTransform: 'uppercase',
//                       cursor: 'pointer',
//                       display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
//                       transition: 'background 0.2s',
//                     }}
//                     onMouseEnter={e => e.currentTarget.style.background = '#008A44'}
//                     onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
//                   >
//                     Volunteer Today
//                     <ChevronRight size={15} />
//                   </motion.button>
//                 </div>
//               </motion.div>

//             </div>
//           </div>

//           {/* ═══════════ FOOTER DIVIDER ═══════════ */}
//           <motion.div
//             initial={{ scaleX: 0, opacity: 0 }}
//             animate={inView ? { scaleX: 1, opacity: 1 } : {}}
//             transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
//             style={{
//               marginTop: '4.5rem',
//               height: 1,
//               background: 'linear-gradient(90deg, #008A44 0%, rgba(0,138,68,0.3) 30%, transparent 70%)',
//               transformOrigin: 'left',
//             }}
//           />
//           <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
//             <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0, fontWeight: 500 }}>
//               © {new Date().getFullYear()} APC Lagos State Chapter. All rights reserved.
//             </p>
//             <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0, fontWeight: 500 }}>
//               Paid for by the APC Lagos State Secretariat
//             </p>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// };


// export default Contact;














import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  MapPin, Phone, Mail, ArrowUpRight, Facebook, Twitter, Instagram,
  CheckCircle2, Loader2, ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: 'Secretariat',
    sublabel: 'Visit us',
    value: 'APC Lagos State Secretariat, Acme Road, Ogba, Ikeja, Lagos',
    href: 'https://maps.google.com',
    tag: '01',
  },
  {
    icon: Phone,
    label: 'Enquiries',
    sublabel: 'Call us',
    value: '+234 (0) 803 000 0000',
    href: 'tel:+2348030000000',
    tag: '02',
  },
  {
    icon: Mail,
    label: 'Email',
    sublabel: 'Write to us',
    value: 'info@lagosapc.com',
    href: 'mailto:info@lagosapc.com',
    tag: '03',
  },
];

const SOCIALS = [
  { icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/share/18C16eC7YF/?mibextid=wwXIfr' },
  { icon: Twitter,   label: 'Twitter/X', href: 'https://x.com/apcchairman' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/apcchairmanlagos?igsh=dHpiNzBuczFveXE5' },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

function useEmailSubscription() {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return { email, setEmail, status, submit };
}

/* ─────────────────────────────────────────────
   RESPONSIVE BREAKPOINTS
───────────────────────────────────────────── */
// xs < 480 | sm 480–767 | md 768–1023 | lg 1024+
function useBreakpoint() {
  const w = useWindowWidth();
  return {
    isXs:   w < 480,
    isSm:   w >= 480 && w < 768,
    isMd:   w >= 768 && w < 1024,
    isLg:   w >= 1024,
    isMobile: w < 768,   // xs + sm
    isTablet: w >= 768 && w < 1024,
    isDesktop: w >= 1024,
  };
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function SectionLabel({ children, light = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
      <span style={{
        fontSize: '0.6rem',
        fontWeight: 900,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: light ? 'rgba(0,138,68,0.8)' : '#008A44',
      }}>
        {children}
      </span>
      <div style={{ height: 1, width: 48, background: '#008A44', opacity: 0.6, flexShrink: 0 }} />
    </div>
  );
}

function ContactCard({ item, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { isMobile } = useBreakpoint();
  const { icon: Icon, label, sublabel, value, href, tag } = item;

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '0.875rem' : '1.25rem',
        padding: isMobile ? '1rem 1.125rem' : '1.25rem 1.5rem',
        background: 'transparent',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '1rem',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.25s ease',
        WebkitTapHighlightColor: 'transparent',
      }}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover="hover"
      whileTap={{ scale: 0.985 }}
    >
      {/* Hover fill */}
      <motion.div
        variants={{ hover: { scaleX: 1 } }}
        initial={{ scaleX: 0 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(0,138,68,0.05) 0%, rgba(0,138,68,0.02) 100%)',
          transformOrigin: 'left',
          borderRadius: '1rem',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Tag number */}
      <span style={{
        fontSize: '0.55rem',
        fontWeight: 900,
        color: 'rgba(0,0,0,0.18)',
        letterSpacing: '0.1em',
        fontFamily: "'Syne', sans-serif",
        minWidth: 16,
        userSelect: 'none',
        display: isMobile ? 'none' : 'block',  /* hide on small screens to save space */
      }}>
        {tag}
      </span>

      {/* Icon */}
      <div style={{
        width: isMobile ? 38 : 42,
        height: isMobile ? 38 : 42,
        borderRadius: '0.75rem',
        background: '#008A44',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 4px 14px rgba(0,138,68,0.25)',
      }}>
        <Icon size={isMobile ? 15 : 16} color="#fff" />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '0.58rem',
          fontWeight: 800,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#9ca3af',
          marginBottom: 2,
          margin: '0 0 2px',
        }}>
          {sublabel}
        </p>
        <p style={{
          fontSize: isMobile ? '0.8rem' : '0.85rem',
          fontWeight: 700,
          color: '#111',
          lineHeight: 1.35,
          margin: 0,
          /* prevent long addresses from breaking layout */
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}>
          {value}
        </p>
      </div>

      {/* Arrow */}
      <motion.div
        variants={{ hover: { x: 2, y: -2 } }}
        transition={{ type: 'spring', stiffness: 400 }}
        style={{ color: '#d1d5db', flexShrink: 0 }}
      >
        <ArrowUpRight size={14} />
      </motion.div>
    </motion.a>
  );
}

function NewsletterForm() {
  const { email, setEmail, status, submit } = useEmailSubscription();
  const { isMobile } = useBreakpoint();

  return (
    <form onSubmit={submit} style={{ width: '100%' }}>
      {/* Stack vertically on very small screens */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '0.625rem',
      }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading' || status === 'success'}
          style={{
            flex: 1,
            padding: '0.875rem 1.1rem',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: '0.75rem',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 500,
            outline: 'none',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'border-color 0.2s, background 0.2s',
            width: '100%',
            boxSizing: 'border-box',
          }}
          onFocus={e => {
            e.target.style.borderColor = '#008A44';
            e.target.style.background  = 'rgba(255,255,255,0.12)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'rgba(255,255,255,0.14)';
            e.target.style.background  = 'rgba(255,255,255,0.08)';
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          style={{
            padding: '0.875rem 1.35rem',
            background: status === 'success' ? '#16a34a' : '#008A44',
            border: 'none',
            borderRadius: '0.75rem',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.8rem',
            letterSpacing: '0.04em',
            cursor: status === 'loading' ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
            transition: 'background 0.2s, transform 0.15s',
            fontFamily: "'Syne', sans-serif",
            whiteSpace: 'nowrap',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          {status === 'loading' && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
          {status === 'success' && <CheckCircle2 size={14} />}
          {status === 'idle'    && 'Subscribe'}
          {status === 'loading' && 'Sending…'}
          {status === 'success' && 'You are in!'}
        </button>
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#4ade80', fontWeight: 600 }}
          >
            Welcome aboard — expect your first briefing shortly.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Contact = () => {
  const navigate    = useNavigate();
  const sectionRef  = useRef(null);
  const inView      = useInView(sectionRef, { once: true, margin: '-80px' });
  const { isXs, isMobile, isTablet, isDesktop } = useBreakpoint();

  /* Google Font injection */
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap';
    link.rel  = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  /* ── Responsive values ── */
  const sectionPadding = isXs
    ? '3.5rem 1rem'
    : isMobile
    ? '4.5rem 1.25rem'
    : isTablet
    ? '5.5rem 1.5rem'
    : '7rem 2rem';

  const headingSize = isXs
    ? '2.2rem'
    : isMobile
    ? '2.8rem'
    : isTablet
    ? '3.8rem'
    : 'clamp(3.2rem, 7vw, 6.5rem)';

  const headerGap        = isMobile ? '1.5rem' : '2rem';
  const headerMarginBot  = isMobile ? '3rem' : '4.5rem';
  const cardPadding      = isMobile ? '1.75rem' : '2.5rem';
  const cardBorderRadius = '1.5rem';

  /* Grid: single column on mobile, two columns on md+ */
  const bodyGridCols = isMobile
    ? '1fr'
    : 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))';

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Responsive newsletter input placeholder color */
        #contact-newsletter-input::placeholder { color: rgba(255,255,255,0.35); }

        /* Focus-visible ring for volunteer card keyboard nav */
        .volunteer-card:focus-visible {
          outline: 2px solid #008A44;
          outline-offset: 3px;
        }

        /* Smooth tap on mobile */
        @media (hover: none) {
          .contact-social-btn:active {
            background: #008A44 !important;
            border-color: #008A44 !important;
            color: #fff !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="contact"
        style={{
          background: '#f9f7f4',
          overflow: 'hidden',
          position: 'relative',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── Noise texture overlay ── */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
            opacity: 0.6,
          }}
        />

        {/* ── Decorative rings — scaled down on mobile ── */}
        {!isXs && (
          <>
            <div aria-hidden style={{
              position: 'absolute',
              top: isMobile ? '-5rem' : '-10rem',
              right: isMobile ? '-5rem' : '-10rem',
              width: isMobile ? '20rem' : '40rem',
              height: isMobile ? '20rem' : '40rem',
              borderRadius: '50%',
              border: '1px solid rgba(0,138,68,0.08)',
              pointerEvents: 'none', zIndex: 0,
            }} />
            <div aria-hidden style={{
              position: 'absolute',
              top: isMobile ? '-3rem' : '-6rem',
              right: isMobile ? '-3rem' : '-6rem',
              width: isMobile ? '14rem' : '30rem',
              height: isMobile ? '14rem' : '30rem',
              borderRadius: '50%',
              border: '1px solid rgba(0,138,68,0.06)',
              pointerEvents: 'none', zIndex: 0,
            }} />
          </>
        )}

        {/* ── Left rail accent — desktop only ── */}
        {isDesktop && (
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: 4,
              background: 'linear-gradient(to bottom, #008A44, rgba(0,138,68,0))',
              transformOrigin: 'top', zIndex: 1,
            }}
          />
        )}

        {/* ── Inner ── */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1280, margin: '0 auto',
          padding: sectionPadding,
        }}>

          {/* ═══════════ HEADER ═══════════ */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: headerGap,
            marginBottom: headerMarginBot,
          }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              style={{ flex: '1 1 auto', minWidth: 0 }}
            >
              <SectionLabel>Get in Touch</SectionLabel>
              <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: headingSize,
                lineHeight: 0.95,
                textTransform: 'uppercase',
                color: '#0a0a0a',
                letterSpacing: '-0.02em',
                margin: 0,
                wordBreak: 'break-word',
              }}>
                Connect with<br />
                <span style={{ color: '#008A44', display: 'inline-block' }}>
                  The Secretariat
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                flex: '1 1 280px',
                maxWidth: 360,
                color: '#6b7280',
                fontSize: isXs ? '0.875rem' : '0.95rem',
                lineHeight: 1.75,
                margin: 0,
                paddingBottom: isMobile ? 0 : '0.5rem',
              }}
            >
              Questions, partnerships, or press enquiries — reach out to the APC Lagos State administrative office directly.
            </motion.p>
          </div>

          {/* ═══════════ BODY GRID ═══════════ */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: bodyGridCols,
            gap: isMobile ? '1.75rem' : '2.5rem',
            alignItems: 'start',
          }}>

            {/* ── LEFT: Contact cards + socials ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {CONTACT_ITEMS.map((item, i) => (
                <ContactCard key={item.label} item={item} index={i} />
              ))}

              {/* Socials strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.42 }}
                style={{
                  marginTop: '0.25rem',
                  padding: isXs ? '1rem' : '1.1rem 1.5rem',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: isXs ? 'flex-start' : 'center',
                  justifyContent: 'space-between',
                  flexDirection: isXs ? 'column' : 'row',
                  gap: isXs ? '0.875rem' : '1rem',
                }}
              >
                <p style={{
                  fontSize: '0.6rem',
                  fontWeight: 800,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#9ca3af',
                  margin: 0,
                }}>
                  Follow our activities
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="contact-social-btn"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.93 }}
                      style={{
                        width: 38, height: 38,
                        borderRadius: '0.625rem',
                        border: '1px solid rgba(0,0,0,0.1)',
                        background: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#374151', textDecoration: 'none',
                        transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background  = '#008A44';
                        e.currentTarget.style.borderColor = '#008A44';
                        e.currentTarget.style.color       = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background  = '#fff';
                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
                        e.currentTarget.style.color       = '#374151';
                      }}
                    >
                      <Icon size={15} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Newsletter + Volunteer ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Newsletter dark card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2 }}
                style={{
                  position: 'relative',
                  background: '#080f09',
                  borderRadius: cardBorderRadius,
                  padding: cardPadding,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {/* Green mesh glow */}
                <div style={{
                  position: 'absolute', top: '-4rem', right: '-4rem',
                  width: '20rem', height: '20rem', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,138,68,0.18) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                {/* Subtle grid pattern */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }} />
                {/* Watermark ring */}
                <div style={{
                  position: 'absolute', bottom: '-3rem', left: '-3rem',
                  width: '12rem', height: '12rem', borderRadius: '50%',
                  border: '24px solid rgba(0,138,68,0.06)',
                  pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <SectionLabel light>Stay Informed</SectionLabel>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 900,
                    fontSize: isXs ? '1.4rem' : '1.7rem',
                    color: '#fff',
                    lineHeight: 1.15,
                    margin: '0 0 0.75rem',
                    letterSpacing: '-0.01em',
                  }}>
                    Join the Progress
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.42)',
                    fontSize: isXs ? '0.82rem' : '0.87rem',
                    lineHeight: 1.7,
                    margin: '0 0 2rem',
                  }}>
                    Receive the Chairman's weekly briefing and official party updates directly in your inbox.
                  </p>
                  <NewsletterForm />
                </div>
              </motion.div>

              {/* Volunteer card — amber editorial */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.3 }}
                onClick={() => navigate('/join')}
                role="link"
                tabIndex={0}
                className="volunteer-card"
                onKeyDown={e => e.key === 'Enter' && navigate('/join')}
                style={{
                  position: 'relative',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: cardBorderRadius,
                  padding: cardPadding,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: 4,
                  background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                  borderRadius: `${cardBorderRadius} ${cardBorderRadius} 0 0`,
                }} />

                {/* Hover wash */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 100%)',
                    borderRadius: cardBorderRadius,
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Top row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    gap: '0.75rem',
                  }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{
                        display: 'inline-block',
                        background: '#fef3c7',
                        color: '#92400e',
                        fontSize: '0.58rem',
                        fontWeight: 800,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '2rem',
                        marginBottom: '1rem',
                        border: '1px solid rgba(245,158,11,0.2)',
                      }}>
                        Get Involved
                      </span>
                      <h3 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 900,
                        fontSize: isXs ? '1.3rem' : '1.6rem',
                        color: '#0a0a0a',
                        lineHeight: 1.1,
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        wordBreak: 'break-word',
                      }}>
                        Renewed Hope<br />Agenda
                      </h3>
                    </div>
                    {/* Arrow badge */}
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      style={{
                        width: 40, height: 40,
                        background: '#f59e0b',
                        borderRadius: '0.625rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ArrowUpRight size={18} color="#fff" />
                    </motion.div>
                  </div>

                  <p style={{
                    color: '#6b7280',
                    fontSize: isXs ? '0.82rem' : '0.87rem',
                    lineHeight: 1.7,
                    margin: '0 0 2rem',
                  }}>
                    Building a better, smarter, and more inclusive Lagos for every single Lagosian.
                  </p>

                  {/* CTA button */}
                  <motion.button
                    whileHover={{ gap: '0.75rem' }}
                    style={{
                      width: '100%',
                      background: '#0a0a0a',
                      border: 'none',
                      borderRadius: '0.875rem',
                      padding: '1rem',
                      color: '#fff',
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#008A44'}
                    onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
                  >
                    Volunteer Today
                    <ChevronRight size={15} />
                  </motion.button>
                </div>
              </motion.div>

            </div>
          </div>

          {/* ═══════════ FOOTER DIVIDER ═══════════ */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: isMobile ? '3rem' : '4.5rem',
              height: 1,
              background: 'linear-gradient(90deg, #008A44 0%, rgba(0,138,68,0.3) 30%, transparent 70%)',
              transformOrigin: 'left',
            }}
          />

          <div style={{
            marginTop: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0, fontWeight: 500 }}>
              © {new Date().getFullYear()} APC Lagos State Chapter. All rights reserved.
            </p>
            <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0, fontWeight: 500 }}>
              Paid for by the APC Lagos State Secretariat
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;