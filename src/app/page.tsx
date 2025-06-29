"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "Python", logo: "/python-logo.svg" },
  { name: "JavaScript", logo: "/js-logo.svg" },
  { name: "PHP", logo: "/php-logo.svg" },
  { name: "HTML", logo: "/html-logo.svg" },
  { name: "CSS", logo: "/css-logo.svg" },
  // Add more as needed
];

const projects = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my work and skills.",
    link: "/projects/portfolio",
  },
  {
    title: "Task Manager Application",
    description: "A web application to manage tasks and projects.",
    link: "/projects/task-manager",
  },
  // Add more projects as needed
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
            <span className="text-sm text-white font-semibold">{skill.name}</span>
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
            Hello, I'm <span className="text-violet">Your Name</span>
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
      <section className="max-w-3xl mx-auto w-full mb-12">
        <SkillsCarousel />
      </section>

      {/* Projects Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-400 tracking-widest uppercase">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`p-[2px] rounded-2xl bg-gradient-to-br ${idx % 2 === 0 ? 'from-blue-500 via-violet-500 to-purple-500' : 'from-purple-500 via-violet-500 to-blue-500'} shadow-[0_0_24px_4px_rgba(124,58,237,0.3)]`}
            >
              <div className="rounded-2xl bg-[#10162a]/90 h-full p-8 flex flex-col min-h-[180px]">
                <h3 className="text-xl font-bold mb-2 text-white text-left">{project.title}</h3>
                <p className="text-white/80 mb-6 text-left">{project.description}</p>
                <a
                  href={project.link}
                  className="self-start px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold shadow-blue-500/40 shadow-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  View
                </a>
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
    </div>
  );
}
