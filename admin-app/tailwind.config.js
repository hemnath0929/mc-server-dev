/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mc: {
          dark: '#080B10',
          obsidian: '#0E131F',
          surface: '#141B2D',
          card: '#1A233A',
          border: '#2A3654',
          hover: '#24304D',
          emerald: '#22C55E',
          'emerald-glow': '#4ADE80',
          'emerald-dark': '#15803D',
          redstone: '#EF4444',
          diamond: '#06B6D4',
          'diamond-glow': '#67E8F9',
          gold: '#EAB308',
          portal: '#A855F7',
          'portal-glow': '#C084FC',
          lapis: '#3B82F6',
          text: '#F1F5F9',
          muted: '#94A3B8',
          subtle: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(34, 197, 94, 0.35)',
        'mc-card': '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
}
