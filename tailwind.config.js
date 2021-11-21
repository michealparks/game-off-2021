module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
