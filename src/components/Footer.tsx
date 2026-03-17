import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          {/* Brand & Socials */}
          <div className="max-w-xs space-y-1.5">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-600 rounded flex items-center justify-center text-white font-bold text-[9px]">
                P
              </div>
              <span className="font-bold text-sm tracking-tight text-white">
                Pretoria<span className="text-emerald-600">Gems</span>
              </span>
            </Link>
            <p className="text-[10px] leading-relaxed">
              The local insider guide to Pretoria's best secret spots and hidden treasures.
            </p>
            <div className="flex space-x-3 pt-0.5">
              <a href="#" className="hover:text-emerald-500 transition-colors"><Instagram className="w-3 h-3" /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Facebook className="w-3 h-3" /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Twitter className="w-3 h-3" /></a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-6 md:gap-10">
            <div>
              <h3 className="text-white text-[9px] font-bold uppercase tracking-widest mb-1.5">Explore</h3>
              <ul className="space-y-0.5 text-[10px]">
                <li><Link to="/categories/Restaurants" className="hover:text-emerald-500 transition-colors">Restaurants</Link></li>
                <li><Link to="/categories/Outdoor & Nature" className="hover:text-emerald-500 transition-colors">Nature</Link></li>
                <li><Link to="/categories/Fun Activities" className="hover:text-emerald-500 transition-colors">Activities</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-[9px] font-bold uppercase tracking-widest mb-1.5">Company</h3>
              <ul className="space-y-0.5 text-[10px]">
                <li><Link to="/about" className="hover:text-emerald-500 transition-colors">About</Link></li>
                <li><Link to="/submit" className="hover:text-emerald-500 transition-colors">Submit</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-48">
            <h3 className="text-white text-[9px] font-bold uppercase tracking-widest mb-1.5">Newsletter</h3>
            <form className="flex space-x-1.5">
              <input
                type="email"
                placeholder="Email"
                className="bg-zinc-800 border-none rounded px-2 py-0.5 text-[10px] w-full focus:ring-1 focus:ring-emerald-500 outline-none"
              />
              <button className="bg-emerald-600 text-white px-2.5 py-0.5 rounded text-[10px] font-bold hover:bg-emerald-700 transition-colors">
                Join
              </button>
            </form>
            <p className="text-[9px] mt-1.5 text-zinc-500">Weekly secret spots in your inbox.</p>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-1.5 text-[9px]">
          <p>© {new Date().getFullYear()} Pretoria Hidden Gems.</p>
          <div className="flex space-x-3 text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
