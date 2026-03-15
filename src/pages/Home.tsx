import React from 'react';
import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { PlaceCard } from '../components/PlaceCard';
import { motion } from 'motion/react';
import { Utensils, Coffee, Trees, Sparkles, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Place } from '../types';

const CATEGORIES = [
  { name: 'Restaurants', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { name: 'Coffee Shops', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  { name: 'Outdoor & Nature', icon: Trees, color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Fun Activities', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
  { name: 'Markets', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
  { name: 'Date Ideas', icon: Heart, color: 'bg-rose-100 text-rose-600' },
];

const MOCK_FEATURED: Partial<Place>[] = [
  {
    id: '1',
    name: 'Faerie Glen Nature Reserve',
    slug: 'faerie-glen-nature-reserve',
    suburb: 'Faerie Glen',
    price_type: 'Free',
    hero_image: 'https://picsum.photos/seed/faerie/800/600',
    description: 'A beautiful escape in the heart of the city with hiking trails and scenic views.',
    rating: 4.8,
    tags: ['Hiking', 'Nature'],
  },
  {
    id: '2',
    name: 'Hazel Food Market',
    slug: 'hazel-food-market',
    suburb: 'Menlo Park',
    price_type: 'Under R100',
    hero_image: 'https://picsum.photos/seed/market/800/600',
    description: 'The best Saturday morning market for fresh produce and artisanal food.',
    rating: 4.9,
    tags: ['Food', 'Market'],
  },
  {
    id: '3',
    name: 'Afroboer',
    slug: 'afroboer',
    suburb: 'Die Wilgers',
    price_type: 'Under R250',
    hero_image: 'https://picsum.photos/seed/cafe/800/600',
    description: 'A quirky bakery and cafe with a beautiful garden and incredible breakfast.',
    rating: 4.7,
    tags: ['Cafe', 'Breakfast'],
  }
];

export const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/pretoria/1920/1080"
            alt="Pretoria"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Discover Pretoria's <br />
            <span className="text-emerald-400 italic font-serif">Hidden Gems</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-200 mb-12 max-w-2xl mx-auto"
          >
            Find restaurants, activities, markets and secret places locals love.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SearchBar variant="hero" />
          </motion.div>
        </div>
      </section>

      {/* Placeholder Ad */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="w-full h-24 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 text-xs uppercase tracking-widest">
          Advertisement
        </div>
      </div>

      {/* Browse by Category */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">Browse by Category</h2>
              <p className="text-zinc-500">What are you in the mood for today?</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/categories/${cat.name}`}
                className="group p-6 rounded-2xl bg-zinc-50 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 transition-all text-center border border-transparent hover:border-emerald-100"
              >
                <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-zinc-900 text-sm">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gems */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">Hidden Gems of the Week</h2>
              <p className="text-zinc-500">Hand-picked secret spots you shouldn't miss.</p>
            </div>
            <Link to="/search" className="flex items-center space-x-2 text-emerald-600 font-semibold hover:underline">
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_FEATURED.map((place) => (
              <PlaceCard key={place.id} place={place as Place} />
            ))}
          </div>
        </div>
      </section>

      {/* Budget Filters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center">Explore by Budget</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Free things to do', color: 'bg-emerald-600', query: 'Free' },
              { label: 'Under R100', color: 'bg-zinc-900', query: 'Under R100' },
              { label: 'Under R250', color: 'bg-amber-600', query: 'Under R250' },
            ].map((budget) => (
              <Link
                key={budget.label}
                to={`/search?budget=${budget.query}`}
                className={`${budget.color} p-8 rounded-2xl text-white hover:scale-[1.02] transition-transform flex flex-col justify-between h-48`}
              >
                <span className="text-2xl font-bold">{budget.label}</span>
                <div className="flex items-center space-x-2 text-sm font-medium opacity-80">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-emerald-900 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-400 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400 rounded-full blur-[100px]" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Never miss a hidden gem.</h2>
            <p className="text-emerald-100/80 text-lg mb-10 max-w-xl mx-auto">
              Join 5,000+ Pretoria locals who get our weekly guide to the best secret spots.
            </p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-emerald-200/50 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
              <button className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};
