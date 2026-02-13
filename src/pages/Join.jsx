import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ShieldCheck, Users, Zap, CheckCircle } from 'lucide-react';

const Join = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    lga: '',
    ward: '',
    interests: [],
    message: ''
  });

  const lgaList = [
    'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 
    'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 
    'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 
    'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
  ];

  const interestOptions = ['Volunteer', 'Grassroots Support', 'Media & Comms', 'Polling Agent'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would hit your API/CRM
    console.log('Registering Member:', formData);
    alert(`Success! Welcome to the movement, ${formData.firstName}. A party representative from ${formData.lga} LGA will contact you.`);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', lga: '', ward: '', interests: [], message: '' });
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <section id="join" className="py-24 mt-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#008A44]/5 skew-x-12 transform origin-top hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16">
          
          {/* Left Side: Call to Action & Steps */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 uppercase leading-none" style={{ fontFamily: 'Impact, sans-serif' }}>
                Be Part Of <br/> <span className="text-[#008A44]">The Progress</span>
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                The Lagos APC is more than a party; it's a movement of over 4 million Lagosians. Join us to help build a greater state.
              </p>

            
            </motion.div>
          </div>

          {/* Right Side: The Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
                      <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-emerald-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-emerald-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-emerald-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-emerald-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-emerald-700 mb-2">Local Government Area *</label>
                <select 
                  value={formData.lga}
                  onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all" 
                  required
                >
                  <option value="">Select LGA</option>
                  {lgaList.map(lga => (
                    <option key={lga} value={lga}>{lga}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-emerald-700 mb-2">Ward</label>
                <input
                  type="text"
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-emerald-700 mb-3">I want to: *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {interestOptions.map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={formData.interests.includes(option)}
                      onChange={() => handleInterestChange(option)}
                      className="w-5 h-5 text-emerald-700 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="group-hover:text-emerald-700 transition-colors">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-emerald-700 mb-2">Message (Optional)</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-emerald-700 cursor-pointer text-white py-4 rounded-full font-bold text-lg shadow-xl"
              whileHover={{ scale: 1.02, backgroundColor: '#065f46' }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Registration
            </motion.button>
          </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Join;