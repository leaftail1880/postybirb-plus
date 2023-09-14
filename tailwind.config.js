/**
 * @type {import("tailwindcss").Config}
 */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  purge: [
    './src/**/*.html',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        link: '#1890ff',
        success: '#52c41a',
        warning: '#faad14',
        danger: '#f5222d',
        disabled: 'rgba(0, 0, 0, .25)',
      },
    },
    container: {
      center: true,
    },
    cursor: {
      'zoom-in': 'zoom-in',
      pointer: 'pointer',
    },
  },
  variants: {},
  plugins: [],
};
