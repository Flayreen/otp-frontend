export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'F7CF14': '#F7CF14',
        '0B0B0B': '#0B0B0B',
        'AFAFAF': '#AFAFAF',
        '1E1E1E': '#1E1E1E',
        '171717': '#171717',
        '576DE0': '#576DE0',
        'D75857': '#D75857',
        '8468BD': '#8468BD',
        'B641C4': '#B641C4',
      },
      screens: {
        'sm': '375px', 
        'md': '768px',
        'in': '1040px',
        'int': '1240px',
        'lg': '1440px',
        'xl': '1280px',
        '2xl': '1536px', 
      },
    },
  },
  plugins: [],
}
