'use client';

import { motion } from 'framer-motion';
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';

interface BlogPostClientProps {
  children: React.ReactNode;
  shareUrl: string;
  title: string;
}

export default function BlogPostClient({ children, shareUrl, title }: BlogPostClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex gap-4 mb-6">
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
      {children}
    </motion.div>
  );
}