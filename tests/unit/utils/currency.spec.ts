import { currencyFormat, formatPriceToDecimal } from '@/utils/currency'

describe('Currency Utils', () => {
  it('Should format a positive number to BRL', () => {
    const value = 100
    const formatedValue = currencyFormat(value)

    expect(formatedValue).toMatch(/R\$\s?100,00/)
  })

  it('Should format a NaN to zero BRL', () => {
    const value = NaN
    const formatedValue = currencyFormat(value)

    expect(formatedValue).toMatch(/R\$\s?0,00/)
  })

  it('Should format a Infinity to zero BRL', () => {
    const value = Infinity
    const formatedValue = currencyFormat(value)

    expect(formatedValue).toMatch(/R\$\s?0,00/)
  })

  it('Should format a float to integer', () => {
    const value = '1.250,50'
    const maxDigits = 7
    const formatedValue = formatPriceToDecimal(value, maxDigits)

    expect(formatedValue).toMatch(/125050/)
  })

  it('Should format a null string to zero', () => {
    const value = ''
    const maxDigits = 7
    const formatedValue = formatPriceToDecimal(value, maxDigits)

    expect(formatedValue).toMatch(/0/)
  })

  it('Should format a NaN to zero', () => {
    const value = 'string'
    const maxDigits = 7
    const formatedValue = formatPriceToDecimal(value, maxDigits)

    expect(formatedValue).toMatch(/0/)
  })

  it('Should format a number+letter to number only', () => {
    const value = '123av'
    const maxDigits = 7
    const formatedValue = formatPriceToDecimal(value, maxDigits)

    expect(formatedValue).toMatch(/123/)
  })
})
