// import React, { useState } from 'react'

// const Appointment = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     phone: '',
//     email: '',
//     organization: '',
//     purpose: '',
//     preferredDate: '',
//     preferredTime: '',
//     message: ''
//   })
//   const [submitted, setSubmitted] = useState(false)

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = () => {
//     if (!formData.fullName || !formData.phone || !formData.purpose) return
//     setSubmitted(true)
//   }

//   const purposeOptions = [
//     'Party Affairs & Governance',
//     'Community Development',
//     'Business & Investment',
//     'Media & Press',
//     'Youth & Women Affairs',
//     'Official Delegation',
//     'Personal Matter',
//     'Other'
//   ]

//   const timeSlots = [
//     '9:00 AM', '10:00 AM', '11:00 AM',
//     '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
//   ]

//   return (
//     <section style={{
//       fontFamily: "'Cormorant Garamond', Georgia, serif",
//       background: 'linear-gradient(160deg, #0a0f1e 0%, #0d1a0e 50%, #1a0a00 100%)',
//       minHeight: '100vh',
//       padding: '80px 20px',
//       position: 'relative',
//       overflow: 'hidden'
//     }}>
//       {/* Background texture elements */}
//       <div style={{
//         position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
//         backgroundImage: `radial-gradient(ellipse at 20% 20%, rgba(0,94,44,0.15) 0%, transparent 60%),
//           radial-gradient(ellipse at 80% 80%, rgba(180,120,0,0.1) 0%, transparent 60%)`,
//         pointerEvents: 'none'
//       }} />

//       {/* Decorative corner motifs */}
//       <div style={{
//         position: 'absolute', top: 30, left: 30,
//         width: 80, height: 80,
//         borderTop: '2px solid rgba(180,140,0,0.4)',
//         borderLeft: '2px solid rgba(180,140,0,0.4)'
//       }} />
//       <div style={{
//         position: 'absolute', top: 30, right: 30,
//         width: 80, height: 80,
//         borderTop: '2px solid rgba(180,140,0,0.4)',
//         borderRight: '2px solid rgba(180,140,0,0.4)'
//       }} />

//       <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>

//         {/* Header */}
//         <div style={{ textAlign: 'center', marginBottom: 60 }}>
//           <div style={{
//             display: 'inline-flex', alignItems: 'center', gap: 12,
//             marginBottom: 16
//           }}>
//             <div style={{ width: 40, height: 1, background: 'rgba(180,140,0,0.6)' }} />
//             <span style={{
//               fontFamily: "'Cinzel', Georgia, serif",
//               color: '#b8960a',
//               fontSize: 11,
//               letterSpacing: '0.35em',
//               textTransform: 'uppercase'
//             }}>
//               Office of the Chairman
//             </span>
//             <div style={{ width: 40, height: 1, background: 'rgba(180,140,0,0.6)' }} />
//           </div>

//           <h2 style={{
//             fontFamily: "'Cinzel Decorative', Georgia, serif",
//             fontSize: 'clamp(28px, 5vw, 52px)',
//             fontWeight: 700,
//             color: '#ffffff',
//             margin: '0 0 8px',
//             letterSpacing: '0.04em',
//             lineHeight: 1.15
//           }}>
//             Request an Appointment
//           </h2>

//           <p style={{
//             color: 'rgba(255,255,255,0.45)',
//             fontSize: 16,
//             maxWidth: 520,
//             margin: '16px auto 0',
//             lineHeight: 1.7,
//             fontStyle: 'italic'
//           }}>
//             For official meetings, party consultations, and matters of governance.
//             All requests are reviewed by the Chairman's office.
//           </p>
//         </div>

//         {submitted ? (
//           /* Success State */
//           <div style={{
//             background: 'rgba(0,94,44,0.1)',
//             border: '1px solid rgba(0,150,60,0.3)',
//             borderRadius: 4,
//             padding: '60px 40px',
//             textAlign: 'center'
//           }}>
//             <div style={{
//               width: 64, height: 64, borderRadius: '50%',
//               background: 'rgba(0,150,60,0.15)',
//               border: '1px solid rgba(0,180,70,0.4)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               margin: '0 auto 24px',
//               fontSize: 28
//             }}>✓</div>
//             <h3 style={{
//               fontFamily: "'Cinzel', Georgia, serif",
//               color: '#fff',
//               fontSize: 24,
//               marginBottom: 12
//             }}>Request Submitted</h3>
//             <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.8 }}>
//               Your appointment request has been received.<br />
//               The Chairman's office will contact you within <strong style={{ color: 'rgba(255,255,255,0.75)' }}>48–72 hours</strong> to confirm.
//             </p>
//             <button
//               onClick={() => { setSubmitted(false); setFormData({ fullName:'',phone:'',email:'',organization:'',purpose:'',preferredDate:'',preferredTime:'',message:'' }) }}
//               style={{
//                 marginTop: 32,
//                 background: 'transparent',
//                 border: '1px solid rgba(180,140,0,0.4)',
//                 color: '#b8960a',
//                 padding: '10px 28px',
//                 cursor: 'pointer',
//                 fontFamily: "'Cinzel', Georgia, serif",
//                 fontSize: 12,
//                 letterSpacing: '0.15em'
//               }}
//             >
//               SUBMIT ANOTHER
//             </button>
//           </div>
//         ) : (
//           /* Form */
//           <div style={{
//             background: 'rgba(255,255,255,0.03)',
//             border: '1px solid rgba(255,255,255,0.08)',
//             backdropFilter: 'blur(10px)',
//             padding: 'clamp(24px, 5vw, 52px)',
//           }}>

//             {/* Gold top bar */}
//             <div style={{
//               height: 3,
//               background: 'linear-gradient(90deg, transparent, #b8960a, #e8c830, #b8960a, transparent)',
//               marginBottom: 40
//             }} />

//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

//               {/* Full Name */}
//               <div style={{ gridColumn: '1 / -1' }}>
//                 <FieldLabel>Full Name *</FieldLabel>
//                 <input
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Enter your full name"
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <FieldLabel>Phone Number *</FieldLabel>
//                 <input
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="+234 800 000 0000"
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <FieldLabel>Email Address</FieldLabel>
//                 <input
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="your@email.com"
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Organization */}
//               <div>
//                 <FieldLabel>Organization / Ward</FieldLabel>
//                 <input
//                   name="organization"
//                   value={formData.organization}
//                   onChange={handleChange}
//                   placeholder="Company, party unit, LGA..."
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Purpose */}
//               <div>
//                 <FieldLabel>Purpose of Visit *</FieldLabel>
//                 <select
//                   name="purpose"
//                   value={formData.purpose}
//                   onChange={handleChange}
//                   style={{ ...inputStyle, cursor: 'pointer' }}
//                 >
//                   <option value="" style={{ background: '#0d1a0e' }}>Select purpose</option>
//                   {purposeOptions.map(opt => (
//                     <option key={opt} value={opt} style={{ background: '#0d1a0e' }}>{opt}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Date */}
//               <div>
//                 <FieldLabel>Preferred Date</FieldLabel>
//                 <input
//                   type="date"
//                   name="preferredDate"
//                   value={formData.preferredDate}
//                   onChange={handleChange}
//                   style={{ ...inputStyle, colorScheme: 'dark' }}
//                 />
//               </div>

//               {/* Time */}
//               <div>
//                 <FieldLabel>Preferred Time</FieldLabel>
//                 <select
//                   name="preferredTime"
//                   value={formData.preferredTime}
//                   onChange={handleChange}
//                   style={{ ...inputStyle, cursor: 'pointer' }}
//                 >
//                   <option value="" style={{ background: '#0d1a0e' }}>Select time slot</option>
//                   {timeSlots.map(t => (
//                     <option key={t} value={t} style={{ background: '#0d1a0e' }}>{t}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Message */}
//               <div style={{ gridColumn: '1 / -1' }}>
//                 <FieldLabel>Additional Message</FieldLabel>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Briefly describe the purpose of your visit..."
//                   rows={4}
//                   style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
//                 />
//               </div>

//             </div>

//             {/* Divider */}
//             <div style={{
//               height: 1,
//               background: 'rgba(255,255,255,0.06)',
//               margin: '32px 0'
//             }} />

//             {/* Submit Row */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               flexWrap: 'wrap',
//               gap: 16
//             }}>
//               <p style={{
//                 color: 'rgba(255,255,255,0.3)',
//                 fontSize: 12,
//                 fontStyle: 'italic',
//                 margin: 0
//               }}>
//                 * Required fields. All submissions are confidential.
//               </p>

//               <button
//                 onClick={handleSubmit}
//                 style={{
//                   background: 'linear-gradient(135deg, #8a6e00, #c9a800, #8a6e00)',
//                   border: 'none',
//                   color: '#0a0f1e',
//                   padding: '14px 40px',
//                   cursor: 'pointer',
//                   fontFamily: "'Cinzel', Georgia, serif",
//                   fontSize: 12,
//                   fontWeight: 700,
//                   letterSpacing: '0.2em',
//                   textTransform: 'uppercase',
//                   transition: 'opacity 0.2s',
//                 }}
//                 onMouseEnter={e => e.target.style.opacity = '0.85'}
//                 onMouseLeave={e => e.target.style.opacity = '1'}
//               >
//                 Submit Request
//               </button>
//             </div>

//             {/* Bottom bar */}
//             <div style={{
//               height: 2,
//               background: 'linear-gradient(90deg, transparent, rgba(180,140,0,0.3), transparent)',
//               marginTop: 40
//             }} />
//           </div>
//         )}

//         {/* Footer note */}
//         <p style={{
//           textAlign: 'center',
//           color: 'rgba(255,255,255,0.2)',
//           fontSize: 12,
//           marginTop: 32,
//           letterSpacing: '0.08em'
//         }}>
//           APC Lagos State — Office of the State Chairman
//         </p>
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
//         input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
//         input:focus, select:focus, textarea:focus { outline: none; border-color: rgba(180,140,0,0.5) !important; background: rgba(255,255,255,0.05) !important; }
//         select option { background: #0d1a0e; color: white; }
//       `}</style>
//     </section>
//   )
// }

// const FieldLabel = ({ children }) => (
//   <label style={{
//     display: 'block',
//     fontFamily: "'Cinzel', Georgia, serif",
//     fontSize: 10,
//     letterSpacing: '0.2em',
//     color: 'rgba(180,140,0,0.7)',
//     textTransform: 'uppercase',
//     marginBottom: 8
//   }}>
//     {children}
//   </label>
// )

// const inputStyle = {
//   width: '100%',
//   background: 'rgba(255,255,255,0.03)',
//   border: '1px solid rgba(255,255,255,0.1)',
//   color: '#ffffff',
//   padding: '12px 16px',
//   fontSize: 15,
//   fontFamily: "'Cormorant Garamond', Georgia, serif",
//   boxSizing: 'border-box',
//   transition: 'border-color 0.2s, background 0.2s'
// }

// export default Appointment




















import React, { useState } from 'react'

const Appointment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    organization: '',
    purpose: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _raw = import.meta.env.VITE_API_URL;
const API_URL = (_raw && _raw !== 'undefined')
  ? _raw.replace(/\/$/, '')        // strip any trailing slash
  : 'https://apcbackend.vercel.app/api'; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async () => {
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.purpose) {
      setError('Please fill in all required fields.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setError('')
    setFormData({
      fullName: '', phone: '', email: '', organization: '',
      purpose: '', preferredDate: '', preferredTime: '', message: ''
    })
  }

  const purposeOptions = [
    'Party Affairs & Governance',
    'Community Development',
    'Business & Investment',
    'Media & Press',
    'Youth & Women Affairs',
    'Official Delegation',
    'Personal Matter',
    'Other'
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ]

  return (
    <section style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      background: 'linear-gradient(160deg, #0a0f1e 0%, #0d1a0e 50%, #1a0a00 100%)',
      minHeight: '100vh',
      padding: '80px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background texture elements */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `radial-gradient(ellipse at 20% 20%, rgba(0,94,44,0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 80%, rgba(180,120,0,0.1) 0%, transparent 60%)`,
        pointerEvents: 'none'
      }} />

      {/* Decorative corner motifs */}
      <div style={{
        position: 'absolute', top: 30, left: 30,
        width: 80, height: 80,
        borderTop: '2px solid rgba(180,140,0,0.4)',
        borderLeft: '2px solid rgba(180,140,0,0.4)'
      }} />
      <div style={{
        position: 'absolute', top: 30, right: 30,
        width: 80, height: 80,
        borderTop: '2px solid rgba(180,140,0,0.4)',
        borderRight: '2px solid rgba(180,140,0,0.4)'
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            marginBottom: 16
          }}>
            <div style={{ width: 40, height: 1, background: 'rgba(180,140,0,0.6)' }} />
            <span style={{
              fontFamily: "'Cinzel', Georgia, serif",
              color: '#b8960a',
              fontSize: 11,
              letterSpacing: '0.35em',
              textTransform: 'uppercase'
            }}>
              Office of the Chairman
            </span>
            <div style={{ width: 40, height: 1, background: 'rgba(180,140,0,0.6)' }} />
          </div>

          <h2 style={{
            fontFamily: "'Cinzel Decorative', Georgia, serif",
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 8px',
            letterSpacing: '0.04em',
            lineHeight: 1.15
          }}>
            Request an Appointment
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 16,
            maxWidth: 520,
            margin: '16px auto 0',
            lineHeight: 1.7,
            fontStyle: 'italic'
          }}>
            For official meetings, party consultations, and matters of governance.
            All requests are reviewed by the Chairman's office.
          </p>
        </div>

        {submitted ? (
          /* Success State */
          <div style={{
            background: 'rgba(0,94,44,0.1)',
            border: '1px solid rgba(0,150,60,0.3)',
            borderRadius: 4,
            padding: '60px 40px',
            textAlign: 'center'
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(0,150,60,0.15)',
              border: '1px solid rgba(0,180,70,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: 28
            }}>✓</div>
            <h3 style={{
              fontFamily: "'Cinzel', Georgia, serif",
              color: '#fff',
              fontSize: 24,
              marginBottom: 12
            }}>Request Submitted</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.8 }}>
              Your appointment request has been received.<br />
              The Chairman's office will contact you within{' '}
              <strong style={{ color: 'rgba(255,255,255,0.75)' }}>48–72 hours</strong> to confirm.
            </p>
            <button
              onClick={handleReset}
              style={{
                marginTop: 32,
                background: 'transparent',
                border: '1px solid rgba(180,140,0,0.4)',
                color: '#b8960a',
                padding: '10px 28px',
                cursor: 'pointer',
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: 12,
                letterSpacing: '0.15em'
              }}
            >
              SUBMIT ANOTHER
            </button>
          </div>
        ) : (
          /* Form */
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            padding: 'clamp(24px, 5vw, 52px)',
          }}>

            {/* Gold top bar */}
            <div style={{
              height: 3,
              background: 'linear-gradient(90deg, transparent, #b8960a, #e8c830, #b8960a, transparent)',
              marginBottom: 40
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

              {/* Full Name */}
              <div style={{ gridColumn: '1 / -1' }}>
                <FieldLabel>Full Name *</FieldLabel>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={inputStyle}
                />
              </div>

              {/* Phone */}
              <div>
                <FieldLabel>Phone Number *</FieldLabel>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div>
                <FieldLabel>Email Address</FieldLabel>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>

              {/* Organization */}
              <div>
                <FieldLabel>Organization / Ward</FieldLabel>
                <input
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Company, party unit, LGA..."
                  style={inputStyle}
                />
              </div>

              {/* Purpose */}
              <div>
                <FieldLabel>Purpose of Visit *</FieldLabel>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="" style={{ background: '#0d1a0e' }}>Select purpose</option>
                  {purposeOptions.map(opt => (
                    <option key={opt} value={opt} style={{ background: '#0d1a0e' }}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <FieldLabel>Preferred Date</FieldLabel>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                />
              </div>

              {/* Time */}
              <div>
                <FieldLabel>Preferred Time</FieldLabel>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="" style={{ background: '#0d1a0e' }}>Select time slot</option>
                  {timeSlots.map(t => (
                    <option key={t} value={t} style={{ background: '#0d1a0e' }}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div style={{ gridColumn: '1 / -1' }}>
                <FieldLabel>Additional Message</FieldLabel>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Briefly describe the purpose of your visit..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

            </div>

            {/* Error message */}
            {error && (
              <div style={{
                marginTop: 20,
                padding: '12px 16px',
                background: 'rgba(248,113,113,0.08)',
                border: '1px solid rgba(248,113,113,0.25)',
                borderRadius: 4,
                color: '#f87171',
                fontSize: 13,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}>
                {error}
              </div>
            )}

            {/* Divider */}
            <div style={{
              height: 1,
              background: 'rgba(255,255,255,0.06)',
              margin: '32px 0'
            }} />

            {/* Submit Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16
            }}>
              <p style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: 12,
                fontStyle: 'italic',
                margin: 0
              }}>
                * Required fields. All submissions are confidential.
              </p>

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  background: loading
                    ? 'rgba(184,150,10,0.4)'
                    : 'linear-gradient(135deg, #8a6e00, #c9a800, #8a6e00)',
                  border: 'none',
                  color: loading ? 'rgba(10,15,30,0.6)' : '#0a0f1e',
                  padding: '14px 40px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.2s',
                  minWidth: 160,
                }}
                onMouseEnter={e => { if (!loading) e.target.style.opacity = '0.85' }}
                onMouseLeave={e => { e.target.style.opacity = '1' }}
              >
                {loading ? 'Submitting…' : 'Submit Request'}
              </button>
            </div>

            {/* Bottom bar */}
            <div style={{
              height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(180,140,0,0.3), transparent)',
              marginTop: 40
            }} />
          </div>
        )}

        {/* Footer note */}
        <p style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.2)',
          fontSize: 12,
          marginTop: 32,
          letterSpacing: '0.08em'
        }}>
          APC Lagos State — Office of the State Chairman
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        input:focus, select:focus, textarea:focus { outline: none; border-color: rgba(180,140,0,0.5) !important; background: rgba(255,255,255,0.05) !important; }
        select option { background: #0d1a0e; color: white; }
      `}</style>
    </section>
  )
}

const FieldLabel = ({ children }) => (
  <label style={{
    display: 'block',
    fontFamily: "'Cinzel', Georgia, serif",
    fontSize: 10,
    letterSpacing: '0.2em',
    color: 'rgba(180,140,0,0.7)',
    textTransform: 'uppercase',
    marginBottom: 8
  }}>
    {children}
  </label>
)

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#ffffff',
  padding: '12px 16px',
  fontSize: 15,
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, background 0.2s'
}

export default Appointment