'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'next-share';

interface BlogPostClientProps {
  children: React.ReactNode;
  shareUrl: string;
  title: string;
}

export default function BlogPostClient({ children, shareUrl, title }: BlogPostClientProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <div className="relative">
      {/* Social share sidebar - visible once scrolled */}
      {scrollPosition > 300 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/30 to-transparent mx-auto" />
          
          <div className="flex flex-col gap-2 items-center">
            <TwitterShareButton url={shareUrl} title={title}>
              <div className="p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors">
                <TwitterIcon size={24} round />
              </div>
            </TwitterShareButton>
            
            <LinkedinShareButton url={shareUrl} title={title}>
              <div className="p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors">
                <LinkedinIcon size={24} round />
              </div>
            </LinkedinShareButton>
            
            <FacebookShareButton url={shareUrl} quote={title}>
              <div className="p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors">
                <FacebookIcon size={24} round />
              </div>
            </FacebookShareButton>
          </div>
          
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/30 to-transparent mx-auto" />
        </motion.div>
      )}
      
      {/* Mobile share buttons - at the top */}
      <div className="flex gap-3 mb-8 lg:hidden">
        <TwitterShareButton url={shareUrl} title={title}>
          <div className="p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors">
            <TwitterIcon size={28} round />
          </div>
        </TwitterShareButton>
        
        <LinkedinShareButton url={shareUrl} title={title}>
          <div className="p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors">
            <LinkedinIcon size={28} round />
          </div>
        </LinkedinShareButton>
        
        <FacebookShareButton url={shareUrl} quote={title}>
          <div className="p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors">
            <FacebookIcon size={28} round />
          </div>
        </FacebookShareButton>
      </div>
      
      {children}
    </div>
  );
}