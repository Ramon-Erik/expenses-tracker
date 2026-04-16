import type IProduct from '@/interfaces/IProduct.interface'
import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

export const useCart = defineStore('cart', () => {
  const _cart = ref<IProduct[]>([])
  const cart = readonly(_cart)

  const total = computed(() => {
    return _cart.value.reduce((acc, nextProduct) => {
      return acc + nextProduct.price * nextProduct.amount
    }, 0)
  })

  const addProduct = (product: IProduct) => {
    _cart.value.push(product)
  }

  const removeProduct = () => {}

  return {
    cart,
    total,
    addProduct,
    removeProduct,
  }
})
