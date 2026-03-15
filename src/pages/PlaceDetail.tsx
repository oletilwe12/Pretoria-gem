import React from 'react';
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
  Sparkles
} from 'lucide-react';
import { Place } from '../types';
import { motion } from 'motion/react';

// Mock data for a single place
const MOCK_PLACE: Place = {
  id: '1',
  name: 'Faerie Glen Nature Reserve',
  slug: 'faerie-glen-nature-reserve',
  category: 'Outdoor & Nature',
  suburb: 'Faerie Glen',
  area: 'Pretoria East',
  price_type: 'Free',
  description: 'Faerie Glen Nature Reserve is a hidden sanctuary in the middle of Pretoria East. Part of the Bronberg Conservation Area, it offers several hiking trails that wind through grasslands and along the Moreleta Spruit.',
  why_go: 'It is one of the few places in Pretoria where you can truly feel like you are out in the wild without leaving the city. The views from the top of the ridge are spectacular, especially at sunset.',
  best_for: 'Morning hikes, bird watching, and photography. It is also dog-friendly (on a leash).',
  address: 'January Masilela Dr, Faerie Glen, Pretoria, 0081',
  latitude: -25.7744,
  longitude: 28.2919,
  website_url: 'https://www.tshwane.gov.za',
  phone: '012 358 1510',
  opening_hours: {
    'Monday - Sunday': '06:00 - 18:00'
  },
  hero_image: 'https://picsum.photos/seed/faerie/1200/800',
  gallery_images: [
    'https://picsum.photos/seed/faerie1/800/600',
    'https://picsum.photos/seed/faerie2/800/600',
    'https://picsum.photos/seed/faerie3/800/600'
  ],
  tags: ['Hiking', 'Nature', 'Dog Friendly', 'Views'],
  is_featured: true,
  rating: 4.8,
  created_at: '',
  updated_at: ''
};

export const PlaceDetail = () => {
  const { slug } = useParams();
  const [isSaved, setIsSaved] = React.useState(false);
  
  // In a real app, we would fetch the place by slug from Supabase
  const place = MOCK_PLACE;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: place.description,
        url: window.location.href,
      });
    }
  };

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

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Location</h2>
              <div className="w-full h-[400px] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 relative">
                <iframe
                  title="Google Maps"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${encodeURIComponent(place.address)}`}
                  allowFullScreen
                ></iframe>
                {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 text-zinc-400 text-sm p-8 text-center">
                    Google Maps API Key required for live map. Showing placeholder for {place.address}.
                  </div>
                )}
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
                        {Object.entries(place.opening_hours).map(([days, hours]) => (
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
