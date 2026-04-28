import type IProduct from '@/interfaces/IProduct.interface'
import { useCart } from '@/stores/CartStore'
import { createPinia, setActivePinia } from 'pinia'

describe('CartStore', () => {
  let cart: ReturnType<typeof useCart>
  const products: IProduct[] = [
    { name: 'product 1', amount: 2, price: 10, id: 1 },
    { name: 'product 2', amount: 1, price: 5, id: 2 },
    { name: 'product 3', amount: 4, price: 1, id: 3 },
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()

    cart = useCart()
  })

  it('should start with a empty cart list', () => {
    expect(cart.cart.length).toBe(0)
  })

  it('should start with empty max', () => {
    expect(cart.max).toBe('')
  })

  it('should start with a total of zero', () => {
    expect(cart.total).toBe(0)
  })

  it('should increment length  by 1 when add one product', () => {
    const product = products[2]

    if (product) {
      cart.addProduct(product)
    }

    expect(cart.cart.length).toBe(1)
  })

  it('should not change length when removing non-existing products', () => {
    const product = products[0]

    if (product) {
      cart.addProduct(product)
    }

    cart.removeProduct(10)

    expect(cart.cart.length).toBe(1)
  })

  it('should decrease lenght when removing a product', () => {
    const prod1 = products[0]!
    const prod2 = products[1]!

    cart.addProduct(prod1)
    cart.addProduct(prod2)

    expect(cart.cart.length).toBe(2)

    cart.removeProduct(prod1.id)

    expect(cart.cart.length).toBe(1)
  })

  it('clear fn should empty cart', () => {
    const prod1 = products[0]!
    const prod2 = products[1]!

    cart.addProduct(prod1)
    cart.addProduct(prod2)

    expect(cart.cart.length).toBe(2)

    cart.clearCart()

    expect(cart.cart.length).toBe(0)
  })

  it('clear fn should not change the length of an aldready empty cart', () => {
    expect(cart.cart.length).toBe(0)

    cart.clearCart()

    expect(cart.cart.length).toBe(0)
  })

  it('should have changed max on updateMax fn', () => {
    cart.updateMaxValue('1000')

    expect(cart.max).toBe('1000')
  })

  it('should have increaded total when added new products', () => {
    expect(cart.total).toBe(0)

    const prod1 = products[0]!
    cart.addProduct(prod1)

    expect(cart.cart.length).toBe(1)

    expect(cart.total).toBe(prod1.amount * prod1.price)
  })
})
