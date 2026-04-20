import { useState, useRef, useEffect } from 'react';
import {
  Building2, Zap, ArrowRight, Check, Clock, ChevronDown,
  RotateCcw, Delete, Info, ShieldCheck, AlertCircle, Smartphone, RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

function generateOtp() { return String(Math.floor(100000 + Math.random() * 900000)); }

const fmt = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 });

const BANKS = [
  'Chase', 'Bank of America', 'Wells Fargo', 'Citibank',
  'U.S. Bank', 'Capital One', 'Goldman Sachs (Marcus)', 'PNC Bank',
  'TD Bank', 'Ally Bank', 'Discover Bank', 'Navy Federal Credit Union',
  'Charles Schwab Bank', 'American Express National Bank', 'Other',
];

const TRANSFER_TYPES = [
  {
    id: 'ach',
    label: 'ACH Transfer',
    icon: <Building2 size={22} />,
    fee: 'Free',
    time: '1–2 business days',
    desc: 'Standard bank-to-bank transfer via the ACH network. Best for non-urgent transfers.',
  },
  {
    id: 'wire',
    label: 'Wire Transfer',
    icon: <Zap size={22} />,
    fee: '$15.00',
    time: 'Same day (by 4 PM ET)',
    desc: 'Faster, direct transfer. Guaranteed same-day delivery for domestic wires.',
  },
];

const STEPS = ['Type', 'Bank Details', 'Review', 'OTP', 'Done'];

export default function Send({ onNav }) {
  const { send, balance } = useApp();
  const [step, setStep]           = useState(0);
  const [type, setType]           = useState(null);
  const [bankName, setBankName]   = useState('');
  const [showBanks, setShowBanks] = useState(false);
  const [bankSearch, setBankSearch] = useState('');
  const [holderName, setHolderName] = useState('');
  const [routing, setRouting]     = useState('');
  const [accountNum, setAccountNum] = useState('');
  const [acctType, setAcctType]   = useState('checking');
  const [amount, setAmount]       = useState('');
  const [memo, setMemo]           = useState('');
  const [otp, setOtp]             = useState('');
  const [otpError, setOtpError]   = useState(false);
  const [otpCode, setOtpCode]     = useState('');
  const [countdown, setCountdown] = useState(0);
  const [txId]                    = useState(() => 'APX' + Math.random().toString(36).slice(2, 10).toUpperCase());
  const bankRef = useRef(null);

  const num       = parseFloat(amount) || 0;
  const fee       = type === 'wire' ? 15 : 0;
  const total     = num + fee;
  const filteredBanks = BANKS.filter(b => b.toLowerCase().includes(bankSearch.toLowerCase()));

  function canAdvance() {
    if (step === 0) return !!type;
    if (step === 1) return bankName && holderName && routing.length === 9 && accountNum.length >= 4 && num > 0 && total <= balance;
    if (step === 2) return true;
    return false;
  }

  function sendOtp() {
    const code = generateOtp();
    setOtpCode(code);
    setOtp('');
    setOtpError(false);
    setCountdown(30);
  }

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function handleOtpKey(k) {
    if (k === 'del') { setOtp(p => p.slice(0, -1)); setOtpError(false); return; }
    if (otp.length >= 6) return;
    const next = otp + k;
    setOtp(next);
    if (next.length === 6) {
      setTimeout(() => {
        if (next === otpCode) {
          send({ name: holderName, avatar: holderName.slice(0, 2).toUpperCase() }, num, memo || `${type === 'ach' ? 'ACH' : 'Wire'} to ${bankName}`);
          setStep(4);
        } else {
          setOtpError(true);
          setOtp('');
        }
      }, 300);
    }
  }

  function reset() {
    setStep(0); setType(null); setBankName(''); setHolderName('');
    setRouting(''); setAccountNum(''); setAmount(''); setMemo('');
    setOtp(''); setOtpError(false);
  }

  /* Step 4: Pending */
  if (step === 4) return (
    <div style={{ minHeight: '100%', background: 'var(--page-bg)' }} className="fade-up">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '40px 24px', gap: 0 }}>
        <div style={{ position: 'relative', marginBottom: 28 }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg, #065f46, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 16px rgba(16,185,129,0.08)' }}>
            <Clock size={40} color="#fff" />
          </div>
        </div>
        <p style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.5px', marginBottom: 8, textAlign: 'center' }}>Transfer Pending</p>
        <p style={{ fontSize: 14, color: 'var(--text-2)', textAlign: 'center', maxWidth: 320, lineHeight: 1.6, marginBottom: 32 }}>
          Your {type === 'ach' ? 'ACH' : 'wire'} transfer of <strong style={{ color: 'var(--text-1)' }}>{fmt(num)}</strong> to <strong style={{ color: 'var(--text-1)' }}>{holderName}</strong> is being processed.
        </p>

        <div style={{ width: '100%', maxWidth: 420, borderRadius: 18, background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px 22px', marginBottom: 24, boxShadow: 'var(--shadow)' }}>
          {[
            ['Transaction ID', txId],
            ['Recipient',      holderName],
            ['Bank',           bankName],
            ['Amount',         fmt(num)],
            ['Fee',            fee ? fmt(fee) : 'Free'],
            ['Estimated',      type === 'ach' ? '1–2 business days' : 'Today by 5 PM ET'],
            ['Status',         'Processing'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid var(--divider)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--input-text)', fontFamily: k === 'Transaction ID' ? 'monospace' : 'inherit' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 420 }}>
          <button className="btn-ghost" style={{ flex: 1, padding: '13px', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onClick={reset}>
            <RotateCcw size={14} /> New Transfer
          </button>
          <button className="btn-primary" style={{ flex: 1, padding: '13px', fontSize: 14 }} onClick={() => onNav('dashboard')}>
            Back to Overview
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100%', background: 'var(--page-bg)' }} className="fade-up">
      {/* Page header */}
      <div style={{ background: 'var(--page-header-bg)', borderBottom: '1px solid var(--page-header-border)', padding: '18px clamp(16px,3vw,32px)' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--page-header-text)', marginBottom: 2 }}>Send Money</h1>
        <p style={{ fontSize: 12.5, color: 'var(--text-2)' }}>Domestic bank transfer · ACH or Wire</p>
      </div>

      <div style={{ padding: 'clamp(20px,4vw,32px)', maxWidth: 680, margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 36, overflowX: 'auto', paddingBottom: 4 }}>
          {STEPS.slice(0, 4).map((s, i) => {
            const done   = step > i;
            const active = step === i;
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: done ? '#059669' : active ? 'linear-gradient(135deg,#059669,#10b981)' : 'var(--step-inactive)',
                    fontSize: 12, fontWeight: 700, color: done || active ? '#fff' : 'var(--step-inactive-text)',
                    boxShadow: active ? '0 0 0 4px rgba(16,185,129,0.15)' : 'none',
                    transition: 'all 0.3s ease',
                  }}>
                    {done ? <Check size={13} strokeWidth={3} /> : i + 1}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, color: active ? 'var(--accent)' : done ? '#059669' : 'var(--step-inactive-text)', whiteSpace: 'nowrap' }}>{s}</span>
                </div>
                {i < 3 && (
                  <div style={{ width: 'clamp(24px, 5vw, 52px)', height: 2, background: step > i ? '#059669' : 'var(--step-inactive)', margin: '0 6px', marginBottom: 20, transition: 'background 0.4s ease', flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* STEP 0: Transfer Type */}
        {step === 0 && (
          <div className="scale-in">
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)', marginBottom: 16 }}>Select transfer type</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 32 }}>
              {TRANSFER_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  style={{
                    textAlign: 'left', padding: '20px', borderRadius: 18, cursor: 'pointer',
                    background: type === t.id ? 'var(--accent-bg)' : 'var(--input-bg)',
                    border: type === t.id ? '1.5px solid var(--accent-border)' : '1.5px solid var(--border)',
                    transition: 'all 0.2s ease', position: 'relative',
                  }}
                >
                  {type === t.id && (
                    <div style={{ position: 'absolute', top: 14, right: 14, width: 20, height: 20, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={11} color="#fff" strokeWidth={3} />
                    </div>
                  )}
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: type === t.id ? 'var(--accent-bg)' : 'var(--step-inactive)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: type === t.id ? 'var(--accent)' : 'var(--text-2)', marginBottom: 14 }}>
                    {t.icon}
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', marginBottom: 5 }}>{t.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 14 }}>{t.desc}</p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 99, background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                      {t.fee === 'Free' ? '✓ Free' : `Fee: ${t.fee}`}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 99, background: 'var(--step-inactive)', color: 'var(--text-2)' }}>
                      {t.time}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ padding: '13px 16px', borderRadius: 12, background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', gap: 10, marginBottom: 24 }}>
              <Info size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
                Transfers are FDIC-insured and processed through the Federal Reserve network. Daily limit: <strong style={{ color: 'var(--text-1)' }}>$50,000</strong>.
              </p>
            </div>

            <button className="btn-primary" disabled={!type} onClick={() => setStep(1)}
              style={{ width: '100%', padding: '15px', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 1: Bank Details */}
        {step === 1 && (
          <div className="scale-in">
            <div style={{ padding: '11px 14px', borderRadius: 10, background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>{type === 'ach' ? 'ACH Transfer' : 'Wire Transfer'}</span>
              <button onClick={() => setStep(0)} style={{ fontSize: 11, color: 'var(--text-2)', cursor: 'pointer', marginLeft: 4 }}>Change</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Bank selector */}
              <div>
                <label style={labelStyle}>Recipient's Bank</label>
                <div style={{ position: 'relative' }} ref={bankRef}>
                  <button
                    onClick={() => { setShowBanks(v => !v); setBankSearch(''); }}
                    style={{ width: '100%', padding: '13px 16px', borderRadius: 14, background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: bankName ? 'var(--input-text)' : 'var(--text-3)', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  >
                    {bankName || 'Select bank…'}
                    <ChevronDown size={15} color="var(--text-3)" style={{ transform: showBanks ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  {showBanks && (
                    <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 100, borderRadius: 14, background: 'var(--surface-solid)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.18)' }}>
                      <div style={{ padding: 10, borderBottom: '1px solid var(--divider)' }}>
                        <input value={bankSearch} onChange={e => setBankSearch(e.target.value)} placeholder="Search banks…"
                          style={{ width: '100%', padding: '8px 12px', borderRadius: 9, background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--input-text)', fontSize: 13 }}
                          autoFocus />
                      </div>
                      <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                        {filteredBanks.map(b => (
                          <button key={b} onClick={() => { setBankName(b); setShowBanks(false); }}
                            style={{ width: '100%', textAlign: 'left', padding: '11px 16px', fontSize: 13, color: bankName === b ? 'var(--accent)' : 'var(--text-1)', background: bankName === b ? 'var(--accent-bg)' : 'transparent', cursor: 'pointer', border: 'none', transition: 'background 0.1s' }}
                            className="hover-row">
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <Field label="Account Holder Name" value={holderName} onChange={setHolderName} placeholder="Full legal name" />
                <div>
                  <label style={labelStyle}>Account Type</label>
                  <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    {['checking', 'savings'].map(t => (
                      <button key={t} onClick={() => setAcctType(t)}
                        style={{ flex: 1, padding: '12px', fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none', textTransform: 'capitalize',
                          background: acctType === t ? 'var(--accent-bg)' : 'var(--input-bg)',
                          color: acctType === t ? 'var(--accent)' : 'var(--text-2)', transition: 'all 0.15s ease' }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <Field label="Routing Number (9 digits)" value={routing} onChange={v => setRouting(v.replace(/\D/g,'').slice(0,9))} placeholder="e.g. 021000021" mono hint={routing.length > 0 && routing.length < 9 ? `${routing.length}/9 digits` : null} />
                <Field label="Account Number" value={accountNum} onChange={v => setAccountNum(v.replace(/\D/g,''))} placeholder="Your account number" mono />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Amount (USD)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', borderRadius: 14, background: 'var(--input-bg)', border: '1px solid var(--input-border)' }}>
                    <span style={{ color: 'var(--text-3)', fontSize: 18, fontWeight: 600 }}>$</span>
                    <input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"
                      style={{ flex: 1, fontSize: 22, fontWeight: 700, color: 'var(--input-text)', background: 'transparent', letterSpacing: '-0.3px' }} />
                  </div>
                  {num > 0 && <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 5 }}>Available: {fmt(balance)} · Total with fee: {fmt(total)}</p>}
                  {num > balance && <p style={{ fontSize: 11, color: '#f87171', marginTop: 5 }}>Insufficient funds</p>}
                </div>
                <Field label="Memo / Reference (optional)" value={memo} onChange={setMemo} placeholder="What's this for?" />
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
              <button className="btn-ghost" style={{ padding: '13px 20px', fontSize: 14 }} onClick={() => setStep(0)}>Back</button>
              <button className="btn-primary" disabled={!canAdvance()} onClick={() => setStep(2)}
                style={{ flex: 1, padding: '13px', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                Review Transfer <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Review */}
        {step === 2 && (
          <div className="scale-in">
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)', marginBottom: 16 }}>Review your transfer</p>

            <div style={{ borderRadius: 20, background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 16, boxShadow: 'var(--shadow)' }}>
              {/* Amount hero */}
              <div style={{ padding: '28px 24px', background: 'linear-gradient(135deg, #042f1e, #064e3b)', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: 13, color: '#6ee7b7', marginBottom: 6 }}>{type === 'ach' ? 'ACH Transfer' : 'Wire Transfer'}</p>
                <p style={{ fontSize: 44, fontWeight: 800, color: '#fff', letterSpacing: '-1.5px' }}>{fmt(num)}</p>
                {fee > 0 && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>+{fmt(fee)} wire fee</p>}
              </div>
              {/* Details */}
              <div style={{ padding: '18px 24px' }}>
                {[
                  ['To',             holderName],
                  ['Bank',           bankName],
                  ['Account Type',   acctType.charAt(0).toUpperCase() + acctType.slice(1)],
                  ['Routing No.',    `•••••${routing.slice(-4)}`],
                  ['Account No.',    `•••••${accountNum.slice(-4)}`],
                  ['Fee',            fee ? fmt(fee) : 'Free ✓'],
                  ['Total Deducted', fmt(total)],
                  ['Est. Arrival',   type === 'ach' ? '1–2 business days' : 'Same day by 5 PM ET'],
                  ...(memo ? [['Memo', memo]] : []),
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--divider)' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{k}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: k === 'Total Deducted' ? 'var(--accent)' : 'var(--input-text)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: 12, background: 'var(--warning-bg)', border: '1px solid var(--warning-border)', display: 'flex', gap: 10, marginBottom: 20 }}>
              <AlertCircle size={14} color="#fbbf24" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
                Please verify all details before continuing. Transfers cannot be reversed once sent.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-ghost" style={{ padding: '13px 20px', fontSize: 14 }} onClick={() => setStep(1)}>Edit</button>
              <button className="btn-primary" onClick={() => { sendOtp(); setStep(3); }}
                style={{ flex: 1, padding: '13px', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <ShieldCheck size={16} /> Confirm with OTP
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: OTP */}
        {step === 3 && (
          <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, #065f46, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 0 0 12px rgba(16,185,129,0.08)' }}>
              <Smartphone size={28} color="#fff" />
            </div>

            <p style={{ fontSize: 21, fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>Verify with OTP</p>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 6, textAlign: 'center', lineHeight: 1.6 }}>
              A 6-digit code was sent to your registered<br />phone number ending in <strong style={{ color: 'var(--text-1)' }}>•••• 7823</strong>
            </p>

            {/* Demo hint */}
            <div style={{ marginBottom: 28, padding: '8px 16px', borderRadius: 10, background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
              <p style={{ fontSize: 12, color: 'var(--accent)', textAlign: 'center' }}>
                Demo code: <strong style={{ fontFamily: 'monospace', letterSpacing: '0.15em' }}>{otpCode}</strong>
              </p>
            </div>

            {/* OTP dots */}
            <div style={{ display: 'flex', gap: 12, marginBottom: otpError ? 10 : 32 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: i < otp.length ? '#10b981' : 'var(--step-inactive)',
                  border: i < otp.length ? '2px solid #10b981' : '2px solid var(--border)',
                  transform: i < otp.length ? 'scale(1.25)' : 'scale(1)',
                  transition: 'all 0.15s ease',
                  boxShadow: i < otp.length ? '0 0 8px rgba(16,185,129,0.55)' : 'none',
                }} />
              ))}
            </div>

            {otpError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
                <AlertCircle size={13} color="#f87171" />
                <p style={{ fontSize: 12, color: '#f87171' }}>Incorrect code. Please try again.</p>
              </div>
            )}

            {/* Keypad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%', maxWidth: 290, marginBottom: 20 }}>
              {['1','2','3','4','5','6','7','8','9','','0','del'].map((k, idx) => (
                k === '' ? <div key={idx} /> : (
                  <button key={k} onClick={() => handleOtpKey(k)}
                    style={{
                      height: 62, borderRadius: 16,
                      fontSize: k === 'del' ? 14 : 22, fontWeight: k === 'del' ? 500 : 600,
                      color: k === 'del' ? 'var(--text-2)' : 'var(--text-1)',
                      background: 'var(--input-bg)', border: '1px solid var(--border)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.1s ease',
                    }}
                    onMouseDown={e => e.currentTarget.style.background = 'var(--accent-bg)'}
                    onMouseUp={e => e.currentTarget.style.background = 'var(--input-bg)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--input-bg)'}
                  >
                    {k === 'del' ? <Delete size={17} /> : k}
                  </button>
                )
              ))}
            </div>

            {/* Resend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              {countdown > 0 ? (
                <p style={{ fontSize: 13, color: 'var(--text-3)' }}>
                  Resend code in <strong style={{ color: 'var(--text-2)' }}>{countdown}s</strong>
                </p>
              ) : (
                <button
                  onClick={() => { sendOtp(); }}
                  style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <RefreshCw size={13} /> Resend OTP
                </button>
              )}
            </div>

            <button className="btn-ghost" style={{ padding: '10px 24px', fontSize: 13 }} onClick={() => { setStep(2); setOtp(''); setOtpError(false); }}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = { fontSize: 12, fontWeight: 600, color: 'var(--label-text)', display: 'block', marginBottom: 7, letterSpacing: '0.03em' };

function Field({ label, value, onChange, placeholder, mono, hint }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '13px 16px', borderRadius: 14,
          background: 'var(--input-bg)', border: '1px solid var(--input-border)',
          color: 'var(--input-text)', fontSize: 14, fontFamily: mono ? 'monospace' : 'inherit',
          letterSpacing: mono ? '0.05em' : 'inherit',
        }}
      />
      {hint && <p style={{ fontSize: 11, color: '#f59e0b', marginTop: 5 }}>{hint}</p>}
    </div>
  );
}
