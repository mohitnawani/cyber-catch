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
          xs: ["12px", { lineHeight: "18px" }],
          sm: ["14px", { lineHeight: "22px" }],
          base: ["16px", { lineHeight: "26px" }],
          lg: ["18px", { lineHeight: "30px" }],
          xl: ["20px", { lineHeight: "30px" }],
          "2xl": ["24px", { lineHeight: "34px" }],
          "3xl": ["30px", { lineHeight: "38px" }],
          "4xl": ["36px", { lineHeight: "42px" }],
        },
      spacing: {
        1: '0.375rem',   // 6px
        2: '0.875rem',   // 14px
        3: '1.375rem',   // 22px
        4: '1.875rem',   // 30px
        5: '2.375rem',    // 38px
        6: '2.875rem',    // 46px
        7: '3.375rem',    // 54px
        8: '3.875rem',    // 62px
        9: '4.375rem',    // 70px
        10: '4.875rem',   // 78px
        11: '5.375rem',   // 86px
        12: '5.875rem',   // 94px
        14: '6.875rem',   // 110px
        16: '7.875rem',   // 126px
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
