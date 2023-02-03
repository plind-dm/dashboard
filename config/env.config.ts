import { AbiItem } from 'web3-utils'
import ShyftContract from './contracts/ShyftStaking.json'
import ShyftLPContract from './contracts/ShyftLPStaking.json'
import LPContract from './contracts/ShyftLP.json'

interface WalletConfig {
  blockchainId: number
}
interface OnboardConfig {
  apiKey?: string
  providerKey?: string
  networkName?: string
}
interface ZapperConfig {
  apiKey: string
}

interface ShyftConfig {
  underMaintenanceMood: boolean
  isMainnet: boolean
}

interface ShyftContractConfig {
  shyftContractAddress: string
  shyftAbi: Array<AbiItem>
}

interface ShyftLPContractConfig {
  shyftLPContractAddress: string
  shyftLPAbi: Array<AbiItem>
}

interface LPContractConfig {
  lpContractAddress: string
  lpAbi: Array<AbiItem>
}

const walletConfig: WalletConfig = {
  blockchainId: parseInt(process.env.SHYFT_BLOCKCHAIN_ID as string) || 1
}

const shyftConfig: ShyftConfig = {
  underMaintenanceMood: (process.env.SHYFT_UNDER_MAINTENANCE_MOOD as string) === 'true',
  isMainnet: (process.env.SHYFT_IS_MAINNET as string) === 'true'
}

const shyftContractConfig: ShyftContractConfig = {
  shyftContractAddress: process.env.SHYFT_CONTRACT_ADDRESS || '0x9ded206aBE06017F2C735d1f2c4183397D829C65',
  shyftAbi: ShyftContract.abi as Array<AbiItem>
}

const shyftLPContractConfig: ShyftLPContractConfig = {
  shyftLPContractAddress: process.env.SHYFT_LP_CONTRACT_ADDRESS || '0x89Ea73272c1c88041D08C222Fac2961836aB3dDc',
  shyftLPAbi: ShyftLPContract.abi as Array<AbiItem>
}

const lpContractConfig: LPContractConfig = {
  lpContractAddress: process.env.LP_CONTRACT_ADDRESS || '0xBa28c4D95d1050D29ad11FbbbD1eE1f66939d431',
  lpAbi: LPContract.abi as Array<AbiItem>
}

const zapperConfig: ZapperConfig = {
  apiKey: process.env.SHYFT_ZAPPER_API_KEY || ''
}

const onboardConfig: OnboardConfig = {
  apiKey: process.env.SHYFT_ONBOARD_API_KEY,
  providerKey: process.env.SHYFT_INFURA_KEY,
  networkName: process.env.SHYFT_NETWORK_NAME
}

export const config: {
  onboard: OnboardConfig
  wallet: WalletConfig
  zapper: ZapperConfig
  site: ShyftConfig
  shyftContract: ShyftContractConfig
  shyftLPContract: ShyftLPContractConfig
  lpContract: LPContractConfig
} = {
  onboard: onboardConfig,
  wallet: walletConfig,
  zapper: zapperConfig,
  site: shyftConfig,
  shyftContract: shyftContractConfig,
  shyftLPContract: shyftLPContractConfig,
  lpContract: lpContractConfig
}
