import { useState } from 'react';
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, TrendingUp, Wallet, Globe, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { user, transactions } from '../data/mockData';
import SpendChart from '../components/SpendChart';

const fmt = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 });
const fmtD = s => new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function Dashboard({ onNav }) {
  const { balance, hideBalance, toggleHide } = useApp();
  const recent = transactions.slice(0, 6);
  const totalIn  = transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);

  return (
    <div style={{ padding: 'clamp(20px, 4vw, 40px)', maxWidth: 1100, margin: '0 auto' }} className="fade-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 3 }}>Good morning 👋</p>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
            Welcome back, {user.name.split(' ')[0]}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }} className="desktop-only">
          <button className="btn-ghost" style={{ padding: '10px 18px', fontSize: 13 }} onClick={() => onNav('send')}>Send Money</button>
          <button className="btn-primary" style={{ padding: '10px 18px', fontSize: 13 }} onClick={() => onNav('receive')}>+ Add Funds</button>
        </div>
      </div>

      {/* Top row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16, marginBottom: 20 }}>
        {/* Balance Hero */}
        <div style={{
          gridColumn: 'span 1',
          borderRadius: 22, padding: 'clamp(20px, 3vw, 32px)',
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #042f1e 0%, #064e3b 45%, #065f46 100%)',
          border: '1px solid rgba(16,185,129,0.18)',
          boxShadow: '0 24px 64px rgba(5,150,105,0.18)',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -20, left: 10, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Wallet size={14} color="#34d399" />
              <span style={{ fontSize: 11, color: '#34d399', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Checking Account</span>
              <button onClick={toggleHide} style={{ marginLeft: 4, color: '#34d399', opacity: 0.7 }}>
                {hideBalance ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
            <p style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1, marginBottom: 6 }}>
              {hideBalance ? '••••••' : fmt(balance)}
            </p>
            <p style={{ fontSize: 12, color: '#059669', fontWeight: 500, marginBottom: 20 }}>Account {user.accountNumber}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-primary" style={{ padding: '9px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, borderRadius: 10 }} onClick={() => onNav('send')}>
                <ArrowUpRight size={14} /> Send
              </button>
              <button className="btn-ghost" style={{ padding: '9px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, borderRadius: 10 }} onClick={() => onNav('receive')}>
                <ArrowDownLeft size={14} /> Receive
              </button>
            </div>
          </div>
        </div>

        <StatCard label="Money In"  value={totalIn}  sub="+12.4% vs last month" color="#10b981" icon={<ArrowDownLeft size={16} color="#10b981" />} bg="rgba(16,185,129,0.07)"  border="rgba(16,185,129,0.14)" />
        <StatCard label="Money Out" value={totalOut} sub="-3.1% vs last month"  color="#f87171" icon={<ArrowUpRight size={16}  color="#f87171" />} bg="rgba(239,68,68,0.07)"    border="rgba(239,68,68,0.14)"  />
      </div>

      {/* Second row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 16, marginBottom: 20 }}>
        <div className="glass" style={{ borderRadius: 20, padding: '24px 24px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 2 }}>Spending</p>
              <p style={{ fontSize: 12, color: '#6b7280' }}>Last 6 months</p>
            </div>
            <span className="chip chip-green"><TrendingUp size={10} /> Monthly</span>
          </div>
          <SpendChart />
        </div>

        <div className="glass" style={{ borderRadius: 20, padding: '24px' }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 20 }}>Account Info</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <InfoRow icon={<Globe size={14} color="#34d399" />}  label="USD Account"      value="Active"          valueColor="#34d399" />
            <InfoRow icon={<Shield size={14} color="#34d399" />} label="FDIC Insured"     value="Up to $250,000"  valueColor="#6ee7b7" />
            <InfoRow icon={<Wallet size={14} color="#34d399" />} label="Savings Balance"  value={fmt(user.savingsBalance)} valueColor="#fff" />
            <InfoRow icon={<TrendingUp size={14} color="#34d399" />} label="APY Rate"     value="4.25%"           valueColor="#34d399" />
          </div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: 11, color: '#2d3748', marginBottom: 6, fontWeight: 600 }}>ROUTING / ACCOUNT</p>
            <p style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' }}>{user.routing} / {user.accountNumber}</p>
          </div>
        </div>
      </div>

      {/* Transactions table */}
      <div className="glass" style={{ borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Recent Transactions</p>
          <button onClick={() => onNav('transactions')} style={{ fontSize: 13, color: '#34d399', fontWeight: 500 }}>View all →</button>
        </div>
        {/* Mobile cards */}
        <div className="mobile-only" style={{ padding: '8px' }}>
          {recent.map(t => <MobileRow key={t.id} t={t} />)}
        </div>
        {/* Desktop table */}
        <table className="desktop-only" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {['Transaction', 'Category', 'Date', 'Amount'].map(h => (
                <th key={h} style={{ padding: '10px 24px', textAlign: h === 'Amount' ? 'right' : 'left', fontSize: 11, fontWeight: 600, color: '#2d3748', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>{recent.map(t => <TxRow key={t.id} t={t} />)}</tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color, icon, bg, border }) {
  const f = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 });
  return (
    <div style={{ borderRadius: 20, padding: 'clamp(18px, 3vw, 26px)', background: bg, border: `1px solid ${border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 130 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{label}</p>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      </div>
      <div>
        <p style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', marginBottom: 4 }}>{f(value)}</p>
        <p style={{ fontSize: 12, color }}>{sub}</p>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <span style={{ fontSize: 13, color: '#9ca3af' }}>{label}</span>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: valueColor }}>{value}</span>
    </div>
  );
}

function TxRow({ t }) {
  const f = n => n.toLocaleString('en-US', { minimumFractionDigits: 2 });
  const d = s => new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return (
    <tr className="hover-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
      <td style={{ padding: '13px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{t.icon}</div>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#e5e7eb' }}>{t.name}</p>
        </div>
      </td>
      <td style={{ padding: '13px 24px' }}><span className="chip chip-blue">{t.category}</span></td>
      <td style={{ padding: '13px 24px', fontSize: 13, color: '#6b7280' }}>{d(t.date)}</td>
      <td style={{ padding: '13px 24px', textAlign: 'right', fontSize: 14, fontWeight: 600, color: t.type === 'credit' ? '#34d399' : '#fff' }}>
        {t.type === 'credit' ? '+' : '-'}${f(t.amount)}
      </td>
    </tr>
  );
}

function MobileRow({ t }) {
  const f = n => n.toLocaleString('en-US', { minimumFractionDigits: 2 });
  const d = s => new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return (
    <div className="hover-row" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, marginBottom: 2 }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{t.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: '#e5e7eb', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</p>
        <p style={{ fontSize: 11, color: '#4b5563' }}>{d(t.date)} · {t.category}</p>
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: t.type === 'credit' ? '#34d399' : '#fff', flexShrink: 0 }}>
        {t.type === 'credit' ? '+' : '-'}${f(t.amount)}
      </span>
    </div>
  );
}
