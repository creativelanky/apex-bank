import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Cards from './pages/Cards';
import Send from './pages/Send';
import Receive from './pages/Receive';
import Settings from './pages/Settings';
import { LayoutDashboard, ArrowLeftRight, CreditCard, Send as SendIcon, Download } from 'lucide-react';
import './index.css';

const PAGES = { dashboard: Dashboard, transactions: Transactions, cards: Cards, send: Send, receive: Receive, settings: Settings };

const BOTTOM_TABS = [
  { id: 'dashboard',    icon: LayoutDashboard, label: 'Home' },
  { id: 'transactions', icon: ArrowLeftRight,  label: 'Activity' },
  { id: 'send',         icon: SendIcon,        label: 'Send' },
  { id: 'receive',      icon: Download,        label: 'Receive' },
  { id: 'cards',        icon: CreditCard,      label: 'Cards' },
];

function Shell() {
  const [page, setPage] = useState('dashboard');
  const Page = PAGES[page] || Dashboard;

  return (
    <div style={{ display: 'flex', height: '100dvh', width: '100vw', overflow: 'hidden', background: '#07080f' }}>
      <Sidebar active={page} onNav={setPage} />

      <main className="main-padded" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <Page key={page} onNav={setPage} />
      </main>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav" style={{ justifyContent: 'space-around', alignItems: 'center' }}>
        {BOTTOM_TABS.map(({ id, icon: Icon, label }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '4px 12px', minWidth: 52 }}
            >
              {id === 'send' ? (
                // Send = special FAB-style
                <div style={{
                  width: 46, height: 46, borderRadius: 14, marginBottom: -4,
                  background: active ? 'linear-gradient(135deg,#059669,#10b981)' : 'rgba(16,185,129,0.12)',
                  border: '1.5px solid rgba(16,185,129,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: active ? '0 4px 20px rgba(16,185,129,0.35)' : 'none',
                  transition: 'all 0.2s ease',
                }}>
                  <Icon size={18} color={active ? '#fff' : '#10b981'} strokeWidth={2.5} />
                </div>
              ) : (
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} color={active ? '#34d399' : '#374151'} />
              )}
              <span style={{ fontSize: 10, fontWeight: 600, color: active ? '#34d399' : '#374151' }}>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function App() {
  return <AppProvider><Shell /></AppProvider>;
}
