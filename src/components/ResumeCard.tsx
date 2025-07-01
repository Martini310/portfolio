import React, { useState, useRef } from "react";

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
  const isLong = words.length > 50;
  const shortDesc = isLong ? words.slice(0, 50).join(" ") + "..." : item.description;
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
    <div className="flex items-stretch gap-6">
      {/* Timeline */}
      <div className="flex flex-col items-center min-w-[40px]">
        <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-violet-500' : 'bg-blue-500'} border-4 border-[#10162a] shadow-lg z-10`}></div>
        {!isLast && (
          <div className="w-1 flex-1 bg-gradient-to-b from-violet-500 to-blue-500 my-1" style={{ minHeight: '48px' }}></div>
        )}
      </div>
      {/* Card Content */}
      <div
        ref={cardRef}
        className="resume-card flex-1 bg-[#10162a]/80 rounded-2xl p-8 shadow-md border border-transparent transition-all duration-200 group-hover:shadow-violet-500/30 group-hover:border-violet-500/40"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          const card = cardRef.current;
          if (card) {
            card.style.setProperty('--x', '50%');
            card.style.setProperty('--y', '50%');
          }
        }}
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
          <span className="text-blue-400 font-semibold text-sm md:text-base">{item.date}</span>
          <span className="text-blue-300 font-medium text-xs md:text-base">{item.company}</span>
        </div>
        <div className="text-lg font-bold mb-2 text-violet-200">{item.title}</div>
        {item.competences && (
          <div className="flex flex-wrap gap-2 mb-3">
            {item.competences.map((comp) => (
              <span
                key={comp}
                className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-violet-600 text-xs font-semibold text-white shadow-sm border border-blue-500/30 hover:scale-105 transition-transform"
              >
                {comp}
              </span>
            ))}
          </div>
        )}
        <div
          className={`text-white/80 overflow-hidden transition-all duration-800 ease-in-out ${expanded ? 'max-h-96 opacity-100' : 'max-h-19 opacity-80'}`}
          style={{ position: 'relative' }}
        >
          <span>{expanded || !isLong ? item.description : shortDesc}</span>
          {isLong && (
            <button
              className="ml-2 text-violet-400 underline cursor-pointer text-sm font-semibold hover:text-violet-300 transition-colors absolute bottom-0 right-0 bg-[#10162a]/80 px-1"
              style={{ zIndex: 2 }}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeCard; 