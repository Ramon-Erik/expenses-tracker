import type IProduct from "@/interfaces/IProduct.interface";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

export const useCart = defineStore("cart", () => {
  const LOCAL_CART_KEY = "exp-tracker-cart";
  const LOCAL_MAX_KEY = "exp-tracker-cart-max";

  const storedCart = JSON.parse(localStorage.getItem(LOCAL_CART_KEY) || "[]");

  const storedMaxValue = localStorage.getItem(LOCAL_MAX_KEY);
  const storedMax = storedMaxValue ?? "";

  const _max = ref<string>(storedMax);
  const max = readonly(_max);

  const _cart = ref<IProduct[]>(storedCart);
  const cart = readonly(_cart);

  const updateMaxValue = (value: string) => {
    _max.value = value;
    localStorage.setItem(LOCAL_MAX_KEY, value);
  };

  const total = computed(() => {
    return _cart.value.reduce((acc, nextProduct) => {
      return acc + nextProduct.price * nextProduct.amount;
    }, 0);
  });

  const updateLocalList = (callbackFn: () => void) => {
    callbackFn();
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(_cart.value));
  };

  const addProduct = (product: IProduct) => {
    updateLocalList(() => _cart.value.push(product));
  };

  const removeProduct = (id: number) => {
    updateLocalList(
      () => (_cart.value = _cart.value.filter((item) => item.id != id))
    );
  };

  const clearCart = () => {
    updateLocalList(() => (_cart.value = []));
  };

  return {
    cart,
    max,
    total,
    updateMaxValue,
    addProduct,
    removeProduct,
    clearCart,
  };
});
