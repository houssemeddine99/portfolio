import CuteFloaters from './CuteFloaters.jsx'
import { Meteors } from './ui/meteors.jsx'

// A living, colorful background: big blurred orbs that drift and pulse forever,
// over a deep base — plus cute twinkling sparkles. Makes the site feel alive.
export default function AuroraBG() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-night">
      {/* drifting color orbs */}
      <div className="absolute left-[8%] top-[12%] h-[42vw] w-[42vw] rounded-full bg-pink/40 blur-[110px] animate-blobA" />
      <div className="absolute right-[6%] top-[18%] h-[38vw] w-[38vw] rounded-full bg-violet/40 blur-[120px] animate-blobB" />
      <div className="absolute bottom-[6%] left-[28%] h-[40vw] w-[40vw] rounded-full bg-cyan/30 blur-[120px] animate-blobC" />
      <div className="absolute bottom-[14%] right-[20%] h-[30vw] w-[30vw] rounded-full bg-amber/25 blur-[120px] animate-blobA" />
      <div className="absolute left-[40%] top-[40%] h-[26vw] w-[26vw] rounded-full bg-blue/30 blur-[110px] animate-blobB" />

      {/* slowly rotating sheen */}
      <div
        className="absolute left-1/2 top-1/2 h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2 animate-spinslow opacity-[0.12]"
        style={{
          background:
            'conic-gradient(from 0deg, transparent, rgba(255,61,139,0.6), transparent, rgba(37,230,214,0.5), transparent)',
        }}
      />

      {/* darken for text legibility + subtle vignette */}
      <div className="absolute inset-0 bg-night/35" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(7,6,13,0.6) 100%)' }}
      />

      {/* shooting meteors + cute twinkling sparkles on top of the glow */}
      <Meteors number={16} />
      <CuteFloaters />
    </div>
  )
}
