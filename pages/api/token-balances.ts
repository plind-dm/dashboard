import { NextApiRequest, NextApiResponse } from 'next'
import { getCurrentBalance } from '../../api-services/shyft-api.services'
import { weiToShft } from '../../api-services/web3.service'
import { getPricesByToken, getTokenBalances } from '../../api-services/zapper.services'
import { NativeTokens, Networks, NetworksLogo, TokenPrice } from '../../types'
import { TokenAssetsEntity, TokenBalance } from './response.types'
export interface DigestedTokenBalance {
  totalBalance: number
  assetBalance: number
  debtBalance: number
  networkImage: string
  networkName: string
  networkId: string
  products: Array<DigestedTokenAsset>
}

export interface DigestedTokenAsset {
  balanceCrypto: number
  balanceFiat: number
  cryptoPrice: number
  imageUrl: string
  name: string
  symbol: string
  address: string
  network: string
}

const digestTokenBalance = (tokenBalance: TokenBalance, network: Networks): DigestedTokenBalance => {
  return {
    networkId: network,
    networkName: (() => {
      switch (network) {
        case Networks.ETHEREUM:
          return 'Ethereum'
        case Networks.POLYGON:
          return 'Polygon'
        case Networks['BINANCE-SMART-CHAIN']:
          return 'Binance'
        case Networks.SHYFT:
          return 'Shyft'
        case Networks.SHYFT_TESTNET:
          return 'Shyft Testnet'
        default:
          return ''
      }
    })(),
    networkImage: (() => {
      switch (network) {
        case Networks.ETHEREUM:
          return NetworksLogo.ETHEREUM
        case Networks.POLYGON:
          return NetworksLogo.POLYGON
        case Networks['BINANCE-SMART-CHAIN']:
          return NetworksLogo.BINANCE
        case Networks.SHYFT:
          return NetworksLogo.SHYFT
        case Networks.SHYFT_TESTNET:
          return NetworksLogo.SHYFT_TESTNET
        default:
          return ''
      }
    })(),
    totalBalance: tokenBalance.meta ? tokenBalance.meta[0].value : 0,
    assetBalance: tokenBalance.meta ? tokenBalance.meta[1].value : 0,
    debtBalance: tokenBalance.meta ? tokenBalance.meta[2].value : 0,
    products:
      tokenBalance.products && tokenBalance.products.length > 0 && tokenBalance.products[0].assets
        ? tokenBalance.products[0].assets?.map((tokenAssets: TokenAssetsEntity): DigestedTokenAsset => {
            const net =
              tokenAssets.network !== Networks.SHYFT && tokenAssets.network !== Networks.SHYFT_TESTNET
                ? tokenAssets.network
                : 'ethereum'
            return {
              balanceCrypto: tokenAssets.balance,
              balanceFiat: tokenAssets.balanceUSD,
              imageUrl: `https://storage.googleapis.com/zapper-fi-assets/tokens/${net}/${tokenAssets.address}.png`,
              name: tokenAssets.label,
              cryptoPrice: tokenAssets.price,
              symbol: tokenAssets.symbol,
              address: tokenAssets.address,
              network: tokenAssets.network
            }
          })
        : []
  }
}

export const getTokenShyftBalance = async (address: string): Promise<TokenBalance> => {
  const balanceShftInWei = await getCurrentBalance(address as string)
  const prices = await getPricesByToken(Networks.ETHEREUM)
  const nativeToken = await prices.find((token: TokenPrice) => token.symbol === NativeTokens[Networks.SHYFT])
  let token = {} as TokenAssetsEntity
  if (nativeToken) {
    const balance = weiToShft(balanceShftInWei)
    token = {
      type: 'base',
      address: '0xb17c88bda07d28b3838e0c1de6a30eafbcf52d85',
      decimals: 18,
      network: Networks.SHYFT,
      symbol: 'SHFT',
      price: nativeToken.price,
      balance: Number(balance),
      balanceRaw: balanceShftInWei,
      balanceUSD: Number(balance) * nativeToken.price,
      category: '',
      label: '',
      img: '',
      hide: false,
      canExchange: false
    }
  }
  return {
    meta: [
      { label: 'Total', value: token.balanceUSD, type: 'dollar' },
      { label: 'Assets', value: token.balanceUSD, type: 'dollar' },
      { label: 'Debts', value: 0, type: 'dollar' }
    ],
    products: [
      {
        label: 'SHFT',
        assets: token.balance === 0 ? [] : [token]
      }
    ]
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { address } = req.query
  const resultEthereum = await getTokenBalances(address as string, Networks.ETHEREUM)
  const resultPolygon = await getTokenBalances(address as string, Networks.POLYGON)
  const resultBinance = await getTokenBalances(address as string, Networks['BINANCE-SMART-CHAIN'])
  const resultShyft = await getTokenShyftBalance(address as string)
  const finalResult = [
    digestTokenBalance(resultEthereum, Networks.ETHEREUM),
    digestTokenBalance(resultPolygon, Networks.POLYGON),
    digestTokenBalance(resultBinance, Networks['BINANCE-SMART-CHAIN']),
    digestTokenBalance(resultShyft, Networks.SHYFT)
  ]
  res.status(200).json(finalResult)
}
