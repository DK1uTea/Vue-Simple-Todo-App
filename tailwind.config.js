/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flickerPulse: {
          '0%, 19.999%, 22%, 62.999%, 64%, 100%': {
            opacity: 1,
            transform: 'scale(1)',
            color: '#ef4444', // đỏ
          },
          '20%, 21.999%, 63%, 63.999%': {
            opacity: 0,
            transform: 'scale(1.3)',
            color: '#facc15', // vàng
          },
          '50%': {
            opacity: 1,
            transform: 'scale(1.2)',
            color: '#22d3ee', // xanh ngọc
          },
        },
      },
      animation: {
        flickerPulse: 'flickerPulse 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
