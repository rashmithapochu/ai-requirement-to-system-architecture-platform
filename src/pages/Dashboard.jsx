import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Plus, LayoutTemplate, Clock, LayoutGrid, User, LogOut, Trash2, Edit2, Sun, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';

export default function Dashboard() {
  const { user, projects, logout, removeProject, updateProject, justLoggedIn, clearLoginFlag, updateUser, theme, toggleTheme } = useStore();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editRole, setEditRole] = useState(user?.role || "");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const welcomePlayed = useRef(false);

  // Play welcome experience on successful login
  useEffect(() => {
    if (justLoggedIn && !welcomePlayed.current) {
      welcomePlayed.current = true;
      
      // Flush any queued ghost echoes from React StrictMode
      window.speechSynthesis.cancel();

      // 1. Visual blast (Confetti)
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#ffffff']
      });

      // 2. Voice Message 
      const msg = new SpeechSynthesisUtterance("Welcome to AI Architecture Generator! Let’s begin");
      msg.rate = 1.0;
      window.speechSynthesis.speak(msg);

      clearLoginFlag();
    }
  }, [justLoggedIn, clearLoginFlag]);

  const handleCreateProject = () => {
    // Generate a random ID for the mock
    const id = Math.random().toString(36).substr(2, 9);
    navigate(`/editor/${id}`);
  };

  const handleSaveProfile = () => {
    updateUser({ name: editName, role: editRole });
    setShowSettingsModal(false);
  };

  return (
    <div className="app-layout" style={{ flexDirection: 'column' }}>
      {/* Top Navbar */}
      <header className="glass-panel flex-between" style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border-subtle)', zIndex: 10 }}>
        <div className="flex-center" style={{ gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <LayoutGrid color="var(--primary)" />
          <span style={{ fontWeight: '600', fontSize: '1.25rem' }}>ArchIntel Platform</span>
        </div>
        <div className="flex-center" style={{ gap: '1.5rem' }}>
          <button className="secondary" style={{ padding: '0.5rem', border: 'none', borderRadius: '50%' }} onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div style={{ position: 'relative' }}>
            <div className="flex-center" style={{ gap: '1rem', cursor: 'pointer' }} onClick={() => setShowProfile(!showProfile)}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{user.role}</span>
            <div className="flex-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary)', fontWeight: 'bold' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          
          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="glass-panel"
                style={{ 
                  position: 'absolute', top: '120%', right: 0, 
                  padding: '1rem', minWidth: '200px', 
                  display: 'flex', flexDirection: 'column', gap: '0.75rem',
                  borderRadius: '12px'
                }}
              >
                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '0.25rem' }}>
                  <div style={{ fontWeight: 600 }}>{user.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.role}</div>
                </div>
                <button className="secondary" style={{ justifyContent: 'flex-start', padding: '0.5rem', border: 'none' }} onClick={() => { setShowSettingsModal(true); setShowProfile(false); }}>
                  <User size={16} /> Profile Settings
                </button>
                <button className="secondary" style={{ justifyContent: 'flex-start', padding: '0.5rem', border: 'none', color: 'var(--danger)' }} onClick={() => { logout(); navigate('/'); }}>
                  <LogOut size={16} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="flex-center" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, backdropFilter: 'blur(4px)' }}>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel"
              style={{ width: '400px', padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Profile Settings</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Display Name</label>
                <input 
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Role</label>
                <input 
                  value={editRole}
                  onChange={e => setEditRole(e.target.value)}
                  placeholder="e.g. Lead Architect"
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button className="secondary" style={{ flex: 1 }} onClick={() => setShowSettingsModal(false)}>Cancel</button>
                <button style={{ flex: 1, backgroundColor: 'var(--primary)' }} onClick={handleSaveProfile}>Save Changes</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main style={{ padding: '4rem', flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div className="flex-between" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Your Architectures</h2>
            <button onClick={handleCreateProject} style={{ padding: '0.8rem 1.5rem', fontSize: '1.05rem' }}>
              <Plus size={20} /> New Project
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '3rem' }}>
            {projects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/editor/${project.id}`)}
                className="glass-panel hover-glow"
                style={{ 
                  padding: '2rem', 
                  borderRadius: '16px', 
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, box-shadow 0.2s',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                whileHover={{ y: -6, borderColor: 'var(--primary)', boxShadow: '0 10px 40px rgba(99, 102, 241, 0.15)' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px' }}>
                    <LayoutTemplate color="var(--primary)" size={28} />
                  </div>
                  
                  {editingId === project.id ? (
                    <input 
                      autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.stopPropagation();
                          if (editValue.trim()) updateProject(project.id, { name: editValue });
                          setEditingId(null);
                        } else if (e.key === 'Escape') {
                          e.stopPropagation();
                          setEditingId(null);
                        }
                      }}
                      onBlur={() => setEditingId(null)}
                      style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '1.4rem', margin: 0, marginTop: '-0.25rem' }}
                    />
                  ) : (
                    <h3 style={{ fontSize: '1.4rem', flex: 1, lineHeight: '1.3' }}>{project.name}</h3>
                  )}

                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button 
                      className="secondary" 
                      style={{ padding: '0.4rem', border: 'none', color: 'var(--text-muted)' }}
                      title="Edit Name"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(project.id);
                        setEditValue(project.name);
                      }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="secondary" 
                      style={{ padding: '0.4rem', border: 'none', color: 'var(--text-muted)' }}
                      title="Delete Project"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProject(project.id);
                      }}
                    >
                      <Trash2 size={16} color="var(--danger)" />
                    </button>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', height: '40px' }}>
                  {project.description}
                </p>
                <div className="flex-between" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <div className="flex-center" style={{ gap: '0.4rem' }}>
                    <Clock size={14} /> Edited {project.updatedAt}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
