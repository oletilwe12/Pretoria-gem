import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { PlaceCard } from '../components/PlaceCard';
import { motion } from 'motion/react';
import { Utensils, Coffee, Trees, PartyPopper, ShoppingBag, Heart, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Place } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const CATEGORIES = [
  { name: 'Restaurants', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { name: 'Coffee Shops', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  { name: 'Outdoor & Nature', icon: Trees, color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Fun Activities', icon: PartyPopper, color: 'bg-purple-100 text-purple-600' },
  { name: 'Markets', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
  { name: 'Date Ideas', icon: Heart, color: 'bg-rose-100 text-rose-600' },
];

const FALLBACK_PLACES: Place[] = [
  {
    id: '1',
    name: 'Faerie Glen Nature Reserve',
    slug: 'faerie-glen-nature-reserve',
    category: 'Outdoor & Nature',
    area: 'Pretoria East',
    suburb: 'Faerie Glen',
    description: 'A beautiful escape in the heart of the city with hiking trails and scenic views.',
    why_go: 'One of the few places in Pretoria where you can truly feel like you are out in the wild without leaving the city.',
    best_for: 'Morning hikes, bird watching, and photography.',
    price_type: 'Free',
    address: 'January Masilela Dr, Faerie Glen, Pretoria, 0081',
    latitude: -25.7744,
    longitude: 28.2919,
    opening_hours: { 'Monday - Sunday': '06:00 - 18:00' },
    hero_image: 'https://picsum.photos/seed/faerie/1200/800',
    gallery_images: [],
    tags: ['Hiking', 'Nature', 'Dog Friendly'],
    is_featured: true,
    rating: 4.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Rietvlei Nature Reserve',
    slug: 'rietvlei-nature-reserve',
    category: 'Outdoor & Nature',
    area: 'Pretoria South',
    suburb: 'Rietvalleirand',
    description: 'One of the world\'s largest urban nature reserves, home to rhino, buffalo, and cheetah.',
    why_go: 'You can see the Big Five (almost) right on your doorstep in a peaceful, well-maintained environment.',
    best_for: 'Game drives, fishing, and bird hides.',
    price_type: 'Under R100',
    min_price: 65,
    max_price: 65,
    address: '14 Game Reserve Ave, Rietvalleirand, Pretoria, 0181',
    latitude: -25.8833,
    longitude: 28.2667,
    opening_hours: { 'Monday - Sunday': '06:00 - 18:00' },
    hero_image: 'https://picsum.photos/seed/rietvlei/1200/800',
    gallery_images: [],
    tags: ['Wildlife', 'Safari', 'Cheetah'],
    is_featured: true,
    rating: 4.7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Hazel Food Market',
    slug: 'hazel-food-market',
    category: 'Markets',
    area: 'Pretoria East',
    suburb: 'Menlo Park',
    description: 'A vibrant weekend market with local food, craft beer, and live music in a relaxed garden setting.',
    why_go: 'Best street food variety in Pretoria — something for every taste and budget.',
    best_for: 'Weekend brunches, family outings, and trying new cuisines.',
    price_type: 'Under R100',
    min_price: 40,
    max_price: 150,
    address: 'Hazel St, Menlo Park, Pretoria, 0081',
    latitude: -25.7699,
    longitude: 28.2622,
    opening_hours: { 'Saturday - Sunday': '09:00 - 15:00' },
    hero_image: 'https://picsum.photos/seed/hazel/1200/800',
    gallery_images: [],
    tags: ['Food', 'Market', 'Live Music', 'Weekend'],
    is_featured: true,
    rating: 4.6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const Home = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      if (!isSupabaseConfigured) {
        setFeaturedPlaces(FALLBACK_PLACES);
        setUsingFallback(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('places')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;

        if (data && data.length > 0) {
          setFeaturedPlaces(data);
        } else {
          setFeaturedPlaces(FALLBACK_PLACES);
          setUsingFallback(true);
        }
      } catch (err) {
        console.error('Error fetching featured places:', err);
        setFeaturedPlaces(FALLBACK_PLACES);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <Layout>
      {/* Hero */}
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

      {/* Search */}
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

      {/* Featured Places */}
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

          {usingFallback && !isSupabaseConfigured && (
            <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl px-4 py-3 text-xs">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>
                <strong>Demo mode:</strong> Add{' '}
                <code className="font-mono bg-amber-100 px-1 rounded">VITE_SUPABASE_URL</code> and{' '}
                <code className="font-mono bg-amber-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code>{' '}
                to your environment variables to show live data.
              </p>
            </div>
          )}

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
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
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
                to={`/categories/${encodeURIComponent(cat.name)}`}
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

      {/* Newsletter */}
      <section className="py-12 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-3">Never miss a hidden gem</h2>
          <p className="text-sm text-emerald-100 mb-6">Join locals who get our weekly secret spot recommendations.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            />
            <button className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-zinc-800 transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};
