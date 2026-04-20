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
    <div style={{ minHeight: '100%', background: 'var(--page-bg)' }} className="fade-up">
      <div style={{ background: 'var(--page-header-bg)', borderBottom: '1px solid var(--page-header-border)', padding: '18px clamp(16px,3vw,32px)' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--page-header-text)', marginBottom: 2 }}>Settings</h1>
        <p style={{ fontSize: 12.5, color: 'var(--text-2)' }}>Manage your account preferences</p>
      </div>

      <div style={{ padding: 'clamp(16px,3vw,28px)', maxWidth: 700, margin: '0 auto' }}>
        {/* Profile */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26, flexWrap: 'wrap', boxShadow: 'var(--shadow)' }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: 'linear-gradient(135deg, #059669, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
            {user.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginBottom: 2 }}>{user.name}</p>
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{user.email}</p>
          </div>
          <span className="chip chip-green"><Leaf size={9} fill="currentColor" /> {user.plan}</span>
        </div>

        {sections.map(({ title, items }) => (
          <div key={title} style={{ marginBottom: 22 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, padding: '0 4px' }}>{title}</p>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              {items.map(({ icon: Icon, label, sub }, i) => (
                <button key={label} className="hover-row" style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                  cursor: 'pointer', textAlign: 'left', background: 'transparent',
                  borderBottom: i < items.length-1 ? '1px solid var(--divider)' : 'none',
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={15} color="var(--accent)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-1)' }}>{label}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>{sub}</p>
                  </div>
                  <ChevronRight size={15} color="var(--text-3)" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <button style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'var(--chip-red-bg)', border: '1px solid rgba(239,68,68,0.2)', color: 'var(--chip-red-text)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
