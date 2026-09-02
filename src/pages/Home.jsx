import Hero from '../components/Hero'
import About from '../components/About'
import Priorities from '../components/Priorities'
import News from '../components/News'
import Event from '../components/Event'
import Contact from '../components/Contact'

/*
  This is the Chairman's site, so it carries only what is about him.

  The party-institutional sections are still in src/components/ and still
  work — they are unmounted here, not deleted, ready to lift into the party
  site: Vision (the APC constitution), Leadership (executive officers),
  ElectionTimetable, ElectoralGuildlines, GovernorshipPrimaryResult,
  DocumentsViewer and CongratsTicker.

  News and Event are judgement calls — keep them here if they cover his
  press and his engagements, move them if they are secretariat output.
*/
const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Priorities />
      <News />
      <Event />
      <Contact />
    </div>
  )
}

export default Home
