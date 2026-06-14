import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Database, Server, Smartphone, Monitor, ShoppingCart, CreditCard, Bell, BarChart, Cloud, Search, Activity, Network, Box, Zap, Terminal, AppWindow, Route, Filter, Play, Globe, Key, Shield, User } from 'lucide-react';

const IconMapping = {
  server: Server,
  smartphone: Smartphone,
  monitor: Monitor,
  cart: ShoppingCart,
  card: CreditCard,
  bell: Bell,
  chart: BarChart,
  cloud: Cloud,
  search: Search,
  activity: Activity,
  network: Network,
  box: Box,
  zap: Zap,
  database: Database,
  terminal: Terminal,
  app: AppWindow,
  route: Route,
  filter: Filter,
  lambda: Play,
  key: Key,
  shield: Shield,
  user: User
};

export const MicroserviceNode = ({ data, selected }) => {
  const IconComponent = IconMapping[data.iconType] || Server;
  const mainColor = data.color || '#3b82f6';
  
  return (
    <div style={{
      width: '130px',
      backgroundColor: '#ffffff',
      border: `2px solid ${selected ? mainColor : '#cbd5e1'}`,
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: selected ? `0 0 0 5px ${mainColor}30` : '0 8px 16px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        backgroundColor: mainColor,
        padding: '0.4rem',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        {data.label}
      </div>
      
      <div style={{
        padding: '0.75rem 0.4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
        <IconComponent size={32} color={mainColor} style={{ marginBottom: '0.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
        
        {data.description && (
          <>
            <div style={{ width: '85%', height: '1.5px', backgroundColor: '#e2e8f0', margin: '0.4rem 0' }} />
            <span style={{ fontSize: '0.65rem', color: '#334155', textAlign: 'center', lineHeight: '1.2', fontWeight: '500' }}>
              {data.description}
            </span>
          </>
        )}
      </div>

      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} id="top" style={{ opacity: 0 }} />
    </div>
  );
};

export const DatabaseNode = ({ data, selected }) => {
  const IconComponent = IconMapping[data.iconType] || Database;
  const mainColor = data.color || '#10b981';
  
  return (
    <div className={`flex-center`} style={{ flexDirection: 'column', width: '100px', zIndex: 10, position: 'relative' }}>
      <IconComponent 
        size={40} 
        color={mainColor} 
        style={{ filter: selected ? `drop-shadow(0 0 10px ${mainColor})` : 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))', marginBottom: '0.5rem' }} 
      />
      <span style={{ fontSize: '0.75rem', textAlign: 'center', fontWeight: 'bold', color: '#0f172a', whiteSpace: 'nowrap' }}>{data.label}</span>
      {data.description && (
        <span style={{ fontSize: '0.65rem', color: '#475569', textAlign: 'center', marginTop: '0.2rem', fontStyle: 'italic' }}>{data.description}</span>
      )}
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} id="top" style={{ opacity: 0 }} />
    </div>
  );
};

export const BoundedContextNode = ({ data }) => {
  const isTransparent = data.backgroundColor === 'transparent';
  return (
    <div style={{
      width: data.width || 300,
      height: data.height || 250,
      backgroundColor: isTransparent ? 'transparent' : (data.color ? `${data.color}10` : '#f8fafc'),
      border: isTransparent ? 'none' : `2px dashed ${data.color || '#94a3b8'}`,
      borderRadius: '20px',
      position: 'relative',
      pointerEvents: 'none',
      zIndex: -1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Handle type="target" position={Position.Top} id="top" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} />
      
      {data.label && (
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: data.color || '#64748b',
          borderRadius: '10px',
          padding: '0.25rem 1.25rem',
          fontSize: '0.85rem',
          fontWeight: '900',
          letterSpacing: '0.5px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap'
        }}>
          {data.icon !== false && <Globe size={16} color="#ffffff" />}
          {data.label}
        </div>
      )}
    </div>
  );
};

export const TextNode = ({ data }) => {
  return (
    <div style={{ textAlign: 'center', color: data.color || '#fff', fontSize: data.fontSize || '1.5rem', fontWeight: data.fontWeight || 'normal' }}>
      {data.label}
    </div>
  );
};

export const nodeTypes = {
  microservice: MicroserviceNode,
  database: DatabaseNode,
  boundedContext: BoundedContextNode,
  text: TextNode
};
