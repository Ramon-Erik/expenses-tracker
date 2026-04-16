export function currencyFormat(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const formatPriceToDecimal = (value: string, maxDigits: number) => {
  return value.replace(',', '').replace('.', '').replace('-', '').slice(0, maxDigits) || '0'
}
