import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { TrendingUp, Code2, Users, Zap, Award, Clock, CheckCircle, Handshake, Sparkles, Star } from 'lucide-react';

const stats = [
  { value: '8+', label: 'Years Experience', icon: '🚀' },
  { value: '50+', label: 'Projects Completed', icon: '💼' },
  { value: '100%', label: 'Client Satisfaction', icon: '⭐' },
];

const qualities = [
  { icon: TrendingUp, title: 'Conversion Focused', desc: 'Every line of code optimized for sales', color: 'cyan' },
  { icon: Code2, title: 'Clean Architecture', desc: 'Scalable, maintainable solutions', color: 'purple' },
  { icon: Users, title: 'UX Obsessed', desc: 'Seamless shopping experiences', color: 'pink' },
  { icon: Zap, title: 'Performance First', desc: 'Lightning-fast load times', color: 'amber' },
];

const badges = [
  { icon: Award, text: 'Shopify Partner' },
  { icon: Clock, text: 'On-Time Delivery' },
  { icon: CheckCircle, text: 'Quality Assured' },
  { icon: Handshake, text: 'Long-term Support' },
];

const codeSnippet = `const developer = {
  name: "Hiroki Yamashita",
  role: "Full-Stack E-Commerce Dev",
  experience: "8+ years",
  focus: [
    "Shopify Development",
    "Custom Themes",
    "App Integrations",
    "Conversion Optimization"
  ],
  passion: "Building stores that sell"
};`;

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
      <div className="absolute inset-0 rounded-xl border border-gray-700" />
      
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

// Badge with border animation
const AnimatedBadge = ({ icon: Icon, text, delay }: { icon: React.ElementType; text: string; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, y: -3 }}
    >
      {/* Rotating border */}
      <motion.div
        className="absolute -inset-[1px] rounded-full"
        style={{
          background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6, #22d3ee)',
          backgroundSize: '300% 100%',
        }}
        animate={{
          backgroundPosition: isHovered ? ['0% 50%', '300% 50%'] : '0% 50%',
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          backgroundPosition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 0.3 },
        }}
      />
      
      {/* Inner background */}
      <div className="relative flex items-center gap-2 px-4 py-2 bg-gray-900/95 rounded-full border border-transparent">
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-4 h-4 text-cyan-300" />
        </motion.div>
        <span className="text-gray-300 text-sm">{text}</span>
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
      <div className="absolute inset-0 bg-[#050508]" />

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
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span className="text-cyan-300 text-sm font-medium">About Me</span>
          </motion.div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Crafting{' '}
            <motion.span 
              className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
              animate={{
                textShadow: [
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                  '0 0 40px rgba(34, 211, 238, 0.5)',
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Digital Experiences
            </motion.span>
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            8+ years of experience building high-converting online stores with a passion for clean code and exceptional user experiences.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Code Block */}
          <motion.div variants={itemVariants}>
            <MovingBorderCard className="rounded-2xl">
              <div className="bg-gray-900/80 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
                  <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" />
                  <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" />
                  <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" />
                  <span className="ml-2 text-xs text-gray-400 font-mono">developer.ts</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto">
                  <code className="font-mono">
                    {codeSnippet.split('\n').map((line, i) => (
                      <motion.div 
                        key={i} 
                        className="flex"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.05 }}
                      >
                        <span className="text-gray-500 w-6 flex-shrink-0 select-none">{i + 1}</span>
                        <span className="text-gray-300">
                          {line.includes('const') && <span className="text-cyan-300">{line.split(' ')[0]} </span>}
                          {line.includes('const') ? line.slice(6) : line}
                        </span>
                      </motion.div>
                    ))}
                  </code>
                </pre>
              </div>
            </MovingBorderCard>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-white mb-3">Who I Am</h4>
              <p className="text-gray-300 leading-relaxed">
                I'm a Full-Stack E-Commerce Developer specializing in Shopify and custom online store solutions. 
                With over 8 years of experience, I've helped businesses of all sizes launch and scale their online presence.
              </p>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              My approach combines technical expertise with a deep understanding of e-commerce best practices. 
              From custom Shopify themes to complex app integrations, I build solutions that not only look beautiful 
              but also drive conversions and revenue.
            </p>

            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Key Achievements</h4>
              <ul className="space-y-3">
                {[
                  'Built and launched 50+ successful Shopify stores across various industries',
                  'Developed custom apps that increased client revenue by an average of 35%',
                  'Optimized checkout flows resulting in 25% reduction in cart abandonment',
                  'Created reusable component libraries for rapid store deployment'
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3 text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ x: 5, color: '#22d3ee' }}
                  >
                    <CheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Qualities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {qualities.map(({ icon: Icon, title, desc, color }) => (
            <TraceBorderCard key={title} className="rounded-xl" color={color}>
              <div className="p-6 bg-gray-900/80 rounded-xl h-full">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-6 h-6 text-cyan-300" />
                </motion.div>
                <h5 className="font-semibold text-white mb-1">{title}</h5>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            </TraceBorderCard>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 gap-6 mt-12"
        >
          {stats.map(({ value, label, icon }, index) => (
            <TraceBorderCard key={label} className="rounded-xl" color={['cyan', 'purple', 'pink'][index]}>
              <div className="text-center p-6 bg-gray-900/80 rounded-xl h-full">
                <motion.div 
                  className="text-3xl mb-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {icon}
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-1">{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            </TraceBorderCard>
          ))}
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {badges.map(({ icon, text }, idx) => (
            <AnimatedBadge key={text} icon={icon} text={text} delay={1 + idx * 0.1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
