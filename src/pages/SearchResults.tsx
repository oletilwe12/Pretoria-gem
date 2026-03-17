import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PlaceCard } from '../components/PlaceCard';
import { supabase } from '../lib/supabase';
import { Place } from '../types';
import { Search as SearchIcon } from 'lucide-react';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const suburb = searchParams.get('suburb') || '';
  const budget = searchParams.get('budget') || '';
  
  const [places, setPlaces] = React.useState<Place[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      let supabaseQuery = supabase.from('places').select('*');
      
      if (query) {
        supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`);
      }
      
      if (suburb) {
        supabaseQuery = supabaseQuery.ilike('suburb', `%${suburb}%`);
      }

      if (budget) {
        supabaseQuery = supabaseQuery.eq('price_type', budget);
      }

      const { data, error } = await supabaseQuery;
      
      if (data) setPlaces(data);
      setLoading(false);
    };

    fetchResults();
  }, [query, suburb, budget]);

  return (
    <Layout title={`Search: ${query || suburb || budget}`}>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            {query || suburb || budget ? (
              <>Search results for <span className="text-emerald-600">"{query || suburb || budget}"</span></>
            ) : (
              <>All Hidden Gems</>
            )}
          </h1>
          <p className="text-zinc-500">
            Found {places.length} places matching your criteria.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[4/3] bg-zinc-100 rounded-2xl" />
                <div className="h-4 bg-zinc-100 rounded w-3/4" />
                <div className="h-4 bg-zinc-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {places.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-zinc-50 rounded-[2rem] border border-dashed border-zinc-200">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-8 h-8 text-zinc-300" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">No gems found</h3>
            <p className="text-zinc-500 max-w-xs mx-auto mb-8">
              We couldn't find any places matching your search. Try different keywords or browse by category.
            </p>
            <button 
              onClick={() => window.history.back()}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};
