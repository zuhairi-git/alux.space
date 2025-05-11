module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        roboto: ['var(--font-roboto)'],
        tajawal: ['var(--font-tajawal)'],
        arabic: ['var(--font-tajawal)'],
      },
      textDirection: {
        rtl: 'rtl',
        ltr: 'ltr',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Add RTL plugin to better handle directional utilities
    function({ addVariant }) {
      // Add rtl variant for all utilities
      addVariant('rtl', '[dir="rtl"] &');
      addVariant('ltr', '[dir="ltr"] &');
    },
  ],
};