import React from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Join from './pages/Join'

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on home, just scroll
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }

  return (
    <>
      <Navbar scrollToSection={scrollToSection} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
      </Routes>
      
      <Footer />
    </>
  )
}

export default App