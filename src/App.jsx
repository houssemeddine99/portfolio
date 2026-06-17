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
import WorkIntro, { ProjectCard } from './components/Work.jsx'
import GitHubSection from './components/GitHubSection.jsx'
import CollabIntro from './components/SharedProjects.jsx'
import Contact from './components/Contact.jsx'
import CompanionDock from './components/CompanionDock.jsx'
import { getFeaturedProjects, getSharedProjects } from './lib/github.js'
import { initScroll } from './lib/scroll.js'

const projects = getFeaturedProjects()
const shared = getSharedProjects()

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
        <WorkIntro />
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
        {shared.length > 0 && <CollabIntro />}
        {shared.map((p, i) => (
          <ProjectCard key={p.full_name} p={p} i={i} />
        ))}
        <GitHubSection />
        <Contact />
      </Tunnel>

      <CompanionDock />
    </>
  )
}
