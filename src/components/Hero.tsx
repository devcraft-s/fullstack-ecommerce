import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ShoppingCart, Package, CreditCard, Truck, Store, BarChart3, Tag, Sparkles } from 'lucide-react';
import logo from '../assets/logo/logo.png';

const floatingIcons = [
  { Icon: ShoppingCart, x: 5, y: 15, size: 36, delay: 0 },
  { Icon: Package, x: 90, y: 12, size: 32, delay: 0.5 },
  { Icon: CreditCard, x: 85, y: 70, size: 28, delay: 1 },
  { Icon: Truck, x: 8, y: 75, size: 34, delay: 1.5 },
  { Icon: Store, x: 92, y: 45, size: 30, delay: 2 },
  { Icon: BarChart3, x: 3, y: 50, size: 26, delay: 2.5 },
  { Icon: Tag, x: 88, y: 88, size: 24, delay: 3 },
  { Icon: Sparkles, x: 10, y: 90, size: 28, delay: 3.5 },
];

const roles = [
  'Design & Development',
  'AI Integration & Automation',
  'Digital Marketing',
  'North America Market Strategy',
  'Technology Implementation',
  'Data Analytics',
];

// Sparkle burst effect on click
const SparkleEffect = ({ x, y }: { x: number; y: number }) => {
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i * 30) * (Math.PI / 180),
    distance: 50 + Math.random() * 30,
  }));

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {sparkles.map((sparkle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, #22d3ee, #a78bfa, #f472b6)`,
            boxShadow: '0 0 10px #22d3ee, 0 0 20px #a78bfa',
          }}
          initial={{ x: 0, y: 0, scale: 1 }}
          animate={{
            x: Math.cos(sparkle.angle) * sparkle.distance,
            y: Math.sin(sparkle.angle) * sparkle.distance,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
};

// Moving border card with continuous animation
const MovingBorderCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
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
      <div className="absolute inset-[2px] rounded-xl bg-gray-900/95 z-0" />
      
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
  };

  const currentColor = colors[color] || colors.cyan;

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.08, y: -8 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Base border */}
      <div className="absolute inset-0 rounded-xl border border-gray-700" />
      
      {/* Animated tracing border */}
      {isHovered && (
        <>
          {/* Top border */}
          <motion.div
            className="absolute top-0 left-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${currentColor.primary}, ${currentColor.primary})` }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
          {/* Right border */}
          <motion.div
            className="absolute top-0 right-0 w-[2px]"
            style={{ background: `linear-gradient(180deg, transparent, ${currentColor.primary}, ${currentColor.primary})` }}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 0.2, delay: 0.1, ease: 'easeOut' }}
          />
          {/* Bottom border */}
          <motion.div
            className="absolute bottom-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(270deg, transparent, ${currentColor.primary}, ${currentColor.primary})` }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.2, delay: 0.2, ease: 'easeOut' }}
          />
          {/* Left border */}
          <motion.div
            className="absolute bottom-0 left-0 w-[2px]"
            style={{ background: `linear-gradient(0deg, transparent, ${currentColor.primary}, ${currentColor.primary})` }}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 0.2, delay: 0.3, ease: 'easeOut' }}
          />
          
          {/* Corner glows */}
          <motion.div
            className="absolute -top-1 -left-1 w-3 h-3 rounded-full"
            style={{ background: currentColor.primary, boxShadow: `0 0 15px ${currentColor.primary}, 0 0 30px ${currentColor.primary}` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ background: currentColor.primary, boxShadow: `0 0 15px ${currentColor.primary}, 0 0 30px ${currentColor.primary}` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.45 }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full"
            style={{ background: currentColor.primary, boxShadow: `0 0 15px ${currentColor.primary}, 0 0 30px ${currentColor.primary}` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full"
            style={{ background: currentColor.primary, boxShadow: `0 0 15px ${currentColor.primary}, 0 0 30px ${currentColor.primary}` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.55 }}
          />
        </>
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-xl"
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        style={{ 
          background: `radial-gradient(circle, ${currentColor.glow}, transparent 70%)`,
          filter: 'blur(15px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

// Animated letter component with bright colors and brightness effect
const AnimatedLetter = ({ letter, index, onClickEffect }: { letter: string; index: number; onClickEffect: (e: React.MouseEvent) => void }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setIsClicked(true);
    onClickEffect(e);
    setTimeout(() => setIsClicked(false), 500);
  };

  return (
    <motion.span
      className="inline-block text-white cursor-pointer select-none"
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        textShadow: [
          '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(34, 211, 238, 0.2)',
          '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(34, 211, 238, 0.4), 0 0 60px rgba(167, 139, 250, 0.3)',
          '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(34, 211, 238, 0.2)',
        ],
        filter: [
          'brightness(1)',
          'brightness(1.3)',
          'brightness(1)',
        ],
        scale: isClicked ? [1, 1.5, 1] : 1,
        rotate: isClicked ? [0, -10, 10, 0] : 0,
        color: isClicked ? '#22d3ee' : '#ffffff',
      }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.05,
        type: 'spring',
        stiffness: 100,
        textShadow: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.1,
        },
        filter: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.1,
        },
        scale: { duration: 0.3 },
        rotate: { duration: 0.3 },
      }}
      whileHover={{
        scale: 1.4,
        color: '#22d3ee',
        textShadow: '0 0 40px rgba(34, 211, 238, 1), 0 0 80px rgba(34, 211, 238, 0.7), 0 0 120px rgba(167, 139, 250, 0.5)',
        filter: 'brightness(1.5)',
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 },
      }}
      whileTap={{
        scale: 0.9,
        rotate: 15,
      }}
      onClick={handleClick}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  );
};

// Interactive button with moving border
const InteractiveButton = ({ href, children, primary = false, onClickEffect }: { href: string; children: React.ReactNode; primary?: boolean; onClickEffect: (e: React.MouseEvent) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    onClickEffect(e);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  if (primary) {
    return (
      <MovingBorderCard className="rounded-xl">
        <motion.a
          href={href}
          className="relative block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-lg text-white overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-white/30"
              style={{ left: ripple.x, top: ripple.y }}
              initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
              animate={{ width: 300, height: 300, x: -150, y: -150, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          ))}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500"
            initial={{ x: '100%' }}
            animate={{ x: isHovered ? 0 : '100%' }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
          </span>
        </motion.a>
      </MovingBorderCard>
    );
  }

  return (
    <TraceBorderCard className="rounded-xl" color="purple">
      <motion.a
        href={href}
        className="relative block px-8 py-4 bg-gray-900/80 rounded-xl font-semibold text-lg text-white overflow-hidden"
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-purple-400/30"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ width: 300, height: 300, x: -150, y: -150, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        ))}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.a>
    </TraceBorderCard>
  );
};

// Interactive status badge with moving border
const StatusBadge = ({ onClickEffect }: { onClickEffect: (e: React.MouseEvent) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
    >
      <MovingBorderCard className="rounded-full inline-block">
        <motion.div
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900/90 rounded-full backdrop-blur-sm cursor-pointer select-none"
          whileTap={{ scale: 0.95 }}
          onClick={onClickEffect}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300"></span>
          </span>
          <motion.span 
            className="text-cyan-200 text-sm font-semibold"
            animate={{ 
              textShadow: [
                '0 0 10px rgba(34, 211, 238, 0.5)',
                '0 0 20px rgba(34, 211, 238, 0.8)',
                '0 0 10px rgba(34, 211, 238, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            We can help you reimagine your business through a digital lens.
          </motion.span>
        </motion.div>
      </MovingBorderCard>
    </motion.div>
  );
};

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [sparkleEffects, setSparkleEffects] = useState<{ x: number; y: number; id: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(springY, [0, window.innerHeight], [5, -5]);
  const rotateY = useTransform(springX, [0, window.innerWidth], [-5, 5]);

  const addSparkleEffect = (e: React.MouseEvent) => {
    const id = Date.now();
    setSparkleEffects(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
    setTimeout(() => {
      setSparkleEffects(prev => prev.filter(s => s.id !== id));
    }, 800);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentRole.length) {
            setDisplayedText(currentRole.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const nameText = "THE GROWTH INVENTION COMPANY";

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Sparkle effects */}
      {sparkleEffects.map(effect => (
        <SparkleEffect key={effect.id} x={effect.x} y={effect.y} />
      ))}

      {/* Dark background */}
      <div className="absolute inset-0 bg-[#050508]" />
      
      {/* Animated mesh gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(167, 139, 250, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
          left: '10%',
          top: '10%',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, transparent 70%)',
          right: '10%',
          bottom: '10%',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.2) 0%, transparent 70%)',
          left: '50%',
          top: '30%',
          transform: 'translateX(-50%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Animated stars */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <AnimatedStar key={i} {...star} />
        ))}
      </div> */}

      {/* Rising particles */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <Particle key={i} {...particle} />
        ))}
      </div> */}

      {/* Floating e-commerce icons */}
      {floatingIcons.map(({ Icon, x, y, size, delay }, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:block pointer-events-none"
          style={{ left: `${x}%`, top: `${y}%` }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.5, duration: 0.8, type: 'spring' }}
        >
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div whileHover={{ scale: 1.5 }} className="relative">
              <div 
                className="absolute inset-0 rounded-full blur-xl"
                style={{ background: 'rgba(34, 211, 238, 0.5)', transform: 'scale(2)' }}
              />
              <Icon
                style={{ width: size, height: size }}
                className="text-cyan-300 relative z-10"
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <div className="text-center" style={{ transform: 'translateZ(50px)' }}>
          {/* Brand logo */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Glow behind logo */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl opacity-50"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #a78bfa, #f472b6)' }}
              />
              <motion.img
                src={logo}
                alt="USZIZO logo"
                className="relative h-16 sm:h-20 md:h-24 w-auto object-contain select-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={addSparkleEffect}
                style={{ cursor: 'pointer' }}
              />
            </motion.div>
          </motion.div>

          {/* Status badge */}
          <div className="mb-8 flex justify-center">
            <StatusBadge onClickEffect={addSparkleEffect} />
          </div>

          {/* Main heading with letter animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              animate={{
                textShadow: [
                  '0 0 30px rgba(34, 211, 238, 0.2)',
                  '0 0 60px rgba(34, 211, 238, 0.4), 0 0 90px rgba(167, 139, 250, 0.2)',
                  '0 0 30px rgba(34, 211, 238, 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {nameText.split('').map((letter, index) => (
                <AnimatedLetter key={index} letter={letter} index={index} onClickEffect={addSparkleEffect} />
              ))}
            </motion.h1>
          </motion.div>

          {/* Gradient subtitle with glow */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-2"
          >
            <TraceBorderCard className="rounded-xl inline-block" color="purple">
              <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl font-semibold px-6 py-3 cursor-pointer select-none"
                style={{
                  background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6, #22d3ee)',
                  backgroundSize: '300% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                whileTap={{ scale: 0.95 }}
                onClick={addSparkleEffect}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <b className='text-4xl'>We Drive Global Business</b><br/>
                with technology deployments in 150+ countries
              </motion.h2>
            </TraceBorderCard>
          </motion.div> */}

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="h-8 flex items-center justify-center mb-6"
          >
            <motion.p 
              className="text-lg text-gray-200 font-medium cursor-pointer select-none"
              whileHover={{ scale: 1.1, color: '#22d3ee' }}
              onClick={addSparkleEffect}
            >
              {displayedText}
              <motion.span
                className="inline-block w-0.5 h-5 bg-cyan-300 ml-1 align-middle"
                animate={{ 
                  opacity: [1, 0],
                  boxShadow: [
                    '0 0 10px rgba(34, 211, 238, 0.8)',
                    '0 0 20px rgba(34, 211, 238, 0.4)',
                  ],
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.p>
          </motion.div>

          {/* Location */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <TraceBorderCard className="rounded-full inline-block" color="cyan">
              <motion.div
                className="flex items-center justify-center gap-2 text-gray-300 px-4 py-2 cursor-pointer select-none"
                whileTap={{ scale: 0.95 }}
                onClick={addSparkleEffect}
              >
                <motion.div 
                  animate={{ 
                    y: [0, -3, 0],
                    filter: [
                      'drop-shadow(0 0 5px rgba(34, 211, 238, 0.6))',
                      'drop-shadow(0 0 12px rgba(34, 211, 238, 1))',
                      'drop-shadow(0 0 5px rgba(34, 211, 238, 0.6))',
                    ],
                  }} 
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="w-4 h-4 text-cyan-300" />
                </motion.div>
                <span>Tokyo, Japan • Open to Remote</span>
              </motion.div>
            </TraceBorderCard>
          </motion.div> */}

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 mt-8 leading-relaxed"
          >
            Strategically positioned for enterprise support, {' '}
            <motion.span 
              className="text-cyan-300 font-bold cursor-pointer select-none"
              animate={{
                textShadow: [
                  '0 0 10px rgba(34, 211, 238, 0.5)',
                  '0 0 25px rgba(34, 211, 238, 0.8)',
                  '0 0 10px rgba(34, 211, 238, 0.5)',
                ],
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95, rotate: 5 }}
              onClick={addSparkleEffect}
              transition={{ duration: 2, repeat: Infinity }}
            >
              USZIZO
            </motion.span>{' '}
            combines the comprehensive experience of a {' '}
            <motion.span 
              className="text-purple-300 font-bold cursor-pointer select-none"
              animate={{
                textShadow: [
                  '0 0 10px rgba(167, 139, 250, 0.5)',
                  '0 0 25px rgba(167, 139, 250, 0.8)',
                  '0 0 10px rgba(167, 139, 250, 0.5)',
                ],
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
              onClick={addSparkleEffect}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              globally integrated team
            </motion.span>{' '}
            with the value of localized support across North America.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <InteractiveButton href="#projects" primary onClickEffect={addSparkleEffect}>
              Proven Results for Clients
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                →
              </motion.span>
            </InteractiveButton>
            <InteractiveButton href="#contact" onClickEffect={addSparkleEffect}>
              Contact Us
            </InteractiveButton>
          </motion.div>

          {/* Tech Stack */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <motion.p 
              className="text-sm text-gray-400 mb-4 tracking-wider uppercase font-medium cursor-pointer select-none"
              whileHover={{ scale: 1.1, color: '#22d3ee' }}
              onClick={addSparkleEffect}
            >
              Tech Stack
            </motion.p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {techStack.map((tech, index) => (
                <TechBadge key={tech.name} tech={tech} index={index} onClickEffect={addSparkleEffect} />
              ))}
            </div>
          </motion.div> */}
        </div>

        {/* Scroll indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <TraceBorderCard className="rounded-full" color="cyan">
            <motion.a
              href="#about"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileTap={{ scale: 0.9 }}
              onClick={addSparkleEffect}
              className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer px-4 py-3"
            >
              <motion.span 
                className="text-xs tracking-widest uppercase font-medium"
                whileHover={{ color: '#22d3ee' }}
              >
                Scroll
              </motion.span>
              <motion.div 
                className="w-6 h-10 rounded-full border-2 border-gray-500 flex items-start justify-center p-1"
              >
                <motion.div
                  className="w-1.5 h-2.5 bg-cyan-300 rounded-full"
                  animate={{ 
                    y: [0, 12, 0], 
                    opacity: [1, 0.3, 1],
                    boxShadow: [
                      '0 0 8px rgba(34, 211, 238, 0.6)',
                      '0 0 20px rgba(34, 211, 238, 1)',
                      '0 0 8px rgba(34, 211, 238, 0.6)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.a>
          </TraceBorderCard>
        </motion.div> */}
      </motion.div>
    </section>
  );
}
