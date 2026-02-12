// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // APC Brand Colors from Logo
//         emerald: {
//           50: '#f0fdf4',
//           100: '#dcfce7',
//           700: '#00A651',  // APC Green (primary)
//           800: '#008A44',  // Darker green
//           900: '#006F37',  // Darkest green
//         },
//         amber: {
//           50: '#FFF8E1',   // Light cream background
//           100: '#FFECB3',
//           400: '#D4A574',  // APC Gold/Broom color (accent)
//           500: '#C69963',
//         },
//         red: {
//           600: '#E30613',  // APC Red
//           700: '#C10511',  // Darker red
//         },
//         sky: {
//           400: '#4FC3F7',  // APC Sky Blue
//           500: '#29B6F6',
//           600: '#039BE5',
//         },
//       },
//       fontFamily: {
//         sans: ['DM Sans', 'sans-serif'],
//         impact: ['Impact', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // APC Brand Colors mapped to your existing keys
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          700: '#008A44',  // True APC Green
          800: '#007539',  // Slightly darker for hover states
          900: '#005E2E',  // Deep green
        },
        amber: {
          50: '#FFF8E1',
          100: '#FFECB3',
          400: '#D4A574',  // Authentic Broom/Gold
          500: '#B88B58',  // Darker shade for contrast
        },
        red: {
          600: '#ED1C24',  // Official APC Red (Primary)
          700: '#C10511',  // Deep Red
        },
        sky: {
          400: '#3BB9EB',  // True APC Sky Blue
          500: '#1DA1D8',
          600: '#039BE5',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        impact: ['Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}