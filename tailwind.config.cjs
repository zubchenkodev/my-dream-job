/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      
    },
    extend: {
      colors: {
        creativity: '#c3b2e7',
        creativityDark: '#52225e',
        passion: '#f682a5',
        passionDark: '#58061f',
        balance: '#c9da8f',
        balanceDark: '#1c471f',
        joy: '#fedf6f',
        joyDark: '#4a411e',
        warmth: '#f9a474',
        warmthDark: '#582614',
        heart: '#b8cedc',
        heartDark: '#184363',
        energy: '#f36464',
        energyDark: '#4f1316',
        blackSilent: '#333',
        text30: '#9d9d9d',
        text20: '#ebebeb',
        text40: '#333',
        text10: '#ffffff',
        bgLight: '#f1f2f6',
        bgWhite: '#ffffff',
        bgInput: '#f1f2f6',
        fontDark: '#132968',
        fontLight: '#a1a9c3',
        borderLight: '#f1f2f6',
        borderDark: '#5e90cc',
        bgButtonPrimary: '#fa6b6b',
        bgButtonPrimaryHover: '#fb8989',
        bgBadge: '#cde2f5'
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ["light"]
  },
}

