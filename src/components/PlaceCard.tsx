import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Tag, Banknote } from 'lucide-react';
import { Place } from '../types';

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const placeholderImage = `https://picsum.photos/seed/${place.slug}/800/600`;
  
  const formatPriceRange = () => {
    if (place.price_type === 'Free') return 'Free';
    if (place.min_price && place.max_price) {
      return `R${place.min_price} - R${place.max_price}`;
    }
    return place.price_type;
  };

  return (
    <Link to={`/place/${place.slug}`} className="group block bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100">
        <img
          src={place.hero_image || placeholderImage}
          alt={place.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-zinc-900 shadow-sm flex items-center gap-1">
            <Tag className="w-2.5 h-2.5 text-emerald-600" />
            {place.category}
          </div>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="bg-zinc-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
            <Banknote className="w-2.5 h-2.5 text-emerald-400" />
            {formatPriceRange()}
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-0.5">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {place.name}
            </h3>
            <div className="flex items-center space-x-1 text-xs font-bold text-zinc-900 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{place.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-zinc-500 font-medium">
            <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            <span>{place.suburb}</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Why Go</p>
          <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed italic">
            "{place.why_go}"
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1.5 pt-1">
          {place.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-zinc-50 text-zinc-500 rounded-md border border-zinc-100">
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
