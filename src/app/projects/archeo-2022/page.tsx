"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";

const project = {
  title: "Archeo 2022",
  description: `Tkinter desktop app replacing a paper register for managing and tracking documents from company archive resources. Stores case details, comments, transfer dates, and responsible persons. Designed to bring office record-keeping into the 21st century.`,
  tech: ["Python 3.10.5", "SQLite 3.37.2", "Tkinter"],
  features: [
    "Operator selection unlocks all widgets.",
    "Keeps records of file transfers, returns, and responsible persons.",
    "Search engine for quick lookup.",
    "Copy to clipboard from table view (Ctrl+C or right click).",
    "Customizable DB path for 'kierowca' localization.",
    "Checkbox for files not to be returned to archive."
  ],
  images: [
    "/archeo-2022/1.png",
    "/archeo-2022/2.png",
    "/archeo-2022/3.png",
    "/archeo-2022/4.png"
  ],
  github: "https://github.com/Martini310/Archeo2022"
};

export default function Archeo2022ProjectPage() {
  const [lightbox, setLightbox] = useState<null | number>(null);
  const total = project.images.length;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [lightbox]);

  const prevImg = useCallback(() => {
    setLightbox((idx) => (idx === null ? 0 : (idx + total - 1) % total));
  }, [total]);
  const nextImg = useCallback(() => {
    setLightbox((idx) => (idx === null ? 0 : (idx + 1) % total));
  }, [total]);

  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden bg-[#0a1020] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link href="/" className="inline-block mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold shadow-md hover:scale-105 transition-transform text-sm sm:text-base">
          ← Back to Home
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-violet-400">{project.title}</h1>
        <div className="mb-6 text-white/90 text-base sm:text-lg leading-relaxed bg-[#10162a]/80 rounded-xl p-4 sm:p-6 shadow-md">
          {project.description}
        </div>
        <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
          {project.tech.map((tech) => (
            <span key={tech} className="inline-block px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-violet-600 text-xs font-semibold text-white shadow-sm border border-blue-500/30 hover:scale-105 transition-transform">
              {tech}
            </span>
          ))}
        </div>
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-blue-300">Application View</h2>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
            {project.images.map((img, i) => (
              <button
                key={i}
                className="min-w-[180px] sm:min-w-[220px] h-[120px] sm:h-[160px] rounded-xl overflow-hidden bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                onClick={() => setLightbox(i)}
                aria-label="Open image in lightbox"
                type="button"
              >
                <Image src={img} alt={project.title + " screenshot " + (i + 1)} width={220} height={160} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        </div>
        {/* Lightbox Modal */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <div className="relative max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <button
                className="absolute -top-12 sm:-top-10 -right-8 sm:-right-13 text-white bg-gray-600/60 rounded-full p-2 hover:bg-gray-600/80 transition z-10"
                onClick={() => setLightbox(null)}
                aria-label="Close lightbox"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
              {/* Left arrow */}
              <button
                className="absolute -left-8 sm:-left-14 top-1/2 -translate-y-1/2 text-white bg-gray-600/60 rounded-full p-2 hover:bg-gray-600/80 transition z-10"
                onClick={prevImg}
                aria-label="Previous image"
                tabIndex={0}
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </button>
              {/* Right arrow */}
              <button
                className="absolute -right-8 sm:-right-14 top-1/2 -translate-y-1/2 text-white bg-gray-600/60 rounded-full p-2 hover:bg-gray-600/80 transition z-10"
                onClick={nextImg}
                aria-label="Next image"
                tabIndex={0}
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <Image
                src={project.images[lightbox]}
                alt={project.title + " large screenshot " + (lightbox + 1)}
                width={900}
                height={600}
                className="rounded-xl object-contain max-h-[70vh] sm:max-h-[80vh] w-auto h-auto shadow-2xl"
                priority
              />
              {/* Image counter for mobile */}
              <div className="mt-4 text-white text-sm sm:text-base">
                {lightbox + 1} / {total}
              </div>
            </div>
          </div>
        )}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-blue-300">Key Features</h2>
          <ul className="list-disc list-inside text-white/80 space-y-1 text-sm sm:text-base">
            {project.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <Link href={project.github} target="_blank" className="inline-block px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
            </svg>
            View on GitHub
          </Link>
        </div>
        <div className="mt-12">
          <Link href="/" className="inline-block px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold shadow-md hover:scale-105 transition-transform text-sm sm:text-base">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 