import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import type { Project } from '../../types';
import { defaultProjects } from '../../data/projects';
import ProjectCard from './ProjectCard';
import AddProjectModal from './AddProjectModal';
import WordsPullUpMultiStyle from '../animations/WordsPullUpMultiStyle';
import { BGPattern } from '../ui/bg-pattern';

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

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userProjects, setUserProjects] = useState<Project[]>(loadUserProjects);
  const [filter, setFilter] = useState<string>('All');
  const [adminMode, setAdminMode] = useState(false);
  const [toast, setToast] = useState<'on' | 'off' | null>(null);
  const [saveError, setSaveError] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: '-60px' });
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
  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  useEffect(() => {
    setSaveError(!saveUserProjects(userProjects));
  }, [userProjects]);

  const handleAdd = (project: Project) => setUserProjects((prev) => [project, ...prev]);
  const handleDelete = (id: string) => setUserProjects((prev) => prev.filter((p) => p.id !== id));

  return (
    <section id="work" className="relative isolate bg-black py-24 md:py-36 px-4 md:px-6">
      <BGPattern variant="grid" mask="fade-edges" fill="rgba(255,255,255,0.14)" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4">
            Selected work
          </p>
          <div className="text-2xl sm:text-3xl md:text-4xl font-normal">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Projects that', className: 'text-primary' },
                { text: 'speak for themselves.', className: 'font-serif italic text-primary/70' },
              ]}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className="text-xs px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: filter === cat ? '#DEDBC8' : 'rgba(255,255,255,0.03)',
                color: filter === cat ? '#000' : 'rgba(222,219,200,0.6)',
                border: `1px solid ${filter === cat ? 'transparent' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div ref={gridRef} className="space-y-3">
          {featured.length > 0 && (
            <div className={`grid gap-3 ${featured.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {featured.map((project, i) => (
                <div key={project.id} className="relative group/delete">
                  <ProjectCard project={project} index={i} isInView={isInView} size="large" />
                  {adminMode && project.id.startsWith('user-') && (
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="absolute top-4 right-4 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center hover:bg-red-900/50 transition-all duration-200 z-20"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {regular.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {regular.map((project, i) => (
                <div key={project.id} className="relative group/delete">
                  <ProjectCard project={project} index={featured.length + i} isInView={isInView} />
                  {adminMode && project.id.startsWith('user-') && (
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="absolute top-4 right-4 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center hover:bg-red-900/50 transition-all duration-200 z-20"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-primary/60 text-sm">No projects in this category yet.</p>
            </div>
          )}
        </div>
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
            Storage is full — this project won't persist after refresh. Try a smaller video or a URL instead.
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
