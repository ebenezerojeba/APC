// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { MapPin, Phone, Mail, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
// import assets from '../assets/assets';
// import { useNavigate } from 'react-router-dom';


// const Contact = () => {
//   const [newsletterEmail, setNewsletterEmail] = useState('');
//   const [formStatus, setFormStatus] = useState('');
//   const navigate = useNavigate()

//   const contactInfo = [
//     { 
//       icon: <MapPin className="text-amber-400" />, 
//       title: 'State Secretariat', 
//       content: 'APC Lagos State Secretariat,\nAcme Road, Ogba, Ikeja,\nLagos, Nigeria.' 
//     },
//     { 
//       icon: <Phone className="text-amber-400" />, 
//       title: 'Official Enquiries', 
//       content: '+234 (0) 803 000 0000\n+234 (0) 701 000 0000' 
//     },
//     { 
//       icon: <Mail className="text-amber-400" />, 
//       title: 'Email Correspondence', 
//       content: 'info@lagosapc.com\nsecretariat@lagosapc.com' 
//     }
//   ];

//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault();
//     setFormStatus('Subscribed successfully!');
//     setNewsletterEmail('');
//     setTimeout(() => setFormStatus(''), 3000);
//   };

//   return (
//     <section id="contact" className="py-24 bg-[#008A44] text-white relative overflow-hidden">
//       {/* Decorative Brand Pattern */}
//       <div className="absolute top-0 right-0 opacity-6 pointer-events-none">
//          <img src={assets.apc} alt="" className="w-98 h-98 grayscale invert" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-16 items-start">
          
//           {/* Left Side: Contact Info & Socials */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
//               Connect With <br/> <span className="text-amber-400">The Secretariat</span>
//             </h2>
//             <p className="text-lg opacity-80 mb-10 max-w-md">
//               Have questions or want to support our vision? Reach out to the APC Lagos State administrative office.
//             </p>

//             <div className="space-y-6">
//               {contactInfo.map((contact, index) => (
//                 <motion.div
//                   key={contact.title}
//                   className="flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
//                     {contact.icon}
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-amber-400 text-lg mb-1">{contact.title}</h3>
//                     <p className="whitespace-pre-line text-gray-200 leading-relaxed">{contact.content}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Social Media Grid */}
//             <div className="mt-12">
//                <p className="text-sm font-bold uppercase tracking-widest mb-4 opacity-60">Follow our activities</p>
//                <div className="flex gap-4">
//                   {[
//                     { icon: <Facebook />, link: 'https://www.facebook.com/share/18C16eC7YF/?mibextid=wwXIfr' },
//                     { icon: <Twitter />, link: 'https://x.com/apcchairman/status/1637794537643843591?s=46' },
//                     { icon: <Instagram />, link: 'https://www.instagram.com/official_apcnigeria?igsh=c2Zsc3J0NW54ajN3' },
                  
//                   ].map((social, i) => (
//                     <motion.a
//                       key={i}
//                       href={social.link}
//                       className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all"
//                       whileHover={{ scale: 1.1, rotate: 5 }}
//                     >
//                       {social.icon}
//                     </motion.a>
//                   ))}
//                </div>
//             </div>
//           </motion.div>

//           {/* Right Side: Subscription & Message Form */}
//           <motion.div
//             className="space-y-8"
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             {/* Newsletter Box */}
//             <div className="bg-white p-8 md:p-10 rounded-4xl shadow-2xl text-gray-900">
//               <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Join the Progress</h3>
//               <p className="text-gray-600 mb-6">
//                 Receive the Chairman's weekly briefing and official party updates.
//               </p>
              
//               <form onSubmit={handleNewsletterSubmit} className="space-y-4">
//                 <div className="relative">
//                    <input
//                     type="email"
//                     value={newsletterEmail}
//                     onChange={(e) => setNewsletterEmail(e.target.value)}
//                     placeholder="yourname@email.com"
//                     className="w-full pl-4 pr-12 py-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#008A44] transition-all"
//                     required
//                   />
//                   <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#008A44] text-white px-4 rounded-lg flex items-center justify-center hover:bg-emerald-800 transition-colors">
//                     <Send size={18} />
//                   </button>
//                 </div>
//                 {formStatus && <p className="text-emerald-600 text-sm font-bold">{formStatus}</p>}
//               </form>
//             </div>

//             {/* Map Placeholder or Secondary CTA */}
//             <div className="bg-amber-400 p-8 rounded-4xl text-black">
//                <h3 className="text-xl font-black mb-2 uppercase italic">Renewed Hope Agenda</h3>
//                <p className="font-bold opacity-80 mb-6">Building a better, smarter, and more inclusive Lagos for everyone.</p>
//                <button onClick={()=>navigate('/join')} className="w-full bg-black cursor-pointer text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-colors">
//                   Volunteer Today
//                </button>
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }

// export default Contact;






import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Facebook, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus(''), 3000);
  };

  const contactItems = [
    {
      icon: MapPin,
      label: 'Secretariat',
      value: 'APC Lagos State Secretariat\nAcme Road, Ogba, Ikeja, Lagos',
      href: 'https://maps.google.com',
    },
    {
      icon: Phone,
      label: 'Enquiries',
      value: '+234 (0) 803 000 0000',
      href: 'tel:+2348030000000',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@lagosapc.com',
      href: 'mailto:info@lagosapc.com',
    },
  ];

  const socials = [
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/18C16eC7YF/?mibextid=wwXIfr' },
    { icon: Twitter, label: 'Twitter/X', href: 'https://x.com/apcchairman' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/apcchairmanlagos?igsh=dHpiNzBuczFveXE5' },
  ];

  return (
    <section id="contact" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#008A44]" />
              <span className="text-[#008A44] text-[10px] font-black uppercase tracking-[0.35em]">Get in Touch</span>
            </div>
            <h2 
              className="text-[clamp(3rem,8vw,6rem)] font-black text-gray-900 leading-[0.95] uppercase"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
            >
              Connect with <br />
              <span className="text-[#008A44]">The Secretariat</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-base leading-relaxed pb-2">
            Questions, partnerships, or press enquiries — reach out to the APC Lagos State administrative office.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left: contact cards + socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {contactItems.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="group flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#008A44]/30 hover:bg-[#008A44]/[0.03] transition-all cursor-pointer"
              >
                <div className="w-11 h-11 bg-[#008A44] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 mb-1">{label}</p>
                  <p className="text-sm font-bold text-gray-800 whitespace-pre-line leading-snug">{value}</p>
                </div>
                <ArrowUpRight size={14} className="text-gray-300 group-hover:text-[#008A44] transition-colors mt-1 shrink-0" />
              </motion.a>
            ))}

            {/* Socials */}
            <div className="mt-2 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 mb-4">Follow our activities</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-[#008A44] hover:text-white hover:border-[#008A44] transition-all shadow-sm"
                    whileHover={{ scale: 1.08, rotate: -5 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Newsletter + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            {/* Newsletter card */}
            <div className="relative overflow-hidden bg-[#041a0b] rounded-3xl p-8 md:p-10 text-white">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#008A44]/20 blur-[80px] rounded-full pointer-events-none" />
              
              {/* Brand watermark */}
              <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                <img src={assets.apc} alt="" className="w-48 h-48 invert" />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400 mb-4 block">
                  Stay Informed
                </span>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                  Join the Progress
                </h3>
                <p className="text-white/50 mb-8 text-sm leading-relaxed">
                  Receive the Chairman's weekly briefing and official party updates directly in your inbox.
                </p>

                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 px-5 py-3.5 bg-white/10 border border-white/15 rounded-2xl text-white placeholder:text-white/30 text-sm font-medium outline-none focus:border-[#008A44] focus:bg-white/15 transition-all"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3.5 bg-[#008A44] hover:bg-emerald-600 text-white rounded-2xl font-bold transition-colors flex items-center gap-2 shrink-0 text-sm"
                    >
                      {/* <Send size={15} /> */}
                      <span className="hidden sm:block">Subscribe</span>
                    </button>
                  </div>
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-emerald-400 text-sm font-bold flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      Subscribed successfully!
                    </motion.p>
                  )}
                </form>
              </div>
            </div>

            {/* Volunteer CTA */}
            <div className="relative overflow-hidden bg-amber-400 rounded-3xl p-8 text-gray-900 group cursor-pointer" onClick={() => navigate('/join')}>
              {/* Animated background */}
              <div className="absolute inset-0 bg-amber-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900/60 mb-4 block">
                  Get Involved
                </span>
                <h3 className="text-2xl font-black leading-tight mb-2 uppercase">
                  Renewed Hope Agenda
                </h3>
                <p className="font-bold text-gray-900/70 mb-7 text-sm leading-relaxed">
                  Building a better, smarter, and more inclusive Lagos for every single Lagosian.
                </p>
                <button className="w-full bg-gray-900 group-hover:bg-[#008A44] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer">
                  Volunteer Today
                  {/* <ArrowUpRight size={16} /> */}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;