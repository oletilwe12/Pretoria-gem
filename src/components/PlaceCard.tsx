import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
import { Place } from '../types';

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <Link to={`/place/${place.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 mb-3">
        <img
          src={place.hero_image}
          alt={place.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-zinc-900 shadow-sm">
          {place.price_type}
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {place.name}
          </h3>
          <div className="flex items-center space-x-1 text-xs font-medium text-zinc-600">
            <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
            <span>{place.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-zinc-500 space-x-1">
          <MapPin className="w-3 h-3" />
          <span>{place.suburb}</span>
        </div>
        
        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mt-2">
          {place.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {place.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
