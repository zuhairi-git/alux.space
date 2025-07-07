'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface AudioShareButtonProps {
  url: string;
  title: string;
  description: string;
}

export default function AudioShareButton({ url, title, description }: AudioShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: TwitterIcon,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'LinkedIn',
      icon: LinkedInIcon,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Copy Link Button */}
      <motion.button
        onClick={handleCopyLink}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {copied ? (
          <>
            <CheckIcon className="w-5 h-5 text-green-600" />
            <span className="text-green-600 font-medium">Copied!</span>
          </>
        ) : (
          <>
            <ContentCopyIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">Copy Link</span>
          </>
        )}
      </motion.button>

      {/* Share Menu Toggle */}
      <motion.button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ShareIcon className="w-5 h-5" />
        <span className="font-medium">Share</span>
      </motion.button>

      {/* Share Options */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showShareMenu ? 1 : 0, 
          height: showShareMenu ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-2 gap-3 pt-2">
          {shareLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center space-x-2 px-3 py-2 ${link.color} text-white rounded-lg transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Native Share (Mobile) */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <motion.button
          onClick={() => {
            navigator.share({
              title: title,
              text: description,
              url: url,
            });
          }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShareIcon className="w-5 h-5" />
          <span className="font-medium">Share via Device</span>
        </motion.button>
      )}
    </div>
  );
}
