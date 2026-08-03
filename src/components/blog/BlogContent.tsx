'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { delaySeconds, QuoteBlock, ChapterDivider } from '@/design-system';

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
    // First, parse all sections to check if we can give everyone an icon
    const parsedSections = parts.slice(1).map((section, index) => {
      // Extract section title and content
      const titleMatch = section.match(/^(.*?)\n/);
      let title = titleMatch ? titleMatch[1].trim() : `Section ${index + 1}`;
      const sectionContent = section.replace(/^.*?\n/, '').trim();
      
      // Check if title has an explicit number like "Zero - Title" or "1. Title"
      let explicitNumber: number | undefined = undefined;
      const numberWordMatch = title.match(/^(zero|one|two|tow|three|four|five|six|seven|eight|nine|ten|\d+)[\s\-:.]*(.*)$/i);
      
      if (numberWordMatch) {
        const word = numberWordMatch[1].toLowerCase();
        const map: Record<string, number> = {
          'zero': 0, 'one': 1, 'two': 2, 'tow': 2, 'three': 3, 'four': 4,
          'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
        };
        explicitNumber = map[word] !== undefined ? map[word] : parseInt(word, 10);
        // Clean the title to remove the "Zero - " part if there's actual text remaining
        if (numberWordMatch[2].length > 0) {
          title = numberWordMatch[2];
        }
      }
      
      // Determine a meaningful icon based on the title context
      let iconName = undefined;
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('intro') || lowerTitle.includes('welcome')) iconName = 'emoji_people';
      else if (lowerTitle.includes('conclusion') || lowerTitle.includes('summary') || lowerTitle.includes('wrap')) iconName = 'done_all';
      else if (lowerTitle.includes('setup') || lowerTitle.includes('install') || lowerTitle.includes('start')) iconName = 'build';
      else if (lowerTitle.includes('architecture') || lowerTitle.includes('design') || lowerTitle.includes('structure')) iconName = 'architecture';
      else if (lowerTitle.includes('test') || lowerTitle.includes('qa')) iconName = 'bug_report';
      else if (lowerTitle.includes('deploy') || lowerTitle.includes('ship') || lowerTitle.includes('release')) iconName = 'rocket_launch';
      else if (lowerTitle.includes('why') || lowerTitle.includes('reason')) iconName = 'psychology';
      else if (lowerTitle.includes('how') || lowerTitle.includes('guide') || lowerTitle.includes('action')) iconName = 'integration_instructions';
      else if (lowerTitle.includes('future') || lowerTitle.includes('next') || lowerTitle.includes('what\'s next')) iconName = 'update';
      else if (lowerTitle.includes('overview') || lowerTitle.includes('concept')) iconName = 'visibility';
      else if (lowerTitle.includes('code') || lowerTitle.includes('implementation') || lowerTitle.includes('dev')) iconName = 'code';
      else if (lowerTitle.includes('data') || lowerTitle.includes('database') || lowerTitle.includes('state')) iconName = 'database';
      else if (lowerTitle.includes('perf') || lowerTitle.includes('optimiz') || lowerTitle.includes('speed')) iconName = 'speed';
      else if (lowerTitle.includes('sec') || lowerTitle.includes('auth')) iconName = 'lock';
      else if (lowerTitle.includes('api') || lowerTitle.includes('network') || lowerTitle.includes('fetch')) iconName = 'api';
      else if (lowerTitle.includes('ui') || lowerTitle.includes('user interface') || lowerTitle.includes('visual')) iconName = 'palette';
      else if (lowerTitle.includes('bug') || lowerTitle.includes('fix') || lowerTitle.includes('issue')) iconName = 'healing';
      else if (lowerTitle.includes('tip') || lowerTitle.includes('trick') || lowerTitle.includes('best practice')) iconName = 'lightbulb';
      
      return { title, sectionContent, iconName, index, explicitNumber };
    });

    // If even one section doesn't have an icon, fallback to numbers strictly to avoid mixing 1, 2, icon, 4
    const allSectionsHaveIcons = parsedSections.every(s => s.iconName !== undefined);

    const sections = parsedSections.map(({ title, sectionContent, iconName, index, explicitNumber }) => {
      // Process the section content
      const formattedContent = processChapterContent(sectionContent);
      
      const finalNumber = explicitNumber !== undefined ? explicitNumber : index + 1;
      
      // We pass the icon only if all sections got successfully mapped to an icon, otherwise strict numbered sequence
      return (
        <React.Fragment key={`section-${index}`}>
          <ChapterDivider 
            title={title} 
            number={allSectionsHaveIcons ? undefined : finalNumber} 
            icon={allSectionsHaveIcons ? iconName : undefined}
            id={`section-${index}`} 
          />
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
        const headingText = trimmedBlock.replace(/^# /, '');
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return (
          <motion.h1 
            key={index} 
            id={headingId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delaySeconds.xs }}
            className="text-3xl font-bold mt-12 mb-6 text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
            tabIndex={-1}
          >
            {headingText}
          </motion.h1>
        );
      }
      
      // H2 heading
      if (trimmedBlock.startsWith('## ')) {
        const headingText = trimmedBlock.replace(/^## /, '');
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return (
          <motion.h2 
            key={index} 
            id={headingId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delaySeconds.xs }}
            className="text-2xl font-bold mt-10 mb-5 text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
            tabIndex={-1}
          >
            {headingText}
          </motion.h2>
        );
      }
      
      // H3 heading
      if (trimmedBlock.startsWith('### ')) {
        const headingText = trimmedBlock.replace(/^### /, '');
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return (
          <motion.h3 
            key={index} 
            id={headingId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delaySeconds.xs }}
            className="text-xl font-semibold mt-8 mb-4 text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
            tabIndex={-1}
          >
            {headingText}
          </motion.h3>
        );
      }
      
      // H4 heading
      if (trimmedBlock.startsWith('#### ')) {
        const headingText = trimmedBlock.replace(/^#### /, '');
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return (
          <motion.h4 
            key={index} 
            id={headingId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delaySeconds.xs }}
            className="text-lg font-semibold mt-6 mb-3 text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
            tabIndex={-1}
          >
            {headingText}
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
          transition={{ delay: delaySeconds.xs }}
          className="list-disc ps-6 mb-6 space-y-2"
        >
          {items.map((item, i) => (
            <li key={i} className="text-foreground">
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
          transition={{ delay: delaySeconds.xs }}
          className="list-decimal ps-6 mb-6 space-y-2"
        >
          {items.map((item, i) => (
            <li key={i} className="text-foreground">
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
          transition={{ delay: delaySeconds.xs }}
          className="mb-6"
        >
          <strong className="text-primary">{trimmedBlock.split('\n')[0]}</strong>
          <p className="text-foreground mt-2">{trimmedBlock.split('\n')[1]}</p>
        </motion.div>
      );
    }
      // Code blocks
    if (trimmedBlock.startsWith('```')) {
      const langMatch = trimmedBlock.match(/```(\w+)/);
      const language = langMatch ? langMatch[1] : 'text';
      const code = trimmedBlock.replace(/```(.*)\n/, '').replace(/```$/, '');
      return (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delaySeconds.xs }}
          className="mb-6"
          role="region"
          aria-label={`Code block in ${language}`}
        >
          <pre 
            className="bg-[var(--card-from-bg)] backdrop-blur-sm p-4 rounded-lg overflow-x-auto text-sm text-foreground border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            tabIndex={0}
            aria-label={`Code snippet in ${language}`}
          >
            <code lang={language}>{code}</code>
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
            transition={{ delay: delaySeconds.xs }}
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
            transition={{ delay: delaySeconds.xs }}
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
          transition={{ delay: delaySeconds.xs }}
          className="mb-6 text-lg text-foreground leading-relaxed"
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
          transition={{ delay: delaySeconds.xs }}
          className="mb-6 text-lg text-foreground leading-relaxed"
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
        transition={{ delay: delaySeconds.xs }}
        className="mb-6 text-lg text-foreground leading-relaxed"
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
        transition={{ delay: delaySeconds.xs }}
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
            transition={{ delay: delaySeconds.md }}
            className="max-w-3xl mx-auto mb-8 text-center"
          >
            <p className="text-xl text-muted-foreground leading-relaxed italic">
              {quoteLine}
            </p>
          </motion.div>
        )
      )}
      
      {remainingContent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delaySeconds.md }}
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
    <article 
      className="max-w-4xl mx-auto px-4 pt-8 pb-16"
      role="main"
      aria-label="Blog post content"
    >
      {fullContent}
    </article>
  );
}

export default BlogContent; 