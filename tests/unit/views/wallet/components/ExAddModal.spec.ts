// import { mount, VueWrapper } from "@vue/test-utils";
// import { createTestingPinia } from "@pinia/testing";
// import { useTransactionsStore } from "@/stores/TransactionsStore";
// import ExAddModal from "@/views/wallet/components/ExAddModal.vue";

// const mockToast = {
//   success: jest.fn(),
//   error: jest.fn(),
// };

// jest.mock("vue-toastification", () => ({
//   useToast: () => mockToast,
// }));

// type ExAddModalInstance = InstanceType<typeof ExAddModal>;

// describe("ExAddModal.vue", () => {
//   beforeEach(() => {
//     const el = document.createElement("div");
//     el.id = "modal";
//     document.body.appendChild(el);
//     jest.clearAllMocks();
//   });

//   afterEach(() => {
//     document.body.innerHTML = "";
//   });

//   const mountComponent = (props = { isModalOpen: true }) => {
//     return mount(ExAddModal, {
//       props,
//       global: {
//         plugins: [
//           createTestingPinia({
//             stubActions: false,
//           }),
//         ],
//       },
//     }) as unknown as VueWrapper<ExAddModalInstance>;
//   };

//   it("should not render modal content when isModalOpen is false", () => {
//     mountComponent({ isModalOpen: false });
//     expect(document.body.querySelector(".modal-bg")).toBeNull();
//   });

//   it("should enable button only when inputs are valid", async () => {
//     mountComponent();

//     const descriptionInput = document.body.querySelector(
//       ".description-input"
//     ) as HTMLInputElement;
//     const amountInput = document.body.querySelector(
//       "#amount"
//     ) as HTMLInputElement;
//     const button = document.body.querySelector(".btn") as HTMLButtonElement;

//     expect(button.disabled).toBe(true);

//     // No Teleport, manipulamos o DOM real via document.body
//     descriptionInput.value = "Dinner";
//     descriptionInput.dispatchEvent(new Event("input"));

//     amountInput.value = "50,00";
//     amountInput.dispatchEvent(new Event("input"));

//     // Aguarda a reatividade do Vue
//     import("vue").then(async ({ nextTick }) => {
//       await nextTick();
//       expect(button.disabled).toBe(false);
//     });
//   });

//   it("should call addTransaction and close modal on valid submit", async () => {
//     const wrapper = mountComponent();
//     const store = useTransactionsStore();

//     const descriptionInput = document.body.querySelector(
//       ".description-input"
//     ) as HTMLInputElement;
//     const amountInput = document.body.querySelector(
//       "#amount"
//     ) as HTMLInputElement;
//     const form = document.body.querySelector("form") as HTMLFormElement;

//     descriptionInput.value = "Freelance";
//     descriptionInput.dispatchEvent(new Event("input"));

//     amountInput.value = "1000,00";
//     amountInput.dispatchEvent(new Event("input"));

//     form.dispatchEvent(new Event("submit"));

//     expect(store.addTransaction).toHaveBeenCalledWith(
//       expect.objectContaining({
//         description: "Freelance",
//         amount: 1000,
//         isIncome: true,
//       })
//     );
//     expect(wrapper.emitted("closeModal")).toBeTruthy();
//     expect(mockToast.success).toHaveBeenCalledWith("Adicionado!");
//   });

//   it("should handle negative values correctly", async () => {
//     mountComponent();
//     const store = useTransactionsStore();

//     const descriptionInput = document.body.querySelector(
//       ".description-input"
//     ) as HTMLInputElement;
//     const amountInput = document.body.querySelector(
//       "#amount"
//     ) as HTMLInputElement;
//     const form = document.body.querySelector("form") as HTMLFormElement;

//     descriptionInput.value = "Bill";
//     descriptionInput.dispatchEvent(new Event("input"));

//     amountInput.value = "-50,00";
//     amountInput.dispatchEvent(new Event("input"));

//     form.dispatchEvent(new Event("submit"));

//     expect(store.addTransaction).toHaveBeenCalledWith(
//       expect.objectContaining({
//         amount: -50,
//         isIncome: false,
//       })
//     );
//   });
// });
