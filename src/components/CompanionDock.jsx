import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X } from 'lucide-react'
import { profile } from '../config/profile.js'
import { answerQuestion, getSuggestions } from '../lib/brain.js'
import { celebrate } from '../lib/confetti.js'

const C = profile.companion
// Resolve the character image against the deploy base path (works at / and /subpath/).
const IMG = C.image ? import.meta.env.BASE_URL.replace(/\/$/, '') + C.image : ''

// Load the character art and knock out a near-white background → transparent PNG.
function useKeyedImage(src) {
  const [url, setUrl] = useState(null)
  useEffect(() => {
    if (!src) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.naturalWidth
      c.height = img.naturalHeight
      const x = c.getContext('2d')
      x.drawImage(img, 0, 0)
      try {
        const data = x.getImageData(0, 0, c.width, c.height)
        const d = data.data
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2]
          if (r > 238 && g > 238 && b > 238) d[i + 3] = 0
          else if (r > 212 && g > 212 && b > 212) d[i + 3] = Math.min(d[i + 3], (255 - Math.min(r, g, b)) * 6)
        }
        x.putImageData(data, 0, 0)
        setUrl(c.toDataURL('image/png'))
      } catch {
        setUrl(src)
      }
    }
    img.onerror = () => setUrl(null)
    img.src = src
  }, [src])
  return url
}

let mid = 0
const nid = () => ++mid

function Typing() {
  return (
    <div className="flex gap-1 px-1 py-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-pink"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

export default function CompanionDock() {
  const keyed = useKeyedImage(IMG)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const timers = useRef([])

  useEffect(() => {
    if (open && messages.length === 0) setMessages([{ id: nid(), role: 'ai', text: C.greeting }])
  }, [open]) // eslint-disable-line
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const send = (raw) => {
    const t = (raw ?? input).trim()
    if (!t || typing) return
    celebrate(0.92, 0.86)
    setMessages((m) => [...m, { id: nid(), role: 'user', text: t }])
    setInput('')
    setTyping(true)
    const { answer } = answerQuestion(t)
    const tm = setTimeout(() => {
      setMessages((m) => [...m, { id: nid(), role: 'ai', text: answer }])
      setTyping(false)
    }, Math.min(1500, 450 + answer.length * 10))
    timers.current.push(tm)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[120] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="rounded-[26px] bg-grad p-[2px] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex h-[26rem] w-[88vw] max-w-[22rem] flex-col overflow-hidden rounded-[24px] bg-console/95 backdrop-blur-xl">
            <div className="flex items-center gap-3 bg-grad px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-night/30 text-lg">🧸</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{C.name}</p>
                <p className="text-[11px] text-white/80">Houssem's AI companion · online</p>
              </div>
              <button onClick={() => setOpen(false)} data-cursor="true" aria-label="Close" className="text-white/90 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-sm bg-grad text-white'
                        : 'rounded-bl-sm bg-white/10 text-snow'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm bg-white/10">
                    <Typing />
                  </div>
                </div>
              )}
              {messages.length <= 1 && !typing && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {getSuggestions().slice(0, 4).map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      data-cursor="true"
                      className="rounded-full border border-white/20 px-3 py-1 text-xs text-snow/85 transition hover:border-pink hover:text-pink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={`ask ${C.name}…`}
                className="flex-1 bg-transparent text-sm text-snow placeholder-snow/40 outline-none"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || typing}
                data-cursor="true"
                aria-label="Send"
                className="grid h-8 w-8 place-items-center rounded-full bg-grad text-white disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The always-visible floating companion */}
      <div className="relative flex items-center gap-3">
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden rounded-2xl glass px-3 py-1.5 text-xs text-snow sm:block"
          >
            Hi! I'm {C.name} — ask me ✨
          </motion.div>
        )}
        <motion.button
          onClick={() => setOpen((o) => !o)}
          data-cursor="ASK"
          aria-label={`Chat with ${C.name}`}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28"
        >
          {/* glow ring */}
          <span className="absolute inset-0 rounded-full bg-grad opacity-60 blur-xl animate-float" />
          {keyed ? (
            <motion.img
              src={keyed}
              alt={C.name}
              className="relative h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ) : (
            <span className="relative grid h-20 w-20 place-items-center rounded-full glass text-4xl">🧸</span>
          )}
          {/* online dot */}
          <span className="absolute right-2 top-3 h-3 w-3 rounded-full bg-cyan ring-2 ring-night animate-blink" />
        </motion.button>
      </div>
    </div>
  )
}
