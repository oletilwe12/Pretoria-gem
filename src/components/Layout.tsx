import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  const fullTitle = title ? `${title} | Pretoria Hidden Gems` : 'Pretoria Hidden Gems | Local Insider Guide';
  const fullDescription = description || 'Discover secret restaurants, activities, and markets in Pretoria, South Africa.';

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={fullDescription} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={fullDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      
      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-grow"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};
