import {
  LayoutDashboard, Send, ArrowLeftRight, Download,
  PlusCircle, MinusCircle, Landmark, Ticket, FileText, Settings, LogOut, ChevronRight
} from 'lucide-react';
import { user } from '../data/mockData';

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',          icon: LayoutDashboard },
  { id: 'send',         label: 'Send Money',          icon: Send },
  { id: 'transactions', label: 'Exchange Money',      icon: ArrowLeftRight },
  { id: 'send',         label: 'Wire Transfer',       icon: Send,    key: 'wire' },
  { id: 'receive',      label: 'Deposit Money',       icon: PlusCircle, arrow: true },
  { id: 'receive',      label: 'Withdraw Money',      icon: MinusCircle },
  { id: 'cards',        label: 'Fixed Deposit',       icon: Landmark, arrow: true },
  { id: 'receive',      label: 'Support Tickets',     icon: Ticket,   arrow: true },
  { id: 'transactions', label: 'Transactions Report', icon: FileText },
];

export default function SidebarLight({ active, onNav }) {
  return (
    <aside className="sidebar" style={{
      width: 240, flexShrink: 0, height: '100vh',
      display: 'flex', flexDirection: 'column',
      background: '#fff',
      borderRight: '1px solid #e2e8f0',
      overflow: 'hidden',
    }}>
      {/* Top banner — dark navy with decorative lines */}
      <div style={{
        position: 'relative', height: 170, flexShrink: 0, overflow: 'hidden',
        background: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 60%, #0f4c81 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 16,
      }}>
        {/* Decorative lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} viewBox="0 0 240 170" preserveAspectRatio="none">
          <line x1="-20" y1="60"  x2="280" y2="10"  stroke="#60a5fa" strokeWidth="1.5"/>
          <line x1="-20" y1="90"  x2="280" y2="40"  stroke="#38bdf8" strokeWidth="1"/>
          <line x1="-20" y1="120" x2="280" y2="70"  stroke="#7dd3fc" strokeWidth="1.5"/>
          <line x1="-20" y1="150" x2="280" y2="100" stroke="#60a5fa" strokeWidth="1"/>
          <line x1="-20" y1="30"  x2="280" y2="160" stroke="#bae6fd" strokeWidth="0.8"/>
          <line x1="60"  y1="0"   x2="200" y2="170" stroke="#38bdf8" strokeWidth="0.8"/>
          <line x1="120" y1="0"   x2="260" y2="170" stroke="#60a5fa" strokeWidth="1"/>
        </svg>
        {/* Avatar */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
          border: '3px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 800, color: '#fff',
          marginBottom: 8, zIndex: 1,
        }}>
          {user.avatar}
        </div>
        <p style={{ fontSize: 13.5, fontWeight: 600, color: '#fff', zIndex: 1 }}>{user.name}</p>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px 12px' }}>
        <p style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 6px', marginBottom: 8 }}>
          Navigations
        </p>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(({ id, label, icon: Icon, arrow, key }) => {
            const isActive = active === id && !key;
            return (
              <button
                key={key || label}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onNav(id)}
                style={{ justifyContent: 'space-between', paddingRight: 10 }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                  {label}
                </span>
                {arrow && <ChevronRight size={13} style={{ opacity: 0.4 }} />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 12px 16px', borderTop: '1px solid #f1f5f9' }}>
        <button className="nav-item" onClick={() => onNav('settings')} style={{ marginBottom: 2 }}>
          <Settings size={15} strokeWidth={2} /> Settings
        </button>
        <button className="nav-item" style={{ color: '#ef4444' }}>
          <LogOut size={15} strokeWidth={2} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
