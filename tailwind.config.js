/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      scrollbar: {
        width: '8px',
      },
      borderColor: {
      highlighted: 'red',
    },
    transitionProperty: {
      border: 'border',
    }},
  },
  plugins: [require('tailwind-scrollbar')],
}
