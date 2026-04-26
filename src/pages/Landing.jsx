import { useState, useEffect } from 'react';
import { Leaf, ArrowRight, Send, Download, CreditCard, RefreshCw, PiggyBank, FileText, Shield, Globe, Clock, Users, TrendingUp, ChevronRight, Phone, Mail, MapPin, Check, ChevronLeft } from 'lucide-react';

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
    heading: 'Smart way to keep your\nmoney safe and secure',
    sub: 'Global transfers, multi-currency accounts, and competitive savings — all in one place.',
  },
  {
    img: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=1600&q=80',
    heading: 'Grow your wealth with\nhigh-yield fixed deposits',
    sub: 'Earn up to 45% annual returns with our flexible fixed deposit plans.',
  },
  {
    img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1600&q=80',
    heading: 'Fast and flexible loans\ntailored for you',
    sub: 'Personal, business, and mortgage loans with competitive rates from 5% p.a.',
  },
];

const SERVICES = [
  { icon: Send,        title: 'Money Transfer',    desc: 'Send money globally with low fees and lightning-fast delivery.' },
  { icon: Globe,       title: 'Multi Currency',     desc: 'Hold and manage multiple currencies in one seamless account.' },
  { icon: RefreshCw,   title: 'Exchange Currency',  desc: 'Real-time exchange rates with no hidden markups.' },
  { icon: PiggyBank,   title: 'Fixed Deposit',      desc: 'Grow your savings with competitive fixed deposit interest rates.' },
  { icon: FileText,    title: 'Apply for Loan',     desc: 'Fast, flexible loan products tailored to your financial goals.' },
  { icon: Download,    title: 'Payment Request',    desc: 'Request payments from anyone, anywhere, in seconds.' },
];

const STATS = [
  { value: '500+',  label: 'Services Offered'     },
  { value: '5',     label: 'Global Branches'       },
  { value: '1M+',   label: 'Total Transactions'    },
  { value: '200+',  label: 'Supported Countries'   },
];

const DEPOSIT_PLANS = [
  { name: 'Starter',    min: '$500',   max: '$4,999',  rate: '25%',  term: '90 days',  color: '#059669' },
  { name: 'Growth',     min: '$5,000', max: '$24,999', rate: '35%',  term: '180 days', color: '#0284c7' },
  { name: 'Premium',    min: '$25,000',max: 'No limit',rate: '45%',  term: '365 days', color: '#7c3aed' },
];

const LOAN_PLANS = [
  { name: 'Personal',   range: '$1K – $50K',   rate: '5%',  term: '12–60 mo.',  color: '#059669' },
  { name: 'Business',   range: '$10K – $500K', rate: '8%',  term: '12–84 mo.',  color: '#0284c7' },
  { name: 'Mortgage',   range: '$50K – $2M',   rate: '12%', term: 'Up to 30yr', color: '#7c3aed' },
];

const WHY = [
  { icon: Shield,     title: 'Bank-Grade Security',  desc: 'End-to-end encryption, 2FA, and FDIC-insured deposits up to $250,000.' },
  { icon: Clock,      title: '24/7 Support',         desc: 'Our expert team is available around the clock for any banking need.' },
  { icon: TrendingUp, title: 'Best Rates',           desc: 'Competitive interest rates that outperform traditional high-street banks.' },
  { icon: Users,      title: 'Trusted by Thousands', desc: 'Over 50,000 customers worldwide trust Apex Bank with their finances.' },
];

const NAV_LINKS = ['Home', 'About', 'Services', 'Plans', 'FAQ', 'Contact'];

export default function Landing({ onEnter }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setSlide(s => (s + 1) % SLIDES.length);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#1e293b', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px,5vw,64px)', height: 64,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#059669,#10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>Apex Bank</span>
        </div>

        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13.5, fontWeight: 500, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}>
              {l}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onEnter} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#94a3b8', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
            Sign In
          </button>
          <button onClick={onEnter} style={{ padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg,#059669,#10b981)', border: 'none', cursor: 'pointer' }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ── HERO SLIDESHOW ── */}
      <section id="home" style={{ position: 'relative', height: '88vh', minHeight: 520, overflow: 'hidden', paddingTop: 64 }}>
        {/* Slides */}
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === slide ? 1 : 0,
            transition: 'opacity 1s ease',
            pointerEvents: i === slide ? 'auto' : 'none',
          }}>
            <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.1) 100%)' }} />
          </div>
        ))}

        {/* Text content */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', padding: '0 clamp(24px,6vw,96px)' }}>
          <div style={{ maxWidth: 620 }}>
            {/* Slide heading */}
            {SLIDES.map((s, i) => (
              <div key={i} style={{ position: i === slide ? 'relative' : 'absolute', opacity: i === slide ? 1 : 0, transition: 'opacity 0.8s ease', pointerEvents: i === slide ? 'auto' : 'none' }}>
                <h1 style={{ fontSize: 'clamp(30px,4.5vw,56px)', fontWeight: 800, color: '#fff', lineHeight: 1.18, letterSpacing: '-0.5px', marginBottom: 18, whiteSpace: 'pre-line', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
                  {s.heading}
                </h1>
                <p style={{ fontSize: 'clamp(14px,1.6vw,18px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 36, maxWidth: 500, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
                  {s.sub}
                </p>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={onEnter} style={{ padding: '13px 28px', borderRadius: 4, fontSize: 15, fontWeight: 700, color: '#fff', background: '#059669', border: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}>
                Get Started
              </button>
              <button style={{ padding: '13px 24px', borderRadius: 4, fontSize: 15, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Prev / Next arrows */}
        {[{ fn: prev, side: 'left', icon: <ChevronLeft size={26} /> }, { fn: next, side: 'right', icon: <ChevronRight size={26} /> }].map(({ fn, side, icon }) => (
          <button key={side} onClick={fn} style={{
            position: 'absolute', top: '50%', [side]: 20, transform: 'translateY(-50%)', zIndex: 3,
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(6px)', transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(5,150,105,0.7)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
          >{icon}</button>
        ))}

        {/* Dot indicators */}
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 3 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{
              width: i === slide ? 28 : 8, height: 8, borderRadius: 4,
              background: i === slide ? '#10b981' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer', transition: 'all 0.35s ease', padding: 0,
            }} />
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#fff', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 32 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color: '#059669', letterSpacing: '-1px', marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: '#f8fafc', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,440px),1fr))', gap: 60, alignItems: 'center' }}>
          {/* Image side */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', background: 'linear-gradient(135deg,#0f172a,#1e3a5f)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="Modern banking"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: -24, right: -24, background: '#fff', borderRadius: 16, padding: '18px 22px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, marginBottom: 4 }}>Active Users</p>
              <p style={{ fontSize: 28, fontWeight: 900, color: '#059669' }}>50,000+</p>
              <p style={{ fontSize: 12, color: '#64748b' }}>across 200+ countries</p>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>About Apex Bank</p>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: 18 }}>
              Banking reimagined for the digital generation
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.75, marginBottom: 28 }}>
              Apex Bank was founded with a single mission: to make world-class financial services accessible to everyone. We combine cutting-edge technology with a human-first approach to deliver a banking experience unlike any other.
            </p>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.75, marginBottom: 32 }}>
              From instant global transfers to high-yield savings and flexible loan products, we offer everything you need to take control of your financial future — all from one beautifully simple platform.
            </p>
            <button onClick={onEnter} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#059669,#10b981)', border: 'none', cursor: 'pointer' }}>
              Open an Account <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>What We Offer</p>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 14 }}>Our Services</h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>Everything you need for modern banking, all under one roof.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20 }}>
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ borderRadius: 16, padding: '28px 24px', background: '#f8fafc', border: '1px solid #e2e8f0', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ecfdf5'; e.currentTarget.style.borderColor = '#bbf7d0'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(5,150,105,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={22} color="#059669" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.65 }}>{desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16, color: '#059669', fontSize: 13, fontWeight: 600 }}>
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOSIT PLANS ── */}
      <section id="plans" style={{ background: '#f8fafc', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Grow Your Savings</p>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 14 }}>Fixed Deposit Plans</h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Lock in competitive interest rates and watch your money grow.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20, marginBottom: 60 }}>
            {DEPOSIT_PLANS.map((p, i) => (
              <div key={p.name} style={{ borderRadius: 18, overflow: 'hidden', background: '#fff', border: '1px solid #e2e8f0', boxShadow: i === 1 ? '0 20px 60px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.05)', transform: i === 1 ? 'scale(1.03)' : 'scale(1)' }}>
                <div style={{ height: 5, background: p.color }} />
                <div style={{ padding: '28px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 4 }}>{p.name} Plan</p>
                      <p style={{ fontSize: 36, fontWeight: 900, color: p.color, letterSpacing: '-1px' }}>{p.rate}</p>
                      <p style={{ fontSize: 12, color: '#94a3b8' }}>Annual Return</p>
                    </div>
                    {i === 1 && (
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99, background: '#ecfdf5', color: '#059669', border: '1px solid #bbf7d0' }}>Popular</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {[
                      `Min: ${p.min}`,
                      `Max: ${p.max}`,
                      `Term: ${p.term}`,
                      'Monthly interest payout',
                      'Early withdrawal available',
                    ].map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Check size={13} color={p.color} strokeWidth={3} />
                        <span style={{ fontSize: 13.5, color: '#475569' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={onEnter} style={{ width: '100%', padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#fff', background: p.color, border: 'none', cursor: 'pointer' }}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Loan Plans */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 10 }}>Loan Products</h2>
            <p style={{ fontSize: 15, color: '#64748b' }}>Flexible financing solutions for every need.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 16 }}>
            {LOAN_PLANS.map(p => (
              <div key={p.name} style={{ borderRadius: 16, padding: '24px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} color={p.color} />
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{p.name} Loan</p>
                  <p style={{ fontSize: 13, color: '#64748b' }}>{p.range} · {p.term}</p>
                </div>
                <p style={{ fontSize: 28, fontWeight: 900, color: p.color }}>From {p.rate}<span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}> p.a.</span></p>
                <button onClick={onEnter} style={{ padding: '10px', borderRadius: 9, fontSize: 13, fontWeight: 600, color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}30`, cursor: 'pointer' }}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ background: '#0f172a', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Why Apex Bank</p>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>Built for your financial success</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 24 }}>
            {WHY.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ padding: '28px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={22} color="#10b981" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: 'linear-gradient(135deg,#059669,#047857)', padding: 'clamp(60px,8vw,90px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#fff', letterSpacing: '-1px', marginBottom: 16 }}>
            Ready to take control of your finances?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 36 }}>
            Join over 50,000 customers already banking smarter with Apex Bank. Open your free account in minutes.
          </p>
          <button onClick={onEnter} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 36px', borderRadius: 12, fontSize: 16, fontWeight: 700, color: '#059669', background: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            Get Started — It's Free <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" style={{ background: '#0a0f1e', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,64px) 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 40, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#059669,#10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Leaf size={14} color="#fff" fill="#fff" />
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Apex Bank</span>
              </div>
              <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.7, marginBottom: 20, maxWidth: 240 }}>
                Modern banking for the digital generation. Safe, fast, and built around you.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {['f', 't', 'in', 'li'].map((_, i) => (
                  <div key={i} style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 11, fontWeight: 700, color: '#64748b' }}>
                    {['f','X','in','Li'][i]}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>Quick Links</p>
              {['Home','About Us','Services','Fixed Deposits','Loan Products','FAQ'].map(l => (
                <p key={l} style={{ fontSize: 13.5, color: '#475569', marginBottom: 10, cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = '#10b981'}
                  onMouseLeave={e => e.target.style.color = '#475569'}>{l}</p>
              ))}
            </div>

            {/* Legal */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>Legal</p>
              {['Privacy Policy','Terms & Conditions','Cookie Policy','Compliance','FDIC Disclosure'].map(l => (
                <p key={l} style={{ fontSize: 13.5, color: '#475569', marginBottom: 10, cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = '#10b981'}
                  onMouseLeave={e => e.target.style.color = '#475569'}>{l}</p>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>Contact</p>
              {[
                { icon: Phone, text: '+1 (800) 123-4567' },
                { icon: Mail,  text: 'support@apexbank.io' },
                { icon: MapPin,text: '350 Fifth Ave, New York, NY' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                  <Icon size={14} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.5 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 12.5, color: '#334155' }}>© 2025 Apex Bank. All rights reserved. FDIC Insured · Member FDIC</p>
            <p style={{ fontSize: 12.5, color: '#334155' }}>Deposits insured up to $250,000</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
