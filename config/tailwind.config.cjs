/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          ...defaultTheme.fontFamily.sans
        ]
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: 'rgb(30,137,60)',
          'primary-content': '#1F2328',
          secondary: 'rgb(36,40,47)',
          accent: 'rgb(30,110,221)',
          neutral: '#1E893C',
          'base-100': '#FFFEFE',
          info: '#3ABFF8',
          success: '#1A7E36',
          warning: '#9A6601',
          error: '#D0242E',
          'info-content': '#656d76'
        }
      }
    ]
  },
  plugins: [require('daisyui'), require('@tailwindcss/container-queries')]
};
