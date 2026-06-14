import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, ReactFlowProvider, useReactFlow, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ArrowLeft, Save, Download, Send, Bot, User, Code2, Trash2, Image as ImageIcon, Mic, Sun, Moon, Edit2, Copy, ArrowDown } from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useStore } from '../store/useStore';
import { nodeTypes } from '../components/Canvas/CustomNodes';
import { analyzePromptAndGenerateArchitecture } from '../utils/aiMock';

const initialNodes = [];
const initialEdges = [];

function ViewportController({ nodes }) {
  const { fitView } = useReactFlow();
  
  useEffect(() => {
    // Whenever nodes change entirely (like after AI generation), auto fit the screen smoothly!
    const timer = setTimeout(() => {
      fitView({ padding: 0.2, duration: 800 });
    }, 100);
    return () => clearTimeout(timer);
  }, [nodes, fitView]);
  return null;
}

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { aiHistory, addAiMessage, projects, addProject, updateProject, removeProject, theme, toggleTheme } = useStore();
  const [prompt, setPrompt] = useState('');
  
  const existingProject = projects.find(p => p.id === id);
  const isNew = !existingProject;
  
  const [projectName, setProjectName] = useState(existingProject ? existingProject.name : `Draft Architecture #${id.slice(0, 4)}`);
  
  const chatScrollRef = React.useRef(null);
  const handleScrollToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };
  
  const initNodes = existingProject?.nodes?.length ? existingProject.nodes : (isNew ? [] : initialNodes);
  const initEdges = existingProject?.edges?.length ? existingProject.edges : (isNew ? [] : initialEdges);

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  useEffect(() => {
    if (isNew) {
      addProject({
        id,
        name: `Draft Architecture #${id.slice(0, 4)}`,
        description: 'New dynamic layout based on text prompt',
        updatedAt: 'Just now'
      });
    }
  }, [id, isNew, addProject]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'var(--primary)', strokeWidth: 2 } }, eds)), [setEdges]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    const currentPrompt = prompt;
    if (!currentPrompt.trim()) return;
    
    addAiMessage({ role: 'user', content: currentPrompt });
    setPrompt('');
    
    addAiMessage({ id: 'thinking', role: 'system', content: 'Connecting to AI model to generate custom architecture... (Takes ~5 seconds)' });

    try {
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentPrompt, existingNodes: nodes, existingEdges: edges })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        addAiMessage({ role: 'system', content: result.message || 'Updated the architecture successfully!' });

        // Enhance edges with clear solid paths so arrows look distinct
        const formatEdges = (eds) => eds.map(edge => ({
          ...edge,
          type: 'smoothstep', // Using smoothstep for an orthogonal, formal, presentation-ready enterprise flowchart look
          animated: false,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 15,
            height: 15,
            color: edge.style && edge.style.stroke ? edge.style.stroke : '#64748b',
          },
          style: { ...edge.style, strokeDasharray: 'none', strokeWidth: 2, opacity: 1, stroke: edge.style?.stroke === '#888' ? '#94a3b8' : (edge.style?.stroke || '#94a3b8') }
        }));
        let newNodes = result.nodes || [];

        if (result.replace) {
          setNodes(newNodes);
          setEdges(formatEdges(result.edges || []));
        } else {
          setNodes((nds) => [...nds, ...newNodes]);
          setEdges((eds) => [...eds, ...formatEdges(result.edges || [])]);
        }
      } else {
        // Fallback to local mock generator
        const mockResult = analyzePromptAndGenerateArchitecture(currentPrompt, nodes, edges);
        addAiMessage({ role: 'system', content: `⚠️ Failed using live AI (Quota/Error). Falling back to local template generator...\n\n${mockResult.message}` });
        
        const formatEdges = (eds) => eds.map(edge => ({
          ...edge,
          type: 'smoothstep',
          animated: false,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 15,
            height: 15,
            color: edge.style && edge.style.stroke ? edge.style.stroke : '#64748b',
          },
          style: { ...edge.style, strokeDasharray: 'none', strokeWidth: 2, opacity: 1, stroke: edge.style?.stroke === '#888' ? '#94a3b8' : (edge.style?.stroke || '#94a3b8') }
        }));

        if (mockResult.replace) {
          setNodes(mockResult.nodes || []);
          setEdges(formatEdges(mockResult.edges || []));
        } else {
          setNodes((nds) => [...nds, ...(mockResult.nodes || [])]);
          setEdges((eds) => [...eds, ...formatEdges(mockResult.edges || [])]);
        }
      }
    } catch (err) {
      // Offline totally
      const mockResult = analyzePromptAndGenerateArchitecture(currentPrompt, nodes, edges);
      addAiMessage({ role: 'system', content: `🔌 Network Error. Falling back to local template generator...\n\n${mockResult.message}` });
      
      const formatEdges = (eds) => eds.map(edge => ({
        ...edge,
        type: 'smoothstep',
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 15,
          height: 15,
          color: edge.style && edge.style.stroke ? edge.style.stroke : '#64748b',
        },
        style: { ...edge.style, strokeDasharray: 'none', strokeWidth: 2, opacity: 1, stroke: edge.style?.stroke === '#888' ? '#94a3b8' : (edge.style?.stroke || '#94a3b8') }
      }));

      if (mockResult.replace) {
        setNodes(mockResult.nodes || []);
        setEdges(formatEdges(mockResult.edges || []));
      } else {
        setNodes((nds) => [...nds, ...(mockResult.nodes || [])]);
        setEdges((eds) => [...eds, ...formatEdges(mockResult.edges || [])]);
      }
    }
  };

  const handleClearCanvas = () => {
    setNodes([]);
    setEdges([]);
  };

  const handleSaveProject = () => {
    updateProject(id, { nodes, edges, name: projectName });
    addAiMessage({ role: 'system', content: 'Architecture saved to project history successfully.' });
  };

  const handleDeleteProject = () => {
    removeProject(id);
    navigate('/dashboard');
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, edges }, null, 2));
    const anchor = document.createElement('a');
    anchor.href = dataStr;
    anchor.download = `architecture-${id}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    addAiMessage({ role: 'system', content: 'JSON code scaffolding exported.' });
  };

  const handleExportPDF = async () => {
    const flowElement = document.querySelector('.react-flow');
    if (!flowElement) {
      addAiMessage({ role: 'system', content: 'Failed to locate canvas element for PDF generation.' });
      return;
    }

    addAiMessage({ role: 'system', content: 'Exporting High-Resolution PDF...' });

    try {
      const { offsetWidth, offsetHeight } = flowElement;
      
      const dataUrl = await toPng(flowElement, {
        backgroundColor: '#09090b',
        pixelRatio: 2,
        width: offsetWidth,
        height: offsetHeight,
        style: {
          width: `${offsetWidth}px`,
          height: `${offsetHeight}px`
        },
        filter: (node) => {
          if (node?.classList?.contains('react-flow__minimap') || node?.classList?.contains('react-flow__controls')) {
            return false;
          }
          return true;
        }
      });

      const pdf = new jsPDF({
        orientation: offsetWidth > offsetHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [offsetWidth, offsetHeight]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, offsetWidth, offsetHeight);
      pdf.save(`architecture-${id}.pdf`);
      
      addAiMessage({ role: 'system', content: 'PDF downloaded successfully!' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      addAiMessage({ role: 'system', content: 'There was an error generating the PDF. Please try again.' });
    }
  };

  return (
    <div className="app-layout">
      {/* Premium Antigravity Sidebar Interface */}
      <div className="sidebar" style={{ width: '400px', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)', borderRight: '1px solid var(--border-subtle)', boxShadow: '4px 0 24px rgba(0,0,0,0.2)' }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1rem', background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.08) 0%, transparent 100%)' }}>
          <button className="secondary" style={{ padding: '0.4rem', border: 'none', background: 'rgba(255,255,255,0.05)' }} onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} />
          </button>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', background: 'linear-gradient(90deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DreamCraft AI 💫</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>ARCHITECTURE CO-PILOT</span>
          </div>
        </div>
        
        <div ref={chatScrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          {aiHistory.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(99,102,241,0.2)' }}>
                <Bot size={48} color="var(--primary)" />
              </div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '600' }}>I am DreamCraft AI</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', padding: '0 1rem' }}>Describe the system you want to build. I will instantly engineer a flawless architecture diagram for you.</p>
            </div>
          ) : (
            aiHistory.map((msg, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                gap: '1rem', 
                alignItems: 'flex-start',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '90%',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{ marginTop: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: msg.role === 'user' ? 'var(--bg-surface)' : 'linear-gradient(135deg, #6366f1, #a855f7)', flexShrink: 0, boxShadow: msg.role === 'system' ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none' }}>
                  {msg.role === 'user' ? <User size={16} color="var(--text-muted)" /> : <Bot size={18} color="#fff" />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: msg.role === 'user' ? '#fff' : 'var(--text-main)', 
                    lineHeight: '1.6', 
                    whiteSpace: 'pre-wrap',
                    padding: '1rem 1.25rem',
                    borderRadius: '16px',
                    borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                    borderTopLeftRadius: msg.role === 'system' ? '4px' : '16px',
                    backgroundColor: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                    border: msg.role === 'system' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}>
                    {msg.content}
                  </div>
                  
                  {/* Copy & Edit options available for all messages including the user prompt itself */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', marginLeft: '0.5rem', opacity: 0.7, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <button 
                      className="icon-btn" 
                      onClick={() => copyToClipboard(msg.content)} 
                      title="Copy text"
                      style={{ background: 'transparent', border: 'none', padding: '0.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: msg.role === 'user' ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}
                    >
                      <Copy size={12} /> Copy
                    </button>
                    <button 
                      className="icon-btn" 
                      onClick={() => setPrompt(msg.content)} 
                      title="Edit this prompt"
                      style={{ background: 'transparent', border: 'none', padding: '0.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: msg.role === 'user' ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {aiHistory.length > 0 && (
            <button 
              onClick={handleScrollToBottom}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '25px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 100,
              }}
              title="Scroll to bottom"
            >
              <ArrowDown size={18} color="#fff" />
            </button>
          )}
        </div>

        <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--bg-dark)' }}>
          <form onSubmit={handleAiSubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button type="button" style={{ padding: '0.5rem', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => addAiMessage({role:'system', content: '[Mock] Opening image upload dialog...'})} title="Upload Image">
              <ImageIcon size={18} />
            </button>
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your requirements…" 
              style={{ padding: '0.5rem', flex: 1, minWidth: 0, background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '0.95rem', boxShadow: 'none' }}
            />
            <button type="button" style={{ padding: '0.5rem', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => addAiMessage({role:'system', content: '[Mock] Listening to voice input...'})} title="Voice Input">
              <Mic size={18} />
            </button>
            <button type="submit" style={{ padding: '0.6rem', borderRadius: '8px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Send Message">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflow: 'hidden' }}>
        <div className="glass-panel flex-between" style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border-subtle)', zIndex: 10, borderRadius: '0', borderLeft: 'none', borderRight: 'none', borderTop: 'none', backgroundColor: 'var(--bg-dark)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            <Edit2 size={16} color="var(--text-muted)" />
            <input 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{ fontWeight: 500, fontSize: '1.05rem', background: 'transparent', border: 'none', padding: '0.2rem', margin: 0, boxShadow: 'none', width: '300px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button className="secondary" style={{ padding: '0.5rem', border: 'none', borderRadius: '50%', marginRight: '0.5rem' }} onClick={toggleTheme} title="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="secondary" style={{ padding: '0.5rem 1rem' }} onClick={handleClearCanvas}><Trash2 size={16} /> Clear</button>
            <button className="secondary" style={{ padding: '0.5rem 1rem' }} onClick={handleExportJSON}><Code2 size={16} /> JSON</button>
            <button className="secondary" style={{ padding: '0.5rem 1rem' }} onClick={handleExportPDF}><Download size={16} /> Export PDF</button>
            <button className="secondary" style={{ padding: '0.5rem 1rem', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={handleDeleteProject}><Trash2 size={16} /> Delete</button>
            <button style={{ padding: '0.5rem 1rem' }} onClick={handleSaveProject}><Save size={16} /> Save</button>
          </div>
        </div>

        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', height: '100%', backgroundColor: 'var(--bg-dark)' }}>
          <ReactFlowProvider>
            <ViewportController nodes={nodes} />
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              colorMode={theme}
            >
              <Background color="var(--border-subtle)" size={1.5} />
              <Controls style={{ bottom: '20px', left: '20px' }} />
              <MiniMap 
                nodeStrokeColor={(n) => n.type === 'database' ? 'var(--accent)' : 'var(--primary)'}
                nodeColor={() => 'var(--bg-surface)'}
                maskColor="rgba(0,0,0,0.7)"
                style={{ bottom: '20px', right: '20px', backgroundColor: 'var(--bg-dark)' }} 
              />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
