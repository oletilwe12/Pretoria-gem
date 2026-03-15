import React from 'react';
import { Layout } from '../components/Layout';
import { PlaceCard } from '../components/PlaceCard';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

export const Weekend = () => {
  return (
    <Layout title="This Weekend in Pretoria" description="What's happening in Pretoria this weekend? Find markets, events and activities.">
      <div className="bg-emerald-900 py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-3 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">
            <Calendar className="w-4 h-4" />
            <span>Weekend Guide</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            This Weekend in <br />
            <span className="italic font-serif">Pretoria</span>
          </h1>
          <p className="text-emerald-100/80 text-lg max-w-2xl">
            Your curated guide to the best events, markets, and activities happening in the Jacaranda City this weekend.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <img src="https://picsum.photos/seed/weekend/800/800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-emerald-600" />
                <span>Top Picks for Saturday</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* We can use PlaceCard here with some mock data or actual weekend events */}
                <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Market</p>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">Hazel Food Market</h3>
                  <p className="text-zinc-500 text-sm mb-6">The best way to start your Saturday. Fresh coffee, international street food, and a great vibe.</p>
                  <div className="flex items-center text-xs text-zinc-400 space-x-4">
                    <span className="flex items-center space-x-1"><Calendar className="w-3 h-3" /> <span>Sat, 08:00 - 14:00</span></span>
                    <span className="flex items-center space-x-1"><MapPin className="w-3 h-3" /> <span>Menlo Park</span></span>
                  </div>
                </div>
                <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Outdoor</p>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">Rietvlei Game Drive</h3>
                  <p className="text-zinc-500 text-sm mb-6">Early morning game drives are the best. Keep an eye out for the cheetahs and rhinos.</p>
                  <div className="flex items-center text-xs text-zinc-400 space-x-4">
                    <span className="flex items-center space-x-1"><Calendar className="w-3 h-3" /> <span>Sat, 06:00 - 18:00</span></span>
                    <span className="flex items-center space-x-1"><MapPin className="w-3 h-3" /> <span>Pretoria South</span></span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-emerald-600" />
                <span>Sunday Chill Spots</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Cafe</p>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">Afroboer Garden Brunch</h3>
                  <p className="text-zinc-500 text-sm mb-6">Relax in the beautiful gardens with some of the best baked goods in the city.</p>
                  <div className="flex items-center text-xs text-zinc-400 space-x-4">
                    <span className="flex items-center space-x-1"><Calendar className="w-3 h-3" /> <span>Sun, 08:00 - 16:00</span></span>
                    <span className="flex items-center space-x-1"><MapPin className="w-3 h-3" /> <span>Die Wilgers</span></span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
              <h3 className="font-bold text-zinc-900 mb-4">Weather Forecast</h3>
              <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl">
                <div>
                  <p className="text-sm font-bold">Saturday</p>
                  <p className="text-xs text-zinc-500">Sunny</p>
                </div>
                <span className="text-2xl font-bold">28°C</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl mt-2">
                <div>
                  <p className="text-sm font-bold">Sunday</p>
                  <p className="text-xs text-zinc-500">Partly Cloudy</p>
                </div>
                <span className="text-2xl font-bold">26°C</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8">
              <h3 className="font-bold text-emerald-900 mb-2">Hosting an event?</h3>
              <p className="text-sm text-emerald-800/70 mb-6">Get your market or event featured in our weekend guide.</p>
              <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                Contact Us
              </button>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};
