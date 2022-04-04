module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
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
