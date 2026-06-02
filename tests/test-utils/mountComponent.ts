/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/dist/vuetify";
import * as directives from "vuetify/dist/vuetify";

globalThis.ResizeObserver = require("resize-observer-polyfill");

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

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "darkTheme",
    themes: {
      darkTheme,
      light,
    },
  },
});

export const mountComponentWithVuetify = (
  component: unknown,
  options?: ComponentMountingOptions<Record<string, unknown>>
) => {
  return mount(component, {
    ...options,
    global: {
      plugins: [vuetify],
      components: components.components,
      ...options?.global,
    },
  });
};

export const mountComponent = (
  component: unknown,
  options?: ComponentMountingOptions<Record<string, unknown>>
) => {
  return mount(component, {
    ...options,
  });
};
