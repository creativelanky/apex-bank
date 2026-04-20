import { Eye, EyeOff, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { user, transactions } from '../data/mockData';

const fmtD = s => new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const STATUS_CHIP = {
  completed: { bg: '#dcfce7', color: '#16a34a', label: 'Completed' },
  pending:   { bg: '#fef9c3', color: '#ca8a04', label: 'Pending'   },
  failed:    { bg: '#fee2e2', color: '#dc2626', label: 'Failed'     },
};

export default function DashboardLight({ onNav }) {
  const { balance, hideBalance, toggleHide, transactions: txns } = useApp();

  const totalIn  = txns.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const totalOut = txns.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);

  return (
    <div style={{ minHeight: '100%', background: '#f0f2f5' }} className="fade-up">
      {/* Top bar */}
      <div style={{
        background: '#0f172a', padding: '0 28px',
        height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{ color: '#94a3b8', padding: 4 }}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>Apex Bank</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #1e40af, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>
            {user.avatar}
          </div>
          <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>{user.name}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
        {/* Account number */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Account Number</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', letterSpacing: '0.03em', fontFamily: 'monospace' }}>
            {user.accountNumber}
          </p>
        </div>

        {/* Currency balance cards */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {user.currencies.map(c => (
            <div key={c.code} style={{
              minWidth: 170, flex: '1 0 170px',
              background: '#fff', borderRadius: 8,
              border: '1px solid #e2e8f0',
              padding: '16px 18px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.code} Balance</p>
              </div>
              <p style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', letterSpacing: '-0.3px' }}>
                {hideBalance ? '••••' : `${c.symbol}${c.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              </p>
              <button onClick={toggleHide} style={{ marginTop: 6, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                {hideBalance ? <EyeOff size={11} /> : <Eye size={11} />}
                {hideBalance ? 'Show' : 'Hide'}
              </button>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 24 }}>
          <StatBox
            label="Active Fixed Deposits"
            value={0}
            onView={() => onNav('cards')}
            accentColor="#059669"
          />
          <StatBox
            label="Active Tickets"
            value={0}
            onView={() => {}}
            accentColor="#059669"
          />
          <StatBox
            label="Money In (This Month)"
            value={`$${totalIn.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            accentColor="#2563eb"
          />
          <StatBox
            label="Money Out (This Month)"
            value={`$${totalOut.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            accentColor="#dc2626"
          />
        </div>

        {/* Recent Transactions */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Recent Transactions</p>
            <button onClick={() => onNav('transactions')} style={{ fontSize: 13, color: '#059669', fontWeight: 600 }}>View All →</button>
          </div>

          {/* Desktop table */}
          <div className="desktop-only" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Date', 'Description', 'Currency', 'Amount', 'Charge', 'Grand Total', 'DR/CR', 'Type', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {txns.length === 0 ? (
                  <tr><td colSpan={9} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>No transactions yet</td></tr>
                ) : txns.map((t, i) => {
                  const charge = t.type === 'debit' ? (t.amount * 0.005).toFixed(2) : '0.00';
                  const grand  = (t.amount + parseFloat(charge)).toFixed(2);
                  const status = i % 4 === 0 ? 'pending' : 'completed';
                  const chip   = STATUS_CHIP[status];
                  return (
                    <tr key={t.id} className="hover-row" style={{ borderBottom: i < txns.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b', whiteSpace: 'nowrap' }}>{fmtD(t.date)}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#059669', flexShrink: 0 }}>{t.avatar}</div>
                          <span style={{ fontSize: 13, fontWeight: 500, color: '#1e293b', whiteSpace: 'nowrap' }}>{t.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#1e293b' }}>USD</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#1e293b' }}>${t.amount.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b' }}>${charge}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#1e293b' }}>${grand}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: t.type === 'credit' ? '#059669' : '#dc2626' }}>
                          {t.type === 'credit' ? 'CR' : 'DR'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b' }}>{t.category}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 99, background: chip.bg, color: chip.color }}>{chip.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="mobile-only">
            {txns.length === 0 ? (
              <p style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>No transactions yet</p>
            ) : txns.slice(0, 8).map((t, i) => (
              <div key={t.id} className="hover-row" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < 7 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#059669', flexShrink: 0 }}>{t.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8' }}>{fmtD(t.date)} · {t.category}</p>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.type === 'credit' ? '#059669' : '#1e293b', flexShrink: 0 }}>
                  {t.type === 'credit' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, onView, accentColor }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 8,
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '16px 18px' }}>
        <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{label}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 28, fontWeight: 800, color: '#1e293b' }}>{value}</p>
          {onView && (
            <button onClick={onView} style={{ fontSize: 12, color: accentColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <ExternalLink size={12} /> View
            </button>
          )}
        </div>
      </div>
      {/* Green bottom accent line (matching the image) */}
      <div style={{ height: 3, background: accentColor, opacity: 0.7 }} />
    </div>
  );
}
