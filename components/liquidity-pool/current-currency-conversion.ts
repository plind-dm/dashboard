import { fiatCurrencies, FiatRates } from '../../context/balances'
import numeral from 'numeral'

/**
 * This function receives the amount that you want to convert to format and be responsive with the current currency
 * @param amount This is the amount you want to be updated in type number
 * @param fiatRates This the list of conversion rates
 * @param currency This is the actual currency that we want
 * @returns A string with the number already parsed and formatted to be used with a currency symbol
 */
export const currencyConversion = (amount: number, fiatRates: FiatRates, currency: fiatCurrencies): string => {
  return numeral((amount * fiatRates[currency]).toFixed(2)).format('0,0.00')
}
