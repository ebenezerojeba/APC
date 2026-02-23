// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { UserPlus, ShieldCheck, Users, Zap, CheckCircle } from 'lucide-react';

// const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// const Join = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     lga: '',
//     ward: '',
//     interests: [],
//     message: ''
//   });

//   const lgaList = [
//     'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
//     'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
//     'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
//     'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
//   ];

//   const interestOptions = ['Volunteer', 'Grassroots Support', 'Media & Comms', 'Polling Agent', 'PVC'];
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/members/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message);
//       // Show success: data.message
//     } catch (err) {
//       // Show error: err.message
//     }
//   };

//   const handleInterestChange = (interest) => {
//     setFormData(prev => ({
//       ...prev,
//       interests: prev.interests.includes(interest)
//         ? prev.interests.filter(i => i !== interest)
//         : [...prev.interests, interest]
//     }));
//   };

//   return (
//     <section id="join" className="py-24 mt-20 bg-white relative overflow-hidden">
//       {/* Background Decoration */}
//       <div className="absolute top-0 right-0 w-1/3 h-full bg-[#008A44]/5 skew-x-12 transform origin-top hidden lg:block" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid lg:grid-cols-5 gap-16">

//           {/* Left Side: Call to Action & Steps */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 uppercase leading-none" style={{ fontFamily: 'Impact, sans-serif' }}>
//                 Be Part Of <br /> <span className="text-[#008A44]">The Progress</span>
//               </h2>
//               <p className="text-xl text-gray-600 mb-10 leading-relaxed">
//                 The Lagos APC is more than a party; it's a movement of over 4 million Lagosians. Join us to help build a greater state.
//               </p>


//             </motion.div>
//           </div>

//           {/* Right Side: The Form */}
//           <motion.div
//             className="lg:col-span-3"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block font-semibold text-emerald-700 mb-2">First Name *</label>
//                     <input
//                       type="text"
//                       value={formData.firstName}
//                       onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-semibold text-emerald-700 mb-2">Last Name *</label>
//                     <input
//                       type="text"
//                       value={formData.lastName}
//                       onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block font-semibold text-emerald-700 mb-2">Email Address *</label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-semibold text-emerald-700 mb-2">Phone Number *</label>
//                     <input
//                       type="tel"
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block font-semibold text-emerald-700 mb-2">Local Government Area *</label>
//                     <select
//                       value={formData.lga}
//                       onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
//                       required
//                     >
//                       <option value="">Select LGA</option>
//                       {lgaList.map(lga => (
//                         <option key={lga} value={lga}>{lga}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block font-semibold text-emerald-700 mb-2">Ward</label>
//                     <input
//                       type="text"
//                       value={formData.ward}
//                       onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block font-semibold text-emerald-700 mb-3">I want to: *</label>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {interestOptions.map(option => (
//                       <label key={option} className="flex items-center gap-2 cursor-pointer group">
//                         <input
//                           type="checkbox"
//                           checked={formData.interests.includes(option)}
//                           onChange={() => handleInterestChange(option)}
//                           className="w-5 h-5 text-emerald-700 rounded focus:ring-emerald-500 cursor-pointer"
//                         />
//                         <span className="group-hover:text-emerald-700 transition-colors">{option}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block font-semibold text-emerald-700 mb-2">Message (Optional)</label>
//                   <textarea
//                     value={formData.message}
//                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                     rows="4"
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all resize-none"
//                   />
//                 </div>

//                 <motion.button
//                   type="submit"
//                   className="w-full bg-emerald-700 cursor-pointer text-white py-4 rounded-full font-bold text-lg shadow-xl"
//                   whileHover={{ scale: 1.02, backgroundColor: '#065f46' }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Submit Registration
//                 </motion.button>
//               </form>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Join;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react';

// ── Config ────────────────────────────────────────────────────────────────────
// Set VITE_API_URL=https://your-api.com in your .env file for production.
// Falls back to relative /api so a reverse proxy (nginx, Vercel rewrites) just works.
const _raw = import.meta.env.VITE_API_URL;
const API_URL = (_raw && _raw !== 'undefined')
  ? _raw.replace(/\/$/, '')        // strip any trailing slash
  : 'https://apcbackend.onrender.com/api'; 

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

// ── Sub-components ────────────────────────────────────────────────────────────
const FieldError = ({ message }) =>
  message ? (
    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
      <AlertCircle size={13} className="shrink-0" />
      {message}
    </p>
  ) : null;

const inputCls = (hasError) =>
  `w-full px-4 py-3 border-2 rounded-xl outline-none transition-all text-gray-900 placeholder:text-gray-400
   ${hasError
     ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100'
     : 'border-gray-200 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100'
   }`;

// ── Validation ────────────────────────────────────────────────────────────────
const NIGERIAN_PHONE = /^(\+234|0)[789][01]\d{8}$/;

const validate = (form) => {
  const errs = {};
  if (!form.firstName.trim())                   errs.firstName  = 'First name is required';
  else if (form.firstName.trim().length < 2)    errs.firstName  = 'Must be at least 2 characters';

  if (!form.lastName.trim())                    errs.lastName   = 'Last name is required';
  else if (form.lastName.trim().length < 2)     errs.lastName   = 'Must be at least 2 characters';

  if (!form.email.trim())                       errs.email      = 'Email address is required';
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email      = 'Enter a valid email address';

  if (!form.phone.trim())                       errs.phone      = 'Phone number is required';
  else if (!NIGERIAN_PHONE.test(form.phone))    errs.phone      = 'Enter a valid Nigerian number (e.g. 08012345678)';

  if (!form.lga)                                errs.lga        = 'Please select your LGA';
  if (!form.interests.length)                   errs.interests  = 'Please select at least one area of interest';

  return errs;
};

// ── Success Screen ─────────────────────────────────────────────────────────────
const SuccessScreen = ({ name, lga, onReset }) => (
  <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center text-center py-16 px-8 space-y-6"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
      className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center"
    >
      <CheckCircle size={48} className="text-emerald-700" strokeWidth={1.5} />
    </motion.div>

    <div>
      <h3 className="text-3xl font-black text-gray-900 mb-2">Welcome, {name}! 🎉</h3>
      <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
        Your registration is confirmed. A party representative from{' '}
        <strong className="text-emerald-700">{lga} LGA</strong> will reach out to you shortly.
      </p>
    </div>

    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-4 text-sm text-emerald-800 max-w-xs">
      Check your email inbox — we've sent you a confirmation with your registration details.
    </div>

    <button
      onClick={onReset}
      className="text-sm text-gray-500 hover:text-emerald-700 underline underline-offset-2 transition-colors"
    >
      Register another person
    </button>
  </motion.div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Join = () => {
  const [formData, setFormData]   = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [serverError, setServerError] = useState('');
  const [successMeta, setSuccessMeta] = useState({ name: '', lga: '' });

  // ── Field helpers ────────────────────────────────────────────────────────
  const setField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear the field-level error as soon as the user corrects it
    if (fieldErrors[key]) {
      setFieldErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
    }
  };

  const toggleInterest = (option) => {
    const next = formData.interests.includes(option)
      ? formData.interests.filter((i) => i !== option)
      : [...formData.interests, option];
    setField('interests', next);
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setFieldErrors({});
    setSubmitState('idle');
    setServerError('');
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // Client-side validation first — no round-trip needed for obvious errors
    const errs = validate(formData);
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      // Scroll to first error
      const firstErrKey = Object.keys(errs)[0];
      document.getElementById(`field-${firstErrKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitState('loading');

    try {
      const response = await fetch(`${API_URL}/members/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only send fields the API expects — never send undefined/extra keys
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

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors returned from the server (422)
        if (response.status === 422 && data.errors?.length) {
          const serverFieldErrs = {};
          data.errors.forEach(({ field, message }) => { serverFieldErrs[field] = message; });
          setFieldErrors(serverFieldErrs);
          setSubmitState('idle');
          return;
        }
        // Handle duplicate email (409)
        if (response.status === 409) {
          setFieldErrors({ email: data.message || 'This email is already registered.' });
          setSubmitState('idle');
          return;
        }
        // Any other server error
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      // ✅ Success
      setSuccessMeta({ name: formData.firstName, lga: formData.lga });
      setSubmitState('success');
    } catch (err) {
      // Network error or unexpected server error
      setServerError(
        err.message === 'Failed to fetch'
          ? 'Could not reach the server. Please check your connection and try again.'
          : err.message || 'An unexpected error occurred. Please try again.'
      );
      setSubmitState('error');
    }
  };

  const isLoading = submitState === 'loading';

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <section id="join" className="py-24 mt-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#008A44]/5 skew-x-12 transform origin-top hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16">

          {/* Left: CTA */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-5xl md:text-6xl font-black text-gray-900 mb-6 uppercase leading-none"
                style={{ fontFamily: 'Impact, sans-serif' }}
              >
                Be Part Of <br />
                <span className="text-[#008A44]">The Progress</span>
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                The Lagos APC is more than a party; it's a movement of over 4 million
                Lagosians. Join us to help build a greater state.
              </p>
            </motion.div>
          </div>

          {/* Right: Form card */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
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
                    className="p-8 md:p-12"
                  >
                    {/* Server error banner */}
                    <AnimatePresence>
                      {submitState === 'error' && serverError && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-4"
                        >
                          <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-red-800">Submission Failed</p>
                            <p className="text-sm text-red-700 mt-0.5">{serverError}</p>
                          </div>
                          <button
                            onClick={() => setSubmitState('idle')}
                            className="ml-auto text-red-400 hover:text-red-600 text-lg leading-none"
                          >
                            ×
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      {/* Name row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div id="field-firstName">
                          <label className="block font-semibold text-emerald-700 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setField('firstName', e.target.value)}
                            className={inputCls(!!fieldErrors.firstName)}
                            placeholder="e.g. Amaka"
                            disabled={isLoading}
                            autoComplete="given-name"
                          />
                          <FieldError message={fieldErrors.firstName} />
                        </div>
                        <div id="field-lastName">
                          <label className="block font-semibold text-emerald-700 mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setField('lastName', e.target.value)}
                            className={inputCls(!!fieldErrors.lastName)}
                            placeholder="e.g. Okonkwo"
                            disabled={isLoading}
                            autoComplete="family-name"
                          />
                          <FieldError message={fieldErrors.lastName} />
                        </div>
                      </div>

                      {/* Contact row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div id="field-email">
                          <label className="block font-semibold text-emerald-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
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
                        <div id="field-phone">
                          <label className="block font-semibold text-emerald-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
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

                      {/* Location row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div id="field-lga">
                          <label className="block font-semibold text-emerald-700 mb-2">
                            Local Government Area <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              value={formData.lga}
                              onChange={(e) => setField('lga', e.target.value)}
                              className={`${inputCls(!!fieldErrors.lga)} appearance-none pr-10`}
                              disabled={isLoading}
                            >
                              <option value="">Select your LGA</option>
                              {LGA_LIST.map((lga) => (
                                <option key={lga} value={lga}>{lga}</option>
                              ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                          <FieldError message={fieldErrors.lga} />
                        </div>
                        <div>
                          <label className="block font-semibold text-emerald-700 mb-2">Ward</label>
                          <input
                            type="text"
                            value={formData.ward}
                            onChange={(e) => setField('ward', e.target.value)}
                            className={inputCls(false)}
                            placeholder="Optional"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      {/* Interests */}
                      <div id="field-interests">
                        <label className="block font-semibold text-emerald-700 mb-3">
                          I want to: <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {INTEREST_OPTIONS.map((option) => {
                            const checked = formData.interests.includes(option);
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => toggleInterest(option)}
                                disabled={isLoading}
                                className={`
                                  px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-150
                                  ${checked
                                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-700'
                                  }
                                  disabled:opacity-50 disabled:cursor-not-allowed
                                `}
                              >
                                {checked && <span className="mr-1.5">✓</span>}
                                {option}
                              </button>
                            );
                          })}
                        </div>
                        <FieldError message={fieldErrors.interests} />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block font-semibold text-emerald-700 mb-2">
                          Message <span className="text-gray-400 font-normal text-sm">(Optional)</span>
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setField('message', e.target.value)}
                          rows={4}
                          placeholder="Anything else you'd like us to know..."
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
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-emerald-700 text-white py-4 rounded-full font-bold text-lg shadow-xl
                                   disabled:opacity-70 disabled:cursor-not-allowed
                                   hover:bg-emerald-800 active:scale-[0.98] transition-all duration-150
                                   flex items-center justify-center gap-3"
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <UserPlus size={20} />
                            Submit Registration
                          </>
                        )}
                      </motion.button>

                      <p className="text-center text-xs text-gray-400">
                        By registering, you agree to be contacted by Lagos APC representatives.
                      </p>
                    </form>
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