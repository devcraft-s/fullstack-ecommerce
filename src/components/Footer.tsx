import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Contact', href: '/#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-gray-700 bg-[#050508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a 
            href="/#home" 
            className="flex items-center gap-2 text-xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <ShoppingBag className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-white">USZIZO<span className="text-cyan-300">.</span></span>
          </motion.a>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2, color: '#10b981' }}
                className="text-sm text-gray-500 hover:text-cyan-300 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {currentYear} USZIZO. All rights reserved.
          </div>
        </div>

        {/* <motion.div 
          className="mt-8 pt-8 border-t border-gray-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
            Built with <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}><Heart className="w-4 h-4 text-red-500 fill-red-500" /></motion.span> using
            <span className="text-cyan-300">React</span>,
            <span className="text-cyan-400">TypeScript</span> &
            <span className="text-pink-300">Tailwind CSS</span>
          </p>
        </motion.div> */}
      </div>
    </footer>
  );
}
