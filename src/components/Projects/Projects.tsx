import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ExternalLink, GitBranch } from 'lucide-react';
import type { Project } from '../../types';
import { defaultProjects } from '../../data/projects';
import AddProjectModal from './AddProjectModal';

const STORAGE_KEY = 'sinag_projects';
const SECRET = 'sinag';

function loadUserProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUserProjects(projects: Project[]): boolean {
  const userOnly = projects.filter((p) => p.id.startsWith('user-'));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnly));
    return true;
  } catch {
    // Quota exceeded — usually a base64 video pushed storage over the browser's limit.
    return false;
  }
}

/** Project media — direct video autoplays in view; embeds and images handled too */
function RowMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  const isYouTube =
    project.videoUrl?.includes('youtube.com') || project.videoUrl?.includes('youtu.be');
  const isVimeo = project.videoUrl?.includes('vimeo.com');
  const isDirectVideo = project.videoUrl && !isYouTube && !isVimeo;

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

  if (isDirectVideo && !videoError) {
    return (
      <video
        ref={videoRef}
        src={project.videoUrl}
        muted
        loop
        playsInline
        poster={project.imageUrl}
        className="w-full h-full object-cover"
      />
    );
  }

  if (project.imageUrl) {
    // Classic yellow duotone on hover — photos only, videos stay untouched
    return (
      <div className="relative w-full h-full group/photo">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-[filter] duration-500 group-hover/photo:grayscale group-hover/photo:contrast-110"
        />
        <div className="absolute inset-0 bg-[#E8B816] mix-blend-multiply opacity-0 group-hover/photo:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    );
  }

  return <div className="w-full h-full bg-[#161616]" />;
}

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userProjects, setUserProjects] = useState<Project[]>(loadUserProjects);
  const [filter, setFilter] = useState<string>('All');
  const [adminMode, setAdminMode] = useState(false);
  const [toast, setToast] = useState<'on' | 'off' | null>(null);
  const [saveError, setSaveError] = useState(false);

  const keyBuffer = useRef('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Secret key sequence: type "sinag" anywhere to toggle admin mode
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore when typing inside inputs/textareas
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) return;

      keyBuffer.current = (keyBuffer.current + e.key.toLowerCase()).slice(-SECRET.length);

      if (keyBuffer.current === SECRET) {
        keyBuffer.current = '';
        setAdminMode((prev) => {
          const next = !prev;
          setToast(next ? 'on' : 'off');
          if (toastTimer.current) clearTimeout(toastTimer.current);
          toastTimer.current = setTimeout(() => setToast(null), 2000);
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const allProjects = [...defaultProjects, ...userProjects];
  const categories = ['All', ...Array.from(new Set(allProjects.map((p) => p.category)))];
  const filtered = filter === 'All' ? allProjects : allProjects.filter((p) => p.category === filter);
  // Featured projects lead the journey
  const ordered = [...filtered.filter((p) => p.featured), ...filtered.filter((p) => !p.featured)];

  useEffect(() => {
    setSaveError(!saveUserProjects(userProjects));
  }, [userProjects]);

  const handleAdd = (project: Project) => setUserProjects((prev) => [project, ...prev]);
  const handleDelete = (id: string) => setUserProjects((prev) => prev.filter((p) => p.id !== id));

  return (
    <section
      id="work"
      className="relative isolate pt-4 md:pt-6 pb-6 md:pb-8 px-4 md:px-6"
      style={{ background: '#080807' }}
    >
      {/* Massive full-width title */}
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="-mx-4 md:-mx-6 font-anton font-bold uppercase text-center text-[14vw] leading-[0.9] tracking-normal whitespace-nowrap"
        style={{ color: '#E1E0CC' }}
      >
        Project Journey
      </motion.h2>

      {/* Filter selection */}
      <div className="flex flex-wrap gap-2 mt-12 md:mt-16 mb-4 md:mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className="text-xs px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: filter === cat ? '#DEDBC8' : 'rgba(255,255,255,0.04)',
              color: filter === cat ? '#080807' : 'rgba(222,219,200,0.6)',
              border: `1px solid ${filter === cat ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Journey steps — one row per project */}
      <div className="w-full">
        {ordered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-6 lg:py-0 border-t border-white/[0.08]"
          >
            {/* Step marker — far left, top-aligned */}
            <div className="lg:col-span-2 lg:pt-10">
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary/40 whitespace-nowrap">
                Project &bull; {String(i + 1).padStart(2, '0')}
              </p>
            </div>

            {/* Title + description */}
            <div className="lg:col-span-4 lg:pt-10 lg:pb-10">
              <h3
                className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-5"
                style={{ color: '#E1E0CC' }}
              >
                {project.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-[44ch] mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary/40 border border-white/10 px-3 py-1">
                  {project.category}
                </span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary/60 hover:text-primary transition-colors duration-200"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    Live
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary/60 hover:text-primary transition-colors duration-200"
                  >
                    <GitBranch className="w-3 h-3" />
                    Code
                  </a>
                )}
              </div>
            </div>

            {/* Media */}
            <div className="lg:col-span-6 relative group/delete">
              <div className="aspect-[16/10] overflow-hidden">
                <RowMedia project={project} />
              </div>
              {adminMode && project.id.startsWith('user-') && (
                <button
                  onClick={() => handleDelete(project.id)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center hover:bg-red-900/50 transition-all duration-200 z-20"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {ordered.length === 0 && (
          <div className="py-24 text-center border-t border-white/[0.08]">
            <p className="text-primary/60 text-sm">No projects in this category yet.</p>
          </div>
        )}
      </div>

      {/* View-all teaser — full-bleed row hugging the section bottom */}
      <div className="-mx-4 md:-mx-6 border-t border-white/10 pt-4 md:pt-5 px-4 md:px-6 flex items-center justify-between gap-4 text-primary/40">
        <span className="text-lg sm:text-2xl md:text-4xl font-bold tracking-tight shrink-0">##</span>
        <span className="text-xl sm:text-3xl md:text-5xl font-medium tracking-tight whitespace-nowrap">
          View All Projects
          <sup className="text-[8px] md:text-[11px] font-bold tracking-[0.15em] ml-1">(SOON)</sup>
        </span>
        <span className="text-lg sm:text-2xl md:text-4xl font-medium shrink-0">(&rarr;)</span>
      </div>

      {/* ── Secret admin floating button ── only visible in admin mode */}
      <AnimatePresence>
        {adminMode && (
          <motion.button
            key="admin-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setModalOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: '#DEDBC8',
              boxShadow: '0 0 0 1px rgba(222,219,200,0.2), 0 8px 32px rgba(222,219,200,0.15)',
            }}
            title="Add project (admin)"
          >
            <Plus className="w-6 h-6 text-black" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Toast notification ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-xs"
            style={{
              background: 'rgba(14,14,14,0.95)',
              border: '1px solid rgba(222,219,200,0.1)',
              color: toast === 'on' ? '#DEDBC8' : 'rgba(222,219,200,0.4)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: toast === 'on' ? '#DEDBC8' : '#444' }}
            />
            {toast === 'on' ? 'Admin mode on' : 'Admin mode off'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Storage-full warning ── shown when a project (usually its video) exceeds localStorage quota */}
      <AnimatePresence>
        {saveError && (
          <motion.div
            key="save-error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-xs text-center rounded-xl px-4 py-2.5 text-xs"
            style={{
              background: 'rgba(26,16,10,0.95)',
              border: '1px solid rgba(217,119,6,0.25)',
              color: '#f0b458',
            }}
          >
            Storage is full, so this project won't persist after refresh. Try a smaller video or a URL instead.
          </motion.div>
        )}
      </AnimatePresence>

      <AddProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
      />
    </section>
  );
}
