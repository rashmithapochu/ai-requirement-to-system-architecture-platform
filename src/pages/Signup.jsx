import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { KeyRound, Mail, ArrowRight, LayoutTemplate, User } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const login = useStore(state => state.login);
  const navigate = useNavigate();

  const registerUser = useStore(state => state.registerUser);

  const handleSignup = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call authentication
    setTimeout(() => {
      const registeredUsers = useStore.getState().registeredUsers;
      const userExists = registeredUsers.some(u => u.email === email);
      
      if (userExists) {
        alert("Account with this email already exists!");
        setIsSubmitting(false);
        return;
      }

      const newUser = { 
        name: name || email.split('@')[0], 
        email, 
        password, 
        role: 'System Architect' 
      };
      
      registerUser(newUser);
      login(newUser);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="app-layout flex-center" style={{ flexDirection: 'column', backgroundColor: 'var(--bg-dark)' }}>
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ 
          padding: '2.5rem', 
          borderRadius: '16px', 
          width: '100%', 
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div className="flex-center" style={{ marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%' }}>
              <LayoutTemplate size={32} color="var(--primary)" />
            </div>
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Join ArchIntel to start building</p>
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Jane Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="architect@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={{ 
              marginTop: '1rem', 
              width: '100%', 
              justifyContent: 'center', 
              padding: '0.875rem' 
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'} 
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
