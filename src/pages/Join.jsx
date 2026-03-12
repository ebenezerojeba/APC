// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { UserPlus, CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react';

// // ── Config ────────────────────────────────────────────────────────────────────
// // Set VITE_API_URL=https://your-api.com in your .env file for production.
// // Falls back to relative /api so a reverse proxy (nginx, Vercel rewrites) just works.
// const _raw = import.meta.env.VITE_API_URL;
// const API_URL = (_raw && _raw !== 'undefined')
//   ? _raw.replace(/\/$/, '')        // strip any trailing slash
//   : 'https://apcbackend.vercel.app/api'; 

// const LGA_LIST = [
//   'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
//   'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
//   'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
//   'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere',
// ];

// const INTEREST_OPTIONS = [
//   'Volunteer', 'Grassroots Support', 'Media & Comms', 'Polling Agent', 'PVC',
// ];

// const EMPTY_FORM = {
//   firstName: '', lastName: '', email: '', phone: '',
//   lga: '', ward: '', interests: [], message: '',
// };

// // ── Sub-components ────────────────────────────────────────────────────────────
// const FieldError = ({ message }) =>
//   message ? (
//     <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//       <AlertCircle size={13} className="shrink-0" />
//       {message}
//     </p>
//   ) : null;

// const inputCls = (hasError) =>
//   `w-full px-4 py-3 border-2 rounded-xl outline-none transition-all text-gray-900 placeholder:text-gray-400
//    ${hasError
//      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100'
//      : 'border-gray-200 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100'
//    }`;

// // ── Validation ────────────────────────────────────────────────────────────────
// const NIGERIAN_PHONE = /^(\+234|0)[789][01]\d{8}$/;

// const validate = (form) => {
//   const errs = {};
//   if (!form.firstName.trim())                   errs.firstName  = 'First name is required';
//   else if (form.firstName.trim().length < 2)    errs.firstName  = 'Must be at least 2 characters';

//   if (!form.lastName.trim())                    errs.lastName   = 'Last name is required';
//   else if (form.lastName.trim().length < 2)     errs.lastName   = 'Must be at least 2 characters';

//   if (!form.email.trim())                       errs.email      = 'Email address is required';
//   else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email      = 'Enter a valid email address';

//   if (!form.phone.trim())                       errs.phone      = 'Phone number is required';
//   else if (!NIGERIAN_PHONE.test(form.phone))    errs.phone      = 'Enter a valid Nigerian number (e.g. 08012345678)';

//   if (!form.lga)                                errs.lga        = 'Please select your LGA';
//   if (!form.interests.length)                   errs.interests  = 'Please select at least one area of interest';

//   return errs;
// };

// // ── Success Screen ─────────────────────────────────────────────────────────────
// const SuccessScreen = ({ name, lga, onReset }) => (
//   <motion.div
//     key="success"
//     initial={{ opacity: 0, scale: 0.95 }}
//     animate={{ opacity: 1, scale: 1 }}
//     className="flex flex-col items-center justify-center text-center py-16 px-8 space-y-6"
//   >
//     <motion.div
//       initial={{ scale: 0 }}
//       animate={{ scale: 1 }}
//       transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
//       className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center"
//     >
//       <CheckCircle size={48} className="text-emerald-700" strokeWidth={1.5} />
//     </motion.div>

//     <div>
//       <h3 className="text-3xl font-black text-gray-900 mb-2">Welcome, {name}! 🎉</h3>
//       <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
//         Your registration is confirmed. A party representative from{' '}
//         <strong className="text-emerald-700">{lga} LGA</strong> will reach out to you shortly.
//       </p>
//     </div>

//     <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-4 text-sm text-emerald-800 max-w-xs">
//       Check your email inbox — we've sent you a confirmation with your registration details.
//     </div>

//     <button
//       onClick={onReset}
//       className="text-sm text-gray-500 hover:text-emerald-700 underline underline-offset-2 transition-colors"
//     >
//       Register another person
//     </button>
//   </motion.div>
// );

// // ── Main Component ────────────────────────────────────────────────────────────
// const Join = () => {
//   const [formData, setFormData]   = useState(EMPTY_FORM);
//   const [fieldErrors, setFieldErrors] = useState({});
//   const [submitState, setSubmitState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
//   const [serverError, setServerError] = useState('');
//   const [successMeta, setSuccessMeta] = useState({ name: '', lga: '' });

//   // ── Field helpers ────────────────────────────────────────────────────────
//   const setField = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//     // Clear the field-level error as soon as the user corrects it
//     if (fieldErrors[key]) {
//       setFieldErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
//     }
//   };

//   const toggleInterest = (option) => {
//     const next = formData.interests.includes(option)
//       ? formData.interests.filter((i) => i !== option)
//       : [...formData.interests, option];
//     setField('interests', next);
//   };

//   const resetForm = () => {
//     setFormData(EMPTY_FORM);
//     setFieldErrors({});
//     setSubmitState('idle');
//     setServerError('');
//   };

//   // ── Submit ───────────────────────────────────────────────────────────────
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setServerError('');

//     // Client-side validation first — no round-trip needed for obvious errors
//     const errs = validate(formData);
//     if (Object.keys(errs).length) {
//       setFieldErrors(errs);
//       // Scroll to first error
//       const firstErrKey = Object.keys(errs)[0];
//       document.getElementById(`field-${firstErrKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       return;
//     }

//     setSubmitState('loading');

//     try {
//       const response = await fetch(`${API_URL}/members/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // Only send fields the API expects — never send undefined/extra keys
//         body: JSON.stringify({
//           firstName:  formData.firstName.trim(),
//           lastName:   formData.lastName.trim(),
//           email:      formData.email.trim().toLowerCase(),
//           phone:      formData.phone.trim(),
//           lga:        formData.lga,
//           ward:       formData.ward.trim() || undefined,
//           interests:  formData.interests,
//           message:    formData.message.trim() || undefined,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // Handle validation errors returned from the server (422)
//         if (response.status === 422 && data.errors?.length) {
//           const serverFieldErrs = {};
//           data.errors.forEach(({ field, message }) => { serverFieldErrs[field] = message; });
//           setFieldErrors(serverFieldErrs);
//           setSubmitState('idle');
//           return;
//         }
//         // Handle duplicate email (409)
//         if (response.status === 409) {
//           setFieldErrors({ email: data.message || 'This email is already registered.' });
//           setSubmitState('idle');
//           return;
//         }
//         // Any other server error
//         throw new Error(data.message || 'Registration failed. Please try again.');
//       }

//       // ✅ Success
//       setSuccessMeta({ name: formData.firstName, lga: formData.lga });
//       setSubmitState('success');
//     } catch (err) {
//       // Network error or unexpected server error
//       setServerError(
//         err.message === 'Failed to fetch'
//           ? 'Could not reach the server. Please check your connection and try again.'
//           : err.message || 'An unexpected error occurred. Please try again.'
//       );
//       setSubmitState('error');
//     }
//   };

//   const isLoading = submitState === 'loading';

//   // ── Render ───────────────────────────────────────────────────────────────
//   return (
//     <section id="join" className="py-24 mt-20 bg-white relative overflow-hidden">
//       {/* Background Decoration */}
//       <div className="absolute top-0 right-0 w-1/3 h-full bg-[#008A44]/5 skew-x-12 transform origin-top hidden lg:block" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid lg:grid-cols-5 gap-16">

//           {/* Left: CTA */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2
//                 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 uppercase leading-none"
//                 style={{ fontFamily: 'Impact, sans-serif' }}
//               >
//                 Be Part Of <br />
//                 <span className="text-[#008A44]">The Progress</span>
//               </h2>
//               <p className="text-xl text-gray-600 mb-10 leading-relaxed">
//                 The Lagos APC is more than a party; it's a movement of over 4 million
//                 Lagosians. Join us to help build a greater state.
//               </p>
//             </motion.div>
//           </div>

//           {/* Right: Form card */}
//           <motion.div
//             className="lg:col-span-3"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
//               <AnimatePresence mode="wait">
//                 {submitState === 'success' ? (
//                   <SuccessScreen
//                     key="success"
//                     name={successMeta.name}
//                     lga={successMeta.lga}
//                     onReset={resetForm}
//                   />
//                 ) : (
//                   <motion.div
//                     key="form"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="p-8 md:p-12"
//                   >
//                     {/* Server error banner */}
//                     <AnimatePresence>
//                       {submitState === 'error' && serverError && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -8 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -8 }}
//                           className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-4"
//                         >
//                           <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
//                           <div>
//                             <p className="text-sm font-semibold text-red-800">Submission Failed</p>
//                             <p className="text-sm text-red-700 mt-0.5">{serverError}</p>
//                           </div>
//                           <button
//                             onClick={() => setSubmitState('idle')}
//                             className="ml-auto text-red-400 hover:text-red-600 text-lg leading-none"
//                           >
//                             ×
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>

//                     <form onSubmit={handleSubmit} className="space-y-6" noValidate>
//                       {/* Name row */}
//                       <div className="grid md:grid-cols-2 gap-6">
//                         <div id="field-firstName">
//                           <label className="block font-semibold text-emerald-700 mb-2">
//                             First Name <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             value={formData.firstName}
//                             onChange={(e) => setField('firstName', e.target.value)}
//                             className={inputCls(!!fieldErrors.firstName)}
//                             placeholder="e.g. Amaka"
//                             disabled={isLoading}
//                             autoComplete="given-name"
//                           />
//                           <FieldError message={fieldErrors.firstName} />
//                         </div>
//                         <div id="field-lastName">
//                           <label className="block font-semibold text-emerald-700 mb-2">
//                             Last Name <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             value={formData.lastName}
//                             onChange={(e) => setField('lastName', e.target.value)}
//                             className={inputCls(!!fieldErrors.lastName)}
//                             placeholder="e.g. Okonkwo"
//                             disabled={isLoading}
//                             autoComplete="family-name"
//                           />
//                           <FieldError message={fieldErrors.lastName} />
//                         </div>
//                       </div>

//                       {/* Contact row */}
//                       <div className="grid md:grid-cols-2 gap-6">
//                         <div id="field-email">
//                           <label className="block font-semibold text-emerald-700 mb-2">
//                             Email Address <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="email"
//                             value={formData.email}
//                             onChange={(e) => setField('email', e.target.value)}
//                             className={inputCls(!!fieldErrors.email)}
//                             placeholder="you@example.com"
//                             disabled={isLoading}
//                             autoComplete="email"
//                           />
//                           <FieldError message={fieldErrors.email} />
//                         </div>
//                         <div id="field-phone">
//                           <label className="block font-semibold text-emerald-700 mb-2">
//                             Phone Number <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="tel"
//                             value={formData.phone}
//                             onChange={(e) => setField('phone', e.target.value)}
//                             className={inputCls(!!fieldErrors.phone)}
//                             placeholder="08012345678"
//                             disabled={isLoading}
//                             autoComplete="tel"
//                           />
//                           <FieldError message={fieldErrors.phone} />
//                         </div>
//                       </div>

//                       {/* Location row */}
//                       <div className="grid md:grid-cols-2 gap-6">
//                         <div id="field-lga">
//                           <label className="block font-semibold text-emerald-700 mb-2">
//                             Local Government Area <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <select
//                               value={formData.lga}
//                               onChange={(e) => setField('lga', e.target.value)}
//                               className={`${inputCls(!!fieldErrors.lga)} appearance-none pr-10`}
//                               disabled={isLoading}
//                             >
//                               <option value="">Select your LGA</option>
//                               {LGA_LIST.map((lga) => (
//                                 <option key={lga} value={lga}>{lga}</option>
//                               ))}
//                             </select>
//                             <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                           </div>
//                           <FieldError message={fieldErrors.lga} />
//                         </div>
//                         <div>
//                           <label className="block font-semibold text-emerald-700 mb-2">Ward</label>
//                           <input
//                             type="text"
//                             value={formData.ward}
//                             onChange={(e) => setField('ward', e.target.value)}
//                             className={inputCls(false)}
//                             placeholder="Optional"
//                             disabled={isLoading}
//                           />
//                         </div>
//                       </div>

//                       {/* Interests */}
//                       <div id="field-interests">
//                         <label className="block font-semibold text-emerald-700 mb-3">
//                           How would you like to contribute? <span className="text-red-500">*</span>
//                         </label>
//                         <div className="flex flex-wrap gap-3">
//                           {INTEREST_OPTIONS.map((option) => {
//                             const checked = formData.interests.includes(option);
//                             return (
//                               <button
//                                 key={option}
//                                 type="button"
//                                 onClick={() => toggleInterest(option)}
//                                 disabled={isLoading}
//                                 className={`
//                                   px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-150
//                                   ${checked
//                                     ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
//                                     : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-700'
//                                   }
//                                   disabled:opacity-50 disabled:cursor-not-allowed
//                                 `}
//                               >
//                                 {checked && <span className="mr-1.5">✓</span>}
//                                 {option}
//                               </button>
//                             );
//                           })}
//                         </div>
//                         <FieldError message={fieldErrors.interests} />
//                       </div>

//                       {/* Message */}
//                       <div>
//                         <label className="block font-semibold text-emerald-700 mb-2">
//                           Message <span className="text-gray-400 font-normal text-sm">(Optional)</span>
//                         </label>
//                         <textarea
//                           value={formData.message}
//                           onChange={(e) => setField('message', e.target.value)}
//                           rows={4}
//                           placeholder="Anything else you'd like us to know..."
//                           className={`${inputCls(false)} resize-none`}
//                           disabled={isLoading}
//                           maxLength={1000}
//                         />
//                         {formData.message.length > 800 && (
//                           <p className="text-xs text-gray-400 mt-1 text-right">
//                             {formData.message.length}/1000
//                           </p>
//                         )}
//                       </div>

//                       {/* Submit */}
//                       <motion.button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full bg-emerald-700 text-white py-4 rounded-full font-bold text-lg shadow-xl
//                                    disabled:opacity-70 disabled:cursor-not-allowed
//                                    hover:bg-emerald-800 active:scale-[0.98] transition-all duration-150
//                                    flex items-center justify-center gap-3"
//                         whileTap={!isLoading ? { scale: 0.98 } : {}}
//                       >
//                         {isLoading ? (
//                           <>
//                             <Loader2 size={20} className="animate-spin" />
//                             Submitting...
//                           </>
//                         ) : (
//                           <>
//                             <UserPlus size={20} />
//                             Submit Registration
//                           </>
//                         )}
//                       </motion.button>

//                       <p className="text-center text-xs text-gray-400">
//                         By registering, you agree to be contacted by Lagos APC representatives.
//                       </p>
//                     </form>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Join;









import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, AlertCircle, Loader2, ChevronDown } from 'lucide-react';

// ── Config ───────────────────────────────────────────────────────────────────
const _raw = import.meta.env.VITE_API_URL;
const API_URL = (_raw && _raw !== 'undefined')
  ? _raw.replace(/\/$/, '')
  : 'https://apcbackend.vercel.app/api';

const LGA_LIST = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
  'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
  'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere',
];

const INTEREST_OPTIONS = [
  'Volunteer', 'Grassroots Support', 'Media & Comms', 'Polling Agent', 'PVC',
];

const EMPTY_FORM = {
  firstName: '', lastName: '', email: '', phone: '',
  lga: '', ward: '', interests: [], message: '',
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const NIGERIAN_PHONE = /^(\+234|0)[789][01]\d{8}$/;

const validate = (form) => {
  const errs = {};
  if (!form.firstName.trim())                    errs.firstName = 'First name is required';
  else if (form.firstName.trim().length < 2)     errs.firstName = 'At least 2 characters';

  if (!form.lastName.trim())                     errs.lastName  = 'Last name is required';
  else if (form.lastName.trim().length < 2)      errs.lastName  = 'At least 2 characters';

  if (!form.email.trim())                        errs.email     = 'Email address is required';
  else if (!/^\S+@\S+\.\S+$/.test(form.email))  errs.email     = 'Enter a valid email address';

  if (!form.phone.trim())                        errs.phone     = 'Phone number is required';
  else if (!NIGERIAN_PHONE.test(form.phone))     errs.phone     = 'Enter a valid Nigerian number (e.g. 08012345678)';

  if (!form.lga)                                 errs.lga       = 'Please select your LGA';
  if (!form.interests.length)                    errs.interests = 'Select at least one area';
  return errs;
};

const inputCls = (hasError) =>
  `w-full px-4 py-3 border-2 rounded-xl outline-none transition-all text-gray-900 bg-white
   placeholder:text-gray-400 text-sm
   ${hasError
     ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100'
     : 'border-gray-200 focus:border-[#006B3F] focus:ring-4 focus:ring-emerald-100/60'
   }`;

const FieldError = ({ message }) =>
  message ? (
    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
      <AlertCircle size={11} className="shrink-0" /> {message}
    </p>
  ) : null;

// ── Success Screen ────────────────────────────────────────────────────────────
// Feels earned — like a party membership card moment, not a generic "thank you"
const SuccessScreen = ({ name, lga, onReset }) => {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCard(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      {/* Green APC band at top */}
      <div className="bg-[#006B3F] px-8 pt-10 pb-8 text-white relative overflow-hidden">
        {/* Decorative diagonal lines — subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600" />

        <div className="relative">
          {/* APC badge label */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-sm px-3 py-1 mb-6">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">
              APC · Lagos State
            </span>
          </div>

          {/* Tick mark — simple, not flashy */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.15 }}
            className="w-14 h-14 rounded-full bg-white/15 border-2 border-white/30
                       flex items-center justify-center mb-6"
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <motion.path
                d="M5 13.5L10.5 19L21 8"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-1">
              Registration Confirmed
            </p>
            <h3 className="text-2xl font-bold leading-snug" style={{ fontFamily: "Georgia, serif" }}>
              Welcome to the movement,<br />
              <span className="text-yellow-300">{name}.</span>
            </h3>
          </motion.div>
        </div>
      </div>

      {/* Membership card – slides in after a beat */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="px-8 py-7 border-b border-gray-100"
          >
            {/* Card — looks like a member record, not a success toast */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 bg-white">
                <div className="w-8 h-8 rounded-full bg-[#006B3F] flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-black">APC</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Member Record</p>
                  <p className="text-sm font-semibold text-gray-900">{name} · {lga} LGA</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200
                                   text-amber-700 text-[10px] font-bold uppercase tracking-wider
                                   rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    Pending verification
                  </span>
                </div>
              </div>
              <div className="px-5 py-4 space-y-2.5">
                {[
                  ['Step 1', 'LGA Coordinator will review your details'],
                  ['Step 2', 'A representative will contact you to verify'],
                  ['Step 3', 'Membership activated — you\'re officially in'],
                ].map(([label, text], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`mt-0.5 shrink-0 text-[10px] font-black px-2 py-0.5 rounded-sm
                      ${i === 2
                        ? 'bg-[#006B3F] text-white'
                        : 'bg-gray-200 text-gray-600'
                      }`}>
                      {label}
                    </span>
                    <p className="text-sm text-gray-600 leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom area */}
      <div className="px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center
                      justify-between gap-4">
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
          A confirmation has been sent to your email inbox.
        </p>
        <button
          onClick={onReset}
          className="shrink-0 text-xs text-[#006B3F] font-semibold border border-[#006B3F]/30
                     rounded-full px-4 py-2 hover:bg-[#006B3F]/5 transition-colors"
        >
          Register another person
        </button>
      </div>
    </motion.div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Join = () => {
  const [formData, setFormData]     = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error
  const [serverError, setServerError] = useState('');
  const [successMeta, setSuccessMeta] = useState({ name: '', lga: '' });

  const setField = (key, value) => {
    setFormData((p) => ({ ...p, [key]: value }));
    if (fieldErrors[key]) setFieldErrors((p) => { const n = { ...p }; delete n[key]; return n; });
  };

  const toggleInterest = (opt) => {
    const next = formData.interests.includes(opt)
      ? formData.interests.filter((i) => i !== opt)
      : [...formData.interests, opt];
    setField('interests', next);
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setFieldErrors({});
    setSubmitState('idle');
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const errs = validate(formData);
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      document.getElementById(`f-${Object.keys(errs)[0]}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitState('loading');

    try {
      const res = await fetch(`${API_URL}/members/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:  formData.firstName.trim(),
          lastName:   formData.lastName.trim(),
          email:      formData.email.trim().toLowerCase(),
          phone:      formData.phone.trim(),
          lga:        formData.lga,
          ward:       formData.ward.trim() || undefined,
          interests:  formData.interests,
          message:    formData.message.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.errors?.length) {
          const fe = {};
          data.errors.forEach(({ field, message }) => { fe[field] = message; });
          setFieldErrors(fe);
          setSubmitState('idle');
          return;
        }
        if (res.status === 409) {
          setFieldErrors({ email: data.message || 'This email is already registered.' });
          setSubmitState('idle');
          return;
        }
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      setSuccessMeta({ name: formData.firstName, lga: formData.lga });
      setSubmitState('success');
    } catch (err) {
      setServerError(
        err.message === 'Failed to fetch'
          ? 'Could not reach the server. Check your connection and try again.'
          : err.message || 'An unexpected error occurred. Please try again.'
      );
      setSubmitState('error');
    }
  };

  const isLoading = submitState === 'loading';

  return (
    <section id="join" className="py-24 mt-20 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#006B3F]/[0.04] skew-x-12 transform origin-top hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16">

          {/* Left: CTA */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Gold rule */}
              <div className="w-10 h-0.5 bg-[#006B3F] mb-6" />
              <h2
                className="text-5xl md:text-6xl font-black text-gray-900 mb-6 uppercase leading-none tracking-tight"
                style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
              >
                Be Part Of<br />
                <span className="text-[#006B3F]">The Progress</span>
              </h2>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                The Lagos APC is more than a party — it is a movement of over 4 million
                Lagosians. Join us and help shape a greater state.
              </p>

              {/* Trust signals */}
              <div className="space-y-3">
                {[
                  ['4M+', 'Active members across Lagos'],
                  ['20', 'LGAs represented'],
                  ['Free', 'No registration fee'],
                ].map(([stat, label]) => (
                  <div key={stat} className="flex items-center gap-3">
                    <span className="text-sm font-black text-[#006B3F] w-12">{stat}</span>
                    <span className="text-sm text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Form card */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)]
                            border border-gray-100 overflow-hidden">
              <AnimatePresence mode="wait">

                {submitState === 'success' ? (
                  <SuccessScreen
                    key="success"
                    name={successMeta.name}
                    lga={successMeta.lga}
                    onReset={resetForm}
                  />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Form header */}
                    <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#006B3F] flex items-center justify-center">
                          <span className="text-white text-[10px] font-black">APC</span>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-[#006B3F]">
                            Lagos State Chapter
                          </p>
                          <p className="text-sm font-semibold text-gray-800">Member Registration Form</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 md:px-10">
                      {/* Server error */}
                      <AnimatePresence>
                        {submitState === 'error' && serverError && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200
                                       rounded-xl px-4 py-3.5"
                          >
                            <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-red-800">Submission failed</p>
                              <p className="text-xs text-red-600 mt-0.5">{serverError}</p>
                            </div>
                            <button
                              onClick={() => setSubmitState('idle')}
                              className="text-red-300 hover:text-red-500 text-lg leading-none ml-auto"
                            >×</button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                        {/* Name */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div id="f-firstName">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                              First Name <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => setField('firstName', e.target.value)}
                              className={inputCls(!!fieldErrors.firstName)}
                              placeholder="Amaka"
                              disabled={isLoading}
                              autoComplete="given-name"
                            />
                            <FieldError message={fieldErrors.firstName} />
                          </div>
                          <div id="f-lastName">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                              Last Name <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => setField('lastName', e.target.value)}
                              className={inputCls(!!fieldErrors.lastName)}
                              placeholder="Okonkwo"
                              disabled={isLoading}
                              autoComplete="family-name"
                            />
                            <FieldError message={fieldErrors.lastName} />
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div id="f-email">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                              Email <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setField('email', e.target.value)}
                              className={inputCls(!!fieldErrors.email)}
                              placeholder="you@example.com"
                              disabled={isLoading}
                              autoComplete="email"
                            />
                            <FieldError message={fieldErrors.email} />
                          </div>
                          <div id="f-phone">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                              Phone <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setField('phone', e.target.value)}
                              className={inputCls(!!fieldErrors.phone)}
                              placeholder="08012345678"
                              disabled={isLoading}
                              autoComplete="tel"
                            />
                            <FieldError message={fieldErrors.phone} />
                          </div>
                        </div>

                        {/* Location */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div id="f-lga">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                              LGA <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                              <select
                                value={formData.lga}
                                onChange={(e) => setField('lga', e.target.value)}
                                className={`${inputCls(!!fieldErrors.lga)} appearance-none pr-10`}
                                disabled={isLoading}
                              >
                                <option value="">Select your LGA</option>
                                {LGA_LIST.map((l) => <option key={l} value={l}>{l}</option>)}
                              </select>
                              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2
                                                                text-gray-400 pointer-events-none" />
                            </div>
                            <FieldError message={fieldErrors.lga} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                              Ward <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              value={formData.ward}
                              onChange={(e) => setField('ward', e.target.value)}
                              className={inputCls(false)}
                              placeholder="Your ward"
                              disabled={isLoading}
                            />
                          </div>
                        </div>

                        {/* Interests */}
                        <div id="f-interests">
                          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                            How would you like to contribute? <span className="text-red-400">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {INTEREST_OPTIONS.map((opt) => {
                              const active = formData.interests.includes(opt);
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => toggleInterest(opt)}
                                  disabled={isLoading}
                                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border
                                    transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
                                    ${active
                                      ? 'bg-[#006B3F] text-white border-[#006B3F]'
                                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#006B3F]/50 hover:text-[#006B3F]'
                                    }`}
                                >
                                  {active && <span className="mr-1">✓</span>}
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          <FieldError message={fieldErrors.interests} />
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                            Message <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => setField('message', e.target.value)}
                            rows={3}
                            placeholder="Anything else you'd like us to know…"
                            className={`${inputCls(false)} resize-none`}
                            disabled={isLoading}
                            maxLength={1000}
                          />
                          {formData.message.length > 800 && (
                            <p className="text-xs text-gray-400 mt-1 text-right">
                              {formData.message.length}/1000
                            </p>
                          )}
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-[#006B3F] text-white py-3.5 rounded-xl font-bold text-sm
                                     shadow-lg shadow-[#006B3F]/20 disabled:opacity-60 disabled:cursor-not-allowed
                                     hover:bg-[#005533] active:scale-[0.99] transition-all duration-150
                                     flex items-center justify-center gap-2.5"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Submitting…
                            </>
                          ) : (
                            <>
                              <UserPlus size={16} />
                              Submit Registration
                            </>
                          )}
                        </button>

                        <p className="text-center text-[11px] text-gray-400">
                          By registering, you agree to be contacted by Lagos APC representatives.
                        </p>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Join;