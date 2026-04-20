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
import { LayoutDashboard, ArrowLeftRight, CreditCard, Send as SendIcon, Download, Sun, Moon } from 'lucide-react';
import './index.css';

const PAGES = { dashboard: null, transactions: Transactions, cards: Cards, send: Send, receive: Receive, settings: Settings };

const BOTTOM_TABS = [
  { id: 'dashboard',    icon: LayoutDashboard, label: 'Home'     },
  { id: 'transactions', icon: ArrowLeftRight,  label: 'Activity' },
  { id: 'send',         icon: SendIcon,        label: 'Send'     },
  { id: 'receive',      icon: Download,        label: 'Receive'  },
  { id: 'cards',        icon: CreditCard,      label: 'Cards'    },
];

function Shell() {
  const [page, setPage]   = useState('dashboard');
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
      style={{ display: 'flex', height: '100dvh', width: '100vw', overflow: 'hidden', background: 'var(--page-bg)' }}
    >
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
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 600,
              background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
              color: isDark ? '#9ca3af' : '#475569',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'}`,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

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
        {/* Mobile theme toggle */}
        <button onClick={toggleTheme}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '4px 10px', minWidth: 50 }}>
          {isDark ? <Sun size={20} strokeWidth={1.8} color={mobileInactiveColor} /> : <Moon size={20} strokeWidth={1.8} color={mobileInactiveColor} />}
          <span style={{ fontSize: 10, fontWeight: 600, color: mobileInactiveColor }}>Theme</span>
        </button>
      </nav>
    </div>
  );
}

export default function App() {
  return <AppProvider><Shell /></AppProvider>;
}
