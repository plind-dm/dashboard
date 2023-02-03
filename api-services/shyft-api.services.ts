import axios from 'axios'
import { config } from '../config/env.config'
import { ShyftTransaction, ShyftInternalTransaction } from '../types/transaction'

const BASE_URL = config.site.isMainnet ? 'https://bx.shyft.network/api?' : 'https://bx.testnet.shyft.network/api?'

export const getCurrentBalance = async (address: string): Promise<string> => {
  const ACCOUNT_BALANCE = 'module=account&action=balance&address='
  const URL = BASE_URL + ACCOUNT_BALANCE + address

  const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const result = await axios.get(URL, { headers: HEADERS })
  if (result && result.data && result.data.status === '1') return result.data.result
  return '0'
}

export const getCurrentTokenBalance = async (address: string): Promise<string> => {
  const contractAddress = config.shyftContract.shyftContractAddress
  const ACCOUNT_BALANCE =
    'module=account&action=tokenbalance&contractaddress=' + contractAddress + '&address=' + address
  const URL = BASE_URL + ACCOUNT_BALANCE
  const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const result = await axios.get(URL, { headers: HEADERS })
  if (result && result.data && result.data.status === '1') return result.data.result
  return '0'
}

export const getTransactions = async (address: string): Promise<ShyftTransaction[]> => {
  const MODULE_AND_ACTION = 'module=account&action=txlist&address='
  const URL = BASE_URL + MODULE_AND_ACTION + address

  const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const result = await axios.get(URL, { headers: HEADERS })
  if (result && result.data && result.data.status === '1') return result.data.result
  return new Array<ShyftTransaction>()
}

export const getInternalTransactions = async (txHash: string): Promise<ShyftInternalTransaction[]> => {
  const MODULE_AND_ACTION = 'module=account&action=txlistinternal&txhash='
  const URL = BASE_URL + MODULE_AND_ACTION + txHash
  const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const result = await axios.get(URL, { headers: HEADERS })
  if (result && result.data && result.data.status === '1') return result.data.result
  return new Array<ShyftInternalTransaction>()
}
