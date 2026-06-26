import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowPath, ArrowTrendingUp, ChartPie, CogTooth, LinkSolid } from '../assets/icons';
import { prefersReducedMotion } from '../utils/motion';
gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: 0, icon: ArrowPath, tag: 'Core Engine',
    title: 'Real-Time Stream Processing',
    desc: 'Ingest and transform millions of events per second with sub-10ms latency. Built on distributed architecture optimized for throughput and reliability.',
    span: 'span-2', accent: '#FFC801',
  },
  {
    id: 1, icon: ChartPie, tag: 'Intelligence',
    title: 'AI-Powered Enrichment',
    desc: 'Automatically classify, tag, and enrich every data record using fine-tuned models. Zero configuration required.',
    accent: '#FF9932',
  },
  {
    id: 2, icon: LinkSolid, tag: 'Integrations',
    title: '500+ Native Connectors',
    desc: 'One-click connectors to every database, warehouse, API, and SaaS tool. Bidirectional sync with conflict resolution built in.',
    span: 'span-row', accent: '#D9E8E2',
  },
  {
    id: 3, icon: CogTooth, tag: 'Security',
    title: 'Enterprise-Grade Security',
    desc: 'SOC 2 Type II certified. End-to-end encryption, RBAC, audit logs, and VPC-peering support for compliance-heavy orgs.',
    accent: '#FFC801',
  },
  {
    id: 4, icon: ArrowTrendingUp, tag: 'Observability',
    title: 'Unified Pipeline Visibility',
    desc: 'Full-stack pipeline metrics, error alerting, and data lineage tracing in one live dashboard. No blind spots.',
    accent: '#FF9932',
  },
];

function BentoNode({ feature, isActive, onHover }) {
  const Icon = feature.icon;
  return (
    <article
      className={`bento-node ${feature.span || ''} ${isActive ? 'active' : ''}`}
      onMouseEnter={() => onHover(feature.id)}
      onMouseLeave={() => onHover(null)}
      role="listitem"
      aria-label={feature.title}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{ background: `${feature.accent}18`, boxShadow: isActive ? `0 0 20px ${feature.accent}30` : 'none' }}>
          <Icon className="w-5 h-5" style={{ color: feature.accent }} />
        </div>
        <span className="text-[9px] font-display font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
          style={{ background: `${feature.accent}15`, color: feature.accent }}>
          {feature.tag}
        </span>
      </div>
      <h3 className="font-display text-sm font-bold text-[var(--c-text)] mb-2 leading-snug">{feature.title}</h3>
      <p className="text-xs text-[var(--c-text-3)] leading-relaxed font-body">{feature.desc}</p>
      <div className="mt-4 h-px w-0 rounded transition-all duration-500"
        style={{ background: `linear-gradient(90deg,${feature.accent},transparent)`, width: isActive ? '100%' : '0%' }} />
    </article>
  );
}

function AccordionItem({ feature, isOpen, onToggle }) {
  const Icon = feature.icon;
  return (
    <div className="accordion-item" role="listitem">
      <button
        className={`accordion-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => onToggle(feature.id)}
        aria-expanded={isOpen}
        aria-controls={`panel-${feature.id}`}
        id={`trigger-${feature.id}`}
      >
        <span className="flex items-center gap-3">
          <Icon className="w-4 h-4 flex-shrink-0" style={{ color: isOpen ? feature.accent : 'var(--c-text-3)' }} />
          {feature.title}
        </span>
        <svg className={`accordion-chevron ${isOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m19.5 8.25-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div id={`panel-${feature.id}`} role="region" aria-labelledby={`trigger-${feature.id}`}
        className={`accordion-body ${isOpen ? 'open' : ''}`}>
        <div className="accordion-content">{feature.desc}</div>
      </div>
    </div>
  );
}

export default function BentoFeatures() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleBentoHover = useCallback((id) => setActiveIndex(id), []);
  const handleAccordionToggle = useCallback((id) => setActiveIndex(p => p === id ? null : id), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('.bento-node, .accordion-item, .feat-header', { opacity: 1, y: 0, x: 0 });
        return;
      }
      gsap.fromTo('.bento-node',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      );
      gsap.fromTo('.accordion-item',
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, stagger: 0.06, duration: 0.45, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      );
      gsap.fromTo('.feat-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" aria-labelledby="features-heading" className="section"
      style={{ background: 'linear-gradient(180deg, var(--c-bg) 0%, var(--c-bg-alt) 50%, var(--c-bg) 100%)' }}>
      <div className="container">
        <div className="feat-header text-center mb-14">
          <p className="section-label">Platform Features</p>
          <h2 id="features-heading" className="text-4xl sm:text-5xl font-display font-black mb-4">
            Everything You Need to<br />
            <span className="gradient-text">Move Faster</span>
          </h2>
          <p className="text-[var(--c-text-2)] max-w-xl mx-auto font-body">
            From raw ingestion to AI-enriched output — every layer of your data stack, orchestrated automatically.
          </p>
        </div>

        {/* Desktop Bento */}
        <div className="bento-grid" role="list" aria-label="Platform features">
          {FEATURES.map(f => (
            <BentoNode key={f.id} feature={f} isActive={activeIndex === f.id} onHover={handleBentoHover} />
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="accordion" role="list" aria-label="Platform features">
          {FEATURES.map(f => (
            <AccordionItem key={f.id} feature={f} isOpen={activeIndex === f.id} onToggle={handleAccordionToggle} />
          ))}
        </div>
      </div>
    </section>
  );
}
