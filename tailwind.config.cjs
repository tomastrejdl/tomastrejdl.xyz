/* eslint-disable @typescript-eslint/no-var-requires */
const { tailwindcssOriginSafelist } = require('@headlessui-float/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  safelist: [...tailwindcssOriginSafelist],
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' }, // => @media  print { ... }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss'),
  ],
}
