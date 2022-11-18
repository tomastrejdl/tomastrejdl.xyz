/** @type {import("prettier").Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  htmlWhitespaceSensitivity: 'ignore',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}
