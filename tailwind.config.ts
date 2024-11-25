import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020B1C',
        primary: '#00FF94',
        secondary: '#1A2C4D',
        accent: {
          from: '#FFB800',
          to: '#FF8A00',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        upDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        'up-down': 'upDown 3s ease-in-out infinite',
      },
      screens: {
        'xs': '360px',
        'sm': '415px',
        'md': '640px',
        'lg': '768px',
        'xl': '1024px',
      }
    },
  },
  plugins: [],
}

export default config

