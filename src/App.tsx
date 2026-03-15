import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Pages
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { PlaceDetail } from './pages/PlaceDetail';
import { SearchResults } from './pages/SearchResults';
import { Weekend } from './pages/Weekend';
import { SubmitGem } from './pages/SubmitGem';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/place/:slug" element={<PlaceDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/weekend" element={<Weekend />} />
          <Route path="/submit" element={<SubmitGem />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
