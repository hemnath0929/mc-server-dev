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
        pixel: ['"Press Start 2P"', 'monospace'],
        silkscreen: ['"Silkscreen"', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(34, 197, 94, 0.35)',
        'glow-emerald-lg': '0 0 45px -10px rgba(34, 197, 94, 0.5)',
        'glow-diamond': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-portal': '0 0 30px -5px rgba(168, 85, 247, 0.35)',
        'glow-redstone': '0 0 25px -5px rgba(239, 68, 68, 0.35)',
        'mc-bevel': 'inset 2px 2px 0px rgba(255,255,255,0.08), inset -2px -2px 0px rgba(0,0,0,0.5)',
        'mc-card': '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(34, 197, 94, 0.12) 1px, transparent 1px)",
        'pixel-dots': "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
