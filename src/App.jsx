import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import SidebarLight from './components/SidebarLight';
import Dashboard from './pages/Dashboard';
import DashboardLight from './pages/DashboardLight';
import Transactions from './pages/Transactions';
import Cards from './pages/Cards';
import Send from './pages/Send';
import Receive from './pages/Receive';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import { LayoutDashboard, ArrowLeftRight, CreditCard, Send as SendIcon, Download, Sun, Moon, X, AlertTriangle, Info, CheckCircle, AlertCircle, Ban } from 'lucide-react';
import './index.css';

const PAGES = { dashboard: null, transactions: Transactions, cards: Cards, send: Send, receive: Receive, settings: Settings };

const BOTTOM_TABS = [
  { id: 'dashboard',    icon: LayoutDashboard, label: 'Home'     },
  { id: 'transactions', icon: ArrowLeftRight,  label: 'Activity' },
  { id: 'send',         icon: SendIcon,        label: 'Send'     },
  { id: 'receive',      icon: Download,        label: 'Receive'  },
  { id: 'cards',        icon: CreditCard,      label: 'Cards'    },
];

const ALERT_STYLES = {
  error:   { bg: '#fef2f2', border: '#fecaca', color: '#dc2626', icon: AlertCircle },
  warning: { bg: '#fffbeb', border: '#fde68a', color: '#d97706', icon: AlertTriangle },
  info:    { bg: '#eff6ff', border: '#bfdbfe', color: '#2563eb', icon: Info },
  success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#059669', icon: CheckCircle },
};

function AlertBanner() {
  const { userAlert, dismissAlert } = useApp();
  if (!userAlert) return null;
  const s = ALERT_STYLES[userAlert.type] || ALERT_STYLES.info;
  const Icon = s.icon;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', background: s.bg, borderBottom: `1px solid ${s.border}`, flexShrink: 0 }}>
      <Icon size={15} color={s.color} style={{ flexShrink: 0 }} />
      <p style={{ flex: 1, fontSize: 13, fontWeight: 500, color: s.color }}>{userAlert.text}</p>
      <button onClick={dismissAlert} style={{ color: s.color, cursor: 'pointer', display: 'flex' }}><X size={14} /></button>
    </div>
  );
}

function SuspendedOverlay() {
  const { suspended, suspendReason } = useApp();
  if (!suspended) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(15,23,42,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, backdropFilter: 'blur(6px)' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(239,68,68,0.12)', border: '2px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <Ban size={34} color="#ef4444" />
      </div>
      <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10, textAlign: 'center' }}>Account Suspended</p>
      <p style={{ fontSize: 14, color: '#94a3b8', textAlign: 'center', maxWidth: 360, lineHeight: 1.7, marginBottom: 28 }}>
        {suspendReason || 'Your account has been suspended. Please contact support for assistance.'}
      </p>
      <div style={{ padding: '12px 20px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
        <p style={{ fontSize: 13, color: '#f87171', fontWeight: 500 }}>support@apexbank.io · +1 (800) 123-4567</p>
      </div>
    </div>
  );
}

function Shell() {
  const [page, setPage] = useState('dashboard');
  const { theme, toggleTheme } = useApp();

  const isDark = theme === 'dark';
  const PageComponent = page === 'dashboard'
    ? (isDark ? Dashboard : DashboardLight)
    : (PAGES[page] || Dashboard);

  const SidebarComponent = isDark ? Sidebar : SidebarLight;
  const mobileActiveColor   = isDark ? '#34d399' : '#059669';
  const mobileInactiveColor = isDark ? '#374151' : '#94a3b8';

  return (
    <div
      data-theme={theme}
      style={{ display: 'flex', height: '100dvh', width: '100vw', overflow: 'hidden', background: 'var(--page-bg)', position: 'relative' }}
    >
      <SuspendedOverlay />
      <SidebarComponent active={page} onNav={setPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Theme toggle bar — desktop only */}
        <div className="desktop-only" style={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
          padding: '8px 20px',
          background: isDark ? '#0a0c12' : '#fff',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}`,
          flexShrink: 0,
        }}>
          <button onClick={toggleTheme} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '6px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 600,
            background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
            color: isDark ? '#9ca3af' : '#475569',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'}`,
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <AlertBanner />

        <main className="main-padded" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <PageComponent key={`${page}-${theme}`} onNav={setPage} />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav" style={{ justifyContent: 'space-around', alignItems: 'center' }}>
        {BOTTOM_TABS.map(({ id, icon: Icon, label }) => {
          const active = page === id;
          return (
            <button key={id} onClick={() => setPage(id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '4px 10px', minWidth: 50 }}>
              {id === 'send' ? (
                <div style={{
                  width: 44, height: 44, borderRadius: 13, marginBottom: -4,
                  background: active ? 'linear-gradient(135deg,#059669,#10b981)' : (isDark ? 'rgba(16,185,129,0.12)' : '#ecfdf5'),
                  border: '1.5px solid rgba(16,185,129,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: active ? '0 4px 18px rgba(16,185,129,0.3)' : 'none',
                  transition: 'all 0.2s',
                }}>
                  <Icon size={17} color={active ? '#fff' : '#10b981'} strokeWidth={2.5} />
                </div>
              ) : (
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} color={active ? mobileActiveColor : mobileInactiveColor} />
              )}
              <span style={{ fontSize: 10, fontWeight: 600, color: active ? mobileActiveColor : mobileInactiveColor }}>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'app' | 'admin'

  if (view === 'landing') return <Landing onEnter={() => setView('app')} onAdmin={() => setView('admin')} />;
  if (view === 'admin')   return <AppProvider><Admin onBack={() => setView('landing')} /></AppProvider>;
  return <AppProvider><Shell /></AppProvider>;
}
