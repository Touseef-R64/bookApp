/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'main': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'
        
      },
      colors: {
        'main': {
          200: '#B3C100',
          100: '#6AB187'
        },
        'secondary': {
          200: '#23282D',
          100: '#1F3F49',
          50: '#4CB5F5'
        },
        nuetral: {
          100: '#CED2CC'
        },
        success: {
          100: '#71da79'
        },
        error: {
          100: '#D32D41'
        }

      }
    },
  },
  plugins: [],
}
