import React from 'react';
import Navigation from '@/components/Navigation';

export default function PromptPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">Project Prompts</h1>
          <p className="text-xl max-w-3xl mx-auto">
            A collection of development tasks and their implementation status.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PromptCard 
            status="Done" 
            bugsFixed={3}
            content={`Create a comprehensive modernization plan for my React website using the latest Tailwind CSS practices and modern web design principles. The website consists of: 1. Introduction/Home Page: Implement a visually striking hero section with smooth animations, dynamic typography, gradient effects, and modern UI components. Include interactive elements, micro-interactions, and a responsive navbar with glass-morphism effects. 2. Blog Page: Design a modern blog layout with card-based content presentation, skeleton loading states, infinite scroll functionality, category filtering, and reading time estimates. Implement dark mode toggle and responsive grid layouts using Tailwind CSS Grid and Flexbox. 3. Portfolio Case Studies (2 entries): Create an immersive case study layout with parallax scrolling effects, interactive image galleries, progress indicators, and animated transitions between sections. Include hover effects, modern typography hierarchies, and clear call-to-action elements. Global Improvements: - Implement latest Tailwind CSS features including JIT compiler - Add smooth page transitions and loading states - Ensure responsive design across all device sizes - Include modern accessibility features - Optimize performance with lazy loading - Use modern color schemes and gradients - Implement container queries and fluid typography - Add subtle micro-animations and hover effects - Ensure consistent spacing using Tailwind's spacing system - Include modern scrolling experiences and animations Please. Follow this documentation of the tailwind: https://tailwindcss.com/plus/ui-blocks/documentation`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed={5}
            content={`Task Breakdown:
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
#fetch: https://cvlanes.com/blogs/circle-of-rhythm`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed="None"
            content={`Add Fonts using google fonts web:
Headings
• Poppins is better for headings.
It has geometric, rounded letters that give your site a bold, friendly, and modern personality. Great for grabbing attention.
Body Text
• Roboto is better for body text.
It was designed for readability on screens, with a clean, neutral, and highly legible look even at small sizes.`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed={7}
            content={`Use Tailwind CSS best practices and follow the UI Blocks documentation:
#fetch: https://tailwindcss.com/plus/ui-blocks/documentation

Build a slick, modern portfolio section with smooth animations and transitions.
Replace my portfolio content with the following from the below sources:
#fetch: https://cvlanes.com/portfolio/collaboration
#fetch: https://cvlanes.com/portfolio/jobseeking`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed={2}
            content={`Unsplash.com integration
Integrate with unsplash and use proper images for my portfolio
Use best integration practices from #fetch https://unsplash.com/documentation`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed={1}
            content={`Hero Section (Based on Adham Dannaway's Site):
• Fetch the hero effect from  #fetch https://www.adhamdannaway.com.
• Use the image located at images/hero for the hero background.`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed={4}
            content={`Create a stunning and futuristic hero section that feels both unique and exceptional. Use animated Google Material Icons in the background to visually express the transformation of design into code. Take inspiration from Apple Vision Pro—craft something that feels ahead of its time.`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed={6}
            content={`Decouple the hero section from the homepage and make it dynamic, allowing it to be easily swapped based on different occasions or contexts. Integrate this flexibility into the homepage by providing an option to choose between multiple hero section variations. This approach simplifies the design process and enhances adaptability.`}
          />

          <PromptCard 
            status="Failed" 
            bugsFixed="None"
            content={`Rebuild my portfolio content using all the material from the sources provided below. Each portfolio entry should include the full content from its respective source, showcasing the complete design process, key decisions, and case studies. Incorporate the provided images as representations of the final website or product interface.
urls:
#fetch: https://cvlanes.com/portfolio/collaboration
#fetch: https://cvlanes.com/portfolio/jobseeking`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed={9}
            content={`Rebuild my collaboration content using all the material from the content provided below. Each portfolio entry should include the full content from its respective source, showcasing the complete process. 
Remember this is case study or user journey of a future product design that offers an insight into a possible solution.
Use tailwind best practice: #fetch: https://tailwindcss.com/plus/ui-blocks/documentation`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed={3}
            content={`// In the navigation bar when clicked on the "Portfolio" it should go to the list of portfolios

// Rebuild my jobseeking content using all the material from the content provided below. Each portfolio entry should include the full content from its respective source, showcasing the complete process. 
Remember this is case study or user journey of a future product design that offers an insight into a possible solution.
Use tailwind best practice: #fetch: https://tailwindcss.com/plus/ui-blocks/documentation`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed={8}
            content={`// In the navigation bar when clicked on the "Portfolio" it should go to the list of portfolios
// Make the navigation bar responsive using CSS/JavaScript. Use tailwind best practices #fetch: https://tailwindcss.com/plus/ui-blocks/documentation
// Add a dropdown menu to the "Portfolio" navigation item that displays a list of available portfolios when clicked.`}
          />

          <PromptCard 
            status="Done" 
            bugsFixed={5}
            content={`Website global Theme Switcher (Light/Dark/Colorful):
// Use tailwind best practices @https://tailwindcss.com/plus/ui-blocks/documentation
// consider compatibility with the current version of next.js 
// the theme function should be simple just on the cache level
// Implement a theme switcher in the navbar and navbar menu for mobile that allows the user to toggle between dark, light, and colorful themes.
// colorful theme is the default and the current implemented one is the colorful
// Light Theme: A design or user interface (UI) that uses light backgrounds (typically white or light colors) with dark text and elements. It's generally perceived as cleaner, easier to read in well-lit environments, and less straining on the eyes for many users.
// Dark Theme: A design or UI that uses dark backgrounds (typically black or dark gray) with light text and elements. It's popular in low-light settings, reduces eye strain in dark environments, and can improve battery life on OLED screens.
// when I click on each option, it should trigger the proper style`}
          />

          <PromptCard 
            status="Done" 
            content={`Mobile-Friendly:
// Ensure that the website is responsive and works smoothly on all devices (desktops, tablets, and mobile).
// Ensure the mobile navigation bar has a proper background color for better visibility.
// Style the dropdown menu under "Portfolio" to have a visible background when hovered over.

// Tapping on the Portfolio should redirect you to the portfolio list.
// On mobile, the menu background color should match the desktop version for better clarity and visibility.`}
          />

          <PromptCard 
            status="Done" 
            content={`Light Theme Styling Instructions:
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
• need the theme icons to have hover tooltips`}
          />

          <PromptCard 
            status="Done" 
            content={`UI Prompt Instructions:
1. Tooltips Behavior:
Tooltips must be aware of screen boundaries. They should dynamically reposition to remain fully visible within the viewport.
2. Hero Section Styling:
In light theme, the hero section should have a lighter visual appearance — softer background and minimal contrast to blend smoothly with the overall theme.
3. Navigation Bar (Light Theme):
In the light version, the navigation/header bar should use darker text and icons to ensure clarity and sufficient contrast against the light background.`}
          />

          <PromptCard 
            status="Done" 
            content={`Blog Section Prompt Instructions:
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
  ○ Update it to use a very light gradient, staying consistent with the light theme aesthetic.`}
          />

          <PromptCard 
            status="Done" 
            content={`Header & Blog Post Prompt Instructions:
1. Header Interaction – Portfolio Menu:
  ○ The hover effect that triggers the portfolio menu should only activate when hovering directly over the portfolio area in the header — not when hovering elsewhere.
2. Author Image in Posts:
  ○ Add the following image as the author avatar in blog posts:
images/me/ali.png
  ○ Set the image dimensions to 80px by 80px.
3. Post Background – Light Theme Only:
  ○ In the light theme, update the blog post background to be noticeably lighter for improved visual consistency.`}
          />

          <PromptCard 
            status="Done" 
            content={`Colorful Theme Prompt Instructions:
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
  ○ In other themes, use a more neutral or theme-consistent variant.`}
          />

          <PromptCard 
            status="Done" 
            content={`Process Sections – Card Style Prompt Instructions:
• Update the sections: Research Insights, User Personas, Product Requirements, User Testing, and Delivery Phase to use a new flexible card style, consistent with the design used in the Design Process section.
• Maintain the existing animations—they should remain unchanged.
• The new card layout should:
  ○ Wrap text naturally
  ○ Adapt in height based on content
  ○ Avoid enforcing a fixed height across cards to ensure a more fluid and readable layout.
  ○ Do not make the height 100%`}
          />
        </div>
      </div>
    </div>
  );
}

type PromptCardProps = {
  status: 'Done' | 'Failed';
  content: string;
  bugsFixed?: number | 'None';
};

function PromptCard({ status, content, bugsFixed = 'None' }: PromptCardProps) {
  return (
    <div className="theme-card-content p-6 relative z-10 transition-all duration-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full">
      <div className="flex flex-col mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {content.split('\n')[0].replace(/[•○]/g, '').substring(0, 60)}
            {content.split('\n')[0].length > 60 ? '...' : ''}
          </h3>
          <div 
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              status === 'Done' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}
          >
            {status}
          </div>
        </div>
        
        <div className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 self-start mb-4">
          Bugs Fixed: {bugsFixed}
        </div>
      </div>
      
      <div className="whitespace-pre-wrap text-gray-600 text-sm">
        {content}
      </div>
    </div>
  );
} 