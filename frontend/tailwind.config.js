/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { dark: '#0a192f', navy: '#0f2b48' },
        brand: { DEFAULT: '#0066cc', hover: '#0052a3' },
        accent: { DEFAULT: '#00a8e8', light: '#e6f4fe' },
        surface: { slate: '#f8fafc', subtle: '#f1f5f9' },
        ink: { DEFAULT: '#1e293b', muted: '#64748b' },
        line: '#e2e8f0',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      screens: {
        // Original template switches to the mobile nav at 1120px
        nav: '1121px',
      },
      maxWidth: { container: '1220px' },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
        'card-hover': '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
        glass: '0 8px 32px -8px rgba(10,25,47,0.12)',
        'btn-brand': '0 4px 14px rgba(0,102,204,0.35)',
        'btn-brand-hover': '0 6px 20px rgba(0,102,204,0.45)',
      },
    },
  },
  // Hover styles only on devices that can hover (no sticky hover after a tap on phones)
  future: { hoverOnlyWhenSupported: true },
  plugins: [],
};
