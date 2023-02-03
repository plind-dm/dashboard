import Onboard from 'bnc-onboard'
import { API, Initialization, Subscriptions } from 'bnc-onboard/dist/src/interfaces'
import { config } from '../config/env.config'

class OnboardService {
  private provider_url: string
  private provider_key: string
  private onBoardParams: Initialization

  constructor() {
    this.provider_url = `https://${config.onboard.networkName}.infura.io/v3/${config.onboard.providerKey}`
    this.provider_key = config.onboard.providerKey || ''
    this.onBoardParams = this.getParams()
  }

  getParams(): Initialization {
    const params = {
      dappId: config.onboard.apiKey,
      hideBranding: true,
      darkMode: true,
      networkId: config.wallet.blockchainId,
      walletSelect: {
        heading: 'Connect to a Wallet',
        description:
          "By connecting to a wallet, you agree to Shyft Network's Terms of Service and acknowledge that you have read and understand the Shyft Network protocol disclaimer",
        explanation: '',
        wallets: [
          {
            walletName: 'metamask',
            rpcUrl: 'https://rpc.testnet.shyft.network:64738',
            customNetwork: {
              networkId: 11437
            }
          },
          {
            walletName: 'walletConnect',
            infuraKey: this.provider_key
          }
        ]
      },
      walletCheck: [
        { checkName: 'derivationPath' },
        { checkName: 'connect' },
        { checkName: 'accounts' },
        { checkName: 'network' },
        { checkName: 'balance' }
      ]
    }
    return params
  }

  init(subscriptions: Subscriptions): API {
    return Onboard({ ...this.onBoardParams, subscriptions })
  }
  switchNetwork(networkId: number, subscriptions: Subscriptions): API {
    return Onboard({ ...this.onBoardParams, subscriptions, networkId: networkId })
  }
}

const instance = new OnboardService()
Object.freeze(instance)

export default instance
