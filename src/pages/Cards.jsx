import { useState } from 'react';
import { Eye, EyeOff, Copy, Check, Lock, Unlock, Leaf, Plus, Delete } from 'lucide-react';
import { card } from '../data/mockData';

const fmt = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 });
const fmtD = s => new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function Cards() {
  const [reveal, setReveal]   = useState(false);
  const [copied, setCopied]   = useState(false);
  const [locked, setLocked]   = useState(false);
  const [flipped, setFlipped] = useState(false);
  const spentPct = Math.min((card.spent / card.limit) * 100, 100);

  function copy() {
    navigator.clipboard.writeText(card.number.replace(/\s/g, '')).catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ padding: 'clamp(20px,4vw,36px)', maxWidth: 1000, margin: '0 auto' }} className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px,3vw,24px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.4px', marginBottom: 3 }}>Cards</h1>
          <p style={{ fontSize: 13, color: '#6b7280' }}>Manage your virtual cards</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 18px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={14} /> New Card
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 20 }}>
        {/* Card visual */}
        <div>
          <div onClick={() => setFlipped(f => !f)}
            style={{ width: '100%', aspectRatio: '1.586', position: 'relative', cursor: 'pointer', marginBottom: 14, perspective: 1000, transformStyle: 'preserve-3d' }}>
            {/* Front */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 20,
              background: locked
                ? 'linear-gradient(135deg, #1f2937, #374151)'
                : 'linear-gradient(135deg, #022c22 0%, #064e3b 45%, #065f46 100%)',
              padding: 'clamp(18px,3vw,28px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              boxShadow: locked ? 'none' : '0 28px 72px rgba(5,150,105,0.3)',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              backfaceVisibility: 'hidden', transition: 'transform 0.6s ease', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Leaf size={13} color="#34d399" fill="#34d399" />
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#34d399', letterSpacing: '0.06em' }}>APEX</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.1em' }}>{card.brand}</p>
                  {locked && <p style={{ fontSize: 10, color: '#f87171', fontWeight: 600 }}>🔒 Locked</p>}
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 36, height: 26, borderRadius: 5, background: 'linear-gradient(135deg, #fcd34d, #d97706)', marginBottom: 16 }} />
                <p style={{ fontFamily: 'monospace', fontSize: 'clamp(13px,2.5vw,17px)', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.18em', fontWeight: 500 }}>
                  {reveal ? card.number : card.masked}
                </p>
              </div>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: 2 }}>CARD HOLDER</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em' }}>{card.holder}</p>
                </div>
                <div>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: 2 }}>EXPIRES</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontFamily: 'monospace' }}>{card.expiry}</p>
                </div>
              </div>
            </div>
            {/* Back */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 20,
              background: 'linear-gradient(135deg, #022c22, #065f46)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              transform: flipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
              backfaceVisibility: 'hidden', overflow: 'hidden',
            }}>
              <div style={{ background: 'rgba(0,0,0,0.5)', height: 44, marginBottom: 20 }} />
              <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 34, background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 4px, transparent 4px, transparent 8px)', borderRadius: 4 }} />
                <div style={{ background: '#fff', borderRadius: 6, padding: '6px 14px', minWidth: 56, textAlign: 'center' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1f2937', fontFamily: 'monospace', letterSpacing: '0.1em' }}>{reveal ? card.cvv : '•••'}</p>
                </div>
              </div>
              <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 8 }}>CVV</p>
            </div>
          </div>
          <p style={{ fontSize: 11, color: '#374151', textAlign: 'center', marginBottom: 14 }}>Click card to flip</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <CardAction icon={reveal ? <EyeOff size={15}/> : <Eye size={15}/>}       label={reveal ? 'Hide' : 'Reveal'}  onClick={() => setReveal(v=>!v)} />
            <CardAction icon={copied ? <Check size={15} color="#34d399"/> : <Copy size={15}/>} label={copied ? 'Copied' : 'Copy'}  onClick={copy} active={copied} />
            <CardAction icon={locked ? <Lock size={15} color="#f87171"/> : <Unlock size={15}/>} label={locked ? 'Unlock' : 'Lock'} onClick={() => setLocked(v=>!v)} danger={locked} />
          </div>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Limit */}
          <div className="glass" style={{ borderRadius: 18, padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Monthly Limit</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#6ee7b7' }}>{fmt(card.spent)} / {fmt(card.limit)}</span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${spentPct}%`, borderRadius: 99, background: spentPct > 80 ? 'linear-gradient(90deg,#ef4444,#f87171)' : 'linear-gradient(90deg,#059669,#10b981)', transition: 'width 0.8s cubic-bezier(.22,1,.36,1)' }} />
            </div>
            <p style={{ fontSize: 11, color: '#6b7280', marginTop: 6 }}>{(100-spentPct).toFixed(0)}% remaining</p>
          </div>

          {/* Card info */}
          <div className="glass" style={{ borderRadius: 18, padding: '20px 22px' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 14 }}>Card Details</p>
            {[['Status','● Active','#34d399'],['Network',card.brand,'#6ee7b7'],['Type',card.type,'#9ca3af'],['Expires',card.expiry,'#9ca3af']].map(([k,v,c]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 9, marginBottom: 9, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: c }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Card transactions */}
          <div className="glass" style={{ borderRadius: 18, padding: '20px 22px', flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 14 }}>Card Transactions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {card.transactions.map(t => (
                <div key={t.id} className="hover-row" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{t.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#e5e7eb' }}>{t.merchant}</p>
                    <p style={{ fontSize: 11, color: '#4b5563' }}>{fmtD(t.date)}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>-{fmt(t.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardAction({ icon, label, onClick, active, danger }) {
  return (
    <button onClick={onClick} style={{
      padding: '11px', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
      background: danger ? 'rgba(239,68,68,0.08)' : active ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.04)',
      border: danger ? '1px solid rgba(239,68,68,0.15)' : '1px solid rgba(255,255,255,0.07)',
      color: danger ? '#f87171' : active ? '#34d399' : '#9ca3af', cursor: 'pointer', transition: 'all 0.15s',
    }}>
      {icon}
      <span style={{ fontSize: 11, fontWeight: 500 }}>{label}</span>
    </button>
  );
}
