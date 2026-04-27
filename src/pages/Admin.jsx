import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield, ArrowLeft, DollarSign, Ban, Bell, Plus,
  Lock, Unlock, AlertTriangle, CheckCircle, Info, X, RefreshCw, Trash2
} from 'lucide-react';

const TABS = ['Overview', 'Balances', 'Account', 'Alerts', 'Transactions', 'Controls'];

const CATEGORIES = ['Income', 'Transfer', 'Software', 'Cloud', 'Travel', 'Shopping', 'Food', 'Other'];

const fmt = n => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 });

const ALERT_TYPES = [
  { value: 'error',   label: 'Error',   color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
  { value: 'warning', label: 'Warning', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  { value: 'info',    label: 'Info',    color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
  { value: 'success', label: 'Success', color: '#059669', bg: '#f0fdf4', border: '#bbf7d0' },
];

export default function Admin({ onBack }) {
  const {
    balance, currencies, transactions, suspended, suspendReason, userAlert, sendRestricted, sendRestrictMsg,
    adminSetBalance, adminSetCurrencyBalance, adminSuspend, adminSetAlert, adminSetSendRestricted, adminAddTransaction,
  } = useApp();

  const [tab, setTab] = useState('Overview');

  // Balances
  const [newBalance, setNewBalance] = useState('');
  const [currEdits, setCurrEdits] = useState({});

  // Suspend
  const [suspendInput, setSuspendInput] = useState(suspendReason);

  // Alert
  const [alertType, setAlertType] = useState('warning');
  const [alertText, setAlertText] = useState('');

  // Transaction
  const [txType, setTxType] = useState('credit');
  const [txName, setTxName] = useState('');
  const [txAvatar, setTxAvatar] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState('Income');
  const [txDate, setTxDate] = useState(new Date().toISOString().slice(0, 10));
  const [txDone, setTxDone] = useState(false);

  // Send restrict
  const [restrictMsg, setRestrictMsg] = useState(sendRestrictMsg);

  function applyBalance() {
    if (!newBalance) return;
    adminSetBalance(newBalance);
    setNewBalance('');
  }

  function applyCurrencies() {
    Object.entries(currEdits).forEach(([code, val]) => {
      if (val !== '') adminSetCurrencyBalance(code, val);
    });
    setCurrEdits({});
  }

  function applyAlert() {
    if (!alertText.trim()) return;
    adminSetAlert({ type: alertType, text: alertText.trim() });
    setAlertText('');
  }

  function applyTransaction() {
    if (!txName || !txAmount) return;
    adminAddTransaction({
      type: txType,
      name: txName,
      avatar: txAvatar || txName.slice(0, 2).toUpperCase(),
      amount: txAmount,
      date: txDate,
      category: txCategory,
    });
    setTxName(''); setTxAvatar(''); setTxAmount(''); setTxDone(true);
    setTimeout(() => setTxDone(false), 2000);
  }

  const statusChip = suspended
    ? { label: 'Suspended', bg: '#fef2f2', color: '#ef4444', border: '#fecaca' }
    : { label: 'Active',    bg: '#f0fdf4', color: '#059669', border: '#bbf7d0' };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#1e293b', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 clamp(16px,3vw,32px)', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            <ArrowLeft size={14} /> Back
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#dc2626,#ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={15} color="#fff" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Admin Panel</span>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: 'rgba(239,68,68,0.15)', color: '#f87171', fontWeight: 600, border: '1px solid rgba(239,68,68,0.2)' }}>RESTRICTED</span>
          </div>
        </div>
        <span style={{ fontSize: 12, color: '#475569' }}>Apex Bank · User: Alex Rivera</span>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        {/* Sidebar tabs */}
        <div style={{ width: 180, background: '#1e293b', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '16px 10px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              width: '100%', textAlign: 'left', padding: '9px 13px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none',
              background: tab === t ? 'rgba(239,68,68,0.12)' : 'transparent',
              color: tab === t ? '#f87171' : '#64748b',
              borderLeft: tab === t ? '2px solid #ef4444' : '2px solid transparent',
            }}>{t}</button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(20px,3vw,36px)' }}>

          {/* ── OVERVIEW ── */}
          {tab === 'Overview' && (
            <div>
              <h2 style={h2}>Account Overview</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 28 }}>
                {[
                  { label: 'USD Balance',    value: fmt(balance),              accent: '#10b981' },
                  { label: 'Transactions',   value: transactions.length,        accent: '#3b82f6' },
                  { label: 'Account Status', value: statusChip.label,           accent: suspended ? '#ef4444' : '#10b981' },
                  { label: 'Send Transfers', value: sendRestricted ? 'Blocked' : 'Allowed', accent: sendRestricted ? '#ef4444' : '#10b981' },
                ].map(c => (
                  <div key={c.label} style={card}>
                    <p style={{ fontSize: 11, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{c.label}</p>
                    <p style={{ fontSize: 22, fontWeight: 800, color: c.accent }}>{c.value}</p>
                  </div>
                ))}
              </div>

              {/* Active states */}
              {(suspended || userAlert || sendRestricted) && (
                <div>
                  <p style={label}>Active Flags</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {suspended && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
                        <Ban size={15} color="#f87171" />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#f87171' }}>Account Suspended</p>
                          {suspendReason && <p style={{ fontSize: 12, color: '#64748b' }}>{suspendReason}</p>}
                        </div>
                        <button onClick={() => adminSuspend(false, '')} style={ghostBtn}>Lift</button>
                      </div>
                    )}
                    {userAlert && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.18)' }}>
                        <Bell size={15} color="#fbbf24" />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#fbbf24' }}>Alert Active ({userAlert.type})</p>
                          <p style={{ fontSize: 12, color: '#64748b' }}>{userAlert.text}</p>
                        </div>
                        <button onClick={() => adminSetAlert(null)} style={ghostBtn}>Clear</button>
                      </div>
                    )}
                    {sendRestricted && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
                        <Lock size={15} color="#f87171" />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#f87171' }}>Transfers Restricted</p>
                          {sendRestrictMsg && <p style={{ fontSize: 12, color: '#64748b' }}>{sendRestrictMsg}</p>}
                        </div>
                        <button onClick={() => adminSetSendRestricted(false, '')} style={ghostBtn}>Lift</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recent transactions */}
              <p style={{ ...label, marginTop: 28 }}>Recent Transactions</p>
              <div style={card}>
                {transactions.slice(0, 6).map((t, i) => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#10b981' }}>{t.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>{t.name}</p>
                      <p style={{ fontSize: 11, color: '#475569' }}>{t.category} · {t.date}</p>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: t.type === 'credit' ? '#10b981' : '#f87171' }}>
                      {t.type === 'credit' ? '+' : '-'}{fmt(t.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── BALANCES ── */}
          {tab === 'Balances' && (
            <div>
              <h2 style={h2}>Balance Management</h2>

              <p style={label}>Primary USD Balance</p>
              <div style={card}>
                <p style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>Current balance</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: '#10b981', marginBottom: 18 }}>{fmt(balance)}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input type="number" value={newBalance} onChange={e => setNewBalance(e.target.value)}
                    placeholder="Enter new balance…"
                    style={input} />
                  <button onClick={applyBalance} style={primaryBtn}>Set Balance</button>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                  {[1000, 5000, 10000, 50000, 100000].map(v => (
                    <button key={v} onClick={() => adminSetBalance(v)} style={quickBtn}>{fmt(v)}</button>
                  ))}
                </div>
              </div>

              <p style={label}>Currency Balances</p>
              <div style={card}>
                {currencies.map(c => (
                  <div key={c.code} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ width: 38, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>{c.code}</span>
                      <span style={{ fontSize: 13, color: '#475569' }}>{c.symbol}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 6 }}>
                        Current: {c.symbol}{c.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      <input type="number" value={currEdits[c.code] ?? ''} onChange={e => setCurrEdits(p => ({ ...p, [c.code]: e.target.value }))}
                        placeholder={`New ${c.code} balance…`} style={{ ...input, fontSize: 13, padding: '8px 12px' }} />
                    </div>
                  </div>
                ))}
                <button onClick={applyCurrencies} style={primaryBtn}>Apply Currency Changes</button>
              </div>
            </div>
          )}

          {/* ── ACCOUNT ── */}
          {tab === 'Account' && (
            <div>
              <h2 style={h2}>Account Status</h2>
              <div style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>Account Status</p>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: statusChip.bg, color: statusChip.color, border: `1px solid ${statusChip.border}` }}>
                      {statusChip.label}
                    </span>
                  </div>
                  {suspended
                    ? <button onClick={() => adminSuspend(false, '')} style={{ ...primaryBtn, background: '#059669' }}><Unlock size={14} /> Reinstate Account</button>
                    : null
                  }
                </div>

                {!suspended && (
                  <>
                    <p style={{ ...label, marginTop: 0 }}>Suspension Reason</p>
                    <textarea value={suspendInput} onChange={e => setSuspendInput(e.target.value)}
                      placeholder="Reason shown to user (e.g. 'Suspicious activity detected. Contact support.')…"
                      rows={3} style={{ ...input, resize: 'vertical', marginBottom: 12 }} />
                    <button onClick={() => adminSuspend(true, suspendInput)} style={{ ...primaryBtn, background: 'linear-gradient(135deg,#dc2626,#ef4444)', gap: 6, display: 'flex', alignItems: 'center' }}>
                      <Ban size={14} /> Suspend Account
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── ALERTS ── */}
          {tab === 'Alerts' && (
            <div>
              <h2 style={h2}>User Alerts & Messages</h2>

              {userAlert && (
                <div style={{ marginBottom: 20, padding: '14px 18px', borderRadius: 10, background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#fbbf24', marginBottom: 2 }}>Alert currently showing to user</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>"{userAlert.text}" ({userAlert.type})</p>
                  </div>
                  <button onClick={() => adminSetAlert(null)} style={{ ...ghostBtn, display: 'flex', alignItems: 'center', gap: 5 }}><X size={12} /> Dismiss</button>
                </div>
              )}

              <div style={card}>
                <p style={label}>Alert Type</p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {ALERT_TYPES.map(t => (
                    <button key={t.value} onClick={() => setAlertType(t.value)} style={{
                      padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      background: alertType === t.value ? t.bg : 'rgba(255,255,255,0.04)',
                      color: alertType === t.value ? t.color : '#64748b',
                      border: alertType === t.value ? `1px solid ${t.border}` : '1px solid rgba(255,255,255,0.08)',
                    }}>{t.label}</button>
                  ))}
                </div>
                <p style={label}>Message</p>
                <textarea value={alertText} onChange={e => setAlertText(e.target.value)}
                  placeholder="Message to display to the user…"
                  rows={3} style={{ ...input, resize: 'vertical', marginBottom: 12 }} />
                <button onClick={applyAlert} style={{ ...primaryBtn, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Bell size={14} /> Send Alert
                </button>

                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={label}>Quick Messages</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { type: 'error',   text: 'Your account has been flagged for suspicious activity. Please contact support immediately.' },
                      { type: 'warning', text: 'Your account verification is pending. Some features may be limited until verification is complete.' },
                      { type: 'info',    text: 'We are performing scheduled maintenance. Some services may be temporarily unavailable.' },
                      { type: 'success', text: 'Your identity verification was successful. All features are now enabled.' },
                    ].map(q => {
                      const t = ALERT_TYPES.find(a => a.value === q.type);
                      return (
                        <button key={q.text} onClick={() => adminSetAlert({ type: q.type, text: q.text })} style={{
                          textAlign: 'left', padding: '10px 14px', borderRadius: 9, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer',
                        }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: t.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{q.type}</span>
                          <p style={{ fontSize: 12.5, color: '#94a3b8', marginTop: 3, lineHeight: 1.5 }}>{q.text}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TRANSACTIONS ── */}
          {tab === 'Transactions' && (
            <div>
              <h2 style={h2}>Create Transaction</h2>
              <div style={card}>
                <p style={label}>Transaction Type</p>
                <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 18 }}>
                  {['credit', 'debit'].map(t => (
                    <button key={t} onClick={() => setTxType(t)} style={{
                      flex: 1, padding: '11px', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', textTransform: 'capitalize',
                      background: txType === t ? (t === 'credit' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)') : 'rgba(255,255,255,0.03)',
                      color: txType === t ? (t === 'credit' ? '#10b981' : '#f87171') : '#64748b',
                    }}>{t === 'credit' ? '+ Credit' : '- Debit'}</button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 14 }}>
                  <div>
                    <p style={label}>Description / Name</p>
                    <input value={txName} onChange={e => setTxName(e.target.value)} placeholder="e.g. Salary Payment" style={input} />
                  </div>
                  <div>
                    <p style={label}>Avatar Initials (optional)</p>
                    <input value={txAvatar} onChange={e => setTxAvatar(e.target.value.slice(0, 2).toUpperCase())} placeholder="e.g. SP" maxLength={2} style={input} />
                  </div>
                  <div>
                    <p style={label}>Amount (USD)</p>
                    <input type="number" min="0" value={txAmount} onChange={e => setTxAmount(e.target.value)} placeholder="0.00" style={input} />
                  </div>
                  <div>
                    <p style={label}>Category</p>
                    <select value={txCategory} onChange={e => setTxCategory(e.target.value)} style={{ ...input, cursor: 'pointer' }}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <p style={label}>Date</p>
                    <input type="date" value={txDate} onChange={e => setTxDate(e.target.value)} style={input} />
                  </div>
                </div>

                <button onClick={applyTransaction} style={{ ...primaryBtn, display: 'flex', alignItems: 'center', gap: 6, background: txDone ? '#059669' : undefined }}>
                  {txDone ? <><CheckCircle size={14} /> Added!</> : <><Plus size={14} /> Create Transaction</>}
                </button>
              </div>
            </div>
          )}

          {/* ── CONTROLS ── */}
          {tab === 'Controls' && (
            <div>
              <h2 style={h2}>Transfer Controls</h2>
              <div style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>Outgoing Transfers</p>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                      background: sendRestricted ? '#fef2f2' : '#f0fdf4',
                      color: sendRestricted ? '#ef4444' : '#059669',
                      border: sendRestricted ? '1px solid #fecaca' : '1px solid #bbf7d0',
                    }}>{sendRestricted ? 'Restricted' : 'Allowed'}</span>
                  </div>
                  <button onClick={() => adminSetSendRestricted(!sendRestricted, restrictMsg)}
                    style={{ ...primaryBtn, background: sendRestricted ? '#059669' : 'linear-gradient(135deg,#dc2626,#ef4444)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {sendRestricted ? <><Unlock size={14} /> Allow Transfers</> : <><Lock size={14} /> Restrict Transfers</>}
                  </button>
                </div>
                <p style={label}>Restriction Message (shown to user)</p>
                <input value={restrictMsg} onChange={e => setRestrictMsg(e.target.value)}
                  placeholder="e.g. Outgoing transfers are temporarily disabled."
                  style={{ ...input, marginBottom: 10 }} />
                {sendRestricted && (
                  <button onClick={() => { adminSetSendRestricted(true, restrictMsg); }} style={ghostBtn}>Update Message</button>
                )}
              </div>

              <div style={{ marginTop: 20, padding: '16px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.14)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <AlertTriangle size={14} color="#f87171" />
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#f87171' }}>Danger Zone</p>
                </div>
                <p style={{ fontSize: 12, color: '#64748b', marginBottom: 14 }}>These actions affect the user's experience immediately.</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button onClick={() => { adminSuspend(true, 'Account suspended due to policy violation.'); adminSetSendRestricted(true, 'Your account has been suspended. Transfers are disabled.'); adminSetAlert({ type: 'error', text: 'Your account has been suspended. Please contact support at support@apexbank.io.' }); }}
                    style={{ ...primaryBtn, background: 'linear-gradient(135deg,#7f1d1d,#dc2626)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Ban size={14} /> Full Account Lock
                  </button>
                  <button onClick={() => { adminSuspend(false, ''); adminSetSendRestricted(false, ''); adminSetAlert(null); }}
                    style={{ ...primaryBtn, background: 'linear-gradient(135deg,#065f46,#059669)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <RefreshCw size={14} /> Restore All Access
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Shared micro-styles
const h2 = { fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 };
const label = { fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, display: 'block' };
const card = { background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px 22px', marginBottom: 20 };
const input = { width: '100%', padding: '11px 14px', borderRadius: 9, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit' };
const primaryBtn = { padding: '11px 20px', borderRadius: 9, fontSize: 13, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#b91c1c,#ef4444)', border: 'none', cursor: 'pointer' };
const ghostBtn = { padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, color: '#94a3b8', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' };
const quickBtn = { padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 600, color: '#64748b', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' };
