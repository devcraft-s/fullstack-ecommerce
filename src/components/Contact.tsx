import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, CheckCircle, Loader2, Sparkles } from 'lucide-react';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'Amazing@devshop.io', href: 'mailto:Amazing@devshop.io' },
  { icon: Phone, label: 'Phone', value: '+1 (440) 313-9295', href: 'tel:+14403139295' },
  { icon: MapPin, label: 'Location', value: 'Global team · Serving North America', href: '#' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/devcraft-s/' },
  { icon: WhatsAppIcon, label: 'WhatsApp', href: 'https://wa.me/14403139295' },
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-violet-50 via-indigo-50 to-white dark:from-[#0a0a12] dark:via-[#0b1120] dark:to-[#0a0a12] relative overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-medium">Get In Touch</span>
          </motion.div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Let&apos;s{' '}
            <motion.span
              className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent inline-block"
              animate={{
                textShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                  '0 0 40px rgba(6, 182, 212, 0.5)',
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                ],
                filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Work Together
            </motion.span>
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Tell us about your product, platform, or commerce initiative. Our team will respond with next steps and the
            right specialists for your scope.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col gap-8 lg:gap-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-12"
          >
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h4>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Send a Message</h4>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="order-1 lg:order-2"
            >
              <motion.div
                className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8"
                whileHover={{ boxShadow: '0 20px 40px rgba(34, 211, 238, 0.1)' }}
              >
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
                      <CheckCircle className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                    </motion.div>
                    <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h5>
                    <p className="text-gray-600 dark:text-gray-300">Thank you for reaching out. A member of our team will respond shortly.</p>
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
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          value={formState[field.id as keyof typeof formState]}
                          onChange={(e) => setFormState({ ...formState, [field.id]: e.target.value })}
                          required
                          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
                          placeholder={field.placeholder}
                        />
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                        rows={7}
                        className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 resize-none"
                        placeholder="Tell us about your project, timeline, and goals..."
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

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="order-2 lg:order-1 space-y-8"
            >
              <motion.div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
                      <div className="font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connect with Us</h4>
                <motion.div className="flex gap-3">
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
                      className="w-12 h-12 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:border-cyan-400/50 hover:bg-emerald-500/10 transition-all duration-300 group"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="p-6 bg-emerald-500/10 rounded-2xl border border-cyan-400/30"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div className="flex items-center gap-3 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300" />
                  </span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">Taking new client work</span>
                </motion.div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  USZIZO is accepting new engagements for product builds, commerce programs, and long-term
                  engineering partnerships. Share your brief and we will route it to the right practice lead.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
