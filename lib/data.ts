/**
 * Central content for the portfolio.
 *
 * ── HOW TO UPDATE ──────────────────────────────────────────────
 * Every piece of copy, link, project, and skill lives here so the
 * UI components stay generic and reusable. Replace the PLACEHOLDER
 * values (profile photo, resume, project screenshots, social URLs)
 * with the real assets when they are available — search for the
 * word "PLACEHOLDER" to find them quickly.
 * ───────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Aayasha Khatun",
  title: "Frontend Developer",
  location: "Nepal",
  // Additional personal fields extracted from provided resume
  address: "Siddhartanagar-9, Bhairahawa",
  phone: "+977-9822979868",
  dob: "2000-03-01",
  gender: "Female",
  father: "Basir Alam",
  mother: "Jahida Khatun",
  // A concise, human supporting line for the hero.
  tagline:
    "Designing thoughtful interfaces and building responsive web experiences that turn ideas into something people can actually use.",
  // Short intro used for SEO / meta description.
  summary:
    "Frontend developer based in Nepal, focused on React, responsive design, and turning UI designs into clean, accessible web interfaces.",
  // Replaced by the uploaded portrait. Drop the actual image in /public
  // as `aayasha-portrait.jpg` if not already present.
  // Use the uploaded portrait that's already in `public/`.
  photo: "/images/aayasha.jpg",
  photoReady: true,
  initials: "AK",
  // Resume will be generated dynamically by the app route.
  resume: "/api/resume",
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  kind: "email" | "linkedin";
  personal?: boolean;
};

export const socials: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:aayeshabasir@gmail.com",
    handle: "aayeshabasir@gmail.com",
    kind: "email",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aayesha-basir-205189233",
    handle: "/in/aayesha-basir",
    kind: "linkedin",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/* ── About ──────────────────────────────────────────────────── */

export const about = {
  paragraphs: [
    "I started coding during my BCA and, somewhere along the way, realised I was most drawn to the visual, creative side of building for the web — the part where an idea slowly turns into something you can see and click.",
    "What I enjoy most is the full arc: understanding a requirement, thinking about how it should look and feel, building the interface, making it responsive, and connecting it to real functionality until it becomes something people can actually use.",
    "My primary focus is frontend development. I care about interfaces that are simple and intuitive rather than complicated for the sake of looking advanced. Alongside that, I'm continuously expanding my understanding of backend development, deployment, and the wider development lifecycle — there's always more to learn.",
  ],
  // Short, honest positioning traits.
  traits: [
    "Creative",
    "Detail-oriented",
    "Calm",
    "User-focused",
    "Curious",
    "Design-conscious",
  ],
};

/* ── Skills ─────────────────────────────────────────────────── */

export type SkillGroup = {
  title: string;
  note?: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Quasar Framework",
    ],
  },
  {
    title: "State & Data",
    note: "Pinia for client state; TanStack Query for server-state — data fetching, caching, synchronisation, and mutations.",
    items: ["Pinia", "TanStack Query", "Zustand"],
  },
  {
    title: "Backend — Familiar",
    note: "Areas I'm actively learning and expanding into, not my primary specialisation.",
    items: ["Django REST Framework", "REST APIs", "PostgreSQL"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Swagger", "Railway"],
  },
];

// Given special visual emphasis as core frontend strengths.
export const coreStrengths = [
  "Responsive Design",
  "React Development",
  "Component Architecture",
  "Reusable Components",
  "API Integration",
  "Forms",
  "Animations",
  "State Management",
  "UI Implementation",
];

/* ── Experience ─────────────────────────────────────────────── */

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  current?: boolean;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Junior Web Developer",
    org: "YAJ Pvt. Ltd. / Eynora",
    period: "July 2025 – Present",
    current: true,
    description:
      "Continuing with Eynora, a branch under YAJ Pvt. Ltd., with a current focus on frontend and React development.",
  },
  {
    role: "Trainee",
    org: "YAJ Pvt. Ltd.",
    period: "July 2024 – June 2025",
    description:
      "Continued building on real-world web applications, deepening frontend fundamentals and component-based development.",
  },
  {
    role: "Internship",
    org: "YAJ Pvt. Ltd. / Ambition Guru",
    period: "January 2024 – June 2024",
    description:
      "Began professional work with Ambition Guru, under YAJ Pvt. Ltd., contributing to frontend development on live projects.",
  },
];

/* ── Education ──────────────────────────────────────────────── */

export const education = [
  {
    degree: "SLC",
    school: "Jaycees English Boarding High School",
    period: "2068 – 2072",
    notes: ["GPA: 3.20"],
  },
  {
    degree: "+2",
    school: "Tilottama Campus",
    period: "2073 – 2075",
    notes: ["GPA: 2.98"],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Bhairahawa Multiple Campus",
    period: "2018 – 2023",
    notes: [
      "GPA: 3.52",
      "Received a semester scholarship and was a topper.",
      "Began seriously learning programming around the third semester.",
      "Timeline was extended due to COVID-related disruption.",
    ],
  },
];

/* ── Projects ───────────────────────────────────────────────── */

export type Project = {
  id: string;
  index: string;
  name: string;
  role: string;
  featured: boolean;
  confidential?: boolean;
  personal?: boolean;
  description: string;
  highlights: string[];
  tech: string[];
  liveUrl?: string;
  sourceUrl?: string;
  // PLACEHOLDER cover: a designed, non-fabricated visual is used in the UI.
  // Drop a real screenshot in /public and set `image` to use it instead.
  image?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "hei-insurance",
    index: "01",
    name: "HEI Insurance",
    role: "Frontend Developer",
    featured: true,
    confidential: true,
    description:
      "An in-house web application where I implemented most of the frontend UI and pages, working directly from client requirements gathered through meetings.",
    highlights: [
      "React / Next.js frontend development",
      "UI implementation from requirements",
      "Responsive interface development",
      "Component-based architecture",
      "Data fetching & caching with TanStack Query",
    ],
    tech: ["Next.js", "React", "TanStack Query"],
    liveUrl: "https://customer.hei.com.np/my-insurance",
    accent: "from-[oklch(0.52_0.17_274/0.14)]",
  },
  {
    id: "ambition-guru-college",
    index: "02",
    name: "Ambition Guru College Website",
    role: "Solo Frontend Developer",
    featured: true,
    description:
      "A college website I handled independently on the frontend — building the interface, making it responsive, and integrating it with APIs. (The live site has evolved since my original work.)",
    highlights: [
      "Independent project ownership",
      "UI development & responsive design",
      "API integration",
      "End-to-end frontend implementation",
    ],
    tech: ["Nuxt.js", "Pinia"],
    liveUrl: "https://ambitiongurucollege.edu.np/",
    accent: "from-[oklch(0.6_0.13_200/0.16)]",
  },
  {
    id: "lms-cas-admin",
    index: "03",
    name: "LMS / CAS & Admin",
    role: "Frontend Developer",
    featured: true,
    confidential: true,
    description:
      "A significant professional project where I contributed to the frontend of a learning-management platform with an admin surface and multi-tenant handling.",
    highlights: [
      "React-based frontend development",
      "Admin interface implementation",
      "Multi-tenant handling on the frontend",
      "API integration",
    ],
    tech: ["React", "REST APIs", "Multi-tenant"],
    accent: "from-[oklch(0.55_0.15_300/0.16)]",
  },
  {
    id: "food-blog",
    index: "04",
    name: "Food Blog",
    role: "Full-stack (learning)",
    featured: false,
    description:
      "A project where I explored the full stack — building the frontend while also working with a Django REST backend, PostgreSQL, and REST APIs to understand how the pieces fit together.",
    highlights: [
      "React frontend",
      "Django REST Framework backend",
      "PostgreSQL data layer",
      "REST API design & consumption",
    ],
    tech: ["React", "Django REST Framework", "PostgreSQL", "REST APIs"],
    accent: "from-[oklch(0.62_0.12_150/0.16)]",
  },
  {
    id: "birthday-website",
    index: "05",
    name: "Birthday Website",
    role: "Personal Creative Project",
    featured: false,
    personal: true,
    description:
      "A playful, interactive site I built for myself — outside any specification — to experiment with motion, layout, and little moments of delight. It's where I get to code just because I want to.",
    highlights: [
      "Interactive frontend development",
      "Creative motion & UI/UX thinking",
      "Personal initiative, no brief",
    ],
    tech: ["React", "CSS Animations", "Interaction"],
    accent: "from-[oklch(0.7_0.15_30/0.18)]",
  },
];

/* ── Beyond the Screen ──────────────────────────────────────── */

export const interests = [
  "Novels and Poetry",
  "Reading",
  "Journaling",
  "Mehendi Artist",
  "Cooking",
  "Sketching",
];

export const languages = ["Hindi", "Urdu", "English", "Nepali"];

/* ── GitHub ─────────────────────────────────────────────────── */

// PLACEHOLDER: set to the real GitHub profile. We intentionally do not
// fabricate contribution counts, repos, stars, or followers.
export const githubUrl = "https://github.com/your-handle";
