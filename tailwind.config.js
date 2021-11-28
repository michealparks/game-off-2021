module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.5rem',
      },
      animation: {
        expand: 'expand var(--expand-speed) linear infinite',
      },
      keyframes: {
        expand: {
          '0%': { transform: 'scale(0, 1)' },
          '100%': { transform: 'scale(1, 1)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
