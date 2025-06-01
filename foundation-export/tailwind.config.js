/**
 * Tailwind CSS Configuration for Design System
 * Copy this configuration to your other Next.js projects
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#eefbfd',
          '100': '#d5f4f8',
          '200': '#b0e8f1',
          '300': '#79d6e7',
          '400': '#3fbcd5',
          '500': '#209fba',
          '600': '#16809d',
          '700': '#1e6880',
          '800': '#215669',
          '900': '#204859',
          '950': '#102e3c',
        },
        accent: {
          '50': '#fff4ed',
          '100': '#ffe5d4',
          '200': '#ffc8a8',
          '300': '#ffa171',
          '400': '#ff6429',
          '500': '#fe4911',
          '600': '#ef2107',
          '700': '#c61e08',
          '800': '#9d1a0f',
          '900': '#7e1910',
          '950': '#440806',
        },
        neutral: {
          '50': '#f9fafa',
          '100': '#f3f4f4',
          '200': '#e6e7e8',
          '300': '#d1d5d6',
          '400': '#b5bbbd',
          '500': '#9ba2a4',
          '600': '#787f81',
          '700': '#61686a',
          '800': '#515557',
          '900': '#45484a',
          '950': '#272a2b',
        },
        success: {
          '50': '#f5faf3',
          '100': '#e8f4e4',
          '200': '#cfe9c9',
          '300': '#a9d69f',
          '400': '#69b259',
          '500': '#579f48',
          '600': '#448237',
          '700': '#38672e',
          '800': '#305229',
          '900': '#284423',
          '950': '#11240f',
        },
        warning: {
          '50': '#fffae9',
          '100': '#fef2c7',
          '200': '#fde38a',
          '300': '#fcce4d',
          '400': '#fbb924',
          '500': '#f5980b',
          '600': '#d97106',
          '700': '#b44e09',
          '800': '#923c0e',
          '900': '#78320f',
          '950': '#451803',
        },
        error: {
          '50': '#ffebed',
          '100': '#ffe4e7',
          '200': '#fecdd4',
          '300': '#fda4b2',
          '400': '#fb7189',
          '500': '#f43f63',
          '600': '#e11d4e',
          '700': '#be1241',
          '800': '#9f123d',
          '900': '#88133a',
          '950': '#4c051b',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'hover-lift': 'hoverLift 0.3s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-5px) scale(1.02)' },
        },
      },
      boxShadow: {
        'sm': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
  safelist: [
    // Headless UI data attributes
    'data-open',
    'data-closed',
    'data-hover',
    'data-focus',
    'data-active',
    'data-disabled',
    'data-checked',
    'data-selected',
    'data-enter',
    'data-leave',
    'data-autofocus'
  ]
};
