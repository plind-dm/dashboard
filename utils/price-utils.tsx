export const parseMillion = (number: number): string => {
  // Alter numbers larger than 1k
  if (number >= 1e3) {
    const units = ['k', 'M', 'B', 'T']

    // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
    const unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3
    // Calculate the remainder
    const num = (number / parseInt('1e' + unit)).toFixed(2)
    const unitName = units[Math.floor(unit / 3) - 1]

    // output number remainder + unitName
    return (num + unitName).toLocaleString()
  }
  return number.toLocaleString()
}

export const getStringFromExponentialNumber = (number: number): string => {
  if (number.toString().includes('e')) {
    return number.toFixed(20)
  }
  return number.toString()
}

export const countDecimals = (value: number): number => {
  if (Math.floor(value) === value) return 0
  return value.toString().split('.')[1].length || 0
}

export const isZero = (value: number): boolean => {
  if (Math.floor(value) === value) return false
  return value.toString().split('.')[0] === '0'
}

export const showExponentialNumber = (value: number, decimals: number): string => {
  if (value === 0) {
    return value.toString()
  }
  if (value.toString().includes('e')) {
    return parseFloat(value.toString().split('e')[0]).toFixed(3) + 'e' + value.toString().split('e')[1]
  } else {
    if (countDecimals(value) > decimals && isZero(value)) {
      return value.toExponential(3)
    }
    return value.toFixed(decimals)
  }
}
