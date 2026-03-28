module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      // Custom CSS variables integration
      colors: {
        // Primary theme colors
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          glow: 'var(--primary-glow)',
        },
        // Background colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Gradient colors used throughout the site
        gradient: {
          start: 'var(--gradient-start)',
          mid: 'var(--gradient-mid)',
          end: 'var(--gradient-end)',
        },
        // Card colors
        card: {
          from: 'var(--card-from-bg)',
          to: 'var(--card-to-bg)',
          border: 'var(--card-border)',
          'border-hover': 'var(--card-border-hover)',
          shadow: 'var(--card-shadow-color)',
        },
        // Scrollbar colors
        scrollbar: {
          thumb: 'var(--scrollbar-thumb)',
          'thumb-hover': 'var(--scrollbar-thumb-hover)',
        },
        // Navigation colors (from tokens.css)
        nav: {
          bg: 'var(--nav-bg)',
          border: 'var(--nav-border)',
        },
        // ── Design System Semantic Tokens ─────────────────────────────
        'ds-success':       'rgb(var(--color-success-rgb) / <alpha-value>)',
        'ds-success-bg':    'var(--color-success-bg)',
        'ds-success-border':'var(--color-success-border)',
        'ds-warning':       'rgb(var(--color-warning-rgb) / <alpha-value>)',
        'ds-warning-bg':    'var(--color-warning-bg)',
        'ds-warning-border':'var(--color-warning-border)',
        'ds-error':         'rgb(var(--color-error-rgb) / <alpha-value>)',
        'ds-error-bg':      'var(--color-error-bg)',
        'ds-error-border':  'var(--color-error-border)',
        'ds-info':          'rgb(var(--color-info-rgb) / <alpha-value>)',
        'ds-info-bg':       'var(--color-info-bg)',
        'ds-info-border':   'var(--color-info-border)',
        'ds-ember':         'rgb(var(--color-ember-rgb) / <alpha-value>)',
        'ds-ember-dark':    'rgb(var(--color-ember-dark-rgb) / <alpha-value>)',
        'ds-ember-light':   'rgb(var(--color-ember-light-rgb) / <alpha-value>)',
        'ds-dark-1':        'var(--color-dark-1)',
        'ds-dark-2':        'var(--color-dark-2)',
        'ds-dark-3':        'var(--color-dark-3)',
        // ── Design System Palette ─────────────────────────────────────
        'ds-blue': {
          50:  'var(--color-blue-50)',
          100: 'var(--color-blue-100)',
          200: 'var(--color-blue-200)',
          300: 'var(--color-blue-300)',
          400: 'var(--color-blue-400)',
          500: 'var(--color-blue-500)',
          600: 'var(--color-blue-600)',
          700: 'var(--color-blue-700)',
          800: 'var(--color-blue-800)',
          900: 'var(--color-blue-900)',
        },
        'ds-purple': {
          300: 'var(--color-purple-300)',
          400: 'var(--color-purple-400)',
          500: 'var(--color-purple-500)',
          600: 'var(--color-purple-600)',
          700: 'var(--color-purple-700)',
          800: 'var(--color-purple-800)',
        },
        'ds-indigo': {
          400: 'var(--color-indigo-400)',
          500: 'var(--color-indigo-500)',
          600: 'var(--color-indigo-600)',
        },
        'ds-pink': {
          400: 'var(--color-pink-400)',
          500: 'var(--color-pink-500)',
        },
        'ds-fuchsia': {
          400: 'var(--color-fuchsia-400)',
          500: 'var(--color-fuchsia-500)',
          600: 'var(--color-fuchsia-600)',
        },
        'ds-cyan': {
          400: 'var(--color-cyan-400)',
          500: 'var(--color-cyan-500)',
        },
        'ds-gray': {
          50:  'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
          950: 'var(--color-gray-950)',
        },
      },
      
      // Typography
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        'material-symbols': ['var(--material-symbols)', 'sans-serif'],
      },
      
      // Font variations for Material Symbols
      fontVariationSettings: {
        'material-default': `'FILL' var(--material-symbols-fill), 'wght' var(--material-symbols-weight), 'GRAD' var(--material-symbols-grade), 'opsz' var(--material-symbols-optical-size)`,
      },
      
      // Background gradients used in hero sections and cards
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))',
        'gradient-card': 'linear-gradient(to bottom right, var(--card-from-bg), var(--card-to-bg))',
        'gradient-colorful-card': 'linear-gradient(135deg, var(--card-from-bg), var(--card-to-bg))',
        // Hero background gradients
        'gradient-hero-light': 'radial-gradient(circle at 50% 50%, rgba(219, 234, 254, 1), rgba(255, 255, 255, 0.9))',
        'gradient-hero-dark': 'radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.3), rgba(10, 10, 10, 0.95))',
        'gradient-hero-colorful': 'radial-gradient(circle at 50% 50%, rgba(128, 0, 255, 0.2), rgba(5, 0, 35, 0.95))',
        // Animated gradients
        'gradient-animated': 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        'gradient-cosmic': 'linear-gradient(135deg, #00ffff, #ff00cc, #3b82f6)',
        // Radial gradients for background effects
        'radial-blue': 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        'radial-purple': 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
        'radial-cyan': 'radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, transparent 70%)',
        'radial-pink': 'radial-gradient(circle, rgba(255, 0, 204, 0.05) 0%, transparent 70%)',
      },
      
      // Custom animations
      animation: {
        'gradient-shift': 'gradientShift 6s ease-in-out infinite',
        'gradient-fast': 'gradientShift 3s ease infinite',
        'gradient-slow': 'gradientShift 10s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'twinkle': 'twinkle 1.5s ease-in-out infinite alternate',
        'rocket-float': 'rocket-float 3s ease-in-out infinite',
        'particle-float': 'particle-float 8s ease-in-out infinite',
        'dimension-shift': 'dimension-shift 4s ease-in-out infinite',
        'cosmic-shimmer': 'shimmer 1.5s infinite',
        'subtitle-glow': 'subtitleGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      
      // Custom keyframes
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        twinkle: {
          'from': { opacity: '0.2' },
          'to': { opacity: '1' },
        },
        'rocket-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        'particle-float': {
          '0%': { transform: 'translateY(0) rotate(0deg) scale(0.8)', opacity: '0' },
          '15%': { opacity: '0.4' },
          '50%': { opacity: '1', transform: 'translateY(-50px) rotate(180deg) scale(1.2)' },
          '85%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-100px) rotate(360deg) scale(0.8)', opacity: '0' },
        },
        'dimension-shift': {
          '0%, 100%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
          '25%': { transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)' },
          '75%': { transform: 'perspective(1000px) rotateX(-2deg) rotateY(2deg)' },
        },
        subtitleGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.15))' },
          '50%': { filter: 'drop-shadow(0 4px 16px rgba(59, 130, 246, 0.25))' },
        },
      },
      
      // Box shadow configurations — values mirror tokens.css
      boxShadow: {
        'glow-sm': 'var(--shadow-glow-sm)',
        'glow': 'var(--shadow-glow)',
        'glow-lg': 'var(--shadow-glow-lg)',
        'glow-purple': 'var(--shadow-glow-purple)',
        'glow-pink': 'var(--shadow-glow-pink)',
        'glow-cyan': 'var(--shadow-glow-cyan)',
        'card-light': 'var(--shadow-card-light)',
        'card-light-hover': 'var(--shadow-card-light-hover)',
        'card-colorful': 'var(--shadow-card-colorful)',
      },
      
      // Border radius for theme consistency
      borderRadius: {
        'theme': '1rem',
        'theme-lg': '2rem',
        'theme-card': '1rem',
        'theme-colorful': '2rem',
      },
      
      // Backdrop blur values
      backdropBlur: {
        'xs': '2px',
        'theme': '4px',
        'theme-lg': '12px',
      },
      
      // Z-index scale
      zIndex: {
        'behind': '-1',
        'base': '0',
        'content': '1',
        'elevated': '10',
        'overlay': '20',
        'dropdown': '30',
        'modal': '40',
        'tooltip': '50',
      },
      
      // Spacing for consistent layouts
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      
      // Perspective for 3D effects
      perspective: {
        '500': '500px',
        '1000': '1000px',
        '1500': '1500px',
      },
      
      // Transform origin points
      transformOrigin: {
        'center-center': 'center center',
      },
      
      // Custom aspect ratios
      aspectRatio: {
        'hero': '16 / 9',
        'card': '4 / 3',
        'square': '1 / 1',
      },
      
      // Gradient color stops for complex gradients
      gradientColorStops: {
        'primary-start': 'var(--gradient-start)',
        'primary-mid': 'var(--gradient-mid)',
        'primary-end': 'var(--gradient-end)',
      },
    },
  },
  
  // Plugins
  plugins: [
    require('@tailwindcss/typography'),
    
    // Custom plugin for theme-specific utilities
    function({ addUtilities, addComponents, theme }) {
      addUtilities({
        // Material Symbols utilities
        '.material-symbols': {
          fontFamily: 'var(--material-symbols)',
          fontWeight: 'var(--material-symbols-weight)',
          fontStyle: 'normal',
          fontSize: '24px',
          lineHeight: '1',
          letterSpacing: 'normal',
          textTransform: 'none',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          wordWrap: 'normal',
          direction: 'ltr',
          fontVariationSettings: `'FILL' var(--material-symbols-fill), 'wght' var(--material-symbols-weight), 'GRAD' var(--material-symbols-grade), 'opsz' var(--material-symbols-optical-size)`,
        },
        
        // Perspective utilities
        '.perspective-500': { perspective: '500px' },
        '.perspective-1000': { perspective: '1000px' },
        '.perspective-1500': { perspective: '1500px' },
        
        // Transform style utilities
        '.transform-3d': { transformStyle: 'preserve-3d' },
        
        // Backdrop filter utilities
        '.backdrop-blur-theme': { backdropFilter: 'blur(4px)' },
        '.backdrop-blur-theme-lg': { backdropFilter: 'blur(12px)' },
        
        // Custom scrollbar utilities
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '1px',
            height: '1px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'var(--scrollbar-thumb)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'var(--scrollbar-thumb-hover)',
          },
        },
        
        // Gradient text utilities
        '.text-gradient-primary': {
          background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        
        '.text-gradient-colorful': {
          background: 'linear-gradient(135deg, #00ffff, #ff00cc, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        
        // Glow text effect
        '.text-glow': {
          textShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
        },
        
        '.text-glow-purple': {
          textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
        },
        
        '.text-glow-pink': {
          textShadow: '0 0 10px rgba(255, 0, 204, 0.5)',
        },
      });
      
      addComponents({
        // Theme card components
        '.theme-card': {
          position: 'relative',
          borderRadius: theme('borderRadius.theme'),
          padding: '2px',
          transformStyle: 'preserve-3d',
        },
        
        '.theme-card-content': {
          position: 'relative',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.3s',
          overflow: 'hidden',
          background: 'linear-gradient(to bottom right, var(--card-from-bg), var(--card-to-bg))',
          border: '1px solid var(--card-border)',
          zIndex: '1',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            borderColor: 'var(--card-border-hover)',
          },
        },
        
        '.theme-card-glow': {
          position: 'absolute',
          inset: '-1px',
          borderRadius: theme('borderRadius.theme'),
          filter: 'blur(16px)',
          transition: 'all 0.3s',
          opacity: '0.7',
          background: 'linear-gradient(to right, var(--card-shadow-color), var(--card-shadow-color))',
        },
        
        // Button components
        '.btn-primary': {
          background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: theme('borderRadius.lg'),
          fontWeight: '600',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px -10px var(--primary-glow)',
          },
        },
        
        '.btn-cosmic': {
          backgroundImage: 'linear-gradient(135deg, #00ffff, #ff00cc, #3b82f6)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 3s ease infinite',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: theme('borderRadius.full'),
          fontWeight: '500',
          border: '1px solid transparent',
          boxShadow: theme('boxShadow.lg'),
          position: 'relative',
          overflow: 'hidden',
        },
      });
    },
  ],
};