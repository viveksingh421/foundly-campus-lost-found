/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#0B0F19',
          900: '#111827',
          850: '#161F33',
          800: '#1F2937',
          700: '#374151',
          600: '#4B5563',
          500: '#6B7280',
          400: '#9CA3AF',
        },
        lime: {
          DEFAULT: '#C7F36B',
          hover: '#B5E655',
          light: '#E6FBBE',
          dim: 'rgba(199, 243, 107, 0.12)',
          border: 'rgba(199, 243, 107, 0.28)',
        },
        warm: {
          50: '#FDFEFC',
          100: '#F8FAF5',
          200: '#F0F4EB',
          300: '#E2E8DC',
          400: '#CBD5C0',
        },
        found: {
          badge: '#10B981',
          bg: 'rgba(16, 185, 129, 0.1)',
          border: 'rgba(16, 185, 129, 0.25)',
        },
        lost: {
          badge: '#F59E0B',
          bg: 'rgba(245, 158, 11, 0.1)',
          border: 'rgba(245, 158, 11, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(17, 24, 39, 0.05), 0 2px 4px -2px rgba(17, 24, 39, 0.05)',
        'elevated': '0 10px 15px -3px rgba(17, 24, 39, 0.08), 0 4px 6px -4px rgba(17, 24, 39, 0.04)',
        'lime-glow': '0 0 20px -3px rgba(199, 243, 107, 0.35)',
      }
    },
  },
  plugins: [],
}
