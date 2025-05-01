module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        roboto: ['var(--font-roboto)'],
      },
      textDirection: {
        rtl: 'rtl',
        ltr: 'ltr',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};