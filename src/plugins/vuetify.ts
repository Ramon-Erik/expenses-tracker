// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";

const darkTheme = {
  dark: true,
  colors: {
    background: "#1b232f",
    surface: "#222a34",

    primary: "#238636",
  },
};

const light = {
  dark: false,
  colors: {
    background: "#f0f0f0",
    surface: "#e6e6e6",
  },
};

export default createVuetify({
  components: {
    VDateInput,
  },
  theme: {
    defaultTheme: "darkTheme",
    themes: {
      darkTheme,
      light,
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
