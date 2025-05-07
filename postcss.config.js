module.exports = {
  plugins: [
    require('postcss-nesting'), // 👈 Add this BEFORE Tailwind
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
