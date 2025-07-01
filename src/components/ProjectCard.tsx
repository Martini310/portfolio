"use client";

import { useRef, useEffect } from 'react';

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

  return (
    <div
      ref={cardRef}
      className="project-card rounded-2xl bg-[#10162a]/80 shadow-xl p-8 flex flex-col min-h-[180px] relative"
      style={{ "--x": "10%", "--y": "10%" } as React.CSSProperties}
    >
      <h3 className="text-xl font-bold mb-2 text-white text-left">{project.title}</h3>
      <p className="text-white/80 mb-6 text-left">{project.description}</p>
      <div className="flex items-center justify-between mt-auto gap-4">
        <a
          href={project.link}
          className="self-start px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold shadow-blue-500/40 shadow-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
        >
          View
        </a>
        <div className="flex gap-3 ml-auto">
          {project.tech?.map((tech, i) => (
            <div key={tech.name} className="group relative flex flex-col items-center">
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-8 h-8 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-200"
              />
              <span className="absolute left-1/2 -translate-x-1/2 top-10 opacity-0 group-hover:opacity-100 bg-[#222] text-xs text-white px-2 py-1 rounded shadow-lg transition-all duration-200 pointer-events-none whitespace-nowrap z-20">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 