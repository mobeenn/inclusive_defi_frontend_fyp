/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: ["class"],
   content: [
      "./pages/**/*.{js,jsx}",
      "./components/**/*.{js,jsx}",
      "./app/**/*.{js,jsx}",
      "./src/**/*.{js,jsx}",
   ],
   prefix: "",
   theme: {
      container: {
         center: true,
         padding: "2rem",
         screens: {
            "2xl": "1400px",
         },
      },
      extend: {
         colors: {
            accent: "#020F33",
            "accent-dark": "#020C29",
            background: "#F8F9FA",
            primary: "#2D3748",

            transparent: "transparent",
            "primary-landing": "#020F33",
            "accent-landing": "#0a0a0a",
            secondary: "#000033",
            sky: "#00C0FF",
            water: "#0082FF",
            midnight: "#121063",
            text: "#414040",
            silver: "#ecebff",
         },
         backgroundImage: {
            waves: "url('/assets/images/waves.png')",
            "btn-gradient":
               "linear-gradient(180deg, #007CFF 1.2%, #00CCFF 93.86%)",
            "notification-item":
               "linear-gradient(224.09deg, rgba(26, 23, 62, 0.45) 0%, rgba(18, 16, 48, 0.49) 98.47%)",
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         boxShadow: {
            card: "0px 3.5px 5.5px 0px #00000005",
            "card-sm": "0px 2px 5.5px 0px #00000005",
         },
         keyframes: {
            "accordion-down": {
               from: { height: "0" },
               to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
               from: { height: "var(--radix-accordion-content-height)" },
               to: { height: "0" },
            },
         },
         animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
         },
         fontFamily: {
            poppins: ["Poppins", "Arial"],
            roboto: ["Roboto", "Arial"],
         },
      },
   },
   plugins: [
      require("tailwindcss-animate"),
      require("@tailwindcss/container-queries"),
   ],
};
