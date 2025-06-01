# Design System Foundation Export Guide

This guide provides everything you need to apply the design system foundation to your other Next.js projects.

## Quick Start (5-minute setup)

### 1. Install Required Dependencies

In your other Next.js project, install these dependencies:

```bash
npm install tailwindcss @tailwindcss/postcss postcss autoprefixer
npm install @headlessui/react @heroicons/react
npm install framer-motion
```

### 2. Copy Design System Files

Copy these files from the `foundation-export` folder to your project:

1. **tailwind.config.js** → Copy to your project root
2. **globals.css** → Copy content to your `app/globals.css` or `styles/globals.css`
3. **design-tokens.js** → Copy to your project (optional, for programmatic access)

### 3. Configure PostCSS

Create or update `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4. Update Your Layout

Make sure your main layout imports the global CSS:

```tsx
// app/layout.tsx or _app.tsx
import './globals.css'
```

## Color Palette Reference

### Primary Colors (Main brand color - Teal/Cyan)
- `primary-50` to `primary-950` - Light to dark variants
- Use for: Primary buttons, links, focused states
- Example: `bg-primary-500`, `text-primary-700`, `border-primary-300`

### Accent Colors (Secondary brand color - Orange/Red)
- `accent-50` to `accent-950` - Light to dark variants  
- Use for: Call-to-action buttons, highlights, important elements
- Example: `bg-accent-500`, `text-accent-600`, `hover:bg-accent-700`

### Neutral Colors (Grays)
- `neutral-50` to `neutral-950` - Light to dark grays
- Use for: Text, borders, backgrounds, subtle elements
- Example: `bg-neutral-100`, `text-neutral-700`, `border-neutral-300`

### Semantic Colors
- **Success**: `success-50` to `success-950` (Green)
- **Warning**: `warning-50` to `warning-950` (Yellow/Orange)
- **Error**: `error-50` to `error-950` (Red/Pink)

## Component Patterns

### Buttons

```tsx
// Primary button
<button className="btn btn-primary">
  Primary Action
</button>

// Secondary button
<button className="btn btn-secondary">
  Secondary Action
</button>

// Accent button
<button className="btn btn-accent">
  Important Action
</button>

// Custom button with Tailwind classes
<button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200">
  Custom Button
</button>
```

### Cards

```tsx
// Basic card
<div className="card card-hover card-dark p-6">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-neutral-600">Card content goes here.</p>
</div>

// Custom card with Tailwind classes
<div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-neutral-600 dark:text-neutral-300">Card content goes here.</p>
</div>
```

### Typography

```tsx
// Headings with gradient
<h1 className="text-4xl font-bold text-gradient">
  Gradient Heading
</h1>

// Regular headings
<h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
  Main Heading
</h1>

<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
  Section Heading
</h2>

// Body text
<p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
  Body text content with good readability.
</p>
```

### Layouts

```tsx
// Container with responsive padding
<div className="container-custom">
  <div className="py-12">
    {/* Your content */}
  </div>
</div>

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>

// Flexbox layouts
<div className="flex flex-col lg:flex-row gap-8">
  <div className="flex-1">Main content</div>
  <div className="lg:w-80">Sidebar</div>
</div>
```

## Dark Mode Support

The design system includes full dark mode support. To implement:

### 1. Add Dark Mode Toggle

```tsx
'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}
```

### 2. Use Dark Mode Classes

```tsx
<div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
  Content that adapts to dark mode
</div>
```

## Animations

The design system includes pre-built animations:

```tsx
// Fade in animation
<div className="animate-fade-in">
  Content that fades in
</div>

// Slide up animation
<div className="animate-slide-up">
  Content that slides up
</div>

// Scale in animation
<div className="animate-scale-in">
  Content that scales in
</div>

// Hover lift effect
<div className="hover:animate-hover-lift transition-transform">
  Content that lifts on hover
</div>
```

## Accessibility Features

The design system prioritizes accessibility:

```tsx
// Focus-visible styles
<button className="focus-visible">
  Accessible button with proper focus styles
</button>

// Proper color contrast
<p className="text-neutral-700 dark:text-neutral-300">
  Text with proper contrast in both light and dark modes
</p>

// Screen reader friendly
<button 
  className="btn btn-primary"
  aria-label="Save your changes"
>
  Save
</button>
```

## Responsive Design

Use these breakpoints consistently:

- **sm**: 640px and up (mobile landscape)
- **md**: 768px and up (tablet)
- **lg**: 1024px and up (desktop)
- **xl**: 1280px and up (large desktop)

```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text sizing
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  Responsive grid
</div>
```

## Integration with Headless UI

For interactive components, use Headless UI with these design tokens:

```tsx
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ isOpen, onClose, children }) {
  return (
    <Transition show={isOpen}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="card max-w-md w-full p-6">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
```

## Tips for Consistency

1. **Use semantic naming**: Always use `primary`, `accent`, `neutral` instead of specific color names
2. **Stick to the spacing scale**: Use the predefined spacing values (4, 6, 8, 12, etc.)
3. **Follow the typography hierarchy**: Use consistent font sizes and weights
4. **Test in both light and dark modes**: Always verify your components work in both themes
5. **Use the animation classes**: Apply the pre-built animations for consistent motion

## Getting More Components

If you need more complex components from this design system:

1. Check the `src/components/` folder in this repository
2. Copy individual component files to your project
3. Ensure you have the required dependencies installed
4. Adapt the import paths as needed

## Troubleshooting

### Colors not showing up
- Make sure you copied the Tailwind config correctly
- Verify Tailwind is processing your CSS files
- Check that the content paths in tailwind.config.js match your project structure

### Dark mode not working
- Ensure you have the `dark` class toggle functionality
- Check that you're using `dark:` prefixes in your classes
- Verify the CSS custom properties are loaded

### Animations not working
- Make sure you copied the keyframes from the Tailwind config
- Check that you're using the correct animation class names
- Verify Tailwind is including the animation utilities

---

This design system foundation provides a solid base for maintaining design consistency across your projects. The modular approach allows you to adopt as much or as little as needed while maintaining the core design language.
