import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PlaceCard } from '../components/PlaceCard';
import { supabase } from '../lib/supabase';
import { Place, Category } from '../types';
import { Filter, SlidersHorizontal } from 'lucide-react';

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [places, setPlaces] = React.useState<Place[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [suburbFilter, setSuburbFilter] = React.useState('');

  React.useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('category', category);
      
      if (data) setPlaces(data);
      setLoading(false);
    };

    fetchPlaces();
  }, [category]);

  const filteredPlaces = suburbFilter 
    ? places.filter(p => p.suburb.toLowerCase().includes(suburbFilter.toLowerCase()))
    : places;

  return (
    <Layout title={category} description={`Discover the best ${category} in Pretoria.`}>
      <div className="bg-zinc-50 border-b border-zinc-200 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-4 tracking-tight">
            {category}
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl">
            Explore our hand-picked selection of {category.toLowerCase()} that locals love.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4 flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Suburb</label>
                  <input
                    type="text"
                    placeholder="e.g. Pretoria East"
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={suburbFilter}
                    onChange={(e) => setSuburbFilter(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Price Range</label>
                  <div className="space-y-2">
                    {['Free', 'Under R100', 'Under R250', 'Premium'].map(price => (
                      <label key={price} className="flex items-center space-x-2 text-sm text-zinc-600 cursor-pointer hover:text-emerald-600 transition-colors">
                        <input type="checkbox" className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
                        <span>{price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-emerald-900 rounded-2xl text-white">
              <h4 className="font-bold mb-2">Submit a Gem</h4>
              <p className="text-xs text-emerald-100/70 mb-4">Know a secret spot we missed? Let us know!</p>
              <button className="w-full bg-white text-emerald-900 py-2 rounded-lg text-xs font-bold hover:bg-emerald-50 transition-colors">
                Submit Now
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-zinc-500">
                Showing <span className="font-bold text-zinc-900">{filteredPlaces.length}</span> hidden gems
              </p>
              <button className="flex items-center space-x-2 text-sm font-bold text-zinc-900 md:hidden">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse space-y-4">
                    <div className="aspect-[4/3] bg-zinc-100 rounded-2xl" />
                    <div className="h-4 bg-zinc-100 rounded w-3/4" />
                    <div className="h-4 bg-zinc-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredPlaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlaces.map(place => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
                <p className="text-zinc-400">No hidden gems found in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
