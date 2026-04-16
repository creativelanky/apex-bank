import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { user } from '../data/mockData';

function QR({ data }) {
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
    if (fill(r,c)) rects.push(<rect key={`${r}-${c}`} x={c*cs} y={r*cs} width={cs-.5} height={cs-.5} rx={1.2} fill="white" />);
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
    <div style={{ padding: 'clamp(20px,4vw,36px)', maxWidth: 720, margin: '0 auto' }} className="fade-up">
      <h1 style={{ fontSize: 'clamp(18px,3vw,24px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.4px', marginBottom: 4 }}>Receive Money</h1>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 28 }}>Share your details to get paid instantly</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 18 }}>
        {/* QR card */}
        <div className="glass" style={{ borderRadius: 20, padding: '26px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4, marginBottom: 22, width: '100%' }}>
            {[['tag','$Tag'],['account','Bank']].map(([k,l]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                flex: 1, padding: '8px', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none',
                background: tab===k ? 'rgba(16,185,129,0.22)' : 'transparent',
                color: tab===k ? '#34d399' : '#6b7280', transition: 'all 0.15s',
              }}>{l}</button>
            ))}
          </div>

          <div style={{ position: 'relative', padding: 14, borderRadius: 16, background: '#0a0c12', border: '1px solid rgba(16,185,129,0.15)', marginBottom: 18 }}>
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

          <p style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
            {tab==='tag' ? user.tag : 'Bank Transfer'}
          </p>
          <p style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', marginBottom: 18 }}>
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
          <div className="glass" style={{ borderRadius: 18, padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Apex Tag</p>
              <span className="chip chip-green">Instant</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
              <p style={{ flex: 1, fontSize: 16, fontWeight: 700, color: '#6ee7b7', fontFamily: 'monospace' }}>{user.tag}</p>
              <button onClick={() => copy(user.tag, 'tag2')} style={{ color: copied==='tag2' ? '#34d399' : '#6b7280', cursor: 'pointer' }}>
                {copied==='tag2' ? <Check size={14}/> : <Copy size={14}/>}
              </button>
            </div>
            <p style={{ fontSize: 11, color: '#4b5563', marginTop: 8 }}>Works within Apex — recipient needs an account</p>
          </div>

          <div className="glass" style={{ borderRadius: 18, padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Bank Transfer</p>
              <span className="chip chip-blue">ACH / Wire</span>
            </div>
            {[['Account Name',user.name,'name'],['Routing Number',user.routing,'routing'],['Account Number','452188342291','acct'],['Account Type','Checking','']].map(([k,v,ck]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 9, marginBottom: 9, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: 12, color: '#6b7280' }}>{k}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#e5e7eb', fontFamily: ck&&ck!=='name'?'monospace':'inherit' }}>{v}</span>
                  {ck && <button onClick={() => copy(v, ck)} style={{ color: copied===ck ? '#34d399' : '#374151', cursor: 'pointer' }}>
                    {copied===ck ? <Check size={12}/> : <Copy size={12}/>}
                  </button>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '13px 15px', borderRadius: 13, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)' }}>
            <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>
              <strong style={{ color: '#34d399' }}>ACH transfers</strong> arrive in 1–2 business days. Wire transfers same day if sent before 4 PM ET.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
