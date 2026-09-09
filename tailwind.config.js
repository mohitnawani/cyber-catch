/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // === Figma Palette - Default Colors ===
        danger: '#BF0606',
        sky: '#00B7FF',
        success: '#02A64D',
        brand: '#3939FF',
        navy: '#0F2940',
        'gray-mid': '#999999',
        'gray-light': '#EEEEEE',
        'white-pure': '#FFFFFF',
        // Semantic aliases
        background: '#FFFFFF',
        foreground: '#0F2940',
        card: '#FFFFFF',
        border: '#EEEEEE',
        primary: '#3939FF',
        'primary-hover': '#2D2DCC',
        secondary: '#0F2940',
        muted: '#999999',
        accent: '#00B7FF',
        'success-base': '#02A64D',
        'danger-base': '#BF0606',
      },
      fontFamily: {
        sans: ['Montserrat', 'Proxima Nova', 'D-DIN', 'Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        proxima: ['Proxima Nova', 'Montserrat', 'sans-serif'],
        ddin: ['D-DIN', 'DIN Alternate', 'Montserrat', 'sans-serif'],
      },
      fontSize: {
        xs: ["14px", { lineHeight: "20px" }],
        sm: ["16px", { lineHeight: "24px" }],
        base: ["18px", { lineHeight: "28px" }],
        lg: ["20px", { lineHeight: "32px" }],
        xl: ["22px", { lineHeight: "32px" }],
        "2xl": ["26px", { lineHeight: "36px" }],
        "3xl": ["32px", { lineHeight: "40px" }],
        "4xl": ["38px", { lineHeight: "44px" }],
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
    },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': { colorScheme: 'light' },
        body: {
          backgroundColor: theme('colors.white-pure'),
          color: theme('colors.navy'),
          fontFamily: theme('fontFamily.sans').join(', '),
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      })
    },
  ],
}
