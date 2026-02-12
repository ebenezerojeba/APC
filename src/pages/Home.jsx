import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Vision from '../components/Vision'
import News from '../components/News'
import Event from '../components/Event'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div>
        <Hero />
        <About />
        <Vision />
        <News />
        <Event />
        <Contact />
    </div>
  )
}

export default Home