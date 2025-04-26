'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuoteBlock from '../ui/QuoteBlock';
import ChapterDivider from '../ui/ChapterDivider';

interface BlogContentProps {
  content: string;
}

// Helper function to convert markdown-style content to JSX
function formatContent(content: string) {
  // Apply the same styling to all blog posts
  return formatStylizedContent(content);
}

// Renamed the primitive human formatter to a generic stylized formatter for all posts
function formatStylizedContent(content: string) {
  // Split by sections - either chapters or major headings
  const splitPattern = /Chapter\s+|^##\s+/im;
  const hasSections = content.match(splitPattern);
  
  if (hasSections) {
    // For content with explicit chapter-like sections
    const parts = content.split(splitPattern);
    const intro = parts[0];
    
    // Process introduction which includes the quote if present
    const introContent = processIntroduction(intro);
    
    // Process remaining chapters/sections
    const sections = parts.slice(1).map((section, index) => {
      // Extract section title and content
      const titleMatch = section.match(/^(.*?)\n/);
      const title = titleMatch ? titleMatch[1].trim() : `Section ${index + 1}`;
      const sectionContent = section.replace(/^.*?\n/, '').trim();
      
      // Process the section content
      const formattedContent = processChapterContent(sectionContent);
      
      return (
        <React.Fragment key={`section-${index}`}>
          <ChapterDivider title={title} number={index} id={`section-${index}`} />
          {formattedContent}
        </React.Fragment>
      );
    });
    
    return (
      <>
        {introContent}
        {sections}
      </>
    );
  } else {
    // For content without explicit sections, process as a whole
    return (
      <>
        {processIntroduction(content)}
      </>
    );
  }
}

// Create separate formatter functions to avoid Hook rules issues
function formatRegularContent(content: string) {
  return content.split('\n\n').map((block, index) => {
    const trimmedBlock = block.trim();
    
    // Skip empty blocks
    if (!trimmedBlock) return null;
    
    // Headings (h1, h2, h3)
    if (trimmedBlock.startsWith('#')) {
      // H1 heading
      if (trimmedBlock.startsWith('# ')) {
        return (
          <motion.h1 
            key={index} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold mt-12 mb-6 text-primary"
          >
            {trimmedBlock.replace(/^# /, '')}
          </motion.h1>
        );
      }
      
      // H2 heading
      if (trimmedBlock.startsWith('## ')) {
        return (
          <motion.h2 
            key={index} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold mt-10 mb-5 text-primary"
          >
            {trimmedBlock.replace(/^## /, '')}
          </motion.h2>
        );
      }
      
      // H3 heading
      if (trimmedBlock.startsWith('### ')) {
        return (
          <motion.h3 
            key={index} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-semibold mt-8 mb-4 text-primary"
          >
            {trimmedBlock.replace(/^### /, '')}
          </motion.h3>
        );
      }
      
      // H4 heading
      if (trimmedBlock.startsWith('#### ')) {
        return (
          <motion.h4 
            key={index} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg font-semibold mt-6 mb-3 text-primary"
          >
            {trimmedBlock.replace(/^#### /, '')}
          </motion.h4>
        );
      }
    }
    
    // Unordered Lists
    if (trimmedBlock.match(/^[*\-] /m)) {
      const items = trimmedBlock.split('\n').filter(line => line.trim().match(/^[*\-] /));
      
      return (
        <motion.ul 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="list-disc pl-6 mb-6 space-y-2"
        >
          {items.map((item, i) => (
            <li key={i} className="text-theme">
              {item.replace(/^[*\-] /, '')}
            </li>
          ))}
        </motion.ul>
      );
    }
    
    // Ordered Lists
    if (trimmedBlock.match(/^\d+\. /m)) {
      const items = trimmedBlock.split('\n').filter(line => line.trim().match(/^\d+\. /));
      
      return (
        <motion.ol 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="list-decimal pl-6 mb-6 space-y-2"
        >
          {items.map((item, i) => (
            <li key={i} className="text-theme">
              {item.replace(/^\d+\. /, '')}
            </li>
          ))}
        </motion.ol>
      );
    }
    
    // Simple numbered points (e.g., "1. Title\nDescription")
    if (trimmedBlock.match(/^\d\./)) {
      return (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <strong className="text-primary">{trimmedBlock.split('\n')[0]}</strong>
          <p className="text-theme mt-2">{trimmedBlock.split('\n')[1]}</p>
        </motion.div>
      );
    }
    
    // Code blocks
    if (trimmedBlock.startsWith('```')) {
      const code = trimmedBlock.replace(/```(.*)\n/, '').replace(/```$/, '');
      return (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <pre className="bg-theme/30 backdrop-blur-sm p-4 rounded-lg overflow-x-auto text-sm text-theme border border-primary/10">
            <code>{code}</code>
          </pre>
        </motion.div>
      );
    }
    
    // Blockquotes with QuoteBlock component
    if (trimmedBlock.startsWith('>')) {
      const quoteContent = trimmedBlock.replace(/^>\s?/, '').replace(/\n>\s?/g, '\n');
      
      // Detect if there's an author attribution in the format "> Quote text\n> — Author"
      const authorMatch = quoteContent.match(/\n—\s*(.+)$/);
      
      if (authorMatch) {
        const quote = quoteContent.replace(/\n—\s*.+$/, '');
        const author = authorMatch[1];
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <QuoteBlock quote={quote} author={author} variant="default" />
          </motion.div>
        );
      } else {
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <QuoteBlock quote={quoteContent} variant="default" />
          </motion.div>
        );
      }
    }
    
    // Emphasis (italic)
    if (trimmedBlock.includes('*') && !trimmedBlock.startsWith('*')) {
      const parts = trimmedBlock.split(/(\*[^*]+\*)/g);
      return (
        <motion.p 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-lg text-theme leading-relaxed"
        >
          {parts.map((part, i) => {
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={i}>{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </motion.p>
      );
    }
    
    // Strong emphasis (bold)
    if (trimmedBlock.includes('**')) {
      const parts = trimmedBlock.split(/(\*\*[^*]+\*\*)/g);
      return (
        <motion.p 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-lg text-theme leading-relaxed"
        >
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </motion.p>
      );
    }
    
    // Default paragraph
    return (
      <motion.p 
        key={index} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-lg text-theme leading-relaxed"
      >
        {trimmedBlock}
      </motion.p>
    );
  });
}

// Process the introduction section of the AI blog
function processIntroduction(intro: string) {
  const lines = intro.split('\n\n');
  const title = lines[0].trim();
  const quoteLine = lines[1]?.trim() || '';
  const remainingContent = lines.slice(2).join('\n\n').trim();
  
  // Check if the second line is a proper quote or just a regular paragraph
  const isQuote = quoteLine.startsWith('>') || 
                 (quoteLine.startsWith('"') && quoteLine.endsWith('"')) ||
                 (quoteLine.startsWith('"') && quoteLine.endsWith('"'));
  
  return (
    <>
      <motion.h1
        id="top"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold mb-10 text-center text-primary"
      >
        {title}
      </motion.h1>
      
      {quoteLine && (
        isQuote ? (
          <QuoteBlock 
            quote={quoteLine.startsWith('>') ? quoteLine.substring(1).trim() : quoteLine} 
            author="Ali" 
            variant="default"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-8 text-center"
          >
            <p className="text-xl text-theme leading-relaxed italic">
              {quoteLine}
            </p>
          </motion.div>
        )
      )}
      
      {remainingContent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          {formatRegularContent(remainingContent)}
        </motion.div>
      )}
    </>
  );
}

// Process chapter content to enhance formatting
function processChapterContent(content: string) {
  return formatRegularContent(content);
}

// Main component
const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const [fullContent, setFullContent] = useState<React.ReactNode>([]);

  useEffect(() => {
    setFullContent(formatContent(content));
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
      {fullContent}
    </div>
  );
}

export default BlogContent; 