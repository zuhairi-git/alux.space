// filepath: c:\Users\zohai\Documents\GitHub\alux.space\src\app\prompt\page.tsx
'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import QuoteBlock from '@/components/ui/QuoteBlock';
import { useTheme } from '@/context/ThemeContext';

// Data structure for prompts with enhanced categorization
const prompts = [  {
    id: 1,
    title: "React Website Modernization",
    category: "Frontend",
    status: "Done" as const,
    bugsFixed: 3,
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    description: "Comprehensive modernization plan for React website using latest Tailwind CSS practices and modern web design principles.",
    content: `Create a comprehensive modernization plan for my React website using the latest Tailwind CSS practices and modern web design principles.

The website consists of:
1. Introduction/Home Page:
   - Visually striking hero section with smooth animations, dynamic typography, gradient effects, and modern UI components.
   - Interactive elements, micro-interactions, and a responsive navbar with glass-morphism effects.

2. Blog Page:
   - Modern blog layout with card-based content presentation, skeleton loading states, infinite scroll functionality, category filtering, and reading time estimates.
   - Dark mode toggle and responsive grid layouts using Tailwind CSS Grid and Flexbox.

3. Portfolio Case Studies (2 entries):
   - Immersive case study layout with parallax scrolling effects, interactive image galleries, progress indicators, and animated transitions between sections.
   - Hover effects, modern typography hierarchies, and clear call-to-action elements.

Global Improvements:
- Implement latest Tailwind CSS features including JIT compiler
- Add smooth page transitions and loading states
- Ensure responsive design across all device sizes
- Include modern accessibility features
- Optimize performance with lazy loading
- Use modern color schemes and gradients
- Implement container queries and fluid typography
- Add subtle micro-animations and hover effects
- Ensure consistent spacing using Tailwind's spacing system
- Include modern scrolling experiences and animations

Please follow the Tailwind UI Blocks documentation:
https://tailwindcss.com/plus/ui-blocks/documentation`
  },  {
    id: 2,
    title: "Navigation & Blog Enhancement",
    category: "Frontend",
    status: "Done" as const,
    bugsFixed: 12,
    technologies: ["React", "Next.js", "Tailwind CSS"],
    description: "Refactor navigation system and enhance blog functionality with OG metadata and modern design patterns.",
    content: `Task Breakdown:
• Use tailwind best practices #fetch: https://tailwindcss.com/plus/ui-blocks/documentation
• Navigation Bar
  ○ Remove the "CV" link from the current navigation bar.
  ○ Refactor the navigation bar into a reusable component that can be imported and used across the entire app.
• Blog Post with Image
  ○ Add a new blog post under the blog directory.
  ○ Include an image in the post and ensure it's properly displayed in the content.
• OG Metadata for Social Sharing
  ○ Set up Open Graph (OG) metadata for each blog post.
  ○ Ensure the post's featured image is used as the og:image.
  ○ Make OG metadata globally available for both blog posts and portfolio pages.
• Design Reference
  ○ For styling inspiration, use the design shown in this Wix post as a reference:
#fetch https://

Here is the post:
#fetch: https://cvlanes.com/blogs/circle-of-rhythm`
  },  {
    id: 3,
    title: "Typography Enhancement",
    category: "Design",
    status: "Done" as const,
    bugsFixed: 29,
    technologies: ["Google Fonts", "CSS"],
    description: "Implement Google Fonts for better typography hierarchy and readability.",
    content: `Add Fonts using google fonts web:
Headings
• Poppins is better for headings.
It has geometric, rounded letters that give your site a bold, friendly, and modern personality. Great for grabbing attention.
Body Text
• Roboto is better for body text.
It was designed for readability on screens, with a clean, neutral, and highly legible look even at small sizes.`
  },  {
    id: 4,
    title: "Modern Portfolio Section",
    category: "Portfolio",
    status: "Done" as const,
    bugsFixed: 7,
    technologies: ["React", "Animation", "CSS"],
    description: "Build a slick, modern portfolio section with smooth animations and transitions.",
    content: `Use Tailwind CSS best practices and follow the UI Blocks documentation:
#fetch: https://tailwindcss.com/plus/ui-blocks/documentation

Build a slick, modern portfolio section with smooth animations and transitions.
Replace my portfolio content with the following from the below sources:
#fetch: https://cvlanes.com/portfolio/collaboration
#fetch: https://cvlanes.com/portfolio/jobseeking`  },
  {
    id: 5,
    title: "Unsplash Integration",
    category: "Integration",
    status: "Failed" as const,
    bugsFixed: 20,
    technologies: ["API", "Unsplash", "JavaScript"],
    description: "Integrate with Unsplash API to use proper images for portfolio projects.",
    content: `Unsplash.com integration
Integrate with unsplash and use proper images for my portfolio
Use best integration practices from #fetch https://unsplash.com/documentation`
  },
  {
    id: 6,
    title: "Hero Section Enhancement",
    category: "Frontend",
    status: "Failed" as const,
    bugsFixed: 1,
    technologies: ["CSS", "JavaScript"],
    description: "Create hero section with custom effects and background imagery.",
    content: `Hero Section (Based on XXX Site):
• Fetch the hero effect from  #fetch https://www.xxxx.com.
• Use the image located at images/hero for the hero background.`
  },
  {
    id: 7,
    title: "Futuristic Hero Design",
    category: "Design",
    status: "Done" as const,
    bugsFixed: 14,
    technologies: ["Animation", "Material Icons", "CSS"],
    description: "Create a stunning and futuristic hero section with animated Google Material Icons.",
    content: `Create a stunning and futuristic hero section that feels both unique and exceptional. Use animated Google Material Icons in the background to visually express the transformation of design into code. Take inspiration from Apple Vision Pro—craft something that feels ahead of its time.`  },
  {
    id: 8,
    title: "Dynamic Hero System",
    category: "Architecture",
    status: "Done" as const,
    bugsFixed: 6,
    technologies: ["React", "Component Architecture"],
    description: "Decouple hero section and make it dynamic with multiple variations.",
    content: `Decouple the hero section from the homepage and make it dynamic, allowing it to be easily swapped based on different occasions or contexts. Integrate this flexibility into the homepage by providing an option to choose between multiple hero section variations. This approach simplifies the design process and enhances adaptability.`
  },
  {
    id: 9,
    title: "Portfolio Content Rebuild",
    category: "Content",
    status: "Failed" as const,
    bugsFixed: 52,
    technologies: ["Content Management"],
    description: "Rebuild portfolio content with comprehensive case studies and design processes.",
    content: `Rebuild my portfolio content using all the material from the sources provided below. Each portfolio entry should include the full content from its respective source, showcasing the complete design process, key decisions, and case studies. Incorporate the provided images as representations of the final website or product interface.
urls:
#fetch: https://cvlanes.com/portfolio/collaboration
#fetch: https://cvlanes.com/portfolio/jobseeking`  },
  {
    id: 10,
    title: "Collaboration Case Study",
    category: "Portfolio",
    status: "Done" as const,
    bugsFixed: 19,
    technologies: ["UX Design", "Case Study"],
    description: "Rebuild collaboration content with comprehensive user journey and product design insights.",
    content: `Rebuild my collaboration content using all the material from the content provided below. Each portfolio entry should include the full content from its respective source, showcasing the complete process. 
Remember this is case study or user journey of a future product design that offers an insight into a possible solution.
Use tailwind best practice: #fetch: https://tailwindcss.com/plus/ui-blocks/documentation`
  },
  {
    id: 11,
    title: "Job Seeking Portfolio",
    category: "Portfolio",
    status: "Done" as const,
    bugsFixed: 31,
    technologies: ["UX Design", "Navigation"],
    description: "Create job seeking case study with portfolio navigation integration.",
    content: `// In the navigation bar when clicked on the "Portfolio" it should go to the list of portfolios

// Rebuild my jobseeking content using all the material from the content provided below. Each portfolio entry should include the full content from its respective source, showcasing the complete process. 
Remember this is case study or user journey of a future product design that offers an insight into a possible solution.
Use tailwind best practice: #fetch: https://tailwindcss.com/plus/ui-blocks/documentation`
  },
  {
    id: 12,
    title: "Responsive Navigation",
    category: "Frontend",
    status: "Done" as const,
    bugsFixed: 18,
    technologies: ["CSS", "JavaScript", "Responsive Design"],
    description: "Make navigation responsive with dropdown menu for portfolio items.",
    content: `// In the navigation bar when clicked on the "Portfolio" it should go to the list of portfolios
// Make the navigation bar responsive using CSS/JavaScript. Use tailwind best practices #fetch: https://tailwindcss.com/plus/ui-blocks/documentation
// Add a dropdown menu to the "Portfolio" navigation item that displays a list of available portfolios when clicked.`  },
  {
    id: 13,
    title: "Global Theme Switcher",
    category: "Architecture",
    status: "Done" as const,
    bugsFixed: 59,
    technologies: ["Next.js", "Theme System", "Local Storage"],
    description: "Implement comprehensive theme switcher with Light, Dark, and Colorful themes.",
    content: `Website global Theme Switcher (Light/Dark/Colorful):
// Use tailwind best practices @https://tailwindcss.com/plus/ui-blocks/documentation
// consider compatibility with the current version of next.js 
// the theme function should be simple just on the cache level
// Implement a theme switcher in the navbar and navbar menu for mobile that allows the user to toggle between dark, light, and colorful themes.
// colorful theme is the default and the current implemented one is the colorful
// Light Theme: A design or user interface (UI) that uses light backgrounds (typically white or light colors) with dark text and elements. It's generally perceived as cleaner, easier to read in well-lit environments, and less straining on the eyes for many users.
// Dark Theme: A design or UI that uses dark backgrounds (typically black or dark gray) with light text and elements. It's popular in low-light settings, reduces eye strain in dark environments, and can improve battery life on OLED screens.
// when I click on each option, it should trigger the proper style`
  },
  {
    id: 14,
    title: "Mobile Optimization",
    category: "Responsive",
    status: "Done" as const,
    bugsFixed: 5,
    technologies: ["Responsive Design", "Mobile UX"],
    description: "Ensure website is fully responsive and optimized for all devices.",
    content: `Mobile-Friendly:
// Ensure that the website is responsive and works smoothly on all devices (desktops, tablets, and mobile).
// Ensure the mobile navigation bar has a proper background color for better visibility.
// Style the dropdown menu under "Portfolio" to have a visible background when hovered over.

// Tapping on the Portfolio should redirect you to the portfolio list.
// On mobile, the menu background color should match the desktop version for better clarity and visibility.`  },
  {
    id: 15,
    title: "Light Theme Styling",
    category: "Design",
    status: "Done" as const,
    bugsFixed: 17,
    technologies: ["CSS", "Theme System"],
    description: "Implement comprehensive light theme with soft gradients and accessible colors.",
    content: `Light Theme Styling Instructions:
• Background Gradient:
Apply a soft, light gradient background that transitions from near-white to soft gray:

css
CopyEdit
background: linear-gradient(to bottom right, #fdfdfd, #f3f4f6);
  ○ #fdfdfd: nearly white
  ○ #f3f4f6: soft gray (similar to Tailwind's gray-100)
The result should feel airy and gentle, avoiding harsh white tones.
• Text Color:
Use a deep, accessible gray for primary text:

css
CopyEdit
color: #1f2937;
  ○ This matches Tailwind's gray-800, offering strong contrast without the starkness of black.

• when I change the theme, I would like to refresh the cache.
• need the theme icons to have hover tooltips`
  },
  {
    id: 16,
    title: "UI Polish & Tooltips",
    category: "UX",
    status: "Done" as const,
    bugsFixed: 91,
    technologies: ["CSS", "JavaScript", "UX"],
    description: "Polish UI elements with smart tooltips and theme-aware styling.",
    content: `UI Prompt Instructions:
1. Tooltips Behavior:
Tooltips must be aware of screen boundaries. They should dynamically reposition to remain fully visible within the viewport.
2. Hero Section Styling:
In light theme, the hero section should have a lighter visual appearance — softer background and minimal contrast to blend smoothly with the overall theme.
3. Navigation Bar (Light Theme):
In the light version, the navigation/header bar should use darker text and icons to ensure clarity and sufficient contrast against the light background.`  },
  {
    id: 17,
    title: "Blog Section Improvements",
    category: "Frontend",
    status: "Done" as const,
    bugsFixed: 39,
    technologies: ["CSS", "Layout", "Styling"],
    description: "Fix blog card alignment, shadows, and filter controls for better UX.",
    content: `Blog Section Prompt Instructions:
1. Blog Cards Layout & Shadow:
  ○ Blog cards are misaligned vertically; ensure they are evenly aligned across the row.
  ○ Shadows are not rendering correctly — apply consistent, soft shadows that match the overall design system.
2. Blog Section Styling:
  ○ The top of the blog section currently uses a dark color; it should be light and cohesive with the rest of the light theme.
  ○ For filter controls:
    § Selected filters should appear darker for emphasis.
    § Add an underline to the active/selected filter for visual feedback.
3. Blog Post Background:
  ○ The background gradient of individual blog posts is too dark.
  ○ Update it to use a very light gradient, staying consistent with the light theme aesthetic.`
  },
  {
    id: 18,
    title: "Header & Author Integration",
    category: "Frontend",
    status: "Done" as const,
    bugsFixed: 9,
    technologies: ["React", "Image Handling"],
    description: "Improve header interactions and add author avatars to blog posts.",
    content: `Header & Blog Post Prompt Instructions:
1. Header Interaction – Portfolio Menu:
  ○ The hover effect that triggers the portfolio menu should only activate when hovering directly over the portfolio area in the header — not when hovering elsewhere.
2. Author Image in Posts:
  ○ Add the following image as the author avatar in blog posts:
images/me/ali.png
  ○ Set the image dimensions to 80px by 80px.
3. Post Background – Light Theme Only:
  ○ In the light theme, update the blog post background to be noticeably lighter for improved visual consistency.`
  },
  {
    id: 19,
    title: "Colorful Theme Enhancement",
    category: "Design",
    status: "Done" as const,
    bugsFixed: 11,
    technologies: ["CSS", "Design System", "Animation"],
    description: "Create vibrant colorful theme with cosmic aesthetics and engaging visuals.",
    content: `Colorful Theme Prompt Instructions:
• Apply a vibrant and modern color palette that feels fresh, bold, and visually engaging.
• Get inspired by futuristic, dream-like, or cosmic aesthetics — think gradients, glow, and unexpected color blends.
• Use striking contrasts, smooth transitions, and colors that feel "out of this world", while maintaining readability and visual harmony across components.

Blog Page & Header UI – Prompt Instructions:
1. Blog Page – Hover Fix:
  ○ Improve the hover effect on blog cards. It should feel smooth, responsive, and visually consistent with the rest of the design.
2. Navbar/Header – Name Visibility:
  ○ Ensure that the name in the navbar/header is always clearly visible:
    § No visual effects (blur, border, etc.)
    § Proper color contrast across all themes
3. "Explore My Work" Button – Colorful Theme Only:
  ○ In the colorful theme, apply a vibrant, colorful style to the "Explore My Work" button.
  ○ In other themes, use a more neutral or theme-consistent variant.`
  },
  {
    id: 20,
    title: "Card Layout System",
    category: "Design",
    status: "Done" as const,
    bugsFixed: 15,
    technologies: ["CSS", "Layout", "Animation"],
    description: "Update process sections with flexible card layouts and natural content flow.",
    content: `Process Sections – Card Style Prompt Instructions:
• Update the sections: Research Insights, User Personas, Product Requirements, User Testing, and Delivery Phase to use a new flexible card style, consistent with the design used in the Design Process section.
• Maintain the existing animations—they should remain unchanged.
• The new card layout should:
  ○ Wrap text naturally
  ○ Adapt in height based on content
  ○ Avoid enforcing a fixed height across cards to ensure a more fluid and readable layout.
  ○ Do not make the height 100%`
  }
];

export default function PromptPage() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  // Get theme-specific dropdown menu styles
  const getDropdownMenuStyles = () => {
    switch (theme) {
      case 'light':
        return 'bg-white border border-gray-200 text-gray-700';
      case 'dark':
        return 'bg-gray-900 border border-gray-700 text-gray-300';
      case 'colorful':
        return 'bg-purple-900/95 border border-purple-700 text-gray-200';
      default:
        return 'bg-gray-900 border border-gray-700 text-gray-300';
    }
  };

  // Get theme-specific dropdown item styles
  const getDropdownItemStyles = (isSelected: boolean) => {
    const baseClasses = 'w-full text-left px-4 py-3 text-sm transition-all duration-200';
    
    if (isSelected) {
      switch (theme) {
        case 'light':
          return `${baseClasses} bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 font-medium border-l-2 border-blue-500`;
        case 'dark':
          return `${baseClasses} bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white font-medium`;
        case 'colorful':
          return `${baseClasses} bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-white font-medium`;
        default:
          return `${baseClasses} bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white font-medium`;
      }
    } else {
      switch (theme) {
        case 'light':
          return `${baseClasses} hover:bg-gray-50 text-gray-700`;
        case 'dark':
          return `${baseClasses} hover:bg-white/10 text-gray-300`;
        case 'colorful':
          return `${baseClasses} hover:bg-purple-500/20 text-gray-200`;
        default:
          return `${baseClasses} hover:bg-white/10 text-gray-300`;
      }
    }
  };
  // Get theme-specific dropdown button styles
  const getDropdownButtonStyles = () => {
    switch (theme) {
      case 'light':
        return 'bg-white/80 hover:bg-white border border-gray-200 text-gray-700 shadow-sm';
      case 'dark':
        return 'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-300';
      case 'colorful':
        return 'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-200';
      default:
        return 'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-300';
    }
  };

  // Get theme-specific hover effect for dropdown items
  const getDropdownHoverEffect = () => {
    switch (theme) {
      case 'light':
        return { backgroundColor: 'rgba(0, 0, 0, 0.05)' };
      case 'dark':
        return { backgroundColor: 'rgba(255, 255, 255, 0.1)' };
      case 'colorful':
        return { backgroundColor: 'rgba(147, 51, 234, 0.2)' }; // purple-500/20
      default:
        return { backgroundColor: 'rgba(255, 255, 255, 0.1)' };
    }
  };
  const getStatusDropdownItemStyles = (isSelected: boolean) => {
    const baseClasses = 'w-full text-left px-4 py-3 text-sm transition-all duration-200';
    
    if (isSelected) {
      switch (theme) {
        case 'light':
          return `${baseClasses} bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-700 font-medium border-l-2 border-green-500`;
        case 'dark':
          return `${baseClasses} bg-gradient-to-r from-green-500/30 to-teal-500/30 text-white font-medium`;
        case 'colorful':
          return `${baseClasses} bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-white font-medium`;
        default:
          return `${baseClasses} bg-gradient-to-r from-green-500/30 to-teal-500/30 text-white font-medium`;
      }
    } else {
      switch (theme) {
        case 'light':
          return `${baseClasses} hover:bg-gray-50 text-gray-700`;
        case 'dark':
          return `${baseClasses} hover:bg-white/10 text-gray-300`;
        case 'colorful':
          return `${baseClasses} hover:bg-purple-500/20 text-gray-200`;
        default:
          return `${baseClasses} hover:bg-white/10 text-gray-300`;
      }
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setCategoryDropdownOpen(false);
        setStatusDropdownOpen(false);
      }
    };

    if (categoryDropdownOpen || statusDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [categoryDropdownOpen, statusDropdownOpen]);

  // Get unique categories and calculate stats
  const categories = ['All', ...Array.from(new Set(prompts.map(p => p.category)))];
  const statuses = ['All', 'Done', 'Failed'];
  
  const stats = useMemo(() => {
    const total = prompts.length;
    const completed = prompts.filter(p => p.status === 'Done').length;
    const failed = prompts.filter(p => p.status === 'Failed').length;
    const totalBugsFixed = prompts.reduce((sum, p) => sum + (typeof p.bugsFixed === 'number' ? p.bugsFixed : 0), 0);
    
    return { total, completed, failed, totalBugsFixed };
  }, []);

  // Filter prompts based on selected category and status
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const categoryMatch = selectedCategory === 'All' || prompt.category === selectedCategory;
      const statusMatch = selectedStatus === 'All' || prompt.status === selectedStatus;
      return categoryMatch && statusMatch;
    });
  }, [selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Enhanced Design */}
      <div className="relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32"
        >
          {/* Header with Gradient Background */}
          <motion.header 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 text-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-teal-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative z-10 theme-card-content p-12 rounded-3xl backdrop-blur-sm">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-500 bg-clip-text text-transparent"
              >
                Project Prompts
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl max-w-3xl mx-auto mb-8 opacity-80"
              >
                A comprehensive collection of development tasks, implementation stories, and their journey to completion.
              </motion.p>

              {/* Enhanced Quote Block */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <QuoteBlock
                  quote="Creating powerful prompts might seem simple on the surface—but it's not. Behind every effective result are countless iterations, experiments, and a lot of patience. This process is as much about refining your thinking as it is about refining the words themselves."
                  author="Ali Al-Zuhairi"
                  variant="default"
                />
              </motion.div>
            </div>
          </motion.header>

          {/* Statistics Dashboard */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="theme-card-content p-6 rounded-2xl text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-500 mb-2">{stats.total}</div>
              <div className="text-sm opacity-70">Total Projects</div>
            </div>
            <div className="theme-card-content p-6 rounded-2xl text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-green-500 mb-2">{stats.completed}</div>
              <div className="text-sm opacity-70">Completed</div>
            </div>
            <div className="theme-card-content p-6 rounded-2xl text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-red-500 mb-2">{stats.failed}</div>
              <div className="text-sm opacity-70">Failed</div>
            </div>
            <div className="theme-card-content p-6 rounded-2xl text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-500 mb-2">{stats.totalBugsFixed}</div>
              <div className="text-sm opacity-70">Bugs Fixed</div>
            </div>
          </motion.div>          {/* Filter Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-12 relative z-10"
          >
            <div className="theme-card-content p-6 rounded-2xl backdrop-blur-sm overflow-visible">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between overflow-visible">                {/* Category Dropdown */}
                <div className="relative dropdown-container z-[80]">
                  <button
                    onClick={() => {
                      setCategoryDropdownOpen(!categoryDropdownOpen);
                      setStatusDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 min-w-[140px] justify-between ${getDropdownButtonStyles()}`}
                  >
                    <span>Category: {selectedCategory}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {categoryDropdownOpen && (                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-2 left-0 rounded-xl shadow-2xl z-[80] min-w-[180px] overflow-hidden ${getDropdownMenuStyles()}`}
                      >                        {categories.map((category) => (
                          <motion.button
                            key={category}
                            whileHover={getDropdownHoverEffect()}
                            onClick={() => {
                              setSelectedCategory(category);
                              setCategoryDropdownOpen(false);
                            }}                            className={getDropdownItemStyles(selectedCategory === category)}
                          >
                            {category}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>                {/* Status Dropdown */}
                <div className="relative dropdown-container z-[80]">
                  <button
                    onClick={() => {
                      setStatusDropdownOpen(!statusDropdownOpen);
                      setCategoryDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 min-w-[120px] justify-between ${getDropdownButtonStyles()}`}
                  >
                    <span>Status: {selectedStatus}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${statusDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {statusDropdownOpen && (                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-2 left-0 rounded-xl shadow-2xl z-[80] min-w-[140px] overflow-hidden ${getDropdownMenuStyles()}`}
                      >                        {statuses.map((status) => (
                          <motion.button
                            key={status}
                            whileHover={getDropdownHoverEffect()}
                            onClick={() => {
                              setSelectedStatus(status);
                              setStatusDropdownOpen(false);
                            }}                            className={getStatusDropdownItemStyles(selectedStatus === status)}
                          >
                            {status}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prompts Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedStatus}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
                : "space-y-6"
              }
            >
              {filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {viewMode === 'grid' ? (
                    <EnhancedPromptCard prompt={prompt} />
                  ) : (
                    <ListPromptCard prompt={prompt} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredPrompts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="theme-card-content p-12 rounded-3xl backdrop-blur-sm max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No prompts found</h3>
                <p className="opacity-70">Try adjusting your filters to see more results.</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Enhanced Prompt Card Component with multiple design variants
type Prompt = {
  id: number;
  title: string;
  category: string;
  status: 'Done' | 'Failed';
  bugsFixed: number;
  technologies: string[];
  description: string;
  content: string;
};

function EnhancedPromptCard({ prompt }: { prompt: Prompt }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const getStatusColor = (status: string) => {
    return status === 'Done' 
      ? 'from-green-500 to-emerald-600' 
      : 'from-red-500 to-rose-600';
  };
  return (
    <div
      className="theme-card-content relative overflow-hidden rounded-3xl backdrop-blur-sm border border-white/10"
    >
      {/* Gradient Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(prompt.status)} opacity-5`}></div>
      
      {/* Floating Status Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getStatusColor(prompt.status)} shadow-lg`}>
          {prompt.status}
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-6">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                {prompt.title}
              </h3>
              <p className="text-sm opacity-70 line-clamp-2 mb-3">
                {prompt.description}
              </p>
            </div>          </div>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {prompt.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="px-2 py-1 text-xs rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
                {tech}
              </span>
            ))}
            {prompt.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-lg bg-white/10 backdrop-blur-sm">
                +{prompt.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-4 mb-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
          {prompt.bugsFixed > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">{prompt.bugsFixed}</div>
              <div className="text-xs opacity-70">Bugs Fixed</div>
            </div>
          )}
        </div>        {/* Content Preview */}
        {!isExpanded && (
          <div className="mb-4">
            <div className="text-sm opacity-60 line-clamp-3">
              {prompt.content}
            </div>
          </div>
        )}{/* Expanded Content */}
        {isExpanded && (
          <div className="mb-4 overflow-hidden">
            <div className="text-sm whitespace-pre-wrap p-4 rounded-2xl bg-white/5 backdrop-blur-sm max-h-60 overflow-y-auto">
              {prompt.content}
            </div>
          </div>
        )}        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
                        className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium shadow-lg hover:shadow-xl"
          >
            {isExpanded ? 'Show Less' : 'View Details'}
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>      </div>
    </div>
  );
}

function ListPromptCard({ prompt }: { prompt: Prompt }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    return status === 'Done' 
      ? 'from-green-500 to-emerald-600' 
      : 'from-red-500 to-rose-600';
  };
  return (
    <div
      className="theme-card-content rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* Left: Main Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold mb-2">{prompt.title}</h3>
                <p className="text-sm opacity-70 mb-3">{prompt.description}</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getStatusColor(prompt.status)} shadow-lg shrink-0 ml-4`}>
                {prompt.status}
              </div>            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {prompt.technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 text-xs rounded-md bg-white/10 backdrop-blur-sm">
                  {tech}
                </span>
              ))}
            </div>            {/* Content Preview/Full */}
            <div className="text-sm opacity-60">
              <div className={isExpanded ? 'whitespace-pre-wrap' : 'line-clamp-2'}>
                {prompt.content}
              </div>
            </div>
          </div>
        </div>        {/* Expand Button */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            {isExpanded ? '↑ Show Less' : '↓ Show More'}
          </button>        </div>
      </div>
    </div>
  );
}
