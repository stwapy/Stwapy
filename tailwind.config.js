/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        stwapy: {
          purple: '#5423A5',
          purpleDark: '#35105F',
          purpleDeep: '#24113F',
          purpleLight: '#F1EAFE',
          purpleHover: '#451B88',
          orange: '#FF7900',
          orangeDark: '#D96500',
          orangeLight: '#FFF0E2',
          orangeHover: '#E56C00',
          charcoal: '#222222',
          lightGray: '#F5F5F7',
          borderGray: '#E5E7EB',
        },
        brand: {
          50: '#F1EAFE',
          100: '#E4D5FD',
          200: '#C9ABFA',
          300: '#A778F6',
          400: '#8746EE',
          500: '#6B2CE0',
          600: '#5423A5', // Stwapy Purple Primary
          700: '#451B88',
          800: '#35105F', // Stwapy Purple Dark
          900: '#24113F', // Stwapy Purple Deep
          950: '#160829',
        },
        accent: {
          50: '#FFF7ED',
          100: '#FFF0E2', // Stwapy Orange Light
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF7900', // Stwapy Orange Primary
          600: '#D96500', // Stwapy Orange Dark
          700: '#B85000',
          800: '#943E00',
          900: '#783200',
        },
        odisha: {
          emerald: '#15803D',
          amber: '#FF7900',
          coral: '#DC2626',
        },
      },
    },
  },
  plugins: [],
};
