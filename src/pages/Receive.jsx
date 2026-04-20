import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { user } from '../data/mockData';

function QR({ data, dark }) {
  const size = 180, cells = 21, cs = size / cells;
  function fill(r, c) {
    if (r < 7 && c < 7) return finder(r, c, 0, 0);
    if (r < 7 && c >= cells-7) return finder(r, c, 0, cells-7);
    if (r >= cells-7 && c < 7) return finder(r, c, cells-7, 0);
    return ((r*31 + c*17 + data.charCodeAt(r % data.length)) % 3) === 0;
  }
  function finder(r, c, or_, oc) {
    const row = r-or_, col = c-oc;
    if (row===0||row===6||col===0||col===6) return true;
    return row>=2&&row<=4&&col>=2&&col<=4;
  }
  const rects = [];
  for (let r=0; r<cells; r++) for (let c=0; c<cells; c++)
    if (fill(r,c)) rects.push(<rect key={`${r}-${c}`} x={c*cs} y={r*cs} width={cs-.5} height={cs-.5} rx={1.2} fill={dark ? 'white' : '#1e293b'} />);
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{rects}</svg>;
}

export default function Receive() {
  const [tab, setTab]     = useState('tag');
  const [copied, setCopied] = useState('');
  function copy(text, key) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key); setTimeout(() => setCopied(''), 2200);
  }
  const corners = [['top','left'],['top','right'],['bottom','left'],['bottom','right']];

  return (
    <div style={{ minHeight: '100%', background: 'var(--page-bg)' }} className="fade-up">
      <div style={{ background: 'var(--page-header-bg)', borderBottom: '1px solid var(--page-header-border)', padding: '18px clamp(16px,3vw,32px)' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--page-header-text)', marginBottom: 2 }}>Receive Money</h1>
        <p style={{ fontSize: 12.5, color: 'var(--text-2)' }}>Share your details to get paid instantly</p>
      </div>

      <div style={{ padding: 'clamp(16px,3vw,28px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 18, maxWidth: 720, margin: '0 auto' }}>
          {/* QR card */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '26px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', background: 'var(--input-bg)', borderRadius: 12, padding: 4, marginBottom: 22, width: '100%', border: '1px solid var(--border)' }}>
              {[['tag','$Tag'],['account','Bank']].map(([k,l]) => (
                <button key={k} onClick={() => setTab(k)} style={{
                  flex: 1, padding: '8px', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none',
                  background: tab===k ? 'var(--accent-bg)' : 'transparent',
                  color: tab===k ? 'var(--accent)' : 'var(--text-2)', transition: 'all 0.15s',
                }}>{l}</button>
              ))}
            </div>

            <div style={{ position: 'relative', padding: 14, borderRadius: 16, background: 'var(--surface-solid)', border: '1px solid var(--accent-border)', marginBottom: 18 }}>
              <QR data={tab==='tag' ? user.tag : '4521883422916647'} />
              {corners.map(([v,h], i) => (
                <div key={i} style={{
                  position: 'absolute', [v]: 8, [h]: 8, width: 18, height: 18,
                  borderColor: '#10b981', borderStyle: 'solid',
                  borderTopWidth: v==='top'?2:0, borderBottomWidth: v==='bottom'?2:0,
                  borderLeftWidth: h==='left'?2:0, borderRightWidth: h==='right'?2:0,
                  borderRadius: v==='top'&&h==='left'?'4px 0 0 0':v==='top'&&h==='right'?'0 4px 0 0':v==='bottom'&&h==='left'?'0 0 0 4px':'0 0 4px 0',
                }} />
              ))}
            </div>

            <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>
              {tab==='tag' ? user.tag : 'Bank Transfer'}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-2)', textAlign: 'center', marginBottom: 18 }}>
              {tab==='tag' ? 'Scan to pay via Apex tag' : 'Scan for routing & account info'}
            </p>

            <div style={{ display: 'flex', gap: 8, width: '100%' }}>
              <button className="btn-primary" onClick={() => copy(tab==='tag' ? user.tag : '021000021 / 452188342291', tab)}
                style={{ flex: 1, padding: '11px', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                {copied===tab ? <><Check size={14}/> Copied!</> : <><Copy size={14}/> Copy</>}
              </button>
              <button className="btn-ghost" style={{ padding: '11px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Share2 size={14} />
              </button>
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: '20px 22px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>Apex Tag</p>
                <span className="chip chip-green">Instant</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 12, background: 'var(--input-bg)', border: '1px solid var(--input-border)' }}>
                <p style={{ flex: 1, fontSize: 16, fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace' }}>{user.tag}</p>
                <button onClick={() => copy(user.tag, 'tag2')} style={{ color: copied==='tag2' ? 'var(--accent)' : 'var(--text-3)', cursor: 'pointer' }}>
                  {copied==='tag2' ? <Check size={14}/> : <Copy size={14}/>}
                </button>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>Works within Apex — recipient needs an account</p>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: '20px 22px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>Bank Transfer</p>
                <span className="chip chip-blue">ACH / Wire</span>
              </div>
              {[['Account Name',user.name,'name'],['Routing Number',user.routing,'routing'],['Account Number','452188342291','acct'],['Account Type','Checking','']].map(([k,v,ck]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 9, marginBottom: 9, borderBottom: '1px solid var(--divider)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{k}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--input-text)', fontFamily: ck&&ck!=='name'?'monospace':'inherit' }}>{v}</span>
                    {ck && <button onClick={() => copy(v, ck)} style={{ color: copied===ck ? 'var(--accent)' : 'var(--text-3)', cursor: 'pointer' }}>
                      {copied===ck ? <Check size={12}/> : <Copy size={12}/>}
                    </button>}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '13px 15px', borderRadius: 13, background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
              <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--accent)' }}>ACH transfers</strong> arrive in 1–2 business days. Wire transfers same day if sent before 4 PM ET.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
