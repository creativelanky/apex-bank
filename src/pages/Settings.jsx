import { ChevronRight, User, Shield, Bell, Globe, CreditCard, HelpCircle, FileText, Leaf } from 'lucide-react';
import { user } from '../data/mockData';

const sections = [
  { title: 'Account', items: [
    { icon: User,       label: 'Personal Information', sub: 'Name, email, phone' },
    { icon: Shield,     label: 'Security',             sub: '2FA, password, sessions' },
    { icon: CreditCard, label: 'Linked Accounts',      sub: 'Banks, cards' },
  ]},
  { title: 'Preferences', items: [
    { icon: Bell,       label: 'Notifications',        sub: 'Push, email alerts' },
    { icon: Globe,      label: 'Language & Region',    sub: 'English (US) · USD' },
  ]},
  { title: 'Support', items: [
    { icon: HelpCircle, label: 'Help Center',          sub: 'FAQs and guides' },
    { icon: FileText,   label: 'Legal & Privacy',      sub: 'Terms, privacy policy' },
  ]},
];

export default function Settings() {
  return (
    <div style={{ padding: 'clamp(20px,4vw,36px)', maxWidth: 700, margin: '0 auto' }} className="fade-up">
      <h1 style={{ fontSize: 'clamp(18px,3vw,24px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.4px', marginBottom: 28 }}>Settings</h1>

      {/* Profile */}
      <div className="glass" style={{ borderRadius: 20, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26, flexWrap: 'wrap' }}>
        <div style={{ width: 52, height: 52, borderRadius: 15, background: 'linear-gradient(135deg, #059669, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
          {user.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{user.name}</p>
          <p style={{ fontSize: 13, color: '#6b7280' }}>{user.email}</p>
        </div>
        <span className="chip chip-green"><Leaf size={9} fill="currentColor" /> {user.plan}</span>
      </div>

      {sections.map(({ title, items }) => (
        <div key={title} style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#2d3748', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, padding: '0 4px' }}>{title}</p>
          <div className="glass" style={{ borderRadius: 18, overflow: 'hidden' }}>
            {items.map(({ icon: Icon, label, sub }, i) => (
              <button key={label} className="hover-row" style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                cursor: 'pointer', textAlign: 'left', background: 'transparent',
                borderBottom: i < items.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={15} color="#34d399" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#e5e7eb' }}>{label}</p>
                  <p style={{ fontSize: 12, color: '#4b5563', marginTop: 1 }}>{sub}</p>
                </div>
                <ChevronRight size={15} color="#374151" />
              </button>
            ))}
          </div>
        </div>
      ))}

      <button style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.14)', color: '#f87171', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
        Sign Out
      </button>
    </div>
  );
}
