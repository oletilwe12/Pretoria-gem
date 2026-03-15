import React from 'react';
import { Layout } from '../components/Layout';
import { Heart, MapPin, Users, Sparkles } from 'lucide-react';

export const About = () => {
  return (
    <Layout title="About Us" description="The story behind Pretoria Hidden Gems.">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
            For the love of <br />
            <span className="text-emerald-600 italic font-serif">Pretoria</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            We're on a mission to uncover the secret spots, local favorites, and hidden treasures of the Jacaranda City.
          </p>
        </div>

        <div className="aspect-video rounded-[2rem] overflow-hidden mb-16">
          <img src="https://picsum.photos/seed/pretoria-about/1200/800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Our Mission</h3>
            <p className="text-zinc-600 leading-relaxed">
              Pretoria is often overlooked in favor of its neighbors, but we know better. Our mission is to showcase the incredible diversity, creativity, and natural beauty that makes Pretoria unique.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Local First</h3>
            <p className="text-zinc-600 leading-relaxed">
              We don't just list places; we tell stories. Every gem on our platform is hand-picked and verified by locals who actually live, eat, and explore in Pretoria.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-[2rem] p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Community</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Whether you're a lifelong resident or just visiting, we invite you to explore Pretoria with fresh eyes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/5 px-6 py-3 rounded-xl border border-white/10">
              <Users className="w-5 h-5 text-emerald-500" />
              <span className="font-bold">5,000+ Members</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 px-6 py-3 rounded-xl border border-white/10">
              <MapPin className="w-5 h-5 text-emerald-500" />
              <span className="font-bold">200+ Hidden Gems</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
