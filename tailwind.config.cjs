/* eslint-disable @typescript-eslint/no-var-requires */
const { tailwindcssOriginSafelist } = require('@headlessui-float/react')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  safelist: [...tailwindcssOriginSafelist],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss'),
  ],
}
