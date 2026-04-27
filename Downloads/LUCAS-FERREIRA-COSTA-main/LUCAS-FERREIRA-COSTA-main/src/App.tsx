/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Lenis from 'lenis';
import VanillaTilt from 'vanilla-tilt';
import { CountUp } from 'countup.js';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiThreedotjs, 
  SiNodedotjs, 
  SiFirebase, 
  SiSupabase,
  SiVercel,
  SiGithub,
  SiFigma
} from 'react-icons/si';

const MacbookScrollDemo = lazy(() => import('@/components/macbook-scroll-demo'));
const LogoLoop = lazy(() => import('@/components/ui/LogoLoop'));
import { EcosystemModal } from '@/components/EcosystemModal';
import { ConnectPage } from '@/pages/ConnectPage';
import { 
  Moon,
  Sun,
  Menu, 
  X, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Instagram, 
  Globe, 
  Briefcase, 
  Cpu, 
  PenTool, 
  Zap, 
  Search, 
  BarChart3,
  Mail,
  Quote,
  Target,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// --- Constants ---
const PRENOM = "Lucas";
const NOM = "FERREIRA COSTA";
const AGE = 16;
const EMAIL = "lucas.ferreira_costa@yahoo.com";
const LINKEDIN = "https://www.linkedin.com/in/lucas-ferreira-costa-529455387?utm_source=share_via&utm_content=profile&utm_medium=member_ios";
const INSTAGRAM = "https://www.instagram.com/lucas_78fr/?hl=fr";
const GITHUB = "https://github.com/toncompte";
const URL_MAISON = "https://maisondigitals.com/";
const URL_FIDELYNK = "https://fidelynk.com";
const ANNEE_DEBUT = 2022;

// --- Components ---

const GrainOverlay = () => (
  <div id="grain" className="fixed -inset-[200%] w-[400%] h-[400%] pointer-events-none z-[9999] opacity-[0.03] overflow-hidden"
    style={{
      backgroundImage: `url("data:image/svg+xml,<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='1'/></svg>")`,
      animation: 'grain 8s steps(10) infinite'
    }}
  />
);


const Navbar = ({ onContactClick, onBookingClick, darkMode, setDarkMode }: { onContactClick: () => void, onBookingClick: () => void, darkMode: boolean, setDarkMode: (v: boolean) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  const navItems = [
    { label: 'À propos', href: '/#about' },
    { label: 'Expertise', href: '/#expertise' },
    { label: 'Ventures', href: '/#ventures' },
    { label: 'Témoignages', href: '/#testimonials' },
    { label: 'Contact', onClick: () => navigate('/connect') }
  ];

  return (
    <nav className="fixed top-6 left-0 w-full z-[100] px-6">
      <div className={`max-w-[1100px] mx-auto flex justify-between items-center px-6 transition-all duration-500 rounded-[24px] border ${
        isScrolled 
        ? (darkMode ? 'bg-black/60 backdrop-blur-2xl border-white/10 shadow-2xl py-2' : 'bg-white/40 backdrop-blur-2xl border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] py-2')
        : (darkMode ? 'bg-black/20 backdrop-blur-md border-white/5 py-4' : 'bg-white/10 backdrop-blur-md border-white/20 py-4')
      }`}>
        {/* Identité */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 relative shadow-2xl bg-accent/10">
            <img 
              src="/avatar.png" 
              alt="Avatar Lucas" 
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://api.dicebear.com/7.x/initials/svg?seed=Lucas&backgroundColor=10B981";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-black text-lg tracking-tighter leading-none ${darkMode ? 'text-white' : 'text-primary'}`}>
              LUCAS <span className="text-accent italic">FERREIRA</span> COSTA
            </span>
            <span className="font-mono text-[9px] text-accent tracking-[0.3em] uppercase mt-1 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              AI Architect
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            item.onClick ? (
              <button 
                key={item.label} 
                onClick={item.onClick}
                className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-300 ${
                  darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                  : 'text-text-gray hover:text-primary hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            ) : (
              <a 
                key={item.label} 
                href={item.href}
                className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-300 ${
                  darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                  : 'text-text-gray hover:text-primary hover:bg-white/50'
                }`}
              >
                {item.label}
              </a>
            )
          ))}
        </div>

        {/* Master CTA & Theme Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
              darkMode ? 'bg-white/5 text-accent hover:bg-white/10' : 'bg-black/5 text-primary hover:bg-black/10'
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            onClick={onBookingClick}
            className={`group hidden sm:flex items-center gap-2 pl-5 pr-2 py-2 rounded-xl text-[13px] font-medium transition-all shadow-lg ${
              darkMode ? 'bg-white text-primary shadow-white/5' : 'bg-primary text-white shadow-primary/10 hover:bg-primary/90'
            }`}
          >
            <span>Let's talk</span>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform ${
              darkMode ? 'bg-primary text-white' : 'bg-white/20 text-white'
            }`}>
              <ArrowRight size={14} />
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className={`w-10 h-10 flex items-center justify-center md:hidden rounded-xl ${
              darkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-primary'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-24 left-6 right-6 backdrop-blur-3xl rounded-[32px] border p-8 z-[90] shadow-2xl ${
              darkMode ? 'bg-black/80 border-white/10' : 'bg-white/80 border-white/40'
            }`}
          >
            <div className="flex flex-col gap-6 items-center">
              {navItems.map((item) => (
                item.onClick ? (
                  <button 
                    key={item.label} 
                    className={`font-display font-bold text-2xl ${darkMode ? 'text-white' : 'text-primary'}`}
                    onClick={() => { setIsMenuOpen(false); item.onClick?.(); }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a 
                    key={item.label} 
                    href={item.href}
                    className={`font-display font-bold text-2xl ${darkMode ? 'text-white' : 'text-primary'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <button 
                onClick={() => { setIsMenuOpen(false); onBookingClick(); }}
                className={`w-full py-4 rounded-2xl font-bold ${
                  darkMode ? 'bg-white text-primary' : 'bg-primary text-white'
                }`}
              >
                Réserver un appel
              </button>
              <button 
                onClick={() => { setIsMenuOpen(false); onContactClick(); }}
                className={`w-full py-4 rounded-2xl font-bold border ${
                  darkMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-primary/10 text-primary hover:bg-black/5'
                }`}
              >
                Laisser un message
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onMessageClick, onBookingClick, darkMode }: { onMessageClick: () => void, onBookingClick: () => void, darkMode: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Three.js Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
      precision: "lowp"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particlesCount = window.innerWidth < 768 ? 20 : 60;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i+1] = (Math.random() - 0.5) * 15;
      positions[i+2] = (Math.random() - 0.5) * 5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x10B981,
      size: 0.04,
      transparent: true,
      opacity: 0.3
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.y += (mouseX * 0.1 - scene.rotation.y) * 0.05;
      scene.rotation.x += (mouseY * 0.1 - scene.rotation.x) * 0.05;
      scene.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- GSAP Entrée ---
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content > *', 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.4,
          clearProps: 'all'
        }
      );
    });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-6">
      <canvas ref={canvasRef} id="hero-canvas" className="absolute inset-0 z-0 pointer-events-none" />
      
      <div className="hero-content relative z-10 w-full max-w-5xl pt-20">
        <div className="mb-8">
          <span className="inline-block font-mono text-[10px] font-bold text-accent tracking-[0.5em] uppercase px-4 py-1.5 bg-accent/5 rounded-full border border-accent/10">
            AI ARCHITECT & VENTURE BUILDER
          </span>
        </div>

        <h1 
          ref={nameRef}
          className={`font-display font-bold text-[clamp(2.5rem,12vw,9rem)] leading-[0.85] tracking-tighter mb-10 ${
            darkMode ? 'text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'text-primary drop-shadow-[0_0_30px_rgba(0,0,0,0.05)]'
          }`}
        >
          <span className="relative inline-block">
            {PRENOM}
            <div className={`absolute -bottom-2 left-0 w-full h-[0.05em] transition-colors duration-500 ${darkMode ? 'bg-accent/30' : 'bg-accent/20'}`} />
          </span>
          <span className={`block md:inline mt-2 md:mt-0 md:ml-4 font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>
            {NOM}
          </span>
        </h1>

        <p className={`font-body text-[clamp(1.1rem,2vw,1.4rem)] max-w-[650px] mx-auto leading-relaxed mb-14 px-4 ${darkMode ? 'text-gray-300' : 'text-text-gray'}`}>
          Je conçois des écosystèmes digitaux où le <span className={`${darkMode ? 'text-white' : 'text-primary'} font-semibold`}>design premium</span> rencontre la puissance de <span className="text-accent font-semibold italic">l'intelligence artificielle</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={onBookingClick}
            className={`group w-full sm:w-auto px-12 py-5 rounded-[20px] font-display font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              darkMode ? 'bg-white text-primary shadow-2xl shadow-white/10' : 'bg-primary text-white shadow-2xl shadow-primary/20 hover:bg-primary/90'
            }`}
          >
            Réserver un appel
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onMessageClick}
            className={`w-full sm:w-auto px-12 py-5 rounded-[20px] font-display font-bold text-lg transition-all duration-300 border shadow-sm ${
              darkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-border-light text-primary hover:bg-bg-light'
            }`}
          >
            Me laisser un message
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-[9px] text-text-gray/40 uppercase tracking-[0.4em]">Explorer</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
};

const About = ({ darkMode }: { darkMode: boolean }) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animations
    gsap.from('.section-label-01', {
      opacity: 0,
      y: 10,
      duration: 0.5,
      scrollTrigger: { trigger: '#about', start: 'top 88%' }
    });

    gsap.from('.section-title-01', {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.8,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: '#about', start: 'top 85%' }
    });

    // Timeline line fill
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 55%',
          end: 'bottom 70%',
          scrub: 0.5
        }
      });
    }

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item: any, i) => {
      gsap.from(item, {
        opacity: 0,
        x: 30,
        duration: 0.6,
        delay: i * 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 82%' }
      });
    });

    // Countup
    document.querySelectorAll('[data-countup]').forEach(el => {
      const target = parseFloat(el.getAttribute('data-countup') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0');
      
      const cu = new CountUp(el as HTMLElement, target, { 
        duration: 2.5, 
        useEasing: true,
        suffix,
        decimalPlaces: decimals
      });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => cu.start()
      });
    });
  }, []);

  const timelineData = [
    { year: ANNEE_DEBUT, title: "Premiers pas dans le code", desc: "HTML, CSS, JS. Obsession immédiate." },
    { year: ANNEE_DEBUT + 1, title: "Premiers sites pour des clients", desc: "Freelance. Les premières vraies contraintes." },
    { year: ANNEE_DEBUT + 2, title: "Découverte des LLMs", desc: "GPT-3, puis GPT-4. Tout change." },
    { year: ANNEE_DEBUT + 3, title: "Lancement de MAISONDIGITALS", desc: "Agence web premium. Design + code + IA." },
    { year: "Aujourd'hui", title: "FIDELYNK en construction", desc: "SaaS B2B. Le prochain niveau." }
  ];

  return (
    <section id="about" className="bg-transparent border-y border-white/5 py-[120px]">
      <div className="max-w-[1152px] mx-auto px-6">
        <div className="mb-20 text-center">
          <div className="section-label-01 font-mono text-[11px] text-accent tracking-[0.3em] uppercase mb-4">01 — L'ENTREPRENEUR</div>
          <h2 className="section-title-01 font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[0.9] mb-6">
            <span className={`block ${darkMode ? 'text-white' : 'text-primary'}`}>Un parcours.</span>
            <span className={`block mt-2 ${darkMode ? 'text-white/40' : 'text-text-gray/80'}`}>Zéro bullshit.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Gauche - Texte & Story */}
          <div className="space-y-8">
            <p className={`font-body text-[clamp(1rem,2vw,1.3rem)] leading-relaxed ${darkMode ? 'text-gray-300' : 'text-text-gray'}`}>
              Entrepreneur de {AGE} ans, je construis à l'intersection du <span className={`${darkMode ? 'text-white' : 'text-primary'} font-semibold underline decoration-accent/30`}>design</span>, du <span className={`${darkMode ? 'text-white' : 'text-primary'} font-semibold underline decoration-accent/30`}>code</span> et de <span className={`${darkMode ? 'text-white' : 'text-primary'} font-semibold underline decoration-accent/30`}>l'IA</span>. Pas de longs discours — j'apprends en construisant des produits qui fonctionnent.
            </p>
            <p className={`font-body text-[clamp(1rem,2vw,1.3rem)] leading-relaxed ${darkMode ? 'text-gray-300' : 'text-text-gray'}`}>
              Chaque ligne de code est une brique, chaque venture est une itération vers la perfection technique.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { val: 47, label: "Produits Livrés", suffix: "+" },
                { val: 4.9, label: "Satisfaction", suffix: "/5", decimals: 1 },
                { val: 2, label: "Ventures Actives" },
                { val: AGE, label: "Ans d'Experience" }
              ].map((stat, i) => (
                <div key={i} className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-border-light'} border rounded-[18px] p-6 shadow-sm hover:shadow-md transition-shadow duration-500 group`}>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-accent/20 rounded-full group-hover:bg-accent transition-colors" />
                    <div className={`font-display font-bold text-3xl tabular-nums ${darkMode ? 'text-white' : 'text-primary'}`}>
                      <span data-countup={stat.val} data-suffix={stat.suffix || ''} data-decimals={stat.decimals || 0}>0</span>
                    </div>
                  </div>
                  <div className={`font-mono text-[10px] uppercase tracking-widest mt-2 ml-4 ${darkMode ? 'text-gray-400' : 'text-text-gray'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Droite - Avatar & Timeline Minimaliste */}
          <div className="space-y-8">
            <div className={`aspect-[4/5] w-full max-w-sm mx-auto border rounded-[32px] overflow-hidden shadow-sm group bg-accent/5 ${
              darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-border-light'
            }`}>
              <img 
                src="/avatar.png" 
                alt="Avatar Lucas" 
                className={`w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 ${darkMode ? 'brightness-90' : ''}`}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://api.dicebear.com/7.x/initials/svg?seed=Lucas&backgroundColor=10B981";
                }}
              />
            </div>

            <div className={`relative border rounded-[22px] p-10 shadow-sm overflow-hidden ${
              darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-border-light'
            }`}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
               <div className="relative z-10 space-y-10">
                {timelineData.map((item, i) => (
                  <div key={i} className={`group relative pl-8 border-l ${darkMode ? 'border-white/10' : 'border-border-light'}`}>
                    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                      darkMode ? 'bg-white/10 group-hover:bg-accent' : 'bg-border-light group-hover:bg-accent'
                    }`} />
                    <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${darkMode ? 'text-gray-400' : 'text-text-gray'}`}>{item.year}</div>
                    <h3 className={`font-display font-bold text-base mb-1 ${darkMode ? 'text-white' : 'text-primary'}`}>{item.title}</h3>
                    <p className={`font-body text-[13px] leading-relaxed ${darkMode ? 'text-gray-300' : 'text-text-gray'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Expertise = ({ darkMode }: { darkMode: boolean }) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.expertise-card').forEach((card: any, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power4.out',
          scrollTrigger: { 
            trigger: card, 
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const expertiseData = [
    {
      title: "SaaS Architecture",
      desc: "Développement de plateformes B2B comme Fidelynk. Focus sur la modularité, la scalabilité et les performances extrêmes au chargement.",
      icon: <Cpu className="w-7 h-7" />,
      tags: ['Next.js', 'Fidelynk', 'Auth']
    },
    {
      title: "Premium Design",
      desc: "Interfaces minimalistes et sophistiquées comme Maison Digitals. Je crée des expériences visuelles mémorables qui renforcent l'image de marque.",
      icon: <PenTool className="w-7 h-7" />,
      tags: ['Maison', 'UI/UX', 'GSAP']
    },
    {
      title: "Performance & Conversion",
      desc: "Optimisation de funnels de vente à haute vélocité. Je transforme le trafic en clients via une architecture rapide, persuasive et data-driven.",
      icon: <Zap className="w-7 h-7" />,
      tags: ['Conversion', 'Funnel', 'SEO']
    },
    {
      title: "AI & Automation",
      desc: "Intégration d'agents intelligents pour automatiser des workflows complexes via n8n et OpenAI, augmentant drastiquement la productivité.",
      icon: <BarChart3 className="w-7 h-7" />,
      tags: ['AI Agents', 'n8n', 'Python']
    }
  ];

  return (
    <section id="expertise" className="bg-transparent border-y border-white/5 py-32 overflow-hidden">
      <div className="max-w-[1152px] mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <div className="font-mono text-[11px] text-accent tracking-[0.4em] uppercase mb-6 italic">02 — Expertise & Services</div>
          <h2 className={`font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] tracking-tighter leading-[0.9] ${darkMode ? 'text-white' : 'text-primary'}`}>
            Délivrer une excellence <span className={darkMode ? 'text-white/50' : 'text-text-gray/60'}>technique</span> sans compromis.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseData.map((item, i) => (
            <div key={i} className={`expertise-card group border rounded-[32px] p-10 transition-all duration-500 flex flex-col justify-between h-[360px] ${
              darkMode 
              ? 'bg-white/5 border-white/10 hover:border-accent/40 hover:bg-white/10 hover:shadow-accent/5' 
              : 'bg-bg-light border-border-light hover:border-accent/40 hover:bg-white hover:shadow-2xl hover:shadow-accent/5'
            }`}>
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-500 ${
                  darkMode ? 'bg-white/10 text-white' : 'bg-white text-primary'
                }`}>
                  {item.icon}
                </div>
                <h3 className={`font-display font-bold text-xl mb-4 ${darkMode ? 'text-white' : 'text-primary'}`}>{item.title}</h3>
                <p className={`font-body text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-text-gray'}`}>{item.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-8">
                {item.tags.map(tag => (
                  <span key={tag} className={`font-mono text-[8.5px] border px-2 py-0.5 rounded-full uppercase tracking-widest ${
                    darkMode ? 'text-white/30 border-white/10' : 'text-text-gray/40 border-border-light'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Ventures = ({ darkMode }: { darkMode: boolean }) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect
      gsap.utils.toArray('.venture-visual').forEach((v: any) => {
        gsap.to(v, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: v,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // Reveal animations
      gsap.utils.toArray('.venture-item').forEach((item: any, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: item, start: 'top 85%' }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const ventures = [
    {
      name: "MAISONDIGITALS",
      type: "Product Agency",
      desc: "L'avatar parfait de la synergie entre design premium et ingénierie IA. L'agence qui redéfinit l'esthétique du web moderne.",
      status: "Actif — 2024",
      url: URL_MAISON,
      color: "from-emerald-500/10 to-teal-500/10",
      visual: "MAISON",
      details: ["UX Strategy", "AI Integration", "High-End Dev"]
    },
    {
      name: "FIDELYNK",
      type: "SaaS Platform",
      desc: "Une plateforme B2B de fidélisation intelligente. Automatisation de la rétention client via des modèles de calcul avancés.",
      status: "Building",
      url: URL_FIDELYNK,
      color: "from-blue-500/10 to-accent/10",
      visual: "FIDELYNK",
      details: ["SaaS Architecture", "B2B Retention", "Analytics"]
    }
  ];

  return (
    <section id="ventures" className="bg-transparent py-32 overflow-hidden border-y border-white/5">
      <div className="max-w-[1152px] mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-accent tracking-[0.4em] uppercase block mb-4 italic">03 — Ventures</span>
            <h2 className={`font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] tracking-tighter leading-[0.9] ${darkMode ? 'text-white' : 'text-primary'}`}>
              Bâtir des <span className={darkMode ? 'text-white/50' : 'text-text-gray/60'}>écosystèmes</span> qui perdurent.
            </h2>
          </div>
          <p className={`font-body text-base max-w-xs leading-relaxed md:pb-2 ${darkMode ? 'text-gray-300' : 'text-text-gray'}`}>
            Mes propres laboratoires d'innovation où je teste, itère et déploie les technologies de demain.
          </p>
        </div>

        <div className="space-y-12">
          {ventures.map((venture, i) => (
            <div key={i} className={`venture-item group relative border rounded-[40px] overflow-hidden flex flex-col lg:flex-row shadow-sm hover:shadow-2xl hover:shadow-accent/5 transition-all duration-700 ${
              darkMode ? 'bg-white/5 border-white/10' : 'bg-bg-light border-border-light'
            }`}>
              <div className="lg:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-2xl text-white font-display font-bold text-xl group-hover:rotate-6 transition-transform">
                    {venture.name[0]}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-accent tracking-[0.2em] font-bold uppercase block mb-0.5">{venture.type}</span>
                    <h3 className={`font-display font-bold text-3xl tracking-tight ${darkMode ? 'text-white' : 'text-primary'}`}>{venture.name}</h3>
                  </div>
                </div>
                
                <p className={`font-body text-[16px] leading-relaxed mb-10 max-w-md ${darkMode ? 'text-gray-400' : 'text-text-gray'}`}>
                   {venture.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-12">
                  {venture.details.map(tag => (
                    <span key={tag} className={`text-[10px] font-mono border px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap ${
                      darkMode ? 'text-white/40 border-white/10' : 'text-text-gray/60 border-border-light'
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-auto">
                  <a 
                    href={venture.url} 
                    target="_blank"
                    className={`flex items-center gap-3 font-display font-bold transition-colors group/link ${darkMode ? 'text-white hover:text-accent' : 'text-primary hover:text-accent'}`}
                  >
                    Découvrir le projet
                    <ArrowRight size={20} className="group-hover/link:translate-x-2 transition-transform" />
                  </a>
                  <span className="px-3 py-1 bg-accent font-mono text-[9px] text-white font-bold rounded-full uppercase tracking-widest">
                    {venture.status}
                  </span>
                </div>
              </div>

              <div className={`lg:w-1/2 bg-gradient-to-br ${venture.color} relative overflow-hidden flex items-center justify-center h-[320px] lg:h-auto`}>
                 <div className={`venture-visual font-display font-black text-[clamp(6rem,15vw,12rem)] select-none italic tracking-tighter transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-1000 ${
                   darkMode ? 'text-white/5' : 'text-primary/5'
                 }`}>
                    {venture.visual}
                 </div>
                 {/* Floating accents */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 blur-[80px] rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Ambition = ({ darkMode }: { darkMode: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ambition-reveal', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const mindset = [
    { 
      title: "Obsession du Résultat", 
      desc: "Je ne vends pas du code, je vends de la croissance. Chaque ligne est une décision business.",
      icon: <Zap className="w-6 h-6" />
    },
    { 
      title: "Sens des Affaires", 
      desc: "Identifier les opportunités là où les autres voient des problèmes. Vision ROI-centric constante.",
      icon: <Target className="w-6 h-6" />
    },
    { 
      title: "Instinct Commercial", 
      desc: "Comprendre la psychologie client pour bâtir des funnels qui convertissent le doute en confiance.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const philosophy = [
    { label: "Vitesse", val: "L'exécution rapide bat la perfection lente à chaque itération." },
    { label: "Scalabilité", val: "Bâtir des systèmes qui travaillent pour vous, et non l'inverse." },
    { label: "Premium", val: "L'excellence n'est pas une option, c'est le standard de base." }
  ];

  return (
    <section id="ambition" ref={containerRef} className="py-32 relative overflow-hidden border-y border-white/5">
      <div className="max-w-[1152px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="ambition-reveal font-mono text-[11px] text-accent tracking-[0.4em] uppercase mb-6 italic">05 — Vision & Drive</div>
            <h2 className={`ambition-reveal font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[0.9] mb-10 ${darkMode ? 'text-white' : 'text-primary'}`}>
              L'ambition n'est que le <span className="text-accent italic">carburant</span> de l'exécution.
            </h2>
            <p className={`ambition-reveal font-body text-lg leading-relaxed mb-12 ${darkMode ? 'text-gray-300' : 'text-text-gray'}`}>
              Mon approche est celle d'un entrepreneur, pas seulement d'un créateur. Je vois chaque projet comme une venture à propulser, mêlant instinct du commerce et précision logicielle pour dominer le marché.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {philosophy.map((item, i) => (
                <div key={i} className="ambition-reveal">
                  <div className="font-mono text-[10px] text-accent uppercase tracking-widest mb-3">{item.label}</div>
                  <div className={`font-display font-bold text-sm leading-snug ${darkMode ? 'text-white' : 'text-primary'}`}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {mindset.map((item, i) => (
              <div key={i} className={`ambition-reveal p-8 rounded-[32px] border transition-all duration-500 hover:scale-[1.02] ${
                darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-border-light shadow-xl shadow-black/5 hover:shadow-2xl'
              }`}>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className={`font-display font-bold text-xl mb-3 ${darkMode ? 'text-white' : 'text-primary'}`}>{item.title}</h3>
                    <p className={`font-body text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-text-gray'}`}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Accent */}
      {darkMode && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      )}
    </section>
  );
};

const Testimonials = ({ darkMode }: { darkMode: boolean }) => {
  useEffect(() => {
    // Reveal animation
    gsap.from('.testimonials-header', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.testimonials-header', start: 'top 85%' }
    });
  }, []);

  const testimonials = [
    {
      name: "Jean-Baptiste L.",
      role: "Client @ Agence Immobilier",
      content: "Lucas a une compréhension du produit très rare. Il ne se contente pas de coder, il réfléchit à l'expérience utilisateur globale. Le site pour mon agence a doublé mon taux de conversion.",
      initials: "JL"
    },
    {
      name: "Sarah M.",
      role: "Fondatrice @ Tech Startup",
      content: "La précision technique de Lucas est bluffante. Pour son âge, il maîtrise des stacks complexes avec une aisance déconcertante. Un atout majeur pour tout projet innovant.",
      initials: "SM"
    },
    {
      name: "Thomas D.",
      role: "Collaborateur @ SaaS Venture",
      content: "Ses automatisations n8n nous font gagner des dizaines d'heures par mois. Lucas est rigoureux, réactif et force de proposition technologique. Un builder d'exception.",
      initials: "TD"
    },
    {
      name: "Marc A.",
      role: "CEO @ E-commerce Plus",
      content: "Livraison impeccable, design moderne et surtout une performance qui laisse la concurrence sur place. Indispensable.",
      initials: "MA"
    }
  ];

  return (
    <section id="testimonials" className="bg-transparent py-[160px] overflow-hidden border-y border-white/5">
      <div className="max-w-[1152px] mx-auto px-6 mb-24 testimonials-header">
        <div className="font-mono text-[11px] text-accent tracking-[0.3em] uppercase mb-4 italic">04 — TÉMOIGNAGES</div>
        <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[0.9] max-w-2xl">
          <span className={`block ${darkMode ? 'text-white' : 'text-primary'}`}>Preuves sociales.</span>
          <span className={darkMode ? 'text-white/20 mt-2 block' : 'text-text-gray mt-2 block'}>Zéro fiction.</span>
        </h2>
      </div>

      <div className="relative">
         {/* Marquee effect row 1 */}
         <div className="flex gap-6 animate-marquee-left whitespace-nowrap px-6 mb-6">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className={`inline-block w-[400px] border rounded-[24px] p-8 shrink-0 shadow-sm ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-border-light'
              }`}>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Zap key={s} size={12} className="fill-accent text-accent" />)}
                </div>
                <p className={`font-body text-[15px] leading-relaxed mb-8 whitespace-normal italic ${darkMode ? 'text-gray-300' : 'text-primary'}`}>
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-xs uppercase underline ${
                    darkMode ? 'bg-white/10 text-white' : 'bg-primary/5 text-primary'
                  }`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className={`font-display font-bold text-sm ${darkMode ? 'text-white' : 'text-primary'}`}>{t.name}</div>
                    <div className={`font-mono text-[10px] uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-text-gray'}`}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
         </div>

         {/* Marquee effect row 2 (reverse) */}
         <div className="flex gap-6 animate-marquee-right whitespace-nowrap px-6">
            {[...testimonials.reverse(), ...testimonials.reverse()].map((t, i) => (
              <div key={i} className={`inline-block w-[400px] border rounded-[24px] p-8 shrink-0 shadow-sm ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-border-light'
              }`}>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Zap key={s} size={12} className="fill-accent text-accent" />)}
                </div>
                <p className={`font-body text-[15px] leading-relaxed mb-8 whitespace-normal italic ${darkMode ? 'text-gray-300' : 'text-primary'}`}>
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-xs uppercase underline ${
                    darkMode ? 'bg-white/10 text-white' : 'bg-primary/5 text-primary'
                  }`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className={`font-display font-bold text-sm ${darkMode ? 'text-white' : 'text-primary'}`}>{t.name}</div>
                    <div className={`font-mono text-[10px] uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-text-gray'}`}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
};

const Contact = ({ onBookingClick, onContactClick, darkMode }: { onBookingClick: () => void, onContactClick: () => void, darkMode: boolean }) => {
  return (
    <footer id="contact" className="bg-transparent pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-[1152px] mx-auto px-6 relative z-10">
        <div className="bg-primary rounded-[48px] p-12 md:p-24 text-center text-white relative overflow-hidden group">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="font-mono text-[11px] text-accent tracking-[0.5em] uppercase block mb-8">Ready to start?</span>
            <h2 className="font-display font-bold text-[clamp(2.5rem,7vw,5rem)] tracking-tighter leading-[0.9] mb-12">
              Transformons votre vision en <span className="text-accent italic">réalité digitale.</span>
            </h2>
            <p className="font-body text-white/60 text-lg md:text-xl mb-16 leading-relaxed max-w-xl mx-auto">
              Que vous soyez une startup ou un entrepreneur établi, je vous accompagne dans votre prochaine étape technique.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button 
                onClick={onBookingClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group w-full sm:w-auto px-12 py-6 rounded-2xl font-display font-bold text-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${
                  darkMode ? 'bg-white text-primary' : 'bg-white text-primary'
                }`}
              >
                Parlons de votre projet
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                onClick={onContactClick}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-12 py-6 bg-primary/20 border border-white/20 text-white rounded-2xl font-display font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <div className="p-2 bg-accent/20 rounded-lg text-accent">
                   <MessageSquare size={18} />
                </div>
                Laisser un message
              </motion.button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={`mt-32 pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] ${
          darkMode ? 'border-white/10 text-gray-500' : 'border-border-light text-text-gray'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className={`font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>{PRENOM} {NOM}</span> — © {new Date().getFullYear()}
          </div>
          
          <div className="flex gap-8">
            <motion.a 
              href={GITHUB} 
              target="_blank" 
              whileHover={{ y: -3 }}
              className={`flex items-center gap-2 transition-all duration-300 ${darkMode ? 'hover:text-white' : 'hover:text-primary'}`}
            >
              <Github size={14} className="opacity-70" />
              <span>GitHub</span>
            </motion.a>
            <motion.a 
              href={INSTAGRAM} 
              target="_blank" 
              whileHover={{ y: -3 }}
              className={`flex items-center gap-2 transition-all duration-300 ${darkMode ? 'hover:text-white' : 'hover:text-primary'}`}
            >
              <Instagram size={14} className="opacity-70" />
              <span>Instagram</span>
            </motion.a>
          </div>

          <div className="flex items-center gap-6">
            <motion.a 
              href="/sitemap.xml" 
              target="_blank" 
              whileHover={{ y: -2 }}
              className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-accent'}`}
            >
              <Search size={12} className="opacity-50" />
              <span>Sitemap</span>
            </motion.a>
            <motion.a 
              href={URL_MAISON} 
              target="_blank" 
              whileHover={{ y: -2 }}
              className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-accent'}`}
            >
              <Globe size={12} className="opacity-50" />
              <span>MAISON</span>
            </motion.a>
            <motion.a 
              href={URL_FIDELYNK} 
              target="_blank" 
              whileHover={{ y: -2 }}
              className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-accent'}`}
            >
              <Globe size={12} className="opacity-50" />
              <span>FIDELYNK</span>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const TechStack = ({ darkMode }: { darkMode: boolean }) => {
  const techLogos = [
    { node: <SiReact />, title: "React" },
    { node: <SiNextdotjs />, title: "Next.js" },
    { node: <SiTypescript />, title: "TypeScript" },
    { node: <SiTailwindcss />, title: "Tailwind CSS" },
    { node: <SiFramer />, title: "Framer Motion" },
    { node: <SiThreedotjs />, title: "Three.js" },
    { node: <SiNodedotjs />, title: "Node.js" },
    { node: <SiFirebase />, title: "Firebase" },
    { node: <SiSupabase />, title: "Supabase" },
    { node: <SiVercel />, title: "Vercel" },
    { node: <SiGithub />, title: "GitHub" },
    { node: <SiFigma />, title: "Figma" },
  ];

  return (
    <section className="py-24 bg-transparent border-y border-white/5 overflow-hidden">
      <div className="max-w-[1152px] mx-auto px-6">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] mb-4 italic">Technical Proficiency</span>
          <h2 className={`font-display font-bold text-2xl tracking-tight ${darkMode ? 'text-white' : 'text-primary'}`}>Utilisation des meilleures technologies du marché.</h2>
        </div>
        <div className="relative">
          <Suspense fallback={<div className="h-10 w-full bg-bg-light animate-pulse rounded-full" />}>
            <LogoLoop
              logos={techLogos}
              speed={40}
              gap={80}
              logoHeight={32}
              fadeOut
              fadeOutColor={darkMode ? "#050505" : "#FFFFFF"}
              scaleOnHover
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};


const BookingModal = ({ isOpen, onClose, darkMode }: { isOpen: boolean; onClose: () => void; darkMode: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center px-4 md:px-10 py-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-2xl"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-[1000px] h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col ${
              darkMode ? 'bg-[#0A0A0B] border border-white/10' : 'bg-white'
            }`}
          >
            {/* Header Modale */}
            <div className={`flex justify-between items-center p-6 border-b z-20 ${
              darkMode ? 'bg-[#0A0A0B] border-white/10' : 'bg-white border-border-light'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white">
                  <Zap size={18} fill="white" />
                </div>
                <h3 className={`font-display font-bold text-xl ${darkMode ? 'text-white' : 'text-primary'}`}>Réserver un slot stratégique</h3>
              </div>
              <button 
                onClick={onClose}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  darkMode ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-border-light text-text-gray hover:text-primary hover:border-accent/40'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Calendly Inline Widget with Loading State */}
            <div className={`flex-1 relative ${darkMode ? 'bg-black' : 'bg-bg-light'}`}>
              <AnimatePresence>
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-30 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                    <div className="text-center">
                      <p className="font-display font-bold text-white tracking-widest text-sm uppercase">Chargement</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-1">Initialisation de l'agenda...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <iframe
                src="https://calendly.com/call_lucas/reservation?hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly Scheduling"
                className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
    </Router>
  );
}

const AppContent = ({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  useEffect(() => {
    // Handle hash scrolling after navigation
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-accent/30 selection:text-primary cursor-default ${darkMode ? 'bg-[#050505] text-white' : 'bg-[#FAFAFA] text-primary'}`}>
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${darkMode ? 'opacity-40 scale-105 contrast-[1.2]' : 'opacity-0 scale-100'}`}
          style={{ 
            backgroundImage: "url('/premium-bg.png')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          data-bg-check
        />
        {darkMode && (
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-80" />
        )}
      </div>

      <div className="relative z-10">
        <GrainOverlay />
        <Navbar 
          onContactClick={() => navigate('/connect')} 
          onBookingClick={() => setIsBookingOpen(true)} 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        
        <Routes>
          <Route path="/" element={
            <main>
              <Hero onMessageClick={() => navigate('/connect')} onBookingClick={() => setIsBookingOpen(true)} darkMode={darkMode} />
              <div id="about">
                <About darkMode={darkMode} />
              </div>
              <TechStack darkMode={darkMode} />
              <div id="expertise">
                <Expertise darkMode={darkMode} />
              </div>
              <Suspense fallback={<div className="h-96 w-full bg-bg-light animate-pulse" />}>
                <MacbookScrollDemo />
              </Suspense>
              <div id="ventures">
                <Ventures darkMode={darkMode} />
              </div>
              <div id="testimonials">
                <Testimonials darkMode={darkMode} />
              </div>
              <Ambition darkMode={darkMode} />
              <Contact onBookingClick={() => setIsBookingOpen(true)} onContactClick={() => navigate('/connect')} darkMode={darkMode} />
            </main>
          } />
          <Route path="/connect" element={<ConnectPage darkMode={darkMode} />} />
        </Routes>

        <EcosystemModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          darkMode={darkMode}
        />

        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};
