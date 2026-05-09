import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Monitor, Server, ShoppingBag, Database, Cloud, Plug, Sparkles, Star } from 'lucide-react';

const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Monitor,
    color: 'cyan',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 100 },
      { name: 'JavaScript', level: 100 },
      { name: 'HTML/CSS', level: 100 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Next.js', level: 95 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    color: 'purple',
    skills: [
      { name: 'Node.js', level: 95 },
      { name: 'Python', level: 80 },
      { name: 'Express.js', level: 100 },
      { name: 'REST APIs', level: 100 },
      { name: 'GraphQL', level: 95 },
      { name: 'Django', level: 70 },
    ],
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: ShoppingBag,
    color: 'pink',
    skills: [
      { name: 'Liquid', level: 100 },
      { name: 'Theme Dev', level: 95 },
      { name: 'Shopify CLI', level: 90 },
      { name: 'Storefront API', level: 90 },
      { name: 'Admin API', level: 90 },
      { name: 'Hydrogen', level: 75 },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    icon: Database,
    color: 'cyan',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 95 },
      { name: 'Redis', level: 80 },
      { name: 'Prisma', level: 85 },
      { name: 'Firebase', level: 95 },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    icon: Cloud,
    color: 'purple',
    skills: [
      { name: 'Vercel', level: 90 },
      { name: 'AWS', level: 70 },
      { name: 'Docker', level: 80 },
      { name: 'GitHub Actions', level: 85 },
      { name: 'Cloudflare', level: 80 },
    ],
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: Plug,
    color: 'pink',
    skills: [
      { name: 'Stripe', level: 92 },
      { name: 'PayPal', level: 88 },
      { name: 'Klaviyo', level: 85 },
      { name: 'Mailchimp', level: 82 },
      { name: 'Zapier', level: 85 },
    ],
  },
];

const additionalSkills = ['Git', 'Figma', 'Agile', 'CI/CD', 'Testing', 'SEO', 'A/B Testing', 'Analytics'];

const colorClasses: Record<string, { gradient: string }> = {
  cyan: { gradient: 'from-cyan-500 to-cyan-400' },
  purple: { gradient: 'from-purple-500 to-purple-400' },
  pink: { gradient: 'from-pink-500 to-pink-400' },
};

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
    <Star className="text-purple-300 fill-purple-300" style={{ width: size, height: size }} />
  </motion.div>
);

// Floating particle
const Particle = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-300 to-pink-400"
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

// Moving border card
const MovingBorderCard = ({ children, className = '', isActive = false }: { children: React.ReactNode; className?: string; isActive?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const showBorder = isHovered || isActive;

  return (
    <motion.div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -3 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute -inset-[2px] rounded-xl transition-opacity duration-300"
        style={{
          background: showBorder 
            ? 'linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6, #22d3ee)' 
            : 'transparent',
          backgroundSize: '300% 100%',
          animation: showBorder ? 'movingBorder 2s linear infinite' : 'none',
          opacity: showBorder ? 1 : 0,
        }}
      />
      <div className="absolute inset-[2px] rounded-xl bg-gray-900/95 z-0" />
      {showBorder && (
        <motion.div
          className="absolute -inset-4 rounded-xl opacity-30 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          style={{ background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6)' }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
      <style>{`
        @keyframes movingBorder {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

// Trace border card
const TraceBorderCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 rounded-xl border border-gray-700" />
      {isHovered && (
        <>
          <motion.div className="absolute top-0 left-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)' }} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.2 }} />
          <motion.div className="absolute top-0 right-0 w-[2px]" style={{ background: 'linear-gradient(180deg, transparent, #a78bfa, transparent)' }} initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 0.2, delay: 0.1 }} />
          <motion.div className="absolute bottom-0 right-0 h-[2px]" style={{ background: 'linear-gradient(270deg, transparent, #f472b6, transparent)' }} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.2, delay: 0.2 }} />
          <motion.div className="absolute bottom-0 left-0 w-[2px]" style={{ background: 'linear-gradient(0deg, transparent, #22d3ee, transparent)' }} initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 0.2, delay: 0.3 }} />
          {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -right-1', '-bottom-1 -left-1'].map((pos, i) => (
            <motion.div key={i} className={`absolute ${pos} w-2 h-2 rounded-full bg-cyan-400`} style={{ boxShadow: '0 0 10px #22d3ee' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.05 }} />
          ))}
        </>
      )}
      <motion.div className="absolute inset-0 rounded-xl" animate={{ opacity: isHovered ? 0.15 : 0 }} style={{ background: '#22d3ee', filter: 'blur(20px)' }} />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('frontend');

  const activeSkillData = skillCategories.find(c => c.id === activeCategory);
  const activeSkills = activeSkillData?.skills || [];
  const activeColor = activeSkillData?.color || 'cyan';

  const stars = Array.from({ length: 15 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    size: 6 + Math.random() * 10,
  }));

  const particles = Array.from({ length: 25 }, () => ({
    x: Math.random() * 100,
    delay: Math.random() * 8,
  }));

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#050508]" />

      {/* Animated mesh gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(167, 139, 250, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(167, 139, 250, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167, 139, 250, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%)', left: '10%', top: '20%', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.3, 1], x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%)', right: '15%', bottom: '20%', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -60, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => <AnimatedStar key={i} {...star} />)}
      </div>

      {/* Rising particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => <Particle key={i} {...particle} />)}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/40 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-purple-300 text-sm font-medium">Skills & Expertise</span>
          </motion.div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            My{' '}
            <motion.span 
              className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent inline-block"
              animate={{ textShadow: ['0 0 20px rgba(167, 139, 250, 0.3)', '0 0 40px rgba(167, 139, 250, 0.5)', '0 0 20px rgba(167, 139, 250, 0.3)'], scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Technical Arsenal
            </motion.span>
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            A comprehensive toolkit for building modern, scalable e-commerce solutions.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map(({ id, name, icon: Icon, color }) => {
            const colors = colorClasses[color];
            const isActive = activeCategory === id;
            return (
              <MovingBorderCard key={id} className="rounded-xl" isActive={isActive}>
                <motion.button
                  onClick={() => setActiveCategory(id)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive ? `bg-gradient-to-r ${colors.gradient} text-white` : 'bg-gray-900/80 text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </motion.button>
              </MovingBorderCard>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {activeSkills.map((skill, index) => {
            const colors = colorClasses[activeColor];
            return (
              <TraceBorderCard key={skill.name} className="rounded-xl">
                <div className="bg-gray-900/80 p-5 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-300">{skill.name}</span>
                    <motion.span 
                      className="text-sm font-bold text-cyan-300"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.08, type: 'spring' }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.08, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full relative`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </TraceBorderCard>
            );
          })}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h4 className="text-lg font-semibold text-white mb-6">Additional Expertise</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <TraceBorderCard key={skill} className="rounded-xl">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  className="block px-4 py-2 bg-gray-900/80 rounded-xl text-sm text-gray-300 cursor-default"
                >
                  {skill}
                </motion.span>
              </TraceBorderCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
