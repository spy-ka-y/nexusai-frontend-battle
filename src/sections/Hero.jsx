import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowTrendingUp, ChartPie, CogTooth, ArrowPath } from '../assets/icons';
import { prefersReducedMotion } from '../utils/motion';

const STATS = [
  { icon: ArrowTrendingUp, value: '10x',  label: 'Faster Processing' },
  { icon: ChartPie,        value: '99.9%',label: 'Uptime SLA'        },
  { icon: CogTooth,        value: '500+', label: 'Integrations'      },
  { icon: ArrowPath,       value: '2M+',  label: 'Events/Second'     },
];

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('.h-badge, .h-title, .h-sub, .h-ctas, .h-stat', { y: 0, opacity: 1 });
        return;
      }
      // All entrance anim within 500ms budget
      const tl = gsap.timeline();
      tl.fromTo('.h-badge',  { y:18, opacity:0 }, { y:0, opacity:1, duration:0.28, ease:'power3.out' }, 0.08)
        .fromTo('.h-title',  { y:50, opacity:0 }, { y:0, opacity:1, duration:0.32, ease:'power3.out' }, 0.15)
        .fromTo('.h-sub',    { y:22, opacity:0 }, { y:0, opacity:1, duration:0.28, ease:'power3.out' }, 0.25)
        .fromTo('.h-ctas',   { y:18, opacity:0 }, { y:0, opacity:1, duration:0.25, ease:'power3.out' }, 0.32)
        .fromTo('.h-stat',   { y:18, opacity:0 }, { y:0, opacity:1, stagger:0.06, duration:0.25, ease:'power3.out' }, 0.38);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" aria-labelledby="hero-heading"
      className="section grid-bg relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">

      {/* Background glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(255,200,1,0.08) 0%, transparent 65%)' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,153,50,0.06) 0%, transparent 65%)' }} />
        {/* Pulse rings around hero */}
        {[0,1,2].map(i => (
          <div key={i} className="pulse-ring absolute top-1/2 left-1/2 rounded-full border"
            style={{
              width:`${320+i*130}px`, height:`${320+i*130}px`,
              marginLeft:`-${(320+i*130)/2}px`, marginTop:`-${(320+i*130)/2}px`,
              borderColor:'rgba(255,200,1,0.08)',
              animationDelay:`${i*1}s`
            }} />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="h-badge inline-flex items-center gap-2 glass-brand rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-primary)] animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold text-[var(--c-text-2)] tracking-wide font-mono">
              Next-Gen AI Platform · Now in Public Beta
            </span>
          </div>

          {/* Headline */}
          <h1 id="hero-heading" className="h-title text-5xl sm:text-6xl lg:text-7xl font-display font-black leading-tight tracking-tight mb-5">
            Automate Your Data<br />
            <span className="gradient-text">Pipeline With AI</span>
          </h1>

          {/* Sub */}
          <p className="h-sub text-lg sm:text-xl text-[var(--c-text-2)] max-w-2xl mx-auto leading-relaxed mb-10 font-body">
            NexusAI transforms raw data chaos into actionable intelligence.
            Ingest, process, and deploy insights at machine speed — without writing a single pipeline.
          </p>

          {/* CTAs */}
          <div className="h-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#pricing" className="btn-primary text-base px-8 py-3.5">
              Start for Free
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
            <a href="#features" className="btn-ghost text-base px-8 py-3.5">
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="h-stat glass rounded-2xl px-4 py-5 text-center group hover:border-[var(--c-border)] transition-colors">
                <div className="flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-[var(--c-primary)]" />
                </div>
                <dt className="text-2xl sm:text-3xl font-display font-black gradient-text mb-0.5">{value}</dt>
                <dd className="text-[10px] text-[var(--c-text-3)] font-medium uppercase tracking-widest font-body">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden="true" className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[9px] text-[var(--c-text-3)] uppercase tracking-widest font-display">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--c-primary)] to-transparent" style={{ animation: 'bounce 2s infinite' }} />
      </div>
    </section>
  );
}
