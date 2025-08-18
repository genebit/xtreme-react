import { Notyf } from "notyf";

const notyf = new Notyf({
  duration: 3000,
  dismissible: true,
  position: {
    x: "right",
    y: "top",
  },
});

export { notyf };
