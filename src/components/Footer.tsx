import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Pretoria<span className="text-emerald-600">Gems</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Discover the secret spots, local favorites, and hidden treasures of the Jacaranda City.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/categories/Restaurants" className="hover:text-emerald-500 transition-colors">Restaurants</Link></li>
              <li><Link to="/categories/Outdoor & Nature" className="hover:text-emerald-500 transition-colors">Outdoor & Nature</Link></li>
              <li><Link to="/categories/Fun Activities" className="hover:text-emerald-500 transition-colors">Fun Activities</Link></li>
              <li><Link to="/categories/Markets" className="hover:text-emerald-500 transition-colors">Markets</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/weekend" className="hover:text-emerald-500 transition-colors">This Weekend</Link></li>
              <li><Link to="/submit" className="hover:text-emerald-500 transition-colors">Submit a Gem</Link></li>
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Get weekly updates on new hidden gems.</p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-zinc-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs">
          <p>© {new Date().getFullYear()} Pretoria Hidden Gems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
