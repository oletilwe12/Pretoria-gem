import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { 
  MapPin, 
  Globe, 
  Phone, 
  Clock, 
  Share2, 
  Heart, 
  Navigation, 
  Star,
  ChevronLeft,
  Info,
  CheckCircle2,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Place } from '../types';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

export const PlaceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchPlace = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('places')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error) throw error;
        if (data) setPlace(data);
      } catch (err) {
        console.error('Error fetching place details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPlace();
  }, [slug]);

  const handleShare = () => {
    if (place && navigator.share) {
      navigator.share({
        title: place.name,
        text: place.description,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-20">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
          <p className="text-zinc-500 font-medium">Loading hidden gem...</p>
        </div>
      </Layout>
    );
  }

  if (!place) {
    return (
      <Layout title="Place Not Found">
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">Gem Not Found</h1>
          <p className="text-zinc-500 mb-8">We couldn't find the place you're looking for.</p>
          <Link to="/" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={place.name} description={place.description}>
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={place.hero_image}
          alt={place.name}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to discovery</span>
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                {place.category}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">
                {place.price_type}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              {place.name}
            </h1>
            
            <div className="flex items-center text-white/90 space-x-4 text-sm md:text-base">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{place.suburb}, {place.area}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{place.rating} (Local Favorite)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center space-x-2">
                <Info className="w-6 h-6 text-emerald-600" />
                <span>About this place</span>
              </h2>
              <p className="text-zinc-600 leading-relaxed text-lg">
                {place.description}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                <h3 className="text-emerald-900 font-bold mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Why Go</span>
                </h3>
                <p className="text-emerald-800/80 leading-relaxed">
                  {place.why_go}
                </p>
              </div>
              <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
                <h3 className="text-zinc-900 font-bold mb-4 flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Best For</span>
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  {place.best_for}
                </p>
              </div>
            </div>

            {place.gallery_images && place.gallery_images.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {place.gallery_images.map((img, i) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-zinc-100">
                      <img src={img} alt={`${place.name} ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Location</h2>
              <div className="w-full h-[400px] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 relative group">
                {(() => {
                  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
                  const isMapsDisabled = !mapsKey || mapsKey === 'demo' || mapsKey === 'disabled' || mapsKey === 'YOUR_API_KEY';
                  
                  if (isMapsDisabled) {
                    return (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 p-8 text-center">
                        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <MapPin className="w-8 h-8 text-zinc-300" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 mb-2">Map Preview</h3>
                        <p className="text-zinc-500 text-sm max-w-xs mb-6">
                          Live interactive maps are currently disabled. You can view this location directly on Google Maps.
                        </p>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-zinc-800 transition-colors"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Open in Google Maps</span>
                        </a>
                      </div>
                    );
                  }

                  return (
                    <iframe
                      title="Google Maps"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${encodeURIComponent(place.address)}`}
                      allowFullScreen
                    ></iframe>
                  );
                })()}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-zinc-500 text-sm flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{place.address}</span>
                </p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-bold text-sm hover:underline flex items-center space-x-1"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm sticky top-24">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-zinc-900">Opening Hours</p>
                        {place.opening_hours && Object.entries(place.opening_hours).map(([days, hours]) => (
                          <p key={days} className="text-sm text-zinc-500">{days}: {hours}</p>
                        ))}
                      </div>
                    </div>
                    {place.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="text-sm font-bold text-zinc-900">Phone</p>
                          <p className="text-sm text-zinc-500">{place.phone}</p>
                        </div>
                      </div>
                    )}
                    {place.website_url && (
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="text-sm font-bold text-zinc-900">Website</p>
                          <a href={place.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:underline truncate block max-w-[150px]">
                            Visit official site
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex flex-col gap-3">
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
                      isSaved ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-zinc-900 text-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-600' : ''}`} />
                    <span>{isSaved ? 'Saved to Favorites' : 'Save Place'}</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="w-full py-4 rounded-xl font-bold bg-zinc-100 text-zinc-900 flex items-center justify-center space-x-2 hover:bg-zinc-200 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share with Friends</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Ad */}
            <div className="w-full aspect-square bg-zinc-50 border border-zinc-100 rounded-3xl flex items-center justify-center text-zinc-400 text-[10px] uppercase tracking-widest p-8 text-center">
              Support local businesses. Advertise here.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
