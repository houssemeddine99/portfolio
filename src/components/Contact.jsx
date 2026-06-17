import { Github, Linkedin, Globe, Mail, Twitter, Instagram } from 'lucide-react'
import { profile } from '../config/profile.js'
import { Magnetic } from './ui.jsx'
import { ShimmerButton } from './ui/shimmer-button.jsx'

const ICONS = { github: Github, linkedin: Linkedin, globe: Globe, twitter: Twitter, instagram: Instagram, email: Mail }

export default function Contact() {
  const { email, links } = profile.contact
  const { name } = profile.identity

  return (
    <div className="flex h-full flex-col justify-center">
      <span className="eyebrow text-pink">contact</span>
      <h2 className="mt-3 text-6xl font-extrabold leading-[0.9]">
        Let's <span className="text-grad">talk.</span>
      </h2>

      <p className="mt-5 text-haze">A question my AI couldn't answer, or a role in mind? I reply fast.</p>

      <Magnetic className="mt-6 w-fit">
        <ShimmerButton as="a" href={`mailto:${email}`} data-cursor="true" className="px-6 py-3.5 text-sm">
          <Mail className="h-5 w-5" /> {email}
        </ShimmerButton>
      </Magnetic>

      <div className="mt-6 flex gap-3">
        {links.map((l) => {
          const Icon = ICONS[l.type] || Globe
          return (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              aria-label={l.label}
              data-cursor="true"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-snow transition hover:-translate-y-1 hover:text-pink"
            >
              <Icon className="h-5 w-5" />
            </a>
          )
        })}
      </div>

      <p className="mt-8 text-xs text-haze">© {name} · React, GSAP & a plush named Yuki 🧸</p>
    </div>
  )
}
