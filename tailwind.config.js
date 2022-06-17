module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      colors: {
        primary: "#312A68",
        notprimary: "#E31E24",
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
