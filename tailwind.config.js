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
        1: '0.5rem',    // 8px
        2: '1rem',      // 16px
        3: '1.5rem',    // 24px
        4: '2rem',      // 32px
        5: '2.5rem',    // 40px
        6: '3rem',      // 48px
        7: '3.5rem',    // 56px
        8: '4rem',      // 64px
        9: '4.5rem',    // 72px
        10: '5rem',     // 80px
        11: '5.5rem',   // 88px
        12: '6rem',     // 96px
        14: '7rem',     // 112px
        16: '8rem',     // 128px
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
