import React, { useState, useRef } from "react";
import { motion } from 'framer-motion';

type ResumeItem = {
  date: string;
  company: string;
  title: string;
  description: string;
  competences?: string[];
};

type ResumeCardProps = {
  item: ResumeItem;
  idx: number;
  isLast: boolean;
};

const ResumeCard: React.FC<ResumeCardProps> = ({ item, idx, isLast }) => {
  const [expanded, setExpanded] = useState(false);
  const words = item.description.split(/\s+/);
  const isLong = words.length > 40;
  const shortDesc = isLong ? words.slice(0, 40).join(" ") + "..." : item.description;
  const cardRef = useRef<HTMLDivElement>(null);
  // Mouse tracking for glowing effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };
  return (
    <div className="flex items-stretch gap-3 sm:gap-6">
      {/* Timeline */}
      <div className="flex flex-col items-center min-w-[24px] sm:min-w-[40px]">
        <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${idx === 0 ? 'bg-violet-500' : 'bg-blue-500'} border-2 sm:border-4 border-[#10162a] shadow-lg z-10`}></div>
        {!isLast && (
          <div className="w-0.5 sm:w-1 flex-1 bg-gradient-to-b from-violet-500 to-blue-500 my-1" style={{ minHeight: '32px' }}></div>
        )}
      </div>
      {/* Card Content */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ scale: 1.025, rotateX: 2, rotateY: -2 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="resume-card flex-1 relative rounded-2xl p-1 overflow-hidden group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          const card = cardRef.current;
          if (card) {
            card.style.setProperty('--x', '50%');
            card.style.setProperty('--y', '50%');
          }
        }}
        style={{ zIndex: 2, '--x': '50%', '--y': '50%' } as React.CSSProperties}
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
        <div className="relative rounded-2xl bg-[#10162a]/80 backdrop-blur-md p-4 sm:p-6 lg:p-7 flex flex-col min-h-[100%] z-10 border border-white/5 before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.08)_0%,transparent_60%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.08)_0%,transparent_60%)] before:animate-move-pattern before:z-0 before:pointer-events-none">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 sm:gap-2">
            <span className="text-blue-400 font-semibold text-xs sm:text-sm lg:text-base font-inter">{item.date}</span>
            <span className="text-blue-300 font-medium text-xs sm:text-sm lg:text-base font-inter">{item.company}</span>
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-extrabold font-inter bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent drop-shadow-md mb-2">
            {item.title}
          </div>
          {item.competences && (
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
              {item.competences.map((comp) => (
                <span
                  key={comp}
                  className="inline-block px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-violet-600 text-xs font-semibold text-white shadow-sm border border-blue-500/30 hover:scale-105 transition-transform font-inter"
                >
                  {comp}
                </span>
              ))}
            </div>
          )}
          <div
            className={`text-white/80 overflow-hidden transition-all duration-800 ease-in-out font-inter text-shadow-sm text-sm sm:text-base ${expanded ? 'max-h-96 opacity-100' : 'max-h-19 opacity-80'}`}
            style={{ position: 'relative' }}
          >
            <span>{expanded || !isLong ? item.description : shortDesc}</span>
            {isLong && (
              <button
                className="ml-2 text-violet-400 underline cursor-pointer text-xs sm:text-sm font-semibold hover:text-violet-300 transition-colors absolute bottom-0 right-0 bg-[#10162a]/80 px-1"
                style={{ zIndex: 2 }}
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "Less" : "Read more"}
              </button>
            )}
          </div>
        </div>
        <style jsx>{`
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
    </div>
  );
};

export default ResumeCard; 