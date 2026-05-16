import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import {
  getProjectBySlug,
  technologyCategoryLabels,
} from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#0a0a12] text-white flex flex-col"
      >
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <h1 className="text-2xl font-bold mb-3">Project not found</h1>
            <p className="text-gray-400 mb-8">
              This case study does not exist or may have been moved.
            </p>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to projects
            </Link>
          </motion.div>
        </main>
        <Footer />
      </motion.div>
    );
  }

  const techEntries = Object.entries(project.technologies).filter(
    ([, items]) => items.length > 0,
  );

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      <Navbar />

      <main className="relative">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-300 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All projects
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 mb-6 w-fit"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span className="text-cyan-300 text-sm font-medium">{project.category}</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-gray-400 mb-8">
              <span className="inline-flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-300" />
                {project.client}
              </span>
              <span className="inline-flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-300" />
                {project.role}
              </span>
            </div>

            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed mb-8">
              {project.description}
            </p>

            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
              >
                Visit live site
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            )}
          </motion.div>

          {project.images.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-14"
            >
              <div className="rounded-2xl border border-gray-700 overflow-hidden bg-gray-900/50">
                <motion.img
                  key={project.images[activeImage]}
                  src={project.images[activeImage]}
                  alt={`${project.title} screenshot ${activeImage + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-h-[520px] object-contain bg-[#111118]"
                />
              </div>

              {project.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-thin"
                >
                  {project.images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === index
                          ? 'border-cyan-400 ring-2 ring-cyan-400/30'
                          : 'border-gray-700 opacity-70 hover:opacity-100 hover:border-gray-600'
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.section>
          )}

          <div className="mt-16 grid lg:grid-cols-2 gap-10">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">Key highlights</h2>
              <ul className="space-y-4">
                {project.highlights.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-3 text-gray-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">Responsibilities</h2>
              <ul className="space-y-3">
                {project.responsibilities.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="flex gap-3 p-3 rounded-xl bg-gray-900/80 border border-gray-700/80 text-sm text-gray-300"
                  >
                    <span className="text-cyan-300 font-mono text-xs mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-xl font-semibold text-white mb-8">Technology stack</h2>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {techEntries.map(([category, items]) => (
                <motion.div
                  key={category}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="p-5 rounded-2xl bg-gray-900/80 border border-gray-700"
                >
                  <h3 className="text-sm font-medium text-cyan-300 mb-4 uppercase tracking-wide">
                    {technologyCategoryLabels[category] ??
                      category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-gray-800/80 text-gray-200 text-xs rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {project.links.live && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 p-8 rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900/90 to-cyan-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-lg font-semibold text-white mb-2">See it in production</h2>
                <p className="text-gray-400 text-sm">
                  Explore the live {project.client} storefront.
                </p>
              </motion.div>
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10 transition-colors shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
                {new URL(project.links.live).hostname}
              </motion.a>
            </motion.section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
