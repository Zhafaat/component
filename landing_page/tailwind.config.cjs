/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#EE9789'
      }
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif']
    },
    // fontSize: {
    //   'sm': '14px',
    //   'base': '16px', 
    //   'lg': '18px',
    //   'xl': '20px',
    //   '2xl': '24px',
    // }
  },
  plugins: [],
}
