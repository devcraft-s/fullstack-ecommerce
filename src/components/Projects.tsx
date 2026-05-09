import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, ShoppingCart, Zap, TrendingUp, Package, Sparkles } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'LuxeStyle Fashion',
    category: 'Shopify Store',
    role: 'Full Stack Developer',
    description: 'A premium fashion e-commerce store with custom Shopify theme, advanced filtering, wishlist functionality, and seamless checkout experience. Achieved 40% increase in conversion rate.',
    image: '/images/project-2.jpg',
    tags: ['Custom Theme', 'Wishlist', 'Quick View', 'Size Guide'],
    tech: ['Shopify', 'Liquid', 'JavaScript', 'SCSS', 'GraphQL'],
    stats: { conversion: '+40%', speed: '1.2s', revenue: '$2.5M' },
    links: { live: '#', github: '#' },
    icon: ShoppingCart,
    color: 'emerald',
  },
  {
    id: 2,
    title: 'VitaBoost Supplements',
    category: 'E-Commerce Platform',
    role: 'Full Stack Developer',
    description: 'Health supplements store with subscription management, personalized recommendations, and integration with fulfillment APIs. Built custom app for recurring orders.',
    image: '/images/project-3.jpg',
    tags: ['Subscriptions', 'Recommendations', 'Auto-Ship', 'Reviews'],
    tech: ['Shopify', 'React', 'Node.js', 'Stripe', 'Klaviyo'],
    stats: { subscribers: '15K+', retention: '85%', ltv: '+60%' },
    links: { live: '#', github: '#' },
    icon: Zap,
    color: 'cyan',
  },
  {
    id: 3,
    title: 'HomeNest Decor',
    category: 'Headless Commerce',
    role: 'Lead Developer',
    description: 'Headless e-commerce solution using Shopify Hydrogen and React. Features 3D product visualization, AR room preview, and lightning-fast performance.',
    image: '/images/project-4.jpg',
    tags: ['Headless', '3D View', 'AR Preview', 'PWA'],
    tech: ['Hydrogen', 'React', 'Three.js', 'Tailwind', 'Vercel'],
    stats: { performance: '98/100', engagement: '+55%', sales: '+35%' },
    links: { live: '#', github: '#' },
    icon: Package,
    color: 'purple',
  },
  {
    id: 4,
    title: 'TechGear Pro',
    category: 'Multi-Vendor Marketplace',
    role: 'Full Stack Developer',
    description: 'Multi-vendor electronics marketplace with vendor dashboards, commission management, and automated payouts. Handles 500+ daily transactions.',
    image: '/images/project-1.jpg',
    tags: ['Multi-Vendor', 'Dashboards', 'Payouts', 'Analytics'],
    tech: ['Shopify Plus', 'Node.js', 'PostgreSQL', 'Stripe Connect'],
    stats: { vendors: '200+', transactions: '500/day', gmv: '$5M+' },
    links: { live: '#', github: '#' },
    icon: TrendingUp,
    color: 'amber',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const nextProject = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section id="projects" className="py-20 md:py-32 bg-[#0a0a12] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            <span className="text-cyan-300 text-sm font-medium">Featured Work</span>
          </motion.div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Recent{' '}
            <motion.span 
              className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent inline-block"
              animate={{
                textShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                  '0 0 40px rgba(168, 85, 247, 0.5)',
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Projects
            </motion.span>
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            A selection of e-commerce projects showcasing my expertise in building high-converting, scalable online stores.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(index)}
              className={`group relative bg-gray-900/80 rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 ${
                activeIndex === index 
                  ? 'border-cyan-400 shadow-lg shadow-cyan-500/20' 
                  : 'border-gray-700 hover:border-gray-700'
              }`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/60 to-transparent" />
                
                {/* Category badge */}
                <motion.div 
                  className="absolute top-4 left-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="px-3 py-1.5 bg-gradient-to-r from-cyan-400 to-purple-400 text-white text-xs font-semibold rounded-full">
                    {project.category}
                  </span>
                </motion.div>
                
                {/* Links */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.a
                    href={project.links.live}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 bg-gray-900/80/90 backdrop-blur-sm rounded-lg text-gray-300 hover:text-white hover:bg-cyan-500 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={project.links.github}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 bg-gray-900/80/90 backdrop-blur-sm rounded-lg text-gray-300 hover:text-white hover:bg-cyan-500 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div 
                    className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <project.icon className="w-5 h-5 text-cyan-300" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white text-lg group-hover:text-cyan-300 transition-colors">{project.title}</h4>
                    <p className="text-xs text-gray-500">{project.role}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-emerald-500/10 text-cyan-300 text-xs rounded-lg font-medium">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2.5 py-1 bg-gray-800 text-gray-500 text-xs rounded-lg">+{project.tags.length - 3}</span>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Project Detail */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900/80 rounded-2xl border border-gray-700 p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {(() => {
                  const Icon = projects[activeIndex].icon;
                  return <Icon className="w-7 h-7 text-cyan-300" />;
                })()}
              </motion.div>
              <div>
                <h4 className="text-xl font-bold text-white">{projects[activeIndex].title}</h4>
                <p className="text-sm text-gray-500">{projects[activeIndex].category}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={prevProject}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 bg-gray-800 border border-gray-700 rounded-xl hover:border-cyan-400/50 transition-colors text-gray-300 hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={nextProject}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 bg-gray-800 border border-gray-700 rounded-xl hover:border-cyan-400/50 transition-colors text-gray-300 hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <p className="text-gray-300 mb-6">{projects[activeIndex].description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(projects[activeIndex].stats).map(([key, value], i) => (
              <motion.div 
                key={key} 
                className="text-center p-4 bg-gray-900/50 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">{value}</div>
                <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
              </motion.div>
            ))}
          </div>

          {/* Full Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {projects[activeIndex].tech.map((t, i) => (
              <motion.span 
                key={t} 
                className="px-4 py-2 bg-emerald-500/10 text-cyan-300 text-sm rounded-xl font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:border-cyan-400/50 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            <span>View More on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
