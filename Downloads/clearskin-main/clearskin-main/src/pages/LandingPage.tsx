import React, { useEffect, useRef, useState } from 'react';
import { 
  Sun, 
  Moon, 
  Droplets, 
  FlameKindling, 
  ShieldCheck, 
  TrendingDown, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Microscope, 
  Sparkles, 
  Star, 
  ArrowRight, 
  ChevronDown, 
  Zap,
  LockKeyhole,
  Layers,
  Utensils,
  RefreshCw,
  Menu,
  X,
  Quote,
  Check,
  BookOpen,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

// --- Components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-primary/90 border-b border-border-main py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-[22px] font-display text-white uppercase tracking-wider">ClearSkin Protocol</Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Le protocole', 'Programme', 'Avis', 'FAQ'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[14px] font-sans text-text-secondary hover:text-white transition-colors">{item}</a>
          ))}
          <Link to="/checkout" className="bg-accent text-bg-primary px-5 py-2 rounded-[6px] text-[14px] font-bold font-sans hover:opacity-85 transition-all flex items-center gap-2">
            Obtenir l'ebook
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-bg-primary z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Le protocole', 'Programme', 'Avis', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMenuOpen(false)} className="text-4xl font-display">{item}</a>
            ))}
            <Link to="/checkout" onClick={() => setIsMenuOpen(false)} className="bg-accent text-bg-primary px-8 py-4 rounded-[6px] text-lg font-bold font-sans">
              Obtenir l'ebook
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", primary = true, onClick }) => (
  <button 
    onClick={onClick}
    className={`relative px-8 py-4 rounded-[8px] font-bold font-sans transition-all flex items-center justify-center gap-2 ${primary ? 'bg-accent text-bg-primary hover:opacity-90' : 'bg-white/5 text-text-primary border border-border-main hover:bg-white/10'} ${className}`}
  >
    {children}
  </button>
);

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-display mb-4 text-balance uppercase"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-text-secondary max-w-2xl mx-auto text-lg font-sans"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const targetValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * targetValue));
          if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetValue, duration]);

  return <span ref={ref} className="font-mono">{count.toLocaleString()}{suffix}</span>;
};

const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      let start: number | null = null;
      const duration = 1200;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        if (progress < 1) {
          setSliderPos(50 + Math.sin(progress * Math.PI) * 15);
          requestAnimationFrame(animate);
        } else {
          setSliderPos(50);
        }
      };
      requestAnimationFrame(animate);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[12px] overflow-hidden cursor-ew-resize select-none border border-border-main"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Before Image */}
      <div className="absolute inset-0 bg-bg-secondary">
        <img 
          src="/assets/before.jpg" 
          alt="Avant" 
          className="w-full h-full object-cover grayscale-[0.2]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/acne-before/800/600";
          }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-danger text-white px-3 py-1 rounded-[4px] text-[13px] font-display font-bold">
          AVANT
        </div>
      </div>

      {/* After Image */}
      <div 
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <img 
          src="/assets/after.jpg" 
          alt="Après" 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/clear-skin-after/800/600";
          }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-accent text-bg-primary px-3 py-1 rounded-[4px] text-[13px] font-display font-bold">
          APRÈS 90J
        </div>
      </div>

      {/* Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center" />
      </div>
    </div>
  );
};

interface AccordionItemProps {
  title: string;
  content: string;
  icon?: any;
  badge?: string;
  isFaq?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, icon: Icon, badge, isFaq = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b border-border-main last:border-0 ${isFaq ? 'py-2' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          {!isFaq && Icon && (
            <div className={`p-2 rounded-[6px] transition-colors ${isOpen ? 'bg-accent text-bg-primary' : 'bg-bg-card text-white group-hover:bg-white/10'}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className={`font-semibold ${isFaq ? 'text-[15px]' : 'text-lg'} text-white font-sans`}>{title}</h3>
            {badge && <span className="text-[10px] uppercase font-bold text-success bg-success/10 px-2 py-0.5 rounded-[4px] font-sans">{badge}</span>}
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className={`text-text-secondary leading-relaxed font-sans ${isFaq ? 'text-[14px]' : 'pl-14'}`}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden">
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden text-center">
        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[400px] font-display text-white opacity-[0.03] leading-none">90 JOURS</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="bg-bg-card border border-white/10 px-4 py-1.5 rounded-[6px] mb-8">
              <span className="text-accent text-[13px] font-mono font-bold flex items-center gap-2">
                <Star className="w-3 h-3 fill-accent" /> 4.8 / 5 · LU PAR 2 400+ PERSONNES
              </span>
            </div>
            
            <h1 className="text-[64px] md:text-[96px] font-display mb-6 leading-[0.95] tracking-[0.02em] uppercase">
              Ta peau peut changer. <br />
              <span className="text-accent">En 90 jours.</span>
            </h1>
            
            <p className="text-[18px] text-text-secondary mb-12 max-w-[520px] leading-relaxed font-sans">
              Le protocole complet qui traite l'acné à la racine — pas juste les symptômes. Routine, alimentation, habitudes : tout est structuré jour par jour.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
              <Link to="/checkout" className="relative group">
                <Button className="px-10 py-5 text-[18px]">
                  Obtenir le protocole — 27€
                </Button>
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-[8px] border-2 border-accent animate-[pulse_0.6s_ease-out_1]" />
              </Link>
              <a href="#le-protocole" className="text-[14px] font-bold text-text-secondary hover:text-white transition-colors flex items-center gap-2">
                Voir ce que ça change <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { icon: CheckCircle2, text: "Accès immédiat" },
                { icon: CheckCircle2, text: "Format PDF" },
                { icon: CheckCircle2, text: "Satisfait ou remboursé 14j" }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px] text-text-muted font-sans font-medium">
                  <badge.icon className="w-4 h-4 text-success" /> {badge.text.toUpperCase()}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — PAIN POINT */}
      <section id="le-protocole" className="py-32 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Si tu fais ces erreurs, ta peau ne changera jamais."
            subtitle="La plupart des gens traitent les symptômes. Pas les causes. Résultat : ça revient toujours."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: XCircle, 
                title: "Les produits agressifs", 
                text: "Tu décapes ta peau, elle surcompense en produisant plus de sébum. Le cycle infernal recommence.",
                color: "text-danger"
              },
              { 
                icon: RefreshCw, 
                title: "Changer trop souvent", 
                text: "Ta peau a besoin de 4 à 8 semaines pour s'adapter. L'impatience est ton pire ennemi.",
                color: "text-white/70"
              },
              { 
                icon: Utensils, 
                title: "Ignorer l'alimentation", 
                text: "Sucres rapides, laitages, ultra-transformés — ils alimentent l'inflammation de l'intérieur.",
                color: "text-white/70"
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg-card p-8 rounded-[12px] border border-border-main card-hover"
              >
                <card.icon className={`w-10 h-10 mb-6 ${card.color}`} />
                <h3 className="text-xl font-bold mb-4 font-sans text-white">{card.title}</h3>
                <p className="text-text-secondary leading-relaxed font-sans">{card.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 flex justify-center">
            <blockquote className="border-l-[3px] border-accent pl-8 max-w-[600px]">
              <p className="text-xl font-medium text-white font-sans leading-relaxed">
                "L'acné n'est pas un problème de peau. C'est un déséquilibre global qui se manifeste sur la peau."
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* SECTION 3 — SOLUTION / BEFORE-AFTER */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-display mb-8 uppercase leading-[0.95]">
                Une peau nette <br />
                <span className="text-accent">en 3 mois.</span>
              </h2>
              <p className="text-lg text-text-secondary mb-10 font-sans leading-relaxed">
                Ce n'est pas de la magie. C'est de la biologie. En 90 jours, nous renouvelons complètement ton écosystème cutané.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { label: "Taux de succès", value: "94%" },
                  { label: "Personnes aidées", value: "2400+" }
                ].map((stat, i) => (
                  <div key={i} className="bg-bg-card p-6 rounded-[12px] border border-border-main">
                    <div className="text-3xl font-display text-accent mb-1">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-[12px] text-text-muted font-sans font-bold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  "Réduction de l'inflammation dès 14j",
                  "Disparition des kystes profonds",
                  "Cicatrisation accélérée",
                  "Régulation naturelle du sébum"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white font-sans font-medium">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <BeforeAfterSlider />
              <div className="absolute -bottom-6 -right-6 bg-accent text-bg-primary p-6 rounded-[12px] hidden md:block">
                <p className="text-2xl font-display uppercase leading-none mb-1">Résultat réel</p>
                <p className="text-[12px] font-sans font-bold opacity-80">Après le protocole complet</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — EBOOK CONTENT */}
      <section className="py-32 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Ce que tu vas apprendre."
            subtitle="6 modules stratégiques pour reprendre le contrôle total de ta peau."
          />

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { num: "01", title: "Diagnostic", text: "Identifie ton type d'acné et tes déclencheurs spécifiques." },
              { num: "02", title: "Nutrition", text: "La liste noire et la liste d'or des aliments anti-inflammation." },
              { num: "03", title: "Cosmétique", text: "Élimine les perturbateurs et simplifie ta routine au maximum." },
              { num: "04", title: "Hormones", text: "Comment équilibrer ton système endocrinien naturellement." },
              { num: "05", title: "Mental", text: "Gérer le stress et l'impact psychologique de l'acné." },
              { num: "06", title: "Maintenance", text: "Comment garder une peau nette sur le long terme." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-bg-card p-8 rounded-[12px] border border-border-main"
              >
                <span className="text-[11px] font-mono text-accent font-bold mb-4 block">{item.num}</span>
                <h3 className="text-xl font-bold mb-3 font-sans text-white">{item.title}</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed font-sans">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-bg-card rounded-[16px] border border-border-main overflow-hidden">
              <div className="p-8 border-b border-border-main bg-white/5">
                <h3 className="text-2xl font-display uppercase">Détail du programme</h3>
              </div>
              <div className="p-4">
                <AccordionItem 
                  icon={BookOpen}
                  title="Partie 1 : Fondations & Détox"
                  content="On commence par nettoyer ton environnement. Élimination des produits toxiques, mise en place de la routine de base et première phase alimentaire de 14 jours."
                  badge="Inclus"
                />
                <AccordionItem 
                  icon={Zap}
                  title="Partie 2 : Le Protocole Actif"
                  content="Introduction des actifs ciblés. On traite l'inflammation profonde et on commence à réguler la production de sébum de l'intérieur."
                  badge="Inclus"
                />
                <AccordionItem 
                  icon={Shield}
                  title="Partie 3 : Cicatrisation & Éclat"
                  content="Focus sur la réparation des tissus. On efface les marques rouges et on renforce la barrière cutanée pour éviter toute rechute."
                  badge="Inclus"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PROGRAMME 90 JOURS */}
      <section id="programme" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Un programme. Trois phases."
            subtitle="Pas de vague 'mange mieux'. Chaque jour a un objectif précis."
          />

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

            <div className="space-y-24 relative">
              {[
                {
                  phase: "Phase 1",
                  days: "Jours 1 à 30",
                  title: "STABILISATION",
                  icon: FlameKindling,
                  color: "danger",
                  do: "Établir la routine de base, nettoyer l'alimentation des sucres rapides, introduire l'hydratation",
                  avoid: "Toucher ton visage, changer de produits, alcool et sucres industriels",
                  goal: "Stopper l'aggravation. Réduire l'inflammation existante."
                },
                {
                  phase: "Phase 2",
                  days: "Jours 31 à 60",
                  title: "AMÉLIORATION VISIBLE",
                  icon: TrendingDown,
                  color: "accent",
                  do: "Optimiser le sommeil, intégrer sport léger, affiner la nutrition",
                  avoid: "Laitages, ultra-transformés, stress non géré",
                  goal: "Réduction visible du nombre de boutons. Peau plus stable."
                },
                {
                  phase: "Phase 3",
                  days: "Jours 61 à 90",
                  title: "OPTIMISATION",
                  icon: Sparkles,
                  color: "success",
                  do: "Maintien des habitudes, gestion stress avancée, ajustements fins",
                  avoid: "Relâchement des acquis, retour aux vieilles habitudes",
                  goal: "Disparition progressive. Construction d'une peau durablement saine."
                }
              ].map((phase, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className="md:w-1/2 md:px-12">
                    <div className="bg-bg-card p-8 rounded-[12px] border border-border-main">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`p-2 rounded-[6px] bg-white/5 text-white`}>
                          <phase.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-display uppercase">{phase.title}</h3>
                      </div>
                      <div className="space-y-4 text-[14px] font-sans">
                        <p><span className="text-success font-bold">✓ Ce que tu fais :</span> <span className="text-text-secondary">{phase.do}</span></p>
                        <p><span className="text-danger font-bold">✕ Ce que tu évites :</span> <span className="text-text-secondary">{phase.avoid}</span></p>
                        <div className="pt-4 border-t border-border-main">
                          <p className="font-bold text-white">Objectif : {phase.goal}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-bg-primary border-2 border-white flex items-center justify-center z-10">
                    <div className={`w-3 h-3 rounded-full ${phase.color === 'danger' ? 'bg-danger' : phase.color === 'accent' ? 'bg-accent' : 'bg-success'}`} />
                  </div>

                  <div className="md:w-1/2 md:px-12 pl-16 md:pl-12">
                    <p className={`text-[11px] font-mono font-bold text-text-muted uppercase tracking-widest mb-1`}>{phase.phase}</p>
                    <p className="text-4xl font-display uppercase">{phase.days}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — TÉMOIGNAGES */}
      <section id="avis" className="py-32 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Ils ont repris le contrôle."
            subtitle="Pas de filtres. Pas de retouches. Juste de la discipline et des résultats."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Lucas, 19 ans",
                text: "J'ai tout essayé : crèmes, antibiotiques... Rien ne tenait. Ce protocole m'a fait comprendre que mon alimentation sabotait tout. En 2 mois, ma peau était transformée.",
                status: "Acné hormonale",
                rating: 5
              },
              {
                name: "Sarah, 24 ans",
                text: "Le plus dur c'était les cicatrices rouges. La phase 3 du programme est incroyable pour ça. Aujourd'hui je sors sans maquillage sans aucune gêne.",
                status: "Cicatrices & Rougeurs",
                rating: 5,
                featured: true
              },
              {
                name: "Marc, 21 ans",
                text: "Simple, direct, efficace. Pas de blabla marketing. On sait exactement quoi faire chaque matin et chaque soir. Indispensable si tu galères depuis des années.",
                status: "Acné kystique",
                rating: 5
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-bg-card p-8 rounded-[12px] border border-border-main relative overflow-hidden ${testimonial.featured ? 'md:scale-105 z-10 border-accent/30' : ''}`}
              >
                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-accent opacity-[0.05] -rotate-12" />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-white font-sans leading-relaxed mb-8 relative z-10">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full border border-border-main ${
                    [
                      'bg-gradient-to-br from-zinc-700 to-zinc-900',
                      'bg-gradient-to-br from-slate-700 to-slate-900',
                      'bg-gradient-to-br from-stone-700 to-stone-900'
                    ][i % 3]
                  }`} />
                  <div>
                    <p className="font-bold text-white text-sm font-sans">{testimonial.name}</p>
                    <p className="text-[11px] text-accent font-bold uppercase tracking-wider">{testimonial.status}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — PRICING */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-bg-secondary rounded-[24px] border border-accent/20 overflow-hidden max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2">
              <div className="p-12">
                <h2 className="text-4xl font-display mb-6 uppercase">Le protocole complet</h2>
                <p className="text-text-secondary mb-8 font-sans">Tout ce dont tu as besoin pour transformer ta peau, réuni dans un seul guide structuré.</p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Le guide PDF de 120+ pages",
                    "Le programme jour par jour (90j)",
                    "Liste de courses & Recettes",
                    "Routine cosmétique minimaliste",
                    "Accès à vie aux mises à jour"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[14px] text-white font-sans">
                      <Check className="w-4 h-4 text-success" /> {item}
                    </div>
                  ))}
                </div>

                <div className="bg-bg-card p-4 rounded-[8px] border border-border-main flex items-center gap-4">
                  <ShieldCheck className="w-8 h-8 text-success" />
                  <div>
                    <p className="text-sm font-bold text-white">Garantie 14 jours</p>
                    <p className="text-[11px] text-text-muted">Satisfait ou remboursé sans questions.</p>
                  </div>
                </div>
              </div>

              <div className="bg-bg-card p-12 flex flex-col items-center justify-center text-center border-l border-border-main">
                <div className="mb-8">
                  <span className="text-[14px] text-text-muted line-through block">67€</span>
                  <span className="text-[100px] font-display leading-none text-white">27€</span>
                  <span className="text-[14px] text-accent font-bold block mt-2 uppercase tracking-widest">Paiement unique</span>
                </div>

                <Link to="/checkout" className="w-full">
                  <Button className="w-full py-5 text-lg">
                    Commencer maintenant
                  </Button>
                </Link>
                
                <p className="mt-6 text-[11px] text-text-muted font-sans uppercase tracking-widest font-bold">
                  Paiement 100% sécurisé via Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section id="faq" className="py-24 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading title="Questions fréquentes" />

          <div className="space-y-2">
            {[
              {
                q: "Est-ce que ça marche pour tous les types d'acné ?",
                a: "Oui. Que ce soit de l'acné hormonale, kystique ou inflammatoire, les principes de base (inflammation, sébum, barrière cutanée) restent les mêmes. Le protocole t'aide à identifier tes déclencheurs spécifiques."
              },
              {
                q: "Combien de temps avant de voir des résultats ?",
                a: "L'inflammation commence à baisser dès les 14 premiers jours. Les résultats visuels majeurs apparaissent généralement entre la 6ème et la 10ème semaine, le temps d'un cycle complet de renouvellement de la peau."
              },
              {
                q: "Dois-je acheter des produits chers ?",
                a: "Au contraire. Le protocole prône le 'skin minimalism'. On élimine 80% des produits inutiles pour se concentrer sur quelques actifs essentiels et souvent très abordables."
              },
              {
                q: "C'est un abonnement ?",
                a: "Non. C'est un paiement unique de 27€. Tu reçois le PDF immédiatement et tu y as accès à vie, y compris toutes les futures mises à jour."
              }
            ].map((item, i) => (
              <AccordionItem 
                key={i}
                isFaq
                title={item.q}
                content={item.a}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-border-main">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-xs">
              <Link to="/" className="text-2xl font-display text-white uppercase tracking-wider mb-4 block">ClearSkin Protocol</Link>
              <p className="text-[13px] text-text-muted font-sans leading-relaxed">
                Le programme complet pour traiter l'acné à la racine et retrouver une peau saine durablement.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest mb-6">Programme</h4>
                <ul className="space-y-4 text-[13px] text-text-muted font-sans">
                  <li><a href="#le-protocole" className="hover:text-white transition-colors">Le Protocole</a></li>
                  <li><a href="#programme" className="hover:text-white transition-colors">Les 90 jours</a></li>
                  <li><a href="#avis" className="hover:text-white transition-colors">Témoignages</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest mb-6">Légal</h4>
                <ul className="space-y-4 text-[13px] text-text-muted font-sans">
                  <li><Link to="/" className="hover:text-white transition-colors">CGV</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Confidentialité</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Mentions légales</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest mb-6">Contact</h4>
                <ul className="space-y-4 text-[13px] text-text-muted font-sans">
                  <li><a href="mailto:hello@clearskin.com" className="hover:text-white transition-colors">hello@clearskin.com</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-border-main flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] text-text-muted font-sans">© 2026 ClearSkin Protocol. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[11px] text-text-muted font-sans border-l-2 border-danger pl-4">
                <span className="font-bold text-danger">DISCLAIMER :</span> Ce programme ne remplace pas une consultation chez un dermatologue.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-bg-primary border-t border-border-main p-4 z-40">
        <Link to="/checkout">
          <Button className="w-full py-4 text-[16px]">
            Obtenir le protocole — 27€
          </Button>
        </Link>
      </div>
    </div>
  );
}
