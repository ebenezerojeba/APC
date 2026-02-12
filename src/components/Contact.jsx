import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import assets from '../assets/assets';

const Contact = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const contactInfo = [
    { 
      icon: <MapPin className="text-amber-400" />, 
      title: 'State Secretariat', 
      content: 'APC Lagos State Secretariat,\nAcme Road, Ogba, Ikeja,\nLagos, Nigeria.' 
    },
    { 
      icon: <Phone className="text-amber-400" />, 
      title: 'Official Enquiries', 
      content: '+234 (0) 803 000 0000\n+234 (0) 701 000 0000' 
    },
    { 
      icon: <Mail className="text-amber-400" />, 
      title: 'Email Correspondence', 
      content: 'info@lagosapc.com\nsecretariat@lagosapc.com' 
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Subscribed successfully!');
    setNewsletterEmail('');
    setTimeout(() => setFormStatus(''), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-[#008A44] text-white relative overflow-hidden">
      {/* Decorative Brand Pattern */}
      <div className="absolute top-0 right-0 opacity-6 pointer-events-none">
         <img src={assets.apc} alt="" className="w-98 h-98 grayscale invert" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
              Connect With <br/> <span className="text-amber-400">The Secretariat</span>
            </h2>
            <p className="text-lg opacity-80 mb-10 max-w-md">
              Have questions or want to support our vision? Reach out to the APC Lagos State administrative office.
            </p>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.title}
                  className="flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    {contact.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-400 text-lg mb-1">{contact.title}</h3>
                    <p className="whitespace-pre-line text-gray-200 leading-relaxed">{contact.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Grid */}
            <div className="mt-12">
               <p className="text-sm font-bold uppercase tracking-widest mb-4 opacity-60">Follow our activities</p>
               <div className="flex gap-4">
                  {[
                    { icon: <Facebook />, link: '#' },
                    { icon: <Twitter />, link: '#' },
                    { icon: <Instagram />, link: '#' },
                    { icon: <Youtube />, link: '#' }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.link}
                      className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
               </div>
            </div>
          </motion.div>

          {/* Right Side: Subscription & Message Form */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Newsletter Box */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl text-gray-900">
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Join the Progress</h3>
              <p className="text-gray-600 mb-6">
                Receive the Chairman's weekly briefing and official party updates.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                   <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="yourname@email.com"
                    className="w-full pl-4 pr-12 py-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#008A44] transition-all"
                    required
                  />
                  <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#008A44] text-white px-4 rounded-lg flex items-center justify-center hover:bg-emerald-800 transition-colors">
                    <Send size={18} />
                  </button>
                </div>
                {formStatus && <p className="text-emerald-600 text-sm font-bold">{formStatus}</p>}
              </form>
            </div>

            {/* Map Placeholder or Secondary CTA */}
            <div className="bg-amber-400 p-8 rounded-[2rem] text-black">
               <h3 className="text-xl font-black mb-2 uppercase italic">Renewed Hope Agenda</h3>
               <p className="font-bold opacity-80 mb-6">Building a better, smarter, and more inclusive Lagos for everyone.</p>
               <button className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-colors">
                  Volunteer Today
               </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;