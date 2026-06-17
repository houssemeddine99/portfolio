import { motion } from 'framer-motion'
import { profile } from '../config/profile.js'

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="fixed inset-x-0 top-0 z-[110] flex items-center justify-between px-6 py-4 sm:px-10"
    >
      <span className="text-lg font-extrabold">
        {profile.identity.name.split(' ')[0]}
        <span className="text-grad">.</span>
      </span>
      <span className="eyebrow hidden text-haze sm:block">{profile.identity.role}</span>
    </motion.header>
  )
}
