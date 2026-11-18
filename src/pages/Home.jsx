import Hero from '../components/Hero'
import LagosData from '../components/LagosData'
import About from '../components/About'
import Priorities from '../components/Priorities'
import Gallery from '../components/Gallery'
import News from '../components/News'
import CampaignTrail from '../components/CampaignTrail'
import RoadAhead from '../components/RoadAhead'
import Resources from '../components/Resources'
import Contact from '../components/Contact'

/*
  This is the Chairman's site, so it carries only what is about him.
  Party-wide material (constitution, executives, results) belongs on the
  party site; the 2027 campaign lives on its own page at /campaign.
*/
const Home = () => {
  return (
    <div>
      <Hero />
      <LagosData />
      <About />
      <Priorities />
      <CampaignTrail />
      <Gallery />
      <News />
      <RoadAhead />
      <Resources />
      <Contact />
    </div>
  )
}

export default Home
