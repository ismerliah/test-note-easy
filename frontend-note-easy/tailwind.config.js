/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        'A91D3A': '#A91D3A', //red
        'EEEEEE': '#EEEEEE', //white
        'C75B7A': '#C75B7A', //pink
        '151515': '#151515', //black
        'FFA823': '#FFA823', //orange
        '003285': '#003285', //blue
      },

      fontFamily: {
        agbalumo: ['Agbalumo', 'sans-serif'],
       },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    // ...
  ],
};
