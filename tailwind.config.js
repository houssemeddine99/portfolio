/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        night: '#07060d',
        paper: '#07060d',
        ink: '#f6f5ff',
        cream: '#f6f5ff',
        snow: '#f6f5ff',
        ash: '#a3a0bf',
        haze: '#a3a0bf',
        console: '#13111f',
        pink: '#ff3d8b',
        violet: '#9b5cff',
        blue: '#4d7cff',
        cyan: '#25e6d6',
        amber: '#ffc24b',
        flame: '#ff3d8b',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blobA: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(8vw, 6vh) scale(1.15)' },
          '66%': { transform: 'translate(-6vw, -4vh) scale(0.9)' },
        },
        blobB: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-10vw, 8vh) scale(0.85)' },
          '66%': { transform: 'translate(7vw, -6vh) scale(1.2)' },
        },
        blobC: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.05)' },
          '50%': { transform: 'translate(6vw, -8vh) scale(0.8)' },
        },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        spinslow: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'rotate(215deg) translateX(-520px)', opacity: '0' },
        },
        'border-beam': { '100%': { 'offset-distance': '100%' } },
        shine: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        shimmerSlide: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)' },
        },
      },
      animation: {
        gradient: 'gradient 8s ease infinite',
        float: 'float 5s ease-in-out infinite',
        blobA: 'blobA 24s ease-in-out infinite',
        blobB: 'blobB 30s ease-in-out infinite',
        blobC: 'blobC 36s ease-in-out infinite',
        blink: 'blink 1.2s step-end infinite',
        spinslow: 'spinslow 40s linear infinite',
        meteor: 'meteor 5s linear infinite',
        'border-beam': 'border-beam calc(var(--duration, 8) * 1s) infinite linear',
        shine: 'shine 3s linear infinite',
        'shimmer-slide': 'shimmerSlide 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
