import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // Mock User
      user: null,
      justLoggedIn: false,
      registeredUsers: [],
      
      // Projects state
      projects: [
        { id: '1', name: 'E-commerce Microservices', description: 'Scalable backend with payment gateway', updatedAt: '2 hours ago' },
        { id: '2', name: 'Real-time Analytics Pipeline', description: 'Data ingestion and processing', updatedAt: '1 day ago' }
      ],
      
      // Active editing state
      currentProject: null,
      
      // AI Prompt State
      aiHistory: [],
      
      // Theme State
      theme: 'dark',
      
      // Actions
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      login: (user) => set({ user, justLoggedIn: true }),
      updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
      logout: () => set({ user: null, currentProject: null, justLoggedIn: false }),
      clearLoginFlag: () => set({ justLoggedIn: false }),
      registerUser: (newUser) => set((state) => ({ 
        registeredUsers: [...state.registeredUsers, newUser] 
      })),
      
      addProject: (project) => set((state) => {
        // Prevent duplicate entries due to React StrictMode
        if (state.projects.some(p => p.id === project.id)) return state;
        return { projects: [project, ...state.projects] };
      }),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...updates, updatedAt: 'Just now' } : p)
      })),
      removeProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id)
      })),
      setCurrentProject: (id) => set((state) => ({ 
        currentProject: state.projects.find(p => p.id === id) || null 
      })),
      
      addAiMessage: (message) => set((state) => ({ 
        aiHistory: [...state.aiHistory, message] 
      })),
      clearAiHistory: () => set({ aiHistory: [] })
    }),
    {
      name: 'archintel-storage', // unique name
    }
  )
);
