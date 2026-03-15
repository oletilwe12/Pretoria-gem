import React from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { Place, Submission } from '../types';
import { 
  LayoutDashboard, 
  MapPin, 
  Plus, 
  Settings, 
  LogOut, 
  Check, 
  X, 
  Eye,
  Trash2,
  Edit3
} from 'lucide-react';

export const AdminDashboard = () => {
  const [places, setPlaces] = React.useState<Place[]>([]);
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<'places' | 'submissions'>('places');

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: placesData } = await supabase.from('places').select('*').order('created_at', { ascending: false });
      const { data: submissionsData } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
      
      if (placesData) setPlaces(placesData);
      if (submissionsData) setSubmissions(submissionsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Admin Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <button 
              onClick={() => setActiveTab('places')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'places' ? 'bg-emerald-600 text-white' : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Manage Places</span>
            </button>
            <button 
              onClick={() => setActiveTab('submissions')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'submissions' ? 'bg-emerald-600 text-white' : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>Submissions</span>
              {submissions.filter(s => s.status === 'pending').length > 0 && (
                <span className="ml-auto bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {submissions.filter(s => s.status === 'pending').length}
                </span>
              )}
            </button>
            <div className="pt-8 mt-8 border-t border-zinc-100">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Admin Main Content */}
          <div className="flex-1 bg-white border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-zinc-900">
                {activeTab === 'places' ? 'Manage Places' : 'User Submissions'}
              </h2>
              {activeTab === 'places' && (
                <button className="bg-zinc-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Place</span>
                </button>
              )}
            </div>

            <div className="p-0 overflow-x-auto">
              {loading ? (
                <div className="p-20 text-center text-zinc-400">Loading data...</div>
              ) : activeTab === 'places' ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                      <th className="px-8 py-4">Place</th>
                      <th className="px-8 py-4">Category</th>
                      <th className="px-8 py-4">Suburb</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {places.map(place => (
                      <tr key={place.id} className="hover:bg-zinc-50 transition-colors group">
                        <td className="px-8 py-4">
                          <div className="flex items-center space-x-3">
                            <img src={place.hero_image} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                            <span className="font-bold text-zinc-900 text-sm">{place.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-sm text-zinc-500">{place.category}</td>
                        <td className="px-8 py-4 text-sm text-zinc-500">{place.suburb}</td>
                        <td className="px-8 py-4">
                          {place.is_featured ? (
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Featured</span>
                          ) : (
                            <span className="bg-zinc-100 text-zinc-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Standard</span>
                          )}
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-2 text-zinc-400 hover:text-emerald-600 transition-colors"><Edit3 className="w-4 h-4" /></button>
                            <button className="p-2 text-zinc-400 hover:text-rose-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                      <th className="px-8 py-4">Submission</th>
                      <th className="px-8 py-4">Suburb</th>
                      <th className="px-8 py-4">Contact</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {submissions.map(sub => (
                      <tr key={sub.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="px-8 py-4">
                          <div>
                            <p className="font-bold text-zinc-900 text-sm">{sub.name}</p>
                            <p className="text-xs text-zinc-400">{sub.category}</p>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-sm text-zinc-500">{sub.suburb}</td>
                        <td className="px-8 py-4 text-sm text-zinc-500">{sub.contact_email}</td>
                        <td className="px-8 py-4">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                            sub.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                            sub.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><Check className="w-4 h-4" /></button>
                            <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
