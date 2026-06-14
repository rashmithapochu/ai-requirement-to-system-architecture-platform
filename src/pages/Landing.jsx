import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, LayoutGrid, Zap, Move, MousePointerClick, Users, Download, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Landing() {
  const navigate = useNavigate();
  const user = useStore(state => state.user);

  return (
    <div className="app-layout flex-center" style={{ flexDirection: 'column', padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '4rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div className="glass-panel" style={{ padding: '1rem', borderRadius: '50%' }}>
            <BrainCircuit size={48} color="var(--primary)" />
          </div>
        </div>
        
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #f4f4f5, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI-Powered Requirement-to-System Architecture Intelligence
        </h1>
        
        <p style={{ fontSize: '1.25rem', marginBottom: '3rem', color: 'var(--text-muted)' }}>
          Transform natural language software requirements into detailed, production-ready system architectures instantly.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            onClick={() => navigate(user ? '/dashboard' : '/login')} 
            style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
          >
            {user ? 'Go to Dashboard' : 'Get Started'} <ArrowRight size={18} />
          </button>
          <button className="secondary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
            View Demo
          </button>
        </div>
      </motion.div>

      {/* Feature Section Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Key Features of Output Display</h2>
        <p style={{ color: 'var(--text-muted)' }}>Experience a comprehensive, fluid architectural environment.</p>
      </motion.div>

      {/* 6 Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1200px' }}>
        <motion.div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <LayoutGrid size={28} color="var(--accent)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Auto Layout Engine</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Automatically arranges components neatly and avoids overlapping nodes.</p>
        </motion.div>

        <motion.div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Zap size={28} color="var(--warning)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Real-Time Rendering</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Output appears instantly after generation without loading spinners.</p>
        </motion.div>

        <motion.div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Move size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Infinite Canvas</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>You can zoom, pan, and expand freely across an unbounded workspace.</p>
        </motion.div>

        <motion.div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <MousePointerClick size={28} color="var(--success)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Interactive Elements</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Click, move, and rapidly resize microservice components manually.</p>
        </motion.div>

        <motion.div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Users size={28} color="#ec4899" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Collaboration</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Share and edit architectures seamlessly with your team in real time.</p>
        </motion.div>

        <motion.div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Download size={28} color="#0ea5e9" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Export Options</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Export your workspace as an image, direct link, or raw JSON documentation.</p>
        </motion.div>
      </div>
    </div>
  );
}
