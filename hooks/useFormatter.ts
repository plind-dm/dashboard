import numeral from 'numeral'
import { fiatCurrencies, useBalanceState } from '../context/balances'

interface UseFormatterHook {
  formatFiatValue: (value: number) => string
  formatBigNumbers: (value: string) => string
  formatTokenValue: (value: number, amountOfDecimals: number) => string
}

const useFormatter = (): UseFormatterHook => {
  const { currentCurrency, currentCurrencySymbol } = useBalanceState()

  const formatFiatValue = (value: number): string => {
    let code
    switch (currentCurrency) {
      case fiatCurrencies.CAD:
      case fiatCurrencies.USD:
        code = 'en-US'
        break
      case fiatCurrencies.EUR:
        code = 'de-DE'
        break
      case fiatCurrencies.GBP:
        code = 'en-GB'
        break
    }
    return new Intl.NumberFormat(code, {
      style: 'currency',
      currency: currentCurrency,
      maximumSignificantDigits: value < 1 ? 2 : 6,
      minimumSignificantDigits: 2
    }).format(value)
  }

  const formatTokenValue = (value: number, amountOfDecimals: number): string => {
    let format = '0,0.'
    if (value.toString().includes('e-')) return value.toString()
    for (let i = 1; i <= amountOfDecimals; i++) {
      format = format.concat('0')
    }
    format = format.concat('a')
    return numeral(value).format(format)
  }

  const formatBigNumbers = (value: string): string => {
    let response
    switch (currentCurrency) {
      case fiatCurrencies.CAD:
        response =
          currentCurrencySymbol.charAt(0) +
          'A' +
          currentCurrencySymbol.charAt(1) +
          numeral(value.substring(2)).format('0,0.00a').toUpperCase()
        break
      case fiatCurrencies.GBP:
      case fiatCurrencies.USD:
        response = currentCurrencySymbol + numeral(value.substring(1)).format('0,0.00a').toUpperCase()
        break
      case fiatCurrencies.EUR:
        response =
          numeral(
            value
              .substring(0, value.length - 2)
              .split(',')[0]
              .replaceAll('.', '')
          )
            .format('0,0.00a')
            .toUpperCase() +
          ' ' +
          currentCurrencySymbol
        break
    }
    return response
  }

  return {
    formatFiatValue,
    formatTokenValue,
    formatBigNumbers
  }
}

export { useFormatter }
