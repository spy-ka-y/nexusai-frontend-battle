import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/motion';
gsap.registerPlugin(ScrollTrigger);

const LOGOS = ['Stripe','Shopify','Notion','Figma','Linear','Vercel','Supabase','Cloudflare','Twilio','Datadog'];
const TESTIMONIALS = [
  { quote: "NexusAI cut our pipeline setup from 3 weeks to 2 hours. The AI enrichment is genuinely magical.", author: "Priya Sharma", role: "Head of Data, Razorpay", initials: "PS" },
  { quote: "We process 50M events daily and haven't had a single incident in 8 months. World-class observability.", author: "Marcus Chen", role: "CTO, Deliverr", initials: "MC" },
  { quote: "The native connectors alone saved my team 200+ engineering hours. An absolute game-changer.", author: "Ananya Iyer", role: "VP Engineering, Meesho", initials: "AI" },
];

export default function SocialProof() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('.t-card, .s-header', { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo('.t-card',
        { opacity:0, y:30 },
        { opacity:1, y:0, stagger:0.1, duration:0.55, ease:'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start:'top 80%' } }
      );
      gsap.fromTo('.s-header',
        { opacity:0, y:20 },
        { opacity:1, y:0, duration:0.45, ease:'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start:'top 88%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="social" aria-labelledby="social-heading" className="section"
      style={{ background: 'linear-gradient(180deg, var(--c-bg-alt) 0%, var(--c-bg) 100%)' }}>
      <div className="container">
        <div className="s-header text-center mb-14">
          <p className="section-label">Social Proof</p>
          <h2 id="social-heading" className="text-4xl sm:text-5xl font-display font-black mb-4">
            Trusted by <span className="gradient-text">World-Class Teams</span>
          </h2>
          <p className="text-[var(--c-text-2)] max-w-md mx-auto font-body">
            From seed-stage startups to Fortune 500 — teams that move fast choose NexusAI.
          </p>
        </div>

        {/* Logo marquee — tabIndex makes it reachable so keyboard users get the same
            hover-pause behavior as mouse users (WCAG 2.2.2 Pause, Stop, Hide) */}
        <div className="logo-strip mb-16" tabIndex="0" aria-label="Companies using NexusAI">
          <div className="marquee-track">
            {LOGOS.map((l, i) => (
              <span key={`a-${i}`} className="glass-brand rounded-xl px-5 py-2.5 text-xs font-display font-bold text-[var(--c-text-3)] flex-shrink-0 tracking-widest uppercase">
                {l}
              </span>
            ))}
            {/* Duplicate set is a purely visual seam-filler for the seamless loop —
                hidden from assistive tech so each company name is announced once, not twice */}
            <div aria-hidden="true" className="flex gap-8 flex-shrink-0">
              {LOGOS.map((l, i) => (
                <span key={`b-${i}`} className="glass-brand rounded-xl px-5 py-2.5 text-xs font-display font-bold text-[var(--c-text-3)] flex-shrink-0 tracking-widest uppercase">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="t-card glass rounded-2xl p-6 flex flex-col justify-between hover:border-[rgba(255,200,1,0.25)] transition-colors">
              {/* Quote mark — purely decorative, the real quote is in the blockquote below */}
              <div aria-hidden="true" className="text-4xl font-display text-[var(--c-primary)] opacity-30 mb-3 leading-none">"</div>
              <blockquote className="text-sm text-[var(--c-text-2)] leading-relaxed mb-5 italic font-body flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-bold flex-shrink-0"
                  style={{ background: 'var(--g-brand)', color: '#172B36' }} aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-display font-bold text-[var(--c-text)]">{t.author}</div>
                  <div className="text-[11px] text-[var(--c-text-3)] font-body">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
