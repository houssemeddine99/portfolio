// ============================================================================
//  👋  EDIT ME — this is the ONLY file you need to change to make the site yours.
// ----------------------------------------------------------------------------
//  Everything the website shows AND everything the AI version of you knows
//  lives in this one file. (Your live GitHub repos come from src/data/github.json
//  via `npm run github`.)
//  Tip: keep AI answers in FIRST PERSON ("I built…") so it sounds like you.
// ============================================================================

export const profile = {
  // ---- IDENTITY -----------------------------------------------------------
  identity: {
    name: 'Houssem Eddine',
    role: 'Full-Stack Developer',
    // Rotating titles that flip in the hero (the "FlipWords" effect).
    flipWords: ['Full-Stack Developer', 'PHP / Symfony Dev', 'React Developer', 'Java Developer'],
    tagline:
      'I build complete web apps end-to-end — from Symfony & Java back-ends to React interfaces and immersive 3D front-ends.',
    location: 'Tunisia',
    availability: 'Open to work · Available immediately',
    // Put your photo at: public/me.jpg then change this to '/me.jpg'.
    // (Ships with a placeholder avatar at public/me.svg.)
    photo: '/me.svg',
    initials: 'HE',
    // Optional CV file in /public, e.g. '/cv.pdf'. Leave '' to hide.
    resume: '',
  },

  // ---- COMPANION (the 3D character that answers as the AI) ----------------
  companion: {
    name: 'Yuki',
    // Drop your character art at public/companion.png (transparent OR white bg —
    // the white background is removed automatically). Then it appears instantly.
    image: '/companion.png',
    // Optional: a real 3D model (.glb) for full rotation. Generate one from your
    // pic with Meshy/Tripo, put it at public/companion.glb, set: model: '/companion.glb'
    model: '',
    greeting:
      "Hi! I'm Yuki — Houssem's little companion. Ask me anything about him: his skills, projects, or why he'd be a great hire! 🧸",
  },

  // ---- MEDIA / BACKGROUND VIDEO -------------------------------------------
  // Drop a background video here to make the site even more cinematic.
  //   • Put a file at public/hero.mp4 and set heroVideo: '/hero.mp4'
  //   • Or paste any direct .mp4 URL (e.g. a Higgsfield-generated clip).
  //   • Leave '' to use the animated 3D scene instead.
  media: {
    heroVideo: '',
    // Dark overlay over the video so text stays readable (0 = none, 1 = black).
    videoOverlay: 0.55,
    // Optional poster image shown while the video loads.
    poster: '',
  },

  // ---- CONTACT / SOCIAL ---------------------------------------------------
  contact: {
    // 👉 Change this to the email you want interviewers to use.
    email: 'reatann@hotmail.com',
    links: [
      { type: 'github', label: 'GitHub', url: 'https://github.com/houssemeddine99' },
      // 👉 Add your real LinkedIn URL here:
      { type: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/yourname' },
    ],
  },

  // ---- ABOUT --------------------------------------------------------------
  about: {
    paragraphs: [
      "I'm Houssem Eddine (a.k.a. yuki), a full-stack developer from Tunisia. I love turning ideas into working products — designing the logic on the back end and crafting smooth, interactive interfaces on the front end.",
      "I've built a smart-home IoT platform for my final-year project (PFE), a travel-and-tours booking platform (evectours), a React e-commerce store, and a Java front office for a travel app. I learn by building, and I'm always shipping something new on my GitHub.",
    ],
    stats: [
      { value: 4, suffix: '+', label: 'Years coding' },
      { value: 20, suffix: '+', label: 'GitHub projects' },
      { value: 6, suffix: '', label: 'Core technologies' },
      { value: 100, suffix: '%', label: 'Curiosity' },
    ],
  },

  // ---- TECH MARQUEE -------------------------------------------------------
  tech: [
    'PHP', 'Symfony', 'Laravel', 'JavaScript', 'React', 'Java',
    'Spring', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'MySQL',
    'Git', 'HTML', 'CSS', 'REST APIs',
  ],

  // ---- SKILLS -------------------------------------------------------------
  skills: [
    {
      group: 'Frontend',
      items: [
        { name: 'React', level: 85 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML / CSS', level: 88 },
        { name: 'Tailwind / Framer Motion', level: 75 },
      ],
    },
    {
      group: 'Backend',
      items: [
        { name: 'PHP / Symfony', level: 85 },
        { name: 'Java', level: 72 },
        { name: 'REST APIs', level: 80 },
        { name: 'MySQL', level: 80 },
      ],
    },
    {
      group: 'Tools & Practices',
      items: [
        { name: 'Git / GitHub', level: 85 },
        { name: 'Laravel', level: 65 },
        { name: 'Docker', level: 55 },
        { name: 'Agile / Teamwork', level: 75 },
      ],
    },
  ],

  // ---- EXPERIENCE / TIMELINE ---------------------------------------------
  experience: [
    {
      period: '2025 — Present',
      title: 'Final-Year Project (PFE) — Smart Home IoT Platform',
      org: 'University',
      summary:
        'Building a smart-home platform to monitor and control IoT devices, with a React front end and a REST API back end. My biggest project so far.',
      tags: ['React', 'IoT', 'REST API'],
    },
    {
      period: '2026',
      title: 'evectours — Travel & Tours Platform',
      org: 'Personal project',
      summary:
        'A travel-and-tours booking platform built with PHP, covering listings, bookings and an admin area.',
      tags: ['PHP', 'MySQL'],
    },
    {
      period: '2025 — 2026',
      title: 'Travigir Travel App — Front Office',
      org: 'Academic / Team project',
      summary:
        'Developed the front office for a travel app using Java, alongside a Symfony/PHP back office and reservation flow.',
      tags: ['Java', 'Symfony', 'PHP'],
    },
    {
      period: '2024 — 2025',
      title: 'Full-Stack Practice — Healthcare, E-commerce & more',
      org: 'Coursework & self-study',
      summary:
        'Shipped a series of CRUD apps to sharpen my craft: a healthcare app and a library system in PHP, and an e-commerce store in React.',
      tags: ['PHP', 'React', 'MySQL'],
    },
    {
      period: '2021 — 2024',
      title: 'Learning to Code',
      org: 'Self-taught & university',
      summary:
        'Started on GitHub in 2021 and built up the fundamentals across the stack with HTML, CSS, JavaScript and Git.',
      tags: ['HTML/CSS', 'JavaScript', 'Git'],
    },
  ],

  // ---- PROJECTS (curated highlights) -------------------------------------
  projects: [
    {
      name: 'evectours',
      blurb: 'A travel & tours booking platform built with PHP — listings, bookings and an admin area.',
      tags: ['PHP', 'MySQL'],
      url: 'https://github.com/houssemeddine99/evectours',
      accent: '#22d3ee',
    },
    {
      name: 'Smart Home (PFE)',
      blurb: 'My final-year project: a React dashboard to monitor and control smart-home IoT devices.',
      tags: ['React', 'IoT', 'REST API'],
      url: 'https://github.com/houssemeddine99/SmartHome-PFE',
      accent: '#a855f7',
    },
    {
      name: 'E-commerce React',
      blurb: 'An e-commerce storefront built with React — catalog, cart and a clean UI.',
      tags: ['React', 'JavaScript'],
      url: 'https://github.com/houssemeddine99/E-commerce-react',
      accent: '#ec4899',
    },
    {
      name: 'FrontOffice Travagir',
      blurb: 'The front office for the Travagir travel app, built with Java.',
      tags: ['Java'],
      url: 'https://github.com/houssemeddine99/FrontOffice-Travagir',
      accent: '#a3e635',
    },
    {
      name: 'This AI Portfolio',
      blurb: 'An immersive 3D self-introduction with an AI version of me that answers questions.',
      tags: ['React', 'Three.js', 'Framer Motion'],
      url: '',
      accent: '#22d3ee',
    },
  ],

  // =========================================================================
  //  🤖  THE AI BRAIN — what "AI you" says when interviewers ask questions.
  //   • tags      → keywords/synonyms that trigger this answer.
  //   • patterns  → (optional) example phrasings.
  //   • answer    → first-person reply. Use {name} {role} {location} {email}.
  // =========================================================================
  ai: {
    greeting:
      "Hi! I'm the AI version of {name} (yuki 👋). Ask me anything an interviewer might — my strengths, experience, projects, or why I'd be a great hire. 🚀",

    suggestions: [
      'Tell me about yourself',
      'What are your strengths?',
      'Why should we hire you?',
      'What projects have you built?',
      'What tech do you use?',
    ],

    fallbacks: [
      "That's a great question — I'd love to go deeper on it in a real conversation. You can reach me at {email}.",
      "Good one! I don't have a scripted answer for that, but it's exactly the kind of thing I'd enjoy discussing in an interview. Try asking about my skills, projects, or experience.",
      "Hmm, I want to give you an honest answer rather than guess. Ask me about my background, strengths, or projects — or email me at {email}.",
    ],

    knowledge: [
      {
        tags: ['about', 'yourself', 'who are you', 'introduce', 'intro', 'bio', 'background', 'summary', 'yuki'],
        patterns: ['tell me about yourself', 'who are you', 'introduce yourself'],
        answer:
          "I'm {name} (friends call me yuki), a {role} based in {location}. I build complete web apps — back-end logic in Symfony, PHP or Java, and interactive front-ends in React. I love work that blends solid engineering with great UX.",
      },
      {
        tags: ['strength', 'strengths', 'good at', 'best', 'superpower', 'strong'],
        patterns: ['what are your strengths', 'what are you good at'],
        answer:
          "My biggest strength is being genuinely full-stack — I'm comfortable owning a feature from the MySQL database, through a Symfony or Java back end, all the way to a polished React UI. I also learn fast and ship a lot, as you can see on my GitHub.",
      },
      {
        tags: ['weakness', 'weaknesses', 'improve', 'work on', 'flaw'],
        patterns: ['what is your weakness', 'what do you need to improve'],
        answer:
          "I'm still growing my DevOps side — things like Docker and CI/CD — and I'm actively learning them. I can also be a perfectionist with UI details, so I've learned to time-box polish to keep shipping.",
      },
      {
        tags: ['hire', 'why you', 'why should', 'value', 'bring', 'add'],
        patterns: ['why should we hire you', 'what value do you bring'],
        answer:
          "You should hire me because I bridge back end and front end — I can build a reliable API in Symfony or Java and make the interface feel premium in React. I'm curious, reliable, and I ship: I have 20+ projects on GitHub to prove it.",
      },
      {
        tags: ['project', 'projects', 'built', 'portfolio', 'work', 'made', 'github'],
        patterns: ['what projects have you built', 'show me your work'],
        answer:
          "A few I'm proud of: my smart-home IoT platform (PFE) in React, a travel-and-tours platform called evectours in PHP, a React e-commerce store, and a Java front office for the Travagir travel app. Scroll down to my GitHub section to see them live — or ask me about any one!",
      },
      {
        tags: ['smart home', 'smarthome', 'iot', 'pfe', 'final year', 'dashboard'],
        patterns: ['tell me about the smart home project', 'what is the pfe'],
        answer:
          "The smart-home platform is my final-year project (PFE). I'm building a React dashboard to monitor and control IoT devices in real time, backed by a REST API. It's pushed me on real-time data, clean component design and UX.",
      },
      {
        tags: ['evectours', 'travel', 'tours', 'booking', 'evec'],
        patterns: ['what is evectours', 'tell me about evectours'],
        answer:
          "evectours is a travel-and-tours booking platform I built with PHP — tour listings, bookings, and an admin area. It's my most-developed PHP project and it's on my GitHub.",
      },
      {
        tags: ['travigir', 'travagir', 'symfony', 'java', 'front office', 'reservation'],
        patterns: ['tell me about travigir', 'the travel app'],
        answer:
          "For the Travigir travel app I built the front office in Java, plus a Symfony/PHP back office with reservations. Great practice in structuring a real app across two stacks.",
      },
      {
        tags: ['ecommerce', 'e-commerce', 'shop', 'store', 'react project'],
        patterns: ['tell me about the ecommerce project'],
        answer:
          "I built an e-commerce storefront in React — product catalog, cart and a clean responsive UI. It's where I sharpened my React and component skills.",
      },
      {
        tags: ['tech', 'stack', 'technologies', 'tools', 'languages', 'use', 'framework'],
        patterns: ['what tech do you use', 'what is your stack', 'what languages do you know'],
        answer:
          "Back end: PHP/Symfony, Java, REST APIs and MySQL (I've also touched Laravel). Front end: React, JavaScript, HTML/CSS, plus Tailwind, Framer Motion and Three.js for motion and 3D. And Git/GitHub every day.",
      },
      {
        tags: ['experience', 'years', 'how long', 'worked', 'career'],
        patterns: ['how much experience do you have', 'how long have you been coding'],
        answer:
          "I've been coding for about 4 years — I started on GitHub back in 2021 — across university, my PFE, and a lot of personal projects. Enough to have shipped real full-stack apps and learned to work in a team.",
      },
      {
        tags: ['team', 'teamwork', 'collaborate', 'agile', 'scrum', 'work with others'],
        patterns: ['do you work well in a team', 'how do you collaborate'],
        answer:
          "Yes — I enjoy team projects and I've worked in Agile-style groups (the Travigir app was a team effort). I communicate early, keep my code reviewable on Git, and jump in wherever the team needs me.",
      },
      {
        tags: ['goal', 'goals', 'future', 'ambition', 'five years', 'career plan'],
        patterns: ['where do you see yourself', 'what are your goals'],
        answer:
          "I want to grow into a well-rounded full-stack engineer who can lead features end-to-end, with deeper skills in architecture and cloud. Long term, I'd love to ship products that reach a lot of people.",
      },
      {
        tags: ['learn', 'learning', 'fast learner', 'new', 'pick up'],
        patterns: ['are you a fast learner', 'how do you learn'],
        answer:
          "Learning fast is my thing — I learn by building. When I hit something new I prototype it and ship a small version to make it stick. This whole 3D AI site is an example of that.",
      },
      {
        tags: ['contact', 'reach', 'email', 'hire me', 'get in touch'],
        patterns: ['how can I contact you', 'how do I reach you'],
        answer:
          "The fastest way is email: {email}. My GitHub is github.com/houssemeddine99, and you'll find my links in the contact section below — I'd love to talk!",
      },
      {
        tags: ['hello', 'hi', 'hey', 'greetings', 'yo'],
        patterns: ['hi', 'hello', 'hey there'],
        answer: "Hey! 👋 Great to meet you. Ask me anything — my strengths, experience, projects, or why I'd be a great hire.",
      },
      {
        tags: ['thanks', 'thank you', 'thx', 'appreciate'],
        patterns: ['thank you', 'thanks'],
        answer: "Anytime! 😊 If you'd like to keep talking, my email's in the contact section. Thanks for stopping by.",
      },
    ],
  },
}

export default profile
