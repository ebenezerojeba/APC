import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import assets from '../assets/assets';

const Navbar = ({ scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  
  // Subtle transparency effect on scroll
  const headerBg = useTransform(
    scrollYProgress, 
    [0, 0.05], 
    ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'vision', 'news', 'events', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust 120 based on your navbar height
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Vision', 'News', 'Events', 'Contact'];

  // FIXED: Explicitly handle scrolling and state
  const handleNavClick = (item) => {
    const id = item.toLowerCase();
    scrollToSection(id);
    setActiveSection(id); // Immediate UI feedback
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      style={{ backgroundColor: headerBg }}
      className="fixed top-0 left-0 right-0 z-[100] border-b-4 border-amber-400 shadow-lg backdrop-blur-md"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          
          {/* LOGO & BRANDING */}
          <motion.div
            onClick={() => handleNavClick('Home')}
            className="flex items-center gap-3 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img src={assets.apc2} alt="APC Logo" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="text-xl font-black leading-none text-[#008A44]" style={{ fontFamily: 'Impact, sans-serif' }}>
                APC LAGOS
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                State Secretariat
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-6">
            {navLinks.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={`px-2 py-1 font-bold text-sm uppercase transition-colors relative group ${
                    activeSection === item.toLowerCase() ? 'text-[#008A44]' : 'text-gray-600 hover:text-[#008A44]'
                  }`}
                >
                  {item}
                  {/* Underline Indicator */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${
                    activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.button
            onClick={() => handleNavClick('Join')}
            className="hidden lg:block bg-[#008A44] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-emerald-800 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            JOIN US
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#008A44] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b-4 border-amber-400 shadow-2xl lg:hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-left py-3 text-lg font-black uppercase border-b border-gray-100 ${
                    activeSection === item.toLowerCase() ? 'text-[#008A44]' : 'text-gray-600'
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('Join')}
                className="mt-4 bg-amber-400 text-gray-900 py-4 rounded-xl font-black uppercase text-center"
              >
                Become a Member
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;