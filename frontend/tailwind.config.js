/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				text: "#f5f5f5",
				background: "#050505",
				primary: "#b32100",
				secondary: "#1a1a19",
				accent: "#ff542e",
			},
		},
	},
	plugins: [],
};
