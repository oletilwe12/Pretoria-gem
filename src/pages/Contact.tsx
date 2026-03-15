import React from 'react';
import { Layout } from '../components/Layout';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <Layout title="Contact Us" description="Get in touch with the Pretoria Hidden Gems team.">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
              Get in <span className="text-emerald-600 italic font-serif">touch</span>
            </h1>
            <p className="text-zinc-500 text-lg mb-12 max-w-md">
              Have a question, a suggestion, or want to partner with us? We'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">Email Us</h3>
                  <p className="text-zinc-500">hello@pretoriahiddengems.co.za</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">Social Media</h3>
                  <p className="text-zinc-500">@pretoriahiddengems</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">Our Base</h3>
                  <p className="text-zinc-500">Pretoria East, South Africa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-8 md:p-12 rounded-[2rem] shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Message</label>
                <textarea
                  rows={5}
                  placeholder="Your message..."
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
