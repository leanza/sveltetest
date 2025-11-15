// Load PostCSS plugins only if available so the dev server doesn't fail
// when tailwindcss isn't installed (we may be using the CDN for quick preview).
const plugins = [];
try {
  // require tailwindcss if installed
  const tailwind = require('tailwindcss');
  plugins.push(tailwind());
} catch (e) {}
try {
  const autoprefixer = require('autoprefixer');
  plugins.push(autoprefixer());
} catch (e) {}

module.exports = { plugins };
