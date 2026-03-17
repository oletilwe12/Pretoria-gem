import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { PlaceCard } from '../components/PlaceCard';
import { motion } from 'motion/react';
import { Utensils, Coffee, Trees, PartyPopper, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Place } from '../types';
import { supabase } from '../lib/supabase';

const CATEGORIES = [
  { name: 'Restaurants', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { name: 'Coffee Shops', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  { name: 'Outdoor & Nature', icon: Trees, color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Fun Activities', icon: PartyPopper, color: 'bg-purple-100 text-purple-600' },
  { name: 'Markets', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
  { name: 'Date Ideas', icon: Heart, color: 'bg-rose-100 text-rose-600' },
];

export const Home = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('places')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(6);
        
        if (error) throw error;
        if (data) setFeaturedPlaces(data);
      } catch (err) {
        console.error('Error fetching featured places:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <Layout>
      {/* 2. Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
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
            className="text-xl text-zinc-200 max-w-2xl mx-auto"
          >
            Find restaurants, activities, markets and secret places locals love.
          </motion.p>
        </div>
      </section>

      {/* 3. Search Section */}
      <section className="relative z-20 -mt-10 mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SearchBar variant="hero" />
          </motion.div>
        </div>
      </section>

      {/* 4 & 5. Hidden Gems of the Week + Featured Cards */}
      <section className="py-10 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-zinc-900 mb-1">Hidden Gems of the Week</h2>
              <p className="text-xs text-zinc-500">Hand-picked secret spots you shouldn't miss.</p>
            </div>
            <Link to="/search" className="flex items-center space-x-2 text-emerald-600 text-xs font-semibold hover:underline">
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-zinc-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
              {featuredPlaces.length === 0 && (
                <div className="col-span-full py-8 text-center">
                  <p className="text-zinc-400">No featured gems found yet. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 6. Category Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-1">Browse by Category</h2>
            <p className="text-xs text-zinc-500">What are you in the mood for today?</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/categories/${cat.name}`}
                className="group flex flex-col items-center p-4 rounded-2xl bg-zinc-50 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 transition-all text-center border border-transparent hover:border-emerald-100"
              >
                <div className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-zinc-900 text-[11px] uppercase tracking-wider">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Optional small newsletter section */}
      <section className="py-12 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-3">Never miss a hidden gem</h2>
          <p className="text-sm text-emerald-100 mb-6">Join 5,000+ Pretoria locals who get our weekly secret spot recommendations.</p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            />
            <button className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-zinc-800 transition-colors text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};
