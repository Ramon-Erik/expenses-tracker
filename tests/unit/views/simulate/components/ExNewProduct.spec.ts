// import { createTestingPinia } from "@pinia/testing";
// import ExNewProduct from "@/views/simulate/components/ExNewProduct.vue";
// import { mount } from "@vue/test-utils";
// import { useCart } from "@/stores/CartStore";

// const mockToast = {
//   error: jest.fn(),
//   success: jest.fn(),
//   warning: jest.fn(),
// };

// jest.mock("vue-toastification", () => ({
//   useToast: () => mockToast,
// }));

// describe("ExNewProduct", () => {
//   const mountComponent = (initialState = {}) => {
//     return mount(ExNewProduct, {
//       global: {
//         plugins: [
//           createTestingPinia({
//             stubActions: false,
//             ...initialState,
//           }),
//         ],
//       },
//     });
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should have only three inputs rendered", () => {
//     const wrapper = mountComponent();
//     const inputs = wrapper.findAll("input");
//     expect(inputs.length).toBe(3);
//   });

//   it("should not add products without name", async () => {
//     const wrapper = mountComponent();
//     const store = useCart();

//     const nameInput = wrapper.find("input#productName");

//     await nameInput.setValue("");
//     await nameInput.trigger("keyup.enter");

//     const nameInputElement = nameInput.element as HTMLInputElement;

//     expect(nameInputElement.value).toBe("");
//     expect(store.addProduct).not.toHaveBeenCalled();
//     expect(mockToast.error).toHaveBeenCalledTimes(1);
//   });

//   it("should not add products without price", async () => {
//     const wrapper = mountComponent();
//     const store = useCart();

//     const nameInput = wrapper.find("input#price");
//     await nameInput.setValue("mock");

//     const priceInput = wrapper.find("input#price");

//     await priceInput.setValue("");
//     await priceInput.trigger("keyup.enter");

//     const priceInputElement = priceInput.element as HTMLInputElement;

//     expect(priceInputElement.value).toBe("");
//     expect(store.addProduct).not.toHaveBeenCalled();
//     expect(mockToast.error).toHaveBeenCalledTimes(1);
//   });

//   it("should add products with name and price and clear inputs", async () => {
//     const wrapper = mountComponent();
//     const store = useCart();

//     const nameInput = wrapper.find("input#productName");
//     const priceInput = wrapper.find("input#price");

//     await nameInput.setValue("mock");
//     await priceInput.setValue("1000");

//     await priceInput.trigger("input");
//     await priceInput.trigger("keyup.enter");

//     expect(store.addProduct).toHaveBeenCalledTimes(1);
//     expect(mockToast.warning).toHaveBeenCalledTimes(1);

//     const priceInputElement = priceInput.element as HTMLInputElement;
//     const nameInputElement = nameInput.element as HTMLInputElement;

//     expect(priceInputElement.value).toBe("");
//     expect(nameInputElement.value).toBe("");
//   });
// });
