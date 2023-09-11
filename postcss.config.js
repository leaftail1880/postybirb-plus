import tailwindConfig from './tailwind.config.js';
export default {
  plugins: [tailwindcss('./tailwind.config.js'), require('autoprefixer')],
};

