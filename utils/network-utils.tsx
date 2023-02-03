import { Networks, NetworksId } from '../types'
import { config } from '../config/env.config'

const NETWORKS_ID_SUPORTED: Array<NetworksId> = [
  NetworksId[Networks.ETHEREUM],
  NetworksId[Networks.POLYGON],
  NetworksId[Networks['BINANCE-SMART-CHAIN']],
  config.site.isMainnet ? NetworksId[Networks.SHYFT] : NetworksId[Networks.SHYFT_TESTNET]
]

const NETWORKS_NAME_SUPORTED: Array<string> = [
  Networks.ETHEREUM,
  Networks.POLYGON,
  Networks['BINANCE-SMART-CHAIN'],
  config.site.isMainnet ? Networks.SHYFT : Networks.SHYFT_TESTNET
]

export const isInvalidNetworkId = (value: number): boolean => {
  return !NETWORKS_ID_SUPORTED.includes(value)
}

export const isInvalidNetworkName = (value: string): boolean => {
  return !NETWORKS_NAME_SUPORTED.includes(value)
}

export const isInShyftNetwork = (networkId: number): boolean => {
  if (config.site.isMainnet) {
    return networkId === NetworksId[Networks.SHYFT]
  } else {
    return networkId === NetworksId[Networks.SHYFT_TESTNET]
  }
}
