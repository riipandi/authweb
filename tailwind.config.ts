import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ['./server/**/*.{ts,tsx,jsx,js,liquid}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [...fontFamily.sans],
        mono: [...fontFamily.mono],
      },
      colors: {
        gray: colors.slate,
      },
    },
  },
  plugins: [],
} satisfies Config
