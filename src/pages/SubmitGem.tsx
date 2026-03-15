import React from 'react';
import { Layout } from '../components/Layout';
import { Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const SubmitGem = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      suburb: formData.get('suburb') as string,
      description: formData.get('description') as string,
      contact_email: formData.get('email') as string,
      status: 'pending'
    };

    const { error } = await supabase.from('submissions').insert([data]);

    if (!error) {
      setSubmitted(true);
    } else {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Layout title="Submit a Hidden Gem" description="Know a secret spot in Pretoria? Share it with the community.">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {submitted ? (
          <div className="text-center py-20 bg-emerald-50 rounded-[2rem] border border-emerald-100 p-12">
            <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 text-white">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-4">Thank you for your submission!</h1>
            <p className="text-zinc-600 text-lg mb-8">
              Our team will review your hidden gem and add it to the platform if it fits our criteria.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
            >
              Submit another place
            </button>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Submit a Hidden Gem</h1>
              <p className="text-zinc-500 text-lg">
                Know a secret restaurant, a quiet hiking trail, or a quirky coffee shop? Help us grow the Pretoria guide.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-zinc-200 p-8 md:p-12 rounded-[2rem] shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Place Name</label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="e.g. The Secret Garden"
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Category</label>
                  <select
                    name="category"
                    required
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Restaurants">Restaurants</option>
                    <option value="Coffee Shops">Coffee Shops</option>
                    <option value="Outdoor & Nature">Outdoor & Nature</option>
                    <option value="Fun Activities">Fun Activities</option>
                    <option value="Markets">Markets</option>
                    <option value="Date Ideas">Date Ideas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Suburb</label>
                <input
                  name="suburb"
                  required
                  type="text"
                  placeholder="e.g. Pretoria East, Brooklyn, etc."
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Why is it a hidden gem?</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Tell us what makes this place special..."
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Your Email (for follow-up)</label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit for Review</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
};
