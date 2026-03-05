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
                className="group flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#008A44]/30 hover:bg-[#008A44]/3 transition-all cursor-pointer"
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
                  <ArrowUpRight size={16} />
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