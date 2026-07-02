import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, ExternalLink, Play } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  size?: 'large' | 'normal';
  isAdmin?: boolean;
}

export default function ProjectCard({ project, index, isInView, size = 'normal' }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isYouTube = project.videoUrl?.includes('youtube.com') || project.videoUrl?.includes('youtu.be');
  const isVimeo = project.videoUrl?.includes('vimeo.com');
  const isDirectVideo = project.videoUrl && !isYouTube && !isVimeo;

  // Autoplay video as soon as the card enters view
  useEffect(() => {
    if (!videoRef.current || !isDirectVideo || videoError) return;
    const el = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => setVideoError(true));
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isDirectVideo, videoError]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({ rotateX: ((y - cy) / cy) * -5, rotateY: ((x - cx) / cx) * 5 });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden bg-[#101010] ${
        size === 'large' ? 'aspect-[16/9] md:aspect-[2/1]' : 'aspect-[4/3]'
      }`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${isHovered ? 'scale(1.015)' : 'scale(1)'}`,
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ── Media layer ── */}
      {isDirectVideo && !videoError ? (
        <video
          ref={videoRef}
          src={project.videoUrl}
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.04)' : 'scale(1)' }}
        />
      ) : project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
        />
      ) : (
        <div className="absolute inset-0 bg-[#181818] flex items-center justify-center">
          {project.videoUrl && (isYouTube || isVimeo) && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-200"
            >
              <Play className="w-5 h-5 text-primary ml-0.5" />
            </a>
          )}
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          opacity: isHovered ? 1 : 0.82,
        }}
      />

      {/* Glare */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(222,219,200,0.05) 0%, transparent 55%)`,
          opacity: isHovered ? 1 : 0,
          zIndex: 5,
        }}
      />

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] text-primary/70 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 tracking-wide">
          {project.category}
        </span>
      </div>

      {/* Live video badge */}
      {isDirectVideo && !videoError && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] text-primary/60 tracking-wide">LIVE</span>
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-light rounded-full px-2.5 py-0.5"
              style={{
                background: 'rgba(0,0,0,0.75)',
                color: 'rgba(222,219,200,0.75)',
                border: '1px solid rgba(222,219,200,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          className="text-primary font-medium leading-tight"
          style={{ fontSize: size === 'large' ? '1.25rem' : '1rem' }}
        >
          {project.title}
        </h3>

        {/* Description slides up on hover */}
        <div
          className="overflow-hidden"
          style={{
            maxHeight: isHovered ? '80px' : '0',
            opacity: isHovered ? 1 : 0,
            transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s',
          }}
        >
          <p className="text-gray-400 text-xs leading-relaxed mt-2 mb-3">
            {project.description}
          </p>
        </div>

        {/* Links */}
        <div
          className="flex items-center gap-3 mt-1"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.3s, transform 0.3s',
          }}
        >
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] text-primary/70 hover:text-primary transition-colors duration-200"
            >
              <GitBranch className="w-3 h-3" />
              <span>GitHub</span>
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] text-primary/70 hover:text-primary transition-colors duration-200"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live</span>
            </a>
          )}
          {project.videoUrl && (isYouTube || isVimeo) && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] text-primary/70 hover:text-primary transition-colors duration-200"
            >
              <Play className="w-3 h-3" />
              <span>Watch</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
