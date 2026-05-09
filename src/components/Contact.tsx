import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, Loader2, Sparkles } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'Amazing@devshop.io', href: 'mailto:Amazing@devshop.io' },
  { icon: Phone, label: 'Phone', value: '+1 (415) 555-0123', href: 'tel:+14155550123' },
  { icon: MapPin, label: 'Location', value: 'Tokyo, Japan', href: '#' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#0a0a12] relative overflow-hidden">
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
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
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span className="text-cyan-300 text-sm font-medium">Get In Touch</span>
          </motion.div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's{' '}
            <motion.span 
              className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent inline-block"
              animate={{
                textShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                  '0 0 40px rgba(6, 182, 212, 0.5)',
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                ],
                filter: [
                  'brightness(1)',
                  'brightness(1.3)',
                  'brightness(1)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Work Together
            </motion.span>
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Have a project in mind? Feel free to reach out. I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h4 className="text-xl font-semibold text-white mb-6">Contact Information</h4>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-4 p-4 bg-gray-900/80 rounded-xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 group"
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-cyan-300" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-gray-500">{label}</div>
                      <div className="font-medium text-gray-300 group-hover:text-white transition-colors">{value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Connect with Me</h4>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gray-900/80 border border-gray-700 rounded-xl flex items-center justify-center hover:border-cyan-400/50 hover:bg-emerald-500/10 transition-all duration-300 group"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-cyan-300 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div 
              className="p-6 bg-emerald-500/10 rounded-2xl border border-cyan-400/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300"></span>
                </span>
                <span className="font-semibold text-cyan-300">Available for hire</span>
              </div>
              <p className="text-sm text-gray-300">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div 
              className="bg-gray-900/80 rounded-2xl border border-gray-700 p-6 md:p-8"
              whileHover={{ boxShadow: '0 20px 40px rgba(34, 211, 238, 0.1)' }}
            >
              <h4 className="text-xl font-semibold text-white mb-6">Send a Message</h4>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-8 h-8 text-cyan-300" />
                  </motion.div>
                  <h5 className="text-xl font-semibold text-white mb-2">Message Sent!</h5>
                  <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                  ].map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        id={field.id}
                        value={formState[field.id as keyof typeof formState]}
                        onChange={(e) => setFormState({ ...formState, [field.id]: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a12] border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-gray-600 transition-all duration-300"
                        placeholder={field.placeholder}
                      />
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      rows={7}
                      className="w-full px-4 py-3 bg-[#0a0a12] border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-gray-600 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </motion.div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(34, 211, 238, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-cyan-400 to-purple-400 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
