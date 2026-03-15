import React from 'react';
import { Search as SearchIcon, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ variant = 'default' }: { variant?: 'default' | 'hero' }) => {
  const [query, setQuery] = React.useState('');
  const [suburb, setSuburb] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query && !suburb) return;
    navigate(`/search?q=${encodeURIComponent(query)}&suburb=${encodeURIComponent(suburb)}`);
  };

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 flex items-center px-4 py-3 w-full border-b md:border-b-0 md:border-r border-zinc-100">
          <SearchIcon className="w-5 h-5 text-zinc-400 mr-3" />
          <input
            type="text"
            placeholder="Search by name or activity..."
            className="w-full outline-none text-zinc-900 placeholder:text-zinc-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex-1 flex items-center px-4 py-3 w-full">
          <MapPin className="w-5 h-5 text-zinc-400 mr-3" />
          <input
            type="text"
            placeholder="Suburb (e.g. Pretoria East)"
            className="w-full outline-none text-zinc-900 placeholder:text-zinc-400"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search hidden gems..."
        className="w-full bg-zinc-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchIcon className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
    </form>
  );
};
