import { useEffect } from 'react'
import Loader from './components/Loader.jsx'
import AuroraBG from './components/AuroraBG.jsx'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Nav from './components/Nav.jsx'
import Tunnel from './components/Tunnel.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Stats from './components/Stats.jsx'
import ProjectsGrid, { SharedGrid } from './components/Work.jsx'
import GitHubSection from './components/GitHubSection.jsx'
import Contact from './components/Contact.jsx'
import CompanionDock from './components/CompanionDock.jsx'
import { initScroll } from './lib/scroll.js'

export default function App() {
  useEffect(() => {
    initScroll()
  }, [])

  return (
    <>
      <Loader />
      <AuroraBG />
      <Cursor />
      <ScrollProgress />
      <Nav />

      <Tunnel>
        <Hero />
        <About />
        <Stats />
        <ProjectsGrid />
        <SharedGrid />
        <GitHubSection />
        <Contact />
      </Tunnel>

      <CompanionDock />
    </>
  )
}
