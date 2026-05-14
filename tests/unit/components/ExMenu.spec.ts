import ExMenu from "@/components/ExMenu.vue";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory, type Router } from "vue-router";

describe("Menu", () => {
  let router: Router;
  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", component: { template: "<div>Home</div>" } },
        { path: "/simulate", component: { template: "<div>Carrinho</div>" } },
      ],
    });
  });

  it("Should render a unordenated list with two items", async () => {
    const wrapper = mount(ExMenu, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.html()).toContain("ul");
    expect(wrapper.findAll("li").length).toBe(2);
  });

  it("Should set the clicked link as active", async () => {
    router.push("/simulate");
    await router.isReady();

    const wrapper = mount(ExMenu, {
      global: { plugins: [router] },
    });

    await wrapper.vm.$nextTick();

    const activetedLink = wrapper.find('a[href="/simulate"]');

    expect(activetedLink.classes()).toContain("active");
  });

  it("classes array should be empty if not active", async () => {
    const wrapper = mount(ExMenu, {
      global: { plugins: [router] },
    });

    await wrapper.vm.$nextTick();

    const unactivetedLink = wrapper.find('a[href="/simulate"]');

    expect(unactivetedLink.classes()).toStrictEqual([]);
  });
});
