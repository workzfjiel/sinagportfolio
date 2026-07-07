import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Link, GitBranch, ExternalLink, Play, AlertCircle } from 'lucide-react';
import type { Project } from '../../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Project) => void;
}

type Category = Project['category'];
type MediaTab = 'url' | 'upload';

const CATEGORIES: Category[] = [
  'Landing Page',
  'Web Development',
  'Motion Graphics',
  'Application',
  'Other',
];

// Uploaded video is stored as a base64 string in localStorage, which caps out
// around 5-10MB per origin depending on the browser — keep well under that.
const MAX_VIDEO_BYTES = 8 * 1024 * 1024;

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] text-gray-500 uppercase tracking-widest">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl text-primary text-sm placeholder-gray-700 focus:outline-none focus:border-primary/20 transition-colors duration-200 py-3"
          style={{ paddingLeft: icon ? '2.5rem' : '1rem', paddingRight: '1rem' }}
        />
      </div>
    </div>
  );
}

export default function AddProjectModal({ isOpen, onClose, onAdd }: AddProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Landing Page');
  const [tagsInput, setTagsInput] = useState('');
  const [featured, setFeatured] = useState(false);

  const [imageTab, setImageTab] = useState<MediaTab>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const [videoTab, setVideoTab] = useState<MediaTab>('url');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [videoBase64, setVideoBase64] = useState('');
  const [videoError, setVideoError] = useState('');

  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  const [step, setStep] = useState<'info' | 'media'>('info');

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageBase64(result);
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoFile = (file: File) => {
    if (!file.type.startsWith('video/')) return;
    if (file.size > MAX_VIDEO_BYTES) {
      setVideoError(
        `Video is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Keep uploads under ${MAX_VIDEO_BYTES / (1024 * 1024)}MB, or use a URL instead.`
      );
      return;
    }
    setVideoError('');
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setVideoBase64(result);
      setVideoPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageFile(file);
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleVideoFile(file);
  };

  const finalImageUrl = imageTab === 'url' ? imageUrl : imageBase64;
  const finalVideoUrl = videoTab === 'url' ? videoUrl : videoBase64;

  const handleSubmit = () => {
    if (!title.trim()) return;
    const project: Project = {
      id: `user-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured,
      imageUrl: finalImageUrl || undefined,
      videoUrl: finalVideoUrl || undefined,
      githubUrl: githubUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
    };
    onAdd(project);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('Landing Page');
    setTagsInput('');
    setFeatured(false);
    setImageTab('url');
    setImageUrl('');
    setImageBase64('');
    setImagePreview('');
    setVideoTab('url');
    setVideoUrl('');
    setVideoPreview('');
    setVideoBase64('');
    setVideoError('');
    setGithubUrl('');
    setLiveUrl('');
    setStep('info');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0e0e0e] border border-white/5 rounded-2xl md:rounded-[1.5rem] w-full max-w-xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-primary font-medium text-base md:text-lg">Add Project</h2>
                <p className="text-gray-600 text-xs mt-0.5">
                  {step === 'info' ? 'Project details' : 'Media & links'}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Step tabs */}
            <div className="flex gap-1 p-6 pb-0 mt-4">
              {(['info', 'media'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className="flex-1 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                  style={{
                    background: step === s ? '#DEDBC8' : 'transparent',
                    color: step === s ? '#080807' : '#6b7280',
                    border: step === s ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {s === 'info' ? 'Project Info' : 'Media & Links'}
                </button>
              ))}
            </div>

            {/* Form body */}
            <div className="p-6 space-y-5">
              {step === 'info' ? (
                <>
                  <InputField
                    label="Project Title"
                    value={title}
                    onChange={setTitle}
                    placeholder="e.g. Noir Fashion Landing Page"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of the project..."
                      rows={3}
                      className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl text-primary text-sm placeholder-gray-700 focus:outline-none focus:border-primary/20 transition-colors duration-200 px-4 py-3 resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl text-primary text-sm focus:outline-none focus:border-primary/20 transition-colors duration-200 px-4 py-3 appearance-none cursor-pointer"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c} className="bg-[#1a1a1a]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <InputField
                    label="Tags (comma-separated)"
                    value={tagsInput}
                    onChange={setTagsInput}
                    placeholder="React, TypeScript, GSAP"
                  />

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setFeatured(!featured)}
                      className="w-10 h-5 rounded-full transition-colors duration-200 relative shrink-0"
                      style={{ background: featured ? '#DEDBC8' : '#2a2a2a' }}
                    >
                      <div
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-black transition-transform duration-200"
                        style={{ left: featured ? '1.375rem' : '0.125rem' }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      Mark as featured project
                    </span>
                  </label>
                </>
              ) : (
                <>
                  {/* Image section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest">
                        Project Image
                      </label>
                      <div className="flex gap-1">
                        {(['url', 'upload'] as MediaTab[]).map((t) => (
                          <button
                            key={t}
                            onClick={() => setImageTab(t)}
                            className="text-[10px] px-3 py-1 rounded-full transition-all duration-200"
                            style={{
                              background: imageTab === t ? 'rgba(222,219,200,0.1)' : 'transparent',
                              color: imageTab === t ? '#DEDBC8' : '#6b7280',
                              border: '1px solid',
                              borderColor: imageTab === t ? 'rgba(222,219,200,0.15)' : 'rgba(255,255,255,0.05)',
                            }}
                          >
                            {t === 'url' ? <Link className="w-2.5 h-2.5 inline mr-1" /> : <Upload className="w-2.5 h-2.5 inline mr-1" />}
                            {t === 'url' ? 'URL' : 'Upload'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {imageTab === 'url' ? (
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                          setImagePreview(e.target.value);
                        }}
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl text-primary text-sm placeholder-gray-700 focus:outline-none focus:border-primary/20 transition-colors duration-200 px-4 py-3"
                      />
                    ) : (
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleImageDrop}
                        onClick={() => imageInputRef.current?.click()}
                        className="w-full bg-[#1a1a1a] border border-dashed border-white/10 rounded-xl py-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/20 transition-colors duration-200"
                      >
                        <Upload className="w-5 h-5 text-gray-600" />
                        <p className="text-xs text-gray-600">Click or drag image here</p>
                        <p className="text-[10px] text-gray-700">PNG, JPG, WEBP</p>
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                        />
                      </div>
                    )}

                    {imagePreview && (
                      <div className="relative h-32 rounded-xl overflow-hidden bg-[#1a1a1a]">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={() => setImagePreview('')}
                        />
                        <button
                          onClick={() => { setImagePreview(''); setImageBase64(''); setImageUrl(''); }}
                          className="absolute top-2 right-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center hover:bg-black"
                        >
                          <X className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Video section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest">
                        Video Demo
                      </label>
                      <div className="flex gap-1">
                        {(['url', 'upload'] as MediaTab[]).map((t) => (
                          <button
                            key={t}
                            onClick={() => setVideoTab(t)}
                            className="text-[10px] px-3 py-1 rounded-full transition-all duration-200"
                            style={{
                              background: videoTab === t ? 'rgba(222,219,200,0.1)' : 'transparent',
                              color: videoTab === t ? '#DEDBC8' : '#6b7280',
                              border: '1px solid',
                              borderColor: videoTab === t ? 'rgba(222,219,200,0.15)' : 'rgba(255,255,255,0.05)',
                            }}
                          >
                            {t === 'url' ? <Link className="w-2.5 h-2.5 inline mr-1" /> : <Upload className="w-2.5 h-2.5 inline mr-1" />}
                            {t === 'url' ? 'URL' : 'Upload'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {videoTab === 'url' ? (
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => { setVideoUrl(e.target.value); setVideoPreview(''); }}
                        placeholder="YouTube, Vimeo, or direct .mp4 URL"
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl text-primary text-sm placeholder-gray-700 focus:outline-none focus:border-primary/20 transition-colors duration-200 px-4 py-3"
                      />
                    ) : (
                      <>
                        <div className="flex items-start gap-2 bg-[#1a1a0a] border border-yellow-900/20 rounded-xl px-4 py-3">
                          <AlertCircle className="w-3.5 h-3.5 text-yellow-700 mt-0.5 shrink-0" />
                          <p className="text-[10px] text-yellow-800 leading-relaxed">
                            Keep uploads under {MAX_VIDEO_BYTES / (1024 * 1024)}MB for reliable saving. For larger files, use a URL instead.
                          </p>
                        </div>
                        {videoError && (
                          <p className="text-[10px] text-red-500 leading-relaxed">{videoError}</p>
                        )}
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleVideoDrop}
                          onClick={() => videoInputRef.current?.click()}
                          className="w-full bg-[#1a1a1a] border border-dashed border-white/10 rounded-xl py-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/20 transition-colors duration-200"
                        >
                          <Play className="w-5 h-5 text-gray-600" />
                          <p className="text-xs text-gray-600">Click or drag video here</p>
                          <p className="text-[10px] text-gray-700">MP4, MOV, WEBM</p>
                          <input
                            ref={videoInputRef}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handleVideoFile(e.target.files[0])}
                          />
                        </div>
                        {videoPreview && (
                          <div className="relative h-32 rounded-xl overflow-hidden bg-[#1a1a1a]">
                            <video
                              src={videoPreview}
                              muted
                              autoPlay
                              loop
                              playsInline
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => { setVideoPreview(''); setVideoBase64(''); }}
                              className="absolute top-2 right-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center hover:bg-black"
                            >
                              <X className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Links */}
                  <InputField
                    label="GitHub URL"
                    value={githubUrl}
                    onChange={setGithubUrl}
                    placeholder="https://github.com/username/repo"
                    icon={<GitBranch className="w-3.5 h-3.5" />}
                  />

                  <InputField
                    label="Live URL"
                    value={liveUrl}
                    onChange={setLiveUrl}
                    placeholder="https://myproject.com"
                    icon={<ExternalLink className="w-3.5 h-3.5" />}
                  />
                </>
              )}
            </div>

            {/* Footer actions */}
            <div className="p-6 pt-0 flex gap-3">
              {step === 'info' ? (
                <>
                  <button
                    onClick={handleClose}
                    className="flex-1 py-3 rounded-xl text-sm text-gray-500 border border-white/5 hover:border-white/10 hover:text-gray-400 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep('media')}
                    disabled={!title.trim()}
                    className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ background: '#DEDBC8', color: '#080807' }}
                  >
                    Next: Media
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setStep('info')}
                    className="flex-1 py-3 rounded-xl text-sm text-gray-500 border border-white/5 hover:border-white/10 hover:text-gray-400 transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{ background: '#DEDBC8', color: '#080807' }}
                  >
                    Add Project
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
