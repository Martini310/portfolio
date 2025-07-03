"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

type Project = {
  title: string;
  description: string;
  link: string;
  tech?: {
    name: string;
    logo: string;
  }[];
};

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    };
    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Ripple effect for button
  function handleButtonClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${e.nativeEvent.offsetX}px`;
    ripple.style.top = `${e.nativeEvent.offsetY}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.035, rotateX: 2, rotateY: -2 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="project-card group relative rounded-2xl p-1 overflow-hidden"
      style={{
        '--x': '10%',
        '--y': '10%',
        boxShadow: '0 4px 32px 0 rgba(80,60,180,0.18)',
      } as React.CSSProperties}
    >
      {/* Animated gradient glow border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        animate={{
          background:
            'radial-gradient(ellipse 80% 60% at var(--x,50%) var(--y,50%), rgba(139,92,246,0.18), transparent 80%)',
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Glassmorphism background with animated gradient */}
      <div className="relative rounded-2xl bg-[#10162a]/80 backdrop-blur-md p-7 flex flex-col min-h-[100%] z-10 border border-white/4 before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.08)_0%,transparent_60%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.08)_0%,transparent_60%)] before:animate-move-pattern before:z-0 before:pointer-events-none">
        {/* Project Title */}
        <h3 className="text-2xl font-extrabold font-inter bg-gradient-to-r from-blue-300 via-violet-700 to-purple-400 bg-clip-text text-transparent drop-shadow-md mb-2 relative z-10">
          {project.title}
        </h3>
        {/* Description */}
        <p className="text-white/90 mb-6 font-inter text-base leading-relaxed relative z-10 text-shadow-sm">
          {project.description}
        </p>
        {/* Actions & Tech */}
        <div className="flex items-end justify-between mt-auto gap-4 relative z-10">
          <motion.a
            href={project.link}
            whileHover={{ scale: 1.08, boxShadow: '0 0 16px 4px #7c3aed55' }}
            className="relative self-start px-7 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold font-inter shadow-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 ripple-btn"
            tabIndex={0}
            onClick={handleButtonClick}
          >
            <span className="relative z-10">View</span>
          </motion.a>
          {/* Tech icons */}
          <div className="flex gap-3 ml-auto">
            {project.tech?.map((tech, i) => (
              <div key={tech.name} className="relative flex flex-col items-center">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-9 h-9 rounded-lg bg-black/10 p-1 grayscale hover:grayscale-0 hover:scale-110 hover:shadow-lg transition-all duration-200 peer"
                />
                <span className="absolute left-1/2 -translate-x-1/2 top-11 opacity-0 peer-hover:opacity-100 bg-[#222] text-xs text-white px-2 py-1 rounded shadow-lg transition-all duration-200 pointer-events-none whitespace-nowrap z-20 font-inter">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Ripple effect style */}
      <style jsx>{`
        .ripple-btn .ripple {
          position: absolute;
          border-radius: 9999px;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, #7c3aed55 0%, transparent 70%);
          animation: ripple 0.6s linear;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes ripple {
          0% { opacity: 0.7; transform: scale(0); }
          100% { opacity: 0; transform: scale(1.2); }
        }
        .text-shadow-sm {
          text-shadow: 0 1px 4px rgba(0,0,0,0.18);
        }
        .before\:animate-move-pattern::before {
          animation: movePattern 8s linear infinite alternate;
        }
        @keyframes movePattern {
          0% { background-position: 0% 0%, 100% 100%; }
          100% { background-position: 100% 100%, 0% 0%; }
        }
      `}</style>
    </motion.div>
  );
} 