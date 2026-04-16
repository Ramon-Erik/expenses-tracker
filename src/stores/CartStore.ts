import type IProduct from '@/interfaces/IProduct.interface'
import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useCart = defineStore('cart', () => {
  const _cart = ref<IProduct[]>([])
  const cart = readonly(_cart)

  const addProduct = (product: IProduct) => {
    _cart.value.push(product)
  }
  const removeProduct = () => {}

  return {
    cart,
    addProduct,
    removeProduct,
  }
})
