import { motion, useInView } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import {
  Users,
  Award,
  CheckCircle,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
  Medal,
  Globe2,
  Trophy,
} from 'lucide-react';

const teamMembers = [
  {
    name: 'Hiroki Yamashita',
    role: 'Founder · Engineering Lead',
    bio: 'Shopify and headless storefronts, app integrations, and performance tuning for stores that scale.',
    initials: 'HY',
    color: 'cyan' as const,
  },
  {
    name: 'Maya Chen',
    role: 'UX & Product Design',
    bio: 'Design systems, checkout flows, and accessible UI that keeps customers moving toward purchase.',
    initials: 'MC',
    color: 'purple' as const,
  },
  {
    name: 'Jordan Okonkwo',
    role: 'AI & Automation',
    bio: 'AI-assisted workflows, internal tools, and integrations that cut manual ops and speed fulfillment.',
    initials: 'JO',
    color: 'pink' as const,
  },
  {
    name: 'Sofia Andersson',
    role: 'Growth & Analytics',
    bio: 'Experimentation, attribution, and dashboards so every launch is measured and improved over time.',
    initials: 'SA',
    color: 'amber' as const,
  },
];

const qualities = [
  { icon: Medal, stat: '+65%', label: 'Senior Experts', color: 'cyan' as const },
  { icon: Star, stat: '9.3/10', label: 'Client Satisfaction Rate', color: 'purple' as const },
  { icon: Users, stat: '300+', label: 'IT Professionals', color: 'pink' as const },
  { icon: Award, stat: '4.8/5', label: 'Clutch Score with 30+ reviews', color: 'amber' as const },
  { icon: Globe2, stat: '2000+', label: 'US-Based Talent Pool', color: 'cyan' as const },
  { icon: Trophy, stat: '4x', label: 'Voted a Best US Employer', color: 'purple' as const },
];

// const CO_FOUNDER_IMAGE = '/images/co-founder.jpg';
const CO_FOUNDER_IMAGE = '/images/our-team.webp';

type TeamMember = (typeof teamMembers)[number];

function memberAvatarClass(color: TeamMember['color']) {
  switch (color) {
    case 'cyan':
      return 'bg-cyan-500/20 text-gray-900 ring-1 ring-cyan-400/40';
    case 'purple':
      return 'bg-purple-500/20 text-gray-900 ring-1 ring-purple-400/40';
    case 'pink':
      return 'bg-pink-500/20 text-gray-900 ring-1 ring-pink-400/40';
    default:
      return 'bg-amber-500/20 text-gray-900 ring-1 ring-amber-400/40';
  }
}

const TEAM_CAROUSEL_VISIBLE = 3;

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <TraceBorderCard className="rounded-xl h-full min-h-[200px]" color={member.color}>
      <div className="p-4 sm:p-5 md:p-6 bg-white rounded-xl h-full flex flex-col">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 ${memberAvatarClass(member.color)}`}
        >
          {member.initials}
        </div>
        <h5 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 leading-snug">{member.name}</h5>
        <p className="text-xs sm:text-sm text-cyan-600/90 mb-2 sm:mb-3 leading-snug">{member.role}</p>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed flex-1 line-clamp-4 sm:line-clamp-none">{member.bio}</p>
      </div>
    </TraceBorderCard>
  );
}

function TeamCarousel({ members }: { members: typeof teamMembers }) {
  const id = useId();
  const n = members.length;
  const visible = Math.min(TEAM_CAROUSEL_VISIBLE, n);
  const maxIndex = Math.max(0, n - visible);
  const [index, setIndex] = useState(0);
  const pageCount = maxIndex + 1;
  const trackId = `${id}-track`;

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const pageIndex = Math.min(index, maxIndex);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const trackWidthPct = (n / visible) * 100;
  const cellWidthPct = 100 / n;
  const translatePctPerStep = 100 / n;

  const visibleNames = members.slice(pageIndex, pageIndex + visible).map((m) => m.name).join(', ');

  return (
    <div className="relative px-2 md:px-12">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Team members"
        id={trackId}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goPrev();
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            goNext();
          }
        }}
        className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
      >
        <motion.div
          className="flex"
          style={{ width: `${trackWidthPct}%` }}
          animate={{ x: `-${pageIndex * translatePctPerStep}%` }}
          transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        >
          {members.map((member, i) => (
            <div
              key={member.name}
              className="shrink-0 px-1.5 sm:px-2 md:px-2.5"
              style={{ width: `${cellWidthPct}%` }}
              aria-hidden={i < pageIndex || i >= pageIndex + visible}
            >
              <TeamMemberCard member={member} />
            </div>
          ))}
        </motion.div>
      </div>

      {maxIndex > 0 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            disabled={pageIndex === 0}
            className="absolute z-20 left-0 top-1/2 hidden -translate-y-1/2 sm:flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-cyan-600 shadow-lg backdrop-blur-sm transition hover:border-cyan-500/40 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous team members"
            aria-controls={trackId}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={pageIndex >= maxIndex}
            className="absolute z-20 right-0 top-1/2 hidden -translate-y-1/2 sm:flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-cyan-600 shadow-lg backdrop-blur-sm transition hover:border-cyan-500/40 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next team members"
            aria-controls={trackId}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Carousel pages">
            {Array.from({ length: pageCount }, (_, page) => (
              <button
                key={page}
                type="button"
                role="tab"
                aria-selected={page === pageIndex}
                aria-label={`Show team members page ${page + 1} of ${pageCount}`}
                onClick={() => setIndex(page)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${
                  page === pageIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={goPrev}
              disabled={pageIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white text-cyan-600 disabled:opacity-30"
              aria-label="Previous team members"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={pageIndex >= maxIndex}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white text-cyan-600 disabled:opacity-30"
              aria-label="Next team members"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}

      <p className="sr-only" aria-live="polite">
        Showing {visible} team members: {visibleNames}
      </p>
    </div>
  );
}

// Animated star component
const AnimatedStar = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <Star className="text-cyan-300 fill-cyan-300" style={{ width: size, height: size }} />
  </motion.div>
);

// Floating particle
const Particle = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-cyan-300 to-purple-400"
    style={{ left: `${x}%`, bottom: 0 }}
    animate={{
      y: [0, -800],
      opacity: [0, 1, 1, 0],
      scale: [0, 1.5, 1, 0],
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

// Moving border card with continuous animation
const MovingBorderCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Moving gradient border */}
      <div
        className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered 
            ? 'linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6, #22d3ee)' 
            : 'transparent',
          backgroundSize: '300% 100%',
          animation: isHovered ? 'movingBorder 2s linear infinite' : 'none',
        }}
      />
      
      {/* Inner background */}
      <div className="absolute inset-[2px] rounded-xl bg-white z-0" />
      
      {/* Glow effect */}
      {isHovered && (
        <motion.div
          className="absolute -inset-4 rounded-xl opacity-30 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          style={{
            background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      <style>{`
        @keyframes movingBorder {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

// Trace border card - border traces around on hover
const TraceBorderCard = ({ children, className = '', color = 'cyan' }: { children: React.ReactNode; className?: string; color?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const colors: Record<string, { primary: string; glow: string }> = {
    cyan: { primary: '#22d3ee', glow: 'rgba(34, 211, 238, 0.5)' },
    purple: { primary: '#a78bfa', glow: 'rgba(167, 139, 250, 0.5)' },
    pink: { primary: '#f472b6', glow: 'rgba(244, 114, 182, 0.5)' },
    amber: { primary: '#fbbf24', glow: 'rgba(251, 191, 36, 0.5)' },
  };

  const currentColor = colors[color] || colors.cyan;

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Base border */}
      <div className="absolute inset-0 rounded-xl border border-gray-200" />
      
      {/* Animated tracing border */}
      {isHovered && (
        <>
          {/* Top border - left to right */}
          <motion.div
            className="absolute top-0 left-0 h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${currentColor.primary}, transparent)` }}
            initial={{ width: 0, x: 0 }}
            animate={{ width: '100%', x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          {/* Right border - top to bottom */}
          <motion.div
            className="absolute top-0 right-0 w-[2px] rounded-full"
            style={{ background: `linear-gradient(180deg, transparent, ${currentColor.primary}, transparent)` }}
            initial={{ height: 0, y: 0 }}
            animate={{ height: '100%', y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
          />
          {/* Bottom border - right to left */}
          <motion.div
            className="absolute bottom-0 right-0 h-[2px] rounded-full"
            style={{ background: `linear-gradient(270deg, transparent, ${currentColor.primary}, transparent)` }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
          />
          {/* Left border - bottom to top */}
          <motion.div
            className="absolute bottom-0 left-0 w-[2px] rounded-full"
            style={{ background: `linear-gradient(0deg, transparent, ${currentColor.primary}, transparent)` }}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 0.3, delay: 0.45, ease: 'easeOut' }}
          />
          
          {/* Corner glows */}
          <motion.div
            className="absolute -top-1 -left-1 w-2 h-2 rounded-full"
            style={{ background: currentColor.primary, boxShadow: `0 0 10px ${currentColor.primary}` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
            style={{ background: currentColor.primary, boxShadow: `0 0 10px ${currentColor.primary}` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.55 }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full"
            style={{ background: currentColor.primary, boxShadow: `0 0 10px ${currentColor.primary}` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full"
            style={{ background: currentColor.primary, boxShadow: `0 0 10px ${currentColor.primary}` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.65 }}
          />
        </>
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        animate={{ opacity: isHovered ? 0.2 : 0 }}
        style={{ 
          background: currentColor.primary,
          filter: 'blur(20px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stars = Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    size: 6 + Math.random() * 10,
  }));

  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    delay: Math.random() * 8,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Dark background - same as Home */}
      <div className="absolute inset-0 bg-slate-50" />

      {/* Animated mesh gradient - same as Home */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(167, 139, 250, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid pattern - same as Home */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated glow orbs - same as Home */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%)',
          right: '5%',
          top: '10%',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%)',
          left: '10%',
          bottom: '20%',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, transparent 70%)',
          left: '40%',
          top: '50%',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <AnimatedStar key={i} {...star} />
        ))}
      </div>

      {/* Rising particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <Particle key={i} {...particle} />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span className="text-cyan-600 text-sm font-medium">About Us</span>
          </motion.div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            A{' '}
            <motion.span 
              className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              animate={{
                textShadow: [
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                  '0 0 40px rgba(34, 211, 238, 0.5)',
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              United States Team
            </motion.span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Rokify-Tech brings designers, engineers, and growth specialists together—shipping digital products,
            commerce platforms, and the measurement to prove what works.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          <motion.div variants={itemVariants}>
            <MovingBorderCard className="rounded-2xl">
              <div className="bg-white rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40">
                <motion.div
                  className="relative aspect-[5/4] sm:aspect-[4/3] bg-gray-800"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <img
                    src={CO_FOUNDER_IMAGE}
                    alt="Rokify-Tech leadership team"
                    className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent"
                    aria-hidden
                  />
                </motion.div>
              </div>
            </MovingBorderCard>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Who We Are</h4>
              <p className="text-gray-600 leading-relaxed">
                Rokify-Tech helps enterprises reimagine how they build and scale in a digital world. Our heritage in
                software engineering, paired with strategy, experience design, and innovation consulting, turns complex
                initiatives into products and platforms that create measurable business value.
              </p>
            </div>

            <div>
              {/* <h4 className="text-xl font-semibold text-white mb-4">What We Have Delivered Together</h4> */}
              <ul className="space-y-3">
                {[
                  'Expanded AI, GenAI, and innovation practices with delivery across the United States and North America.',
                  'Deepened expertise in financial services, manufacturing, healthcare, and life sciences for enterprise clients.',
                  'Recognized as a leader in IDC MarketScapes for North American Experience Build, Experience Design, and Software Engineering Services.',
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3 text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ x: 5, color: '#22d3ee' }}
                  >
                    <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Team */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Meet the Team</h4>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Senior specialists across engineering, design, automation, and growth—aligned under one delivery model so
              your program moves fast without losing context.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <TeamCarousel members={teamMembers} />
          </motion.div>
        </motion.div>

        {/* Qualities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-16"
        >
          {qualities.map(({ icon: Icon, stat, label, color }) => (
            <TraceBorderCard key={label} className="rounded-xl" color={color}>
              <div className="p-6 bg-white rounded-xl h-full flex flex-col">
                <motion.div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                    color === 'cyan'
                      ? 'bg-cyan-500/10'
                      : color === 'purple'
                        ? 'bg-purple-500/10'
                        : color === 'pink'
                          ? 'bg-pink-500/10'
                          : 'bg-amber-500/10'
                  }`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      color === 'cyan'
                        ? 'text-cyan-600'
                        : color === 'purple'
                          ? 'text-purple-600'
                          : color === 'pink'
                            ? 'text-pink-600'
                            : 'text-amber-600'
                    }`}
                  />
                </motion.div>
                <p className="mb-2 text-2xl font-bold leading-none tracking-tight text-gray-900 sm:text-3xl">
                  <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stat}
                  </span>
                </p>
                <p className="text-sm leading-snug text-gray-500">{label}</p>
              </div>
            </TraceBorderCard>
          ))}
        </motion.div>

        {/* Stats */}
        {/* <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 gap-6 mt-12"
        >
          {stats.map(({ value, label, icon }, index) => (
            <TraceBorderCard key={label} className="rounded-xl" color={['cyan', 'purple', 'pink'][index]}>
              <div className="text-center p-6 bg-white rounded-xl h-full">
                <motion.div 
                  className="text-3xl mb-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {icon}
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-1">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            </TraceBorderCard>
          ))}
        </motion.div> */}

        {/* Badges */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {badges.map(({ icon, text }, idx) => (
            <AnimatedBadge key={text} icon={icon} text={text} delay={1 + idx * 0.1} />
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}
