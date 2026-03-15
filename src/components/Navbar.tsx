import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Search, Menu, X, Heart, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Categories', href: '/categories' },
    { name: 'This Weekend', href: '/weekend' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-emerald-700 transition-colors">
              P
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-900">
              Pretoria<span className="text-emerald-600">Gems</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  location.pathname === link.href ? 'text-emerald-600' : 'text-zinc-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/submit"
              className="flex items-center space-x-1 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Gem</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-zinc-600 hover:text-emerald-600 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-zinc-600 hover:text-emerald-600 hover:bg-zinc-50 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/submit"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-emerald-600 bg-emerald-50 rounded-lg"
              >
                Submit a Hidden Gem
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
