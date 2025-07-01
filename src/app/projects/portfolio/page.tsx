import Image from "next/image";
import Link from "next/link";

const project = {
  title: "Portfolio Website",
  images: [
    "/project1-1.png",
    "/project1-2.png",
    "/project1-3.png",
  ],
  tech: ["Next.js", "React", "Tailwind CSS", "Docker"],
  description:
    "A modern portfolio website built with Next.js, React, and Tailwind CSS. Features a dynamic project showcase, responsive design, and beautiful gradients.",
  github: "https://github.com/yourusername/portfolio",
};

export default function PortfolioProjectPage() {
  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden bg-[#0a1020] pb-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back button */}
        <Link href="/" className="inline-block mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold shadow-md hover:scale-105 transition-transform">
          ← Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-violet-400">{project.title}</h1>
        {/* Images */}
        <div className="flex gap-4 overflow-x-auto mb-8">
          {project.images.map((img, i) => (
            <div key={i} className="min-w-[220px] h-[160px] rounded-xl overflow-hidden bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end flex items-center justify-center shadow-lg">
              <Image src={img} alt={project.title + " image " + (i + 1)} width={220} height={160} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
        {/* Tech stack */}
        <div className="mb-6 flex flex-wrap gap-3">
          {project.tech.map((tech) => (
            <span key={tech} className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-violet-600 text-xs font-semibold text-white shadow-sm border border-blue-500/30 hover:scale-105 transition-transform">
              {tech}
            </span>
          ))}
        </div>
        {/* Description */}
        <div className="mb-8 text-white/90 text-lg leading-relaxed bg-[#10162a]/80 rounded-xl p-6 shadow-md">
          {project.description}
        </div>
        {/* GitHub link */}
        <Link href={project.github} target="_blank" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
          </svg>
          View on GitHub
        </Link>
        {/* Bottom Back button */}
        <div className="mt-12">
          <Link href="/" className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold shadow-md hover:scale-105 transition-transform">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 