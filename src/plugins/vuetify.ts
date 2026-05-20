// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";

const darkTheme = {
  dark: true,
  colors: {
    background: "#0D1117",
    surface: "#161B22",

    primary: "#238636",
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
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
