import { useState } from 'react';
import { Search, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2 });
const fmtD = s => new Date(s).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
const FILTERS = ['All', 'Credits', 'Debits'];

export default function Transactions() {
  const { transactions } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const list = transactions.filter(t => {
    const q = search.toLowerCase();
    return (!q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
      && (filter === 'All' || (filter === 'Credits' && t.type === 'credit') || (filter === 'Debits' && t.type === 'debit'));
  });

  const totalIn  = list.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const totalOut = list.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);
  const net      = totalIn - totalOut;

  return (
    <div style={{ padding: 'clamp(20px,4vw,36px)', maxWidth: 900, margin: '0 auto' }} className="fade-up">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 'clamp(18px,3vw,24px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.4px', marginBottom: 3 }}>Transactions</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>{list.length} transactions</p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        <SummaryCard label="Total In"  value={totalIn}  color="#34d399" prefix="+" />
        <SummaryCard label="Total Out" value={totalOut} color="#f87171" prefix="-" />
        <SummaryCard label="Net"       value={Math.abs(net)} color={net >= 0 ? '#34d399' : '#f87171'} prefix={net >= 0 ? '+' : '-'} />
      </div>

      {/* Search + filter */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <Search size={15} color="#4b5563" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ flex: 1, fontSize: 13, color: '#e5e7eb', background: 'transparent' }} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '10px 14px', borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none',
              background: filter === f ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
              color: filter === f ? '#34d399' : '#6b7280',
              outline: filter === f ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.06)',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="glass desktop-only" style={{ borderRadius: 20, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Transaction', 'Category', 'Date', 'Amount'].map(h => (
                <th key={h} style={{ padding: '11px 22px', textAlign: h === 'Amount' ? 'right' : 'left', fontSize: 11, fontWeight: 600, color: '#2d3748', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.length === 0
              ? <tr><td colSpan={4} style={{ padding: '48px', textAlign: 'center', color: '#4b5563', fontSize: 14 }}>No transactions found</td></tr>
              : list.map((t, i) => (
                <tr key={t.id} className="hover-row" style={{ borderBottom: i < list.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                  <td style={{ padding: '13px 22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{t.icon}</div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#e5e7eb' }}>{t.name}</p>
                    </div>
                  </td>
                  <td style={{ padding: '13px 22px' }}><span className="chip chip-blue">{t.category}</span></td>
                  <td style={{ padding: '13px 22px', fontSize: 13, color: '#6b7280' }}>{fmtD(t.date)}</td>
                  <td style={{ padding: '13px 22px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 5 }}>
                      {t.type === 'credit' ? <ArrowDownLeft size={13} color="#34d399" /> : <ArrowUpRight size={13} color="#9ca3af" />}
                      <span style={{ fontSize: 14, fontWeight: 600, color: t.type === 'credit' ? '#34d399' : '#fff' }}>${fmt(t.amount)}</span>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mobile-only glass" style={{ borderRadius: 20, overflow: 'hidden' }}>
        {list.length === 0
          ? <p style={{ padding: '40px', textAlign: 'center', color: '#4b5563', fontSize: 14 }}>No transactions found</p>
          : list.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < list.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 }}>{t.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#e5e7eb', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</p>
                <p style={{ fontSize: 11, color: '#4b5563' }}>{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {t.category}</p>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: t.type === 'credit' ? '#34d399' : '#fff', flexShrink: 0 }}>
                {t.type === 'credit' ? '+' : '-'}${fmt(t.amount)}
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color, prefix }) {
  const f = n => n.toLocaleString('en-US', { minimumFractionDigits: 2 });
  return (
    <div className="glass" style={{ borderRadius: 16, padding: 'clamp(14px,2vw,18px) clamp(14px,2vw,20px)' }}>
      <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 5, fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: 'clamp(16px,2.5vw,22px)', fontWeight: 700, color, letterSpacing: '-0.3px' }}>{prefix}${f(value)}</p>
    </div>
  );
}
