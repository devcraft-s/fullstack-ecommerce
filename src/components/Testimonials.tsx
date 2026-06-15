import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Building2, Sparkles } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Chief Digital Officer',
    company: 'LuxeStyle Fashion · USA',
    avatar: 'SM',
    rating: 5,
    text: 'They reimagined our commerce stack end to end—new storefront, integrations, and analytics. Within two quarters we saw a measurable lift in conversion and a much clearer picture of what drives revenue across markets.',
    results: '+40% conversion in 90 days',
    color: 'cyan',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'VP of Product',
    company: 'VitaBoost Health · Canada',
    avatar: 'MC',
    rating: 5,
    text: 'Our subscription and fulfillment workflows were fragmented. The team designed automation around recurring orders and CRM syncs so we could scale past 15,000 active subscribers without adding headcount.',
    results: '85% subscriber retention',
    color: 'purple',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Director of Engineering',
    company: 'HomeNest · North America',
    avatar: 'ER',
    rating: 5,
    text: 'We needed a headless experience that could ship fast and perform under peak traffic. They delivered a modern front end, solid APIs, and observability from day one—our Core Web Vitals and release cadence both improved.',
    results: '98/100 performance score',
    color: 'pink',
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Co-Founder',
    company: 'TechGear Pro · USA',
    avatar: 'DP',
    rating: 5,
    text: 'Building a multi-vendor marketplace is hard; payouts, commissions, and vendor tooling have to be right. They owned the architecture and delivery, and we now run hundreds of daily transactions with confidence.',
    results: '$5M+ GMV processed',
    color: 'amber',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
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
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
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
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span className="text-cyan-600 text-sm font-medium">Client Stories</span>
          </motion.div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Clients&apos;{' '}
            <motion.span 
              className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block"
              animate={{
                textShadow: [
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                  '0 0 40px rgba(34, 211, 238, 0.5)',
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                ],
                filter: [
                  'brightness(1)',
                  'brightness(1.2)',
                  'brightness(1)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Success Stories
            </motion.span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear how Rokify-Tech partners with North American organizations to modernize systems, launch new products, and scale
            delivery through long-term collaboration.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white rounded-2xl border border-gray-200 p-8 md:p-12"
          >
            {/* Quote icon */}
            <motion.div 
              className="absolute top-6 right-6 md:top-8 md:right-8"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Quote className="w-12 h-12 text-cyan-500/20" />
            </motion.div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              "{testimonials[activeIndex].text}"
            </blockquote>

            {/* Result badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 rounded-full mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-cyan-600 font-semibold">{testimonials[activeIndex].results}</span>
            </motion.div>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {testimonials[activeIndex].avatar}
                </motion.div>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">{testimonials[activeIndex].name}</div>
                  <div className="text-sm text-gray-500">{testimonials[activeIndex].role}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Building2 className="w-3 h-3" />
                    <span>{testimonials[activeIndex].company}</span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-2">
                <motion.button
                  onClick={prevTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gray-100 border border-gray-200 rounded-xl hover:border-cyan-400/50 transition-colors text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={nextTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gray-100 border border-gray-200 rounded-xl hover:border-cyan-400/50 transition-colors text-gray-600 hover:text-gray-900"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.2 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'w-8 bg-gradient-to-r from-cyan-400 to-purple-400' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Testimonial cards preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid md:grid-cols-4 gap-4"
        >
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-cyan-500/10 border-cyan-400'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.company}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">
                "{testimonial.text.slice(0, 60)}..."
              </p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
