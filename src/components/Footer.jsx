import React from 'react'
import { motion } from 'framer-motion';

const Footer = ({scrollToSection}) => {
const footerLinks = ['Home', 'About', 'Vision', 'News', 'Events', 'Join Us', 'Contact'];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {footerLinks.map(link => (
            <motion.button
              key={link}
              onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
              className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
              whileHover={{ y: -3 }}
            >
              {link}
            </motion.button>
          ))}
        </div>
        <div className="text-center text-gray-400 border-t border-gray-700 pt-8">
          <p>&copy; 2026 Leaders for Lagos. All rights reserved. | Built for the people, by the people.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer