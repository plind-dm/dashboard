import axios from 'axios'
import qs from 'qs'
import { DataEntity } from '../types'

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1'
const CRYPTO_CURRENCY_LISTING = '/cryptocurrency/listings/latest'

export const getCryptoCurrencyListings = async (): Promise<DataEntity[]> => {
  const URL = BASE_URL + CRYPTO_CURRENCY_LISTING
  const HEADERS = {
    'X-CMC_PRO_API_KEY': '76fbb76a-9c7f-4efe-890d-fee40d55a271',
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const DATA = qs.stringify({
    start: '1',
    limit: '1', //5000 all
    convert: 'USD'
  })
  const result = await axios.get<DataEntity[]>(URL, { headers: HEADERS, data: DATA })
  return result.data
}
