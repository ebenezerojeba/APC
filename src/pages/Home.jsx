import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Vision from '../components/Vision'
import Leadership from '../components/Leadership'
import News from '../components/News'
import Event from '../components/Event'
// import DocumentsViewer from '../components/DocumentsViewer'
import Contact from '../components/Contact'
import ElectoralGuildlines from '../components/ElectoralGuildlines'
import GovernorshipPrimaryResults from '../components/GovernorshipPrimaryResult'


const Home = () => {
  return (
    <div>
        <Hero />
        <About />
        <Vision />
        <Leadership />
        <News />
        <ElectionTimetable />
        {/* <GovernorshipPrimaryResults /> */}
        {/* <ElectoralGuildlines /> */}
        {/* <DocumentsViewer /> */}
        <Event />
        <Contact />
    </div>
  )
}

export default Home