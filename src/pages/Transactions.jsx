import { useState } from 'react';
import { Search, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const fmtAmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2 });
const fmtD   = s => new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const FILTERS = ['All', 'Credits', 'Debits'];

const STATUS = ['completed','completed','pending','completed'];

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
    <div style={{ minHeight: '100%', background: 'var(--page-bg)' }} className="fade-up">
      {/* Page header */}
      <div style={{ background: 'var(--page-header-bg)', borderBottom: '1px solid var(--page-header-border)', padding: '18px clamp(16px,3vw,32px)' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--page-header-text)', marginBottom: 2 }}>Transactions</h1>
        <p style={{ fontSize: 12.5, color: 'var(--text-2)' }}>{list.length} records</p>
      </div>

      <div style={{ padding: 'clamp(16px,3vw,28px)' }}>
        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total In',  value: `+$${fmtAmt(totalIn)}`,        color: '#059669', accent: '#dcfce7' },
            { label: 'Total Out', value: `-$${fmtAmt(totalOut)}`,       color: '#dc2626', accent: '#fee2e2' },
            { label: 'Net',       value: `${net>=0?'+':'-'}$${fmtAmt(Math.abs(net))}`, color: net>=0?'#059669':'#dc2626', accent: net>=0?'#dcfce7':'#fee2e2' },
          ].map(c => (
            <div key={c.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 'clamp(12px,2vw,18px)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 11.5, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{c.label}</p>
              <p style={{ fontSize: 'clamp(16px,2.5vw,22px)', fontWeight: 700, color: c.color }}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 180, display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderRadius: 8, background: 'var(--input-bg)', border: '1px solid var(--input-border)' }}>
            <Search size={14} color="var(--text-3)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions…"
              style={{ flex: 1, fontSize: 13, color: 'var(--input-text)', background: 'transparent' }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '9px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                background: filter===f ? 'var(--accent-bg)' : 'var(--input-bg)',
                color: filter===f ? 'var(--accent)' : 'var(--text-2)',
                border: filter===f ? '1px solid var(--accent-border)' : '1px solid var(--input-border)',
              }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
          {/* Desktop */}
          <div className="desktop-only" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
              <thead>
                <tr style={{ background: 'var(--input-bg)', borderBottom: '1px solid var(--border)' }}>
                  {['Date','Description','Currency','Amount','Charge','Grand Total','DR/CR','Type','Status'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.length === 0 ? (
                  <tr><td colSpan={9} style={{ padding: '48px', textAlign: 'center', color: 'var(--text-3)', fontSize: 14 }}>No transactions found</td></tr>
                ) : list.map((t, i) => {
                  const charge = t.type==='debit' ? (t.amount*0.005).toFixed(2) : '0.00';
                  const grand  = (t.amount + parseFloat(charge)).toFixed(2);
                  const status = STATUS[i % STATUS.length];
                  const chip   = status==='completed'
                    ? { bg:'var(--chip-green-bg)', color:'var(--chip-green-text)', label:'Completed' }
                    : { bg:'var(--chip-yellow-bg)', color:'var(--chip-yellow-text)', label:'Pending' };
                  return (
                    <tr key={t.id} className="hover-row" style={{ borderBottom: i<list.length-1 ? '1px solid var(--divider)' : 'none' }}>
                      <td style={{ padding:'12px 16px', fontSize:13, color:'var(--text-2)', whiteSpace:'nowrap' }}>{fmtD(t.date)}</td>
                      <td style={{ padding:'12px 16px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:8, background:'var(--accent-bg)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'var(--accent)', flexShrink:0 }}>{t.avatar}</div>
                          <span style={{ fontSize:13, fontWeight:500, color:'var(--text-1)', whiteSpace:'nowrap' }}>{t.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:'12px 16px', fontSize:13, fontWeight:600, color:'var(--text-1)' }}>USD</td>
                      <td style={{ padding:'12px 16px', fontSize:13, fontWeight:600, color:'var(--text-1)' }}>${fmtAmt(t.amount)}</td>
                      <td style={{ padding:'12px 16px', fontSize:13, color:'var(--text-2)' }}>${charge}</td>
                      <td style={{ padding:'12px 16px', fontSize:13, fontWeight:600, color:'var(--text-1)' }}>${grand}</td>
                      <td style={{ padding:'12px 16px' }}>
                        <span style={{ fontSize:12, fontWeight:700, color: t.type==='credit'?'#059669':'#dc2626' }}>{t.type==='credit'?'CR':'DR'}</span>
                      </td>
                      <td style={{ padding:'12px 16px' }}><span className="chip chip-blue">{t.category}</span></td>
                      <td style={{ padding:'12px 16px' }}>
                        <span style={{ fontSize:11, fontWeight:600, padding:'3px 9px', borderRadius:99, background:chip.bg, color:chip.color }}>{chip.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="mobile-only">
            {list.length === 0
              ? <p style={{ padding:'40px', textAlign:'center', color:'var(--text-3)', fontSize:14 }}>No transactions found</p>
              : list.map((t, i) => (
                <div key={t.id} className="hover-row" style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 16px', borderBottom: i<list.length-1?'1px solid var(--divider)':'none' }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:'var(--accent-bg)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'var(--accent)', flexShrink:0 }}>{t.avatar}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13, fontWeight:500, color:'var(--text-1)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.name}</p>
                    <p style={{ fontSize:11, color:'var(--text-3)' }}>{fmtD(t.date)} · {t.category}</p>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:t.type==='credit'?'#059669':'var(--text-1)' }}>
                      {t.type==='credit'?'+':'-'}${fmtAmt(t.amount)}
                    </span>
                    <p style={{ fontSize:11, color:t.type==='credit'?'#059669':'#dc2626', fontWeight:600 }}>{t.type==='credit'?'CR':'DR'}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
