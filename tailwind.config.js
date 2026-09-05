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
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "26px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
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
