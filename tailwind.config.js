/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'gold-primary': '#D4AF37',
                'gold-light': '#FFD700',
                'gold-dark': '#AA8C2C',
                'black-main': '#0a0a0a',
                'black-soft': '#121212',
            },
            fontFamily: {
                heading: ['Cinzel', 'serif'],
                body: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
