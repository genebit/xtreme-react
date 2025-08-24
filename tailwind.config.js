import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-",
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.tsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
        "big-shot": ["Bigshot One", "cursive"],
      },
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
      },
      scale: {
        80: ".8",
        85: ".85",
        96: ".96",
        97: ".97",
        98: ".98",
        99: ".99",
        101: "1.01",
        102: "1.02",
        103: "1.03",
        104: "1.04",
      },
      zIndex: {
        1000: "1000",
        2000: "1000",
        3000: "3000",
        4000: "4000",
        5000: "5000",
        10000: "10000",
        10001: "10001",
        10002: "10002",
        10003: "10003",
      },
    },
  },

  plugins: [forms],
};
