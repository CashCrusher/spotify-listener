import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  MapPin, 
  Target, 
  Globe, 
  MessageSquare, 
  Linkedin, 
  Phone,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface EcosystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

type Step = 'intro' | 'identity' | 'origin' | 'intent' | 'universe' | 'contact' | 'success';

export const EcosystemModal = ({ isOpen, onClose, darkMode }: EcosystemModalProps) => {
  const [step, setStep] = useState<Step>('intro');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    intent: '',
    description: '',
    socialLink: '',
    whatsapp: ''
  });

  const steps: Step[] = ['intro', 'identity', 'origin', 'intent', 'universe', 'contact'];
  const currentStepIndex = steps.indexOf(step as Step);

  useEffect(() => {
    if (!isOpen) {
      setStep('intro');
      setFormData({
        name: '',
        origin: '',
        intent: '',
        description: '',
        socialLink: '',
        whatsapp: ''
      });
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        metadata: {
          timestamp: new Date().toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
          userAgent: navigator.userAgent,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          pageUrl: window.location.href
        }
      };

      const response = await fetch('https://hook.eu1.make.com/3878vxsnas5y6kxz42yl5aup6mr6vvns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStep('success');
        setTimeout(() => {
          window.location.href = 'https://wa.me/33605706304';
        }, 2500);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-display font-bold mb-4">Pourquoi rejoindre l&apos;écosystème ?</h3>
              <p className="text-white/60 leading-relaxed">
                Connecter avec Lucas, c&apos;est intégrer un réseau dynamique où l&apos;innovation technologique rencontre la vision business.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Opportunités Exclusives", desc: "Accès en avant-première à des projets, outils et insights IA." },
                { title: "Synergies Business", desc: "Co-création de valeur et partenariats stratégiques." },
                { title: "Networking Premium", desc: "Connexion directe avec des bâtisseurs et innovateurs." }
              ].map((benefit, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/20 hover:bg-white/[0.07] transition-all"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 animate-pulse" />
                  <div>
                    <h4 className="font-bold text-white/90 text-sm">{benefit.title}</h4>
                    <p className="text-xs text-white/40">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'identity':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <User size={20} />
              </div>
              <h3 className="text-xl font-display font-bold">Commençons par faire connaissance</h3>
            </div>
            <div className="relative group">
              <input
                type="text"
                placeholder="Votre Prénom & Nom"
                className={`w-full bg-transparent border-b-2 py-4 text-2xl font-display outline-none transition-all duration-500 ${
                  formData.name ? 'border-accent shadow-[0_4px_20px_-10px_rgba(16,185,129,0.3)]' : 'border-white/10 focus:border-accent/50'
                }`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                autoFocus
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-500 scale-x-0 group-focus-within:scale-x-100" />
            </div>
          </motion.div>
        );

      case 'origin':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <MapPin size={20} />
              </div>
              <h3 className="text-xl font-display font-bold">D'où nous connaissons-nous ?</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'Présentiel', 'Autre'].map((opt) => (
                <motion.button
                  key={opt}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setFormData({ ...formData, origin: opt });
                    setTimeout(handleNext, 300);
                  }}
                  className={`p-4 rounded-xl border text-sm font-medium transition-all duration-300 text-left hover:border-accent/50 hover:bg-accent/5 ${
                    formData.origin === opt ? 'border-accent bg-accent/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-white/10 text-white/50'
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 'intent':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <Target size={20} />
              </div>
              <h3 className="text-xl font-display font-bold">Nature de la connexion ?</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'Business', label: '🚀 Business / Projet', desc: 'Une opportunité concrète à explorer.' },
                { id: 'Networking', label: '🤝 Networking', desc: 'Élargir nos réseaux respectifs.' },
                { id: 'Collaboration', label: '🛠️ Collaboration', desc: 'Travailler ensemble sur un sujet précis.' },
                { id: 'Chill', label: '☕ Café / Chill', desc: 'Discuter simplement de tout et de rien.' }
              ].map((opt) => (
                <motion.button
                  key={opt.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    setFormData({ ...formData, intent: opt.id });
                    setTimeout(handleNext, 300);
                  }}
                  className={`p-5 rounded-xl border transition-all duration-300 text-left hover:border-accent/50 hover:bg-accent/5 group ${
                    formData.intent === opt.id ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-white/10'
                  }`}
                >
                  <div className={`font-bold mb-1 ${formData.intent === opt.id ? 'text-white' : 'text-white/80'}`}>{opt.label}</div>
                  <div className="text-xs text-white/40 group-hover:text-white/60">{opt.desc}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 'universe':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <Globe size={20} />
              </div>
              <h3 className="text-xl font-display font-bold">Parle-moi de ton univers</h3>
            </div>
            <div className="relative group">
              <textarea
                placeholder="Tes projets, tes ambitions, ce qui te passionne..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 h-40 outline-none focus:border-accent/50 transition-all text-white/90 resize-none group-focus-within:shadow-[0_0_30px_-5px_rgba(16,185,129,0.1)]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl border border-accent/0 group-focus-within:border-accent/20 pointer-events-none transition-all" />
            </div>
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-xl font-display font-bold">Comment rester en contact ?</h3>
            </div>
            <div className="space-y-4">
              <div className="relative group">
                <Linkedin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors" />
                <input
                  type="text"
                  placeholder="Lien LinkedIn ou Instagram"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent/50 transition-all group-focus-within:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                  value={formData.socialLink}
                  onChange={(e) => setFormData({ ...formData, socialLink: e.target.value })}
                />
              </div>
              <div className="relative group">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors" />
                <input
                  type="text"
                  placeholder="Numéro WhatsApp"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent/50 transition-all group-focus-within:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>
            </div>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-12 space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 size={48} />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Connexion établie !</h2>
              <p className="text-white/60">Tes informations ont été intégrées à mon écosystème.<br/>Tu vas être redirigé vers mon WhatsApp...</p>
            </div>
            <div className="flex items-center gap-2 text-accent text-sm font-mono animate-pulse">
              <Loader2 className="animate-spin" size={14} />
              REDIRECTION EN COURS
            </div>
          </motion.div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        className="relative w-full max-w-4xl bg-black border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_150px_rgba(16,185,129,0.15)] flex flex-col md:flex-row"
      >
        {/* Left Side: Avatar/Preview */}
        <div className="hidden md:block w-96 bg-accent/[0.03] border-r border-white/5 relative overflow-hidden p-12 flex flex-col justify-between">
          <div className="relative z-10">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="w-12 h-1 bg-accent rounded-full mb-8 origin-left" 
            />
            <h2 className="text-4xl font-display font-bold leading-tight">
              Rejoindre <br/> mon <br/> <span className="text-accent italic">Écosystème</span>
            </h2>
          </div>
          
          <div className="relative z-10 aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-black/40 border border-white/10 group">
             <img 
                src="/avatar.png" 
                alt="Avatar Lucas"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://api.dicebear.com/7.x/initials/svg?seed=Lucas&backgroundColor=10B981";
                }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/50 tracking-widest">SYSTEM_AUTH_01</div>
          </div>

          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-1/4 -right-20 w-64 h-64 bg-accent rounded-full blur-[100px]" />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-14 relative flex flex-col min-h-[550px]">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/5 transition-all text-white/20 hover:text-white hover:rotate-90"
          >
            <X size={20} />
          </button>

          <div className="flex-1 flex flex-col justify-center">
            {step !== 'success' && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  {steps.map((s, idx) => (
                    <div 
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-all duration-700 relative overflow-hidden ${
                        idx <= currentStepIndex ? 'bg-accent' : 'bg-white/10'
                      }`}
                    >
                      {idx === currentStepIndex && (
                        <motion.div 
                          initial={{ left: '-100%' }}
                          animate={{ left: '100%' }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                          className="absolute top-0 bottom-0 w-1/2 bg-white/20 skew-x-12"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em]">Module Connect • {currentStepIndex + 1} / 6</div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>

          {step !== 'success' && (
            <div className="mt-12 flex items-center justify-between">
              <div>
                {currentStepIndex > 0 && (
                  <button 
                    onClick={handlePrev}
                    className="flex items-center gap-2 text-white/30 hover:text-white transition-all text-sm font-medium group"
                  >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour
                  </button>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading || (step === 'identity' && !formData.name) || (step === 'origin' && !formData.origin) || (step === 'intent' && !formData.intent) || (step === 'universe' && !formData.description) || (step === 'contact' && (!formData.socialLink || !formData.whatsapp))}
                onClick={currentStepIndex === steps.length - 1 ? handleSubmit : handleNext}
                className={`px-10 py-5 rounded-2xl flex items-center gap-3 font-display font-bold transition-all duration-300 shadow-xl ${
                  loading 
                  ? 'bg-white/10 text-white/50 cursor-not-allowed shadow-none' 
                  : 'bg-white text-black hover:bg-accent hover:text-white shadow-white/5 hover:shadow-accent/20'
                }`}
              >
                {loading ? (
                  <>Initialisation... <Loader2 className="animate-spin" size={18} /></>
                ) : currentStepIndex === steps.length - 1 ? (
                  <>Finaliser la connexion <Send size={18} /></>
                ) : currentStepIndex === 0 ? (
                  <>C&apos;est parti <ChevronRight size={18} /></>
                ) : (
                  <>Suivant <ChevronRight size={18} /></>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
