'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import QuoteBlock from '../ui/QuoteBlock';
import ChapterDivider from '../ui/ChapterDivider';
import ImageSection from '../ui/ImageSection';

interface BlogContentProps {
  content: string;
  slug: string;
}

// Helper function to convert markdown-style content to JSX
function formatContent(content: string, slug: string, theme: string) {
  // Special processing for the AI blog post
  if (slug === 'primitive-human') {
    return formatPrimitiveHumanContent(content, theme);
  }
  
  // For other blog posts, use the regular content formatter
  return formatRegularContent(content);
}

// Create separate formatter functions to avoid Hook rules issues
function formatRegularContent(content: string) {
  return content.split('\n\n').map((block, index) => {
    const trimmedBlock = block.trim();
    
    // Headings
    if (trimmedBlock.startsWith('##') && !trimmedBlock.startsWith('###')) {
      return (
        <motion.h2 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold mt-10 mb-5 text-primary"
        >
          {trimmedBlock.replace('## ', '')}
        </motion.h2>
      );
    }
    
    if (trimmedBlock.startsWith('###')) {
      return (
        <motion.h3 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl font-semibold mt-8 mb-4 text-primary"
        >
          {trimmedBlock.replace('### ', '')}
        </motion.h3>
      );
    }
    
    // Lists
    if (trimmedBlock.startsWith('*')) {
      return (
        <motion.ul 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="list-disc pl-6 mb-6 space-y-2"
        >
          {trimmedBlock.split('\n').map((item, i) => (
            <li key={i} className="text-theme">
              {item.replace('* ', '')}
            </li>
          ))}
        </motion.ul>
      );
    }
    
    // Numbered points
    if (trimmedBlock.match(/^\d\./)) {
      return (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <pre className="bg-theme/30 backdrop-blur-sm p-4 rounded-lg overflow-x-auto text-sm text-theme border border-primary/10">
            <code>{code}</code>
          </pre>
        </motion.div>
      );
    }
    
    // Blockquotes
    if (trimmedBlock.startsWith('>')) {
      return (
        <motion.blockquote 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="pl-4 border-l-4 border-primary italic my-6 text-lg text-theme"
        >
          {trimmedBlock.replace('> ', '')}
        </motion.blockquote>
      );
    }
    
    // Default paragraph
    return (
      <motion.p 
        key={index} 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-lg text-theme leading-relaxed"
      >
        {trimmedBlock}
      </motion.p>
    );
  });
}

// Separate function to format the primitive-human blog content
function formatPrimitiveHumanContent(content: string, theme: string) {
  const isLight = theme === 'light';
  
  // Split by chapters or major sections
  const parts = content.split(/Chapter\s+/i);
  const intro = parts[0];
  
  // Process introduction which includes the quote
  const introContent = processIntroduction(intro);
  
  // Process remaining chapters
  const chapters = parts.slice(1).map((chapter, index) => {
    // Extract chapter title and content
    const titleMatch = chapter.match(/^(.*?)\n/);
    const title = titleMatch ? titleMatch[1].trim() : `Chapter ${index + 1}`;
    const chapterContent = chapter.replace(/^.*?\n/, '').trim();
    
    // Add appropriate images for each chapter
    let chapterImage;
    if (index === 0) { // Chapter Zero
      chapterImage = <ImageSection 
        src="/images/blog/ai-brain.jpg" 
        alt="AI Brain Concept"
        caption="Visualization of artificial neural networks - the foundation of modern AI"
      />;
    } else if (index === 1) { // 
      chapterImage = <ImageSection 
        src="/images/blog/human-ai.jpg" 
        alt="Human and AI Interaction"
        caption="The human element remains essential in the age of AI"
        aspectRatio="tall"
      />;
    } else if (index === 2) { // Chapter Two
      chapterImage = <ImageSection 
        src="/images/blog/future-rules.jpg" 
        alt="AI Ethics and Rules"
        caption="Redefining societal rules for a future with advanced artificial intelligence"
      />;
    } else if (index === 3) { // Chapter Three
      chapterImage = <ImageSection 
        src="/images/blog/utopia.jpg" 
        alt="Utopian Future Society"
        caption="Envisioning a society where AI enhances human well-being"
        aspectRatio="square"
      />;
    } else if (index === 4) { // Chapter Four
      chapterImage = <ImageSection 
        src="/images/blog/ai-impact.jpg" 
        alt="AI Impact on Society"
        caption="The widespread impact of AI on work and daily life"
      />;
    }
    
    // Process the chapter content
    const formattedContent = processChapterContent(chapterContent);
    
    return (
      <React.Fragment key={`chapter-${index}`}>
        <ChapterDivider title={title} number={index} id={`chapter-${index}`} />
        {chapterImage}
        {formattedContent}
      </React.Fragment>
    );
  });
  
  return (
    <>
      {introContent}
      {chapters}
      
      {/* Final section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-16 mb-8 text-center"
      >
        <h2 className={`text-3xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
          What is coming next?
        </h2>
        <p className="text-lg text-theme leading-relaxed max-w-3xl mx-auto mb-8">
          Having discussed the significance of AI, it is worth noting that there is already an ideation of Artificial General Intelligence (AGI). AGI refers to a machine that can learn and comprehend any intellectual task that a human being can, and can even develop capabilities beyond the scope of traditional AI systems.
        </p>
        
        <ImageSection 
          src="/images/blog/agi-future.jpg" 
          alt="Artificial General Intelligence"
          caption="A glimpse into the potential future of Artificial General Intelligence"
        />
        
        <p className="text-lg text-theme leading-relaxed max-w-3xl mx-auto mt-12 italic">
          Finally, I want to express my gratitude for your patience and for taking the time to read this article in its entirety. If you have any questions, please don&apos;t hesitate to contact me anytime. I&apos;ll be more than happy to hear your feedback.
        </p>
      </motion.div>
    </>
  );
}

// Process the introduction section of the AI blog
function processIntroduction(intro: string) {
  const lines = intro.split('\n\n');
  const title = lines[0].trim();
  const quoteLine = lines[1]?.trim() || '';
  const remainingContent = lines.slice(2).join('\n\n').trim();
  
  return (
    <>
      <motion.h1
        id="top"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold mb-10 text-center text-primary"
      >
        {title}
      </motion.h1>
      
      <QuoteBlock quote={quoteLine} author="Ali" />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <p className="text-lg text-theme leading-relaxed">
          {remainingContent}
        </p>
      </motion.div>
    </>
  );
}

// Process chapter content to enhance formatting
function processChapterContent(content: string) {
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, index) => {
    if (!paragraph.trim()) return null;
    
    // Check if this is a subheading within a chapter
    if (paragraph.match(/^[A-Z][\w\s]+$/)) {
      return (
        <motion.h3
          key={`subhead-${index}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold mt-10 mb-6 text-primary"
        >
          {paragraph}
        </motion.h3>
      );
    }
    
    return (
      <motion.p
        key={`para-${index}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-lg text-theme leading-relaxed max-w-3xl mx-auto"
      >
        {paragraph}
      </motion.p>
    );
  });
}

// Main component
const BlogContent: React.FC<BlogContentProps> = ({ content, slug }) => {
  const { theme } = useTheme();
  const [fullContent, setFullContent] = useState<React.ReactNode>([]);

  useEffect(() => {
    setFullContent(formatContent(content, slug, theme));
  }, [content, slug, theme]);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
      {fullContent}
    </div>
  );
}

export default BlogContent; 