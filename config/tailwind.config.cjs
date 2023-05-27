/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1E893C',
          secondary: '#24282F',
          accent: '#338AF5',
          neutral: '#1E893C',
          'base-100': '#FFFEFE',
          info: '#3ABFF8',
          success: '#1A7E36',
          warning: '#9A6601',
          error: '#D0242E'
        }
      }
    ]
  },
  plugins: [require('daisyui'), require('@tailwindcss/container-queries')]
};
