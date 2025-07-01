"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

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
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my work and skills.",
    link: "/projects/portfolio",
    tech: [
      { name: "Next.js", logo: "/nextjs-logo.svg" },
      { name: "React", logo: "/react-logo.svg" },
      { name: "Tailwind CSS", logo: "/css-logo.svg" },
      { name: "Docker", logo: "/docker-logo.svg" },
    ],
  },
  {
    title: "Task Manager Application",
    description: "A web application to manage tasks and projects.",
    link: "/projects/task-manager",
    tech: [
      { name: "Python", logo: "/python-logo.svg" },
      { name: "Django", logo: "/django-logo.svg" },
      { name: "DRF", logo: "/drf-logo.svg" },
      { name: "Postman", logo: "/postman-logo.svg" },
    ],
  },
  // Add more projects as needed
];

// Sample resume timeline data
const resumeTimeline = [
  {
    date: "2024 - Present",
    title: "Webmaster",
    description: `Management and development of several WordPress-based eCommerce platforms,
                  encompassing both daily administration and the implementation of new features
                  tailored to business needs. Responsible for performance optimization, error
                  elimination, and ensuring the smooth operation of the services. Close collaboration
                  with the marketing department to implement sales strategies and enhance user
                  experience.`
  },
  {
    date: "2022 - present",
    title: "Python Developer",
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
    title: "'Pojazd' and 'Kierowca' systems coordinator for CEPiK",
    description: `I began my career as a civil servant in the Department of Communication, where I
                  was responsible for day-to-day client service in vehicle registration. Due to my
                  strong dedication, I was quickly promoted to Deputy Branch Manager, handling
                  corporate clients. In early 2022, thanks to my computer proficiency, I was promoted
                  to the aforementioned position, where I resolved issues related to vehicle
                  registration systems, prepared reports, and managed strictly administrative tasks.`
  },
  {
    date: "2005 - 2019",
    title: "Canoe Athlete",
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

function SkillsCarousel() {
  // Duplicate the skills array for seamless looping
  const logos = [...skills, ...skills];

  return (
    <div className="w-full overflow-hidden py-4">
      <div
        className="flex gap-8 animate-carousel"
        style={{ width: `${logos.length * 120}px` }}
      >
        {logos.map((skill, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end rounded-xl p-4 shadow-lg min-w-[90px]"
          >
            <Image
              src={skill.logo}
              alt={skill.name}
              width={40}
              height={40}
              className="mb-2"
            />
            {/* <span className="text-sm text-white font-semibold">{skill.name}</span> */}
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
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-20 max-w-5xl mx-auto">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Hello, I'm <span className="text-violet">Martin Brzeziński</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-lg">
            I'm a Junior Python Developer & WordPress Webmaster specializing in building modern web applications and dynamic websites.
          </p>
          <a
            href="#contact"
            className="inline-block mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-violet to-purple text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Get In Touch
          </a>
        </div>
        <div className="flex-1 flex justify-center">
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
        </div>
      </section>

      {/* Skills Carousel */}
      <section className="max-w-5xl mx-auto w-full mb-12">
        <SkillsCarousel />
      </section>

      {/* Projects Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-400 tracking-widest uppercase">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* Resume Timeline Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-violet-400 tracking-widest uppercase">Resume</h2>
        <div className="flex flex-col gap-10">
          {resumeTimeline.map((item, idx) => (
            <div key={idx} className="flex items-start gap-6">
              {/* Date */}
              <div className="w-32 flex-shrink-0 flex items-center justify-end pr-2">
                <div className="text-sm text-blue-400 font-semibold text-right">{item.date}</div>
              </div>
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-violet-500' : 'bg-blue-500'} border-4 border-[#10162a] shadow-lg`}></div>
                {idx < resumeTimeline.length - 2 && (
                  <div className="w-1 bg-gradient-to-b from-violet-500 to-blue-500 flex-1 my-1" style={{ minHeight: '48px' }}></div>
                )}
              </div>
              {/* Content */}
              <div className="flex-1 bg-[#10162a]/80 rounded-xl p-6 shadow-md">
                <div className="text-lg font-bold mb-2">{item.title}</div>
                <div className="text-white/80">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-violet">Contact</h2>
        <div className="bg-gradient-to-br from-deep-blue via-gradient-mid to-gradient-end rounded-xl p-8 shadow-lg">
          <p className="text-white/80 mb-4">Contact form coming soon!</p>
        </div>
      </section>

      <footer className="w-full text-center text-white/50 py-8 text-sm z-20 relative">
        Made with ❤️ by Martin Brzeziński
      </footer>
    </div>
  );
}
