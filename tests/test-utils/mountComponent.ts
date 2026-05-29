/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/dist/vuetify";
import * as directives from "vuetify/dist/vuetify";

globalThis.ResizeObserver = require("resize-observer-polyfill");

const vuetify = createVuetify({ components, directives });

export const mountComponentWithVuetify = (
  component: unknown,
  options?: ComponentMountingOptions<Record<string, unknown>>
) => {
  return mount(component, {
    ...options,
    global: {
      plugins: [vuetify],
      components: (component as any).components,
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
