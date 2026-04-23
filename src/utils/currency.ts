export function currencyFormat(value: number) {
  const strictNumber = isNaN(value) || value == Infinity ? 0 : value
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(strictNumber)
}

export const formatPriceToDecimal = (value: string, maxDigits: number) => {
  return value.replace(/\D/g, '').slice(0, maxDigits) || '0'
}
