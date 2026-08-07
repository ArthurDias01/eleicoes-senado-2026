/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // Avoid lightningcss optimize path under Turbopack native resolution.
      optimize: false,
    },
  },
};

export default config;
