"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ResumeCard from "@/components/ResumeCard";
import { motion } from "framer-motion";

const skills = [
  { name: "Python", logo: "/python-logo.svg" },
  { name: "JavaScript", logo: "/js-logo.svg" },
  { name: "PHP", logo: "/php-logo.svg" },
  { name: "HTML", logo: "/html-logo.svg" },
  { name: "CSS", logo: "/css-logo.svg" },
  { name: "Next.js", logo: "/nextjs-logo.svg" },
  { name: "WordPress", logo: "/wp-logo.svg" },
  { name: "WooCommerce", logo: "/woo-logo.svg" },
  { name: "Django", logo: "/django-logo.svg" },
  { name: "Django REST Framework", logo: "/drf-logo.svg" },
  { name: "React", logo: "/react-logo.svg" },
  { name: "Postman", logo: "/postman-logo.svg" },
  { name: "Docker", logo: "/docker-logo.svg" },
  { name: "Git", logo: "/git-logo.svg" },
  { name: "SQLite", logo: "/sqlite-logo.svg" }
];

const projects = [
  {
    title: "BillWise",
    description: "A fullstack app for managing and tracking all your household bills in one place. BillWise synchronizes payments from multiple suppliers, provides a unified dashboard, and offers insightful statistics and charts—no more logging into each supplier separately.",
    link: "/projects/billwise",
    tech: [
      { name: "Python", logo: "/python-logo.svg" },
      { name: "Django", logo: "/django-logo.svg" },
      { name: "DRF", logo: "/drf-logo.svg" },
      { name: "Next.js", logo: "/nextjs-logo.svg" }
    ]
  },
  {
    title: "Archeo 2022",
    description: "A Tkinter desktop app that replaces paper registers for managing and tracking company archive documents. Features search, operator selection, and clipboard integration.",
    link: "/projects/archeo-2022",
    tech: [
      { name: "Python", logo: "/python-logo.svg" },
      { name: "SQLite", logo: "/sqlite-logo.svg" },
      { name: "Tkinter", logo: "/python-logo.svg" },
      { name: "Desktop", logo: "/window.svg" }
    ]
  },
  {
    title: "Pixel Jumper",
    description: "A simple platformer game in PyGame. Jump on moving platforms, avoid the scrolling background, and aim for the top of the highscores list!",
    link: "/projects/pixel-jumper",
    tech: [
      { name: "Python", logo: "/python-logo.svg" },
      { name: "PyGame", logo: "/python-logo.svg" }
    ]
  },
  {
    title: "Portfolio Website",
    description: "A modern, interactive portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    link: "#",
    tech: [
      { name: "Next.js", logo: "/nextjs-logo.svg" },
      { name: "React", logo: "/react-logo.svg" },
      { name: "Tailwind CSS", logo: "/css-logo.svg" },
      { name: "Framer Motion", logo: "/react-logo.svg" },
      { name: "TypeScript", logo: "/js-logo.svg" },
      { name: "Docker", logo: "/docker-logo.svg" }
    ],
  },
  {
    title: "Trip Cost Calc",
    description: "A Python Kivy app to calculate car trip costs based on real-time fuel prices, weather, and route info.",
    link: "/projects/trip-cost-calc",
    tech: [
      { name: "Python", logo: "/python-logo.svg" },
      { name: "Kivy", logo: "/python-logo.svg" },
      { name: "Google Maps API", logo: "/globe.svg" },
      { name: "OpenWeatherMap API", logo: "/globe.svg" }
    ]
  },
];

// Resume timeline data
const resumeTimeline = [
  {
    date: "2024 - Present",
    company: "Senpo sp. z o.o. sp.k.",
    title: "Webmaster",
    competences: ["WordPress", "WooCommerce", "Performance Optimization", "Teamwork"],
    description: `Management and development of several WordPress-based eCommerce platforms,
                  encompassing both daily administration and the implementation of new features
                  tailored to business needs. Responsible for performance optimization, error
                  elimination, and ensuring the smooth operation of the services. Close collaboration
                  with the marketing department to implement sales strategies and enhance user
                  experience.`
  },
  {
    date: "2022 - present",
    company: "Freelance",
    title: "Python Developer",
    competences: ["Python", "Django", "REST APIs", "Self-management"],
    description: `Thanks to efficient work organization, I have been able to develop as a Python
                  Developer. I built an application using Tkinter to monitor and control loaned
                  records, replacing paper registers. I then extended it with Django to unify various
                  registers kept in notebooks and Excel.
                  For personal projects, I developed, among others, an application in Kivy for
                  calculating travel costs based on fuel prices, as well as a game in PyGame inspired
                  by Icy Tower. Currently, I am developing a full-stack project using Django REST
                  Framework, Next.js, and Celery to manage household bills, synchronizing with the
                  most popular eBOKs. My projects are available on GitHub.`
  },
  {
    date: "2020 - 2024",
    company: "Department of Communication",
    title: "'Pojazd' and 'Kierowca' systems coordinator for CEPiK",
    competences: ["Client Service", "Problem Solving", "Reporting", "Administration"],
    description: `I began my career as a civil servant in the Department of Communication, where I
                  was responsible for day-to-day client service in vehicle registration. Due to my
                  strong dedication, I was quickly promoted to Deputy Branch Manager, handling
                  corporate clients. In early 2022, thanks to my computer proficiency, I was promoted
                  to the aforementioned position, where I resolved issues related to vehicle
                  registration systems, prepared reports, and managed strictly administrative tasks.`
  },
  {
    date: "2005 - 2019",
    company: "Polish National Team",
    title: "Canoe Athlete",
    competences: ["Discipline", "Teamwork", "Stress Resistance", "Goal Orientation"],
    description: `During almost 15 years of professional sports career as a canoeist, I won many
                  trophies and medals of the Polish, European and World Championships. In addition
                  to awards, I gained a lot of invaluable knowledge during this time. Sport has shaped
                  me as a strong and responsible man. It developed in me many positive
                  characteristics such as being goal-oriented, perseverance and conscientiousness. It
                  taught me how to work in a group, avoid conflicts and solve problems. On the other
                  hand, taking part in the world's largest competitions under the pressure of the
                  environment developed in me a high resistance to stress.`
  },
];

const TAGLINE = "  Turning ideas into beautiful, functional web experiences.";

function useTypingEffect(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    let interval: NodeJS.Timeout | null = null;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayed((prev) => prev + text[i]);
        i++;
        if (i >= text.length - 1 && interval) clearInterval(interval);
      }, speed);
    }, 1800); // 0.5s delay before typing starts
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed]);
  return displayed;
}

function SkillsCarousel() {
  // Duplicate the skills array for seamless looping
  const logos = [...skills, ...skills];

  return (
    <div
      className="w-full overflow-hidden py-4 group"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-8 animate-carousel group-hover:[animation-play-state:paused]"
        style={{ width: `${logos.length * 120}px` }}
      >
        {logos.map((skill, i) => (
          <div
            key={i}
            className="group/logo flex flex-col items-center min-w-[160px]"
          >
            <div
              className="transition-transform duration-300 rounded-2xl bg-[#181f3a]/80 border border-violet-500/30 group-hover/logo:border-violet-400 group-hover/logo:shadow-[0_0_12px_2px_rgba(139,92,246,0.4)] w-32 h-32 flex flex-col items-center justify-center scale-100 group-hover/logo:scale-125"
            >
              <Image
                src={skill.logo}
                alt={skill.name}
                width={56}
                height={56}
                className="transition-transform duration-300 group-hover/logo:scale-110 group-hover/logo:rotate-3 mb-2"
              />
              <span className="text-sm text-white font-semibold text-center drop-shadow-sm select-none mt-1 font-inter">
                {skill.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden">
      {/* Glowing Orbs */}
      <div className="orb-bg" style={{top: '-120px', right: '-120px', width: '320px', height: '320px', background: 'radial-gradient(circle at 70% 30%, #7c3aed 0%, transparent 70%)'}} />
      <div className="orb-bg" style={{bottom: '-120px', left: '-120px', width: '320px', height: '320px', background: 'radial-gradient(circle at 30% 70%, #2563eb 0%, transparent 70%)'}} />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        className="relative flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-20 max-w-5xl mx-auto"
      >
        {/* Blurred orb background */}
        <div className="absolute -top-24 -left-32 w-[400px] h-[400px] bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500 rounded-full blur-3xl opacity-30 z-0 pointer-events-none" />
        <div className="flex-1 flex flex-col gap-6 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            Hello, I'm <span className="bg-gradient-to-r from-blue-400 via-violet-500 to-purple-500 bg-clip-text text-transparent">Martin Brzeziński</span>
          </motion.h1>
          {/* Tagline with typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9, ease: "easeOut" }}
            className="text-violet-200 text-lg md:text-xl font-mono min-h-[2.5rem]"
            aria-label="Tagline"
          >
            {useTypingEffect(TAGLINE, 60)}<span className="animate-pulse">|</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 max-w-lg"
          >
            I'm a Junior Python Developer & WordPress Webmaster specializing in building modern web applications and dynamic websites.
          </motion.p>
          <div className="flex gap-4 mt-2">
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
              href="#contact"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-violet to-purple text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Get In Touch
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
              href="/cv.pdf" download
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform border border-blue-400/30"
            >
              Download CV
            </motion.a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
          className="flex-1 flex justify-center z-10"
        >
          <div className="rounded-full bg-gradient-to-br from-violet to-purple p-1 shadow-2xl">
            <Image
              src="/me.png"
              alt="Profile photo"
              width={180}
              height={180}
              className="rounded-full object-cover border-4 border-deep-blue"
              priority
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Skills Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 1.8, duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl mx-auto w-full mb-12"
      >
        <SkillsCarousel />
      </motion.section>

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-400 tracking-widest uppercase">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </motion.section>

      {/* Resume Timeline Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-violet-400 tracking-widest uppercase">Resume</h2>
        <div className="flex flex-col gap-12">
          {resumeTimeline.map((item, idx) => (
            <ResumeCard key={idx} item={item} idx={idx} isLast={idx >= resumeTimeline.length - 2} />
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl mx-auto px-6 py-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-violet">Contact</h2>
        <form
          action="https://formspree.io/f/xgvydjyj"
          method="POST"
          className="bg-gradient-to-br from-deep-blue via-gradient-mid to-gradient-end rounded-xl p-8 shadow-lg flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="px-4 py-3 rounded-lg bg-[#10162a]/80 text-white placeholder-white/60 border border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="px-4 py-3 rounded-lg bg-[#10162a]/80 text-white placeholder-white/60 border border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            className="px-4 py-3 rounded-lg bg-[#10162a]/80 text-white placeholder-white/60 border border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          />
          <button
            type="submit"
            className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Send Message
          </button>
        </form>
      </motion.section>

      {/* Socials Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full flex flex-col items-center justify-center py-8"
      >
        <h2 className="text-xl font-bold mb-4 text-violet-300">Find me on</h2>
        <div className="flex gap-6">
          {/* GitHub */}
          <a href="https://github.com/Martini310" target="_blank" rel="noopener noreferrer" className="rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-3 shadow-lg hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/martin-brzeziński-ab714b1b1/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-3 shadow-lg hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.599v5.597z" />
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com/brzezinski.martinn" target="_blank" rel="noopener noreferrer" className="rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-3 shadow-lg hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>
      </motion.section>

      <footer className="w-full text-center text-white/50 py-8 text-sm z-20 relative">
        Made with ❤️ by Martin Brzeziński
      </footer>
    </div>
  );
}
