 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
      },
    }
    
  },
  plugins: [],
}