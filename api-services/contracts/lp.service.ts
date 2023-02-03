/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3'
import { promisify } from 'util'
import { Contract } from 'web3-eth-contract'
import { config } from '../../config/env.config'
import { BigNumberish, BigNumber } from '@ethersproject/bignumber'

interface ContractMethodCallProps {
  spender: string
  amount: BigNumberish
  onError: () => void
  onSuccess: (txHash: string) => void
}

class LPService {
  private getContract(): Contract {
    const web3: Web3 = new Web3((window as any).ethereum)
    return new web3.eth.Contract(config.lpContract.lpAbi, config.lpContract.lpContractAddress)
  }

  private async getAccount(): Promise<string[]> {
    const web3: Web3 = new Web3((window as any).ethereum)
    return await web3.eth.getAccounts()
  }

  async getTotalSupply(): Promise<any> {
    try {
      // TODO: delete console.log after test amount of call to SC
      console.log('Call to SC to get the total supply')
      const contract = this.getContract()
      const getLpSupply = promisify(contract.methods.totalSupply().call)
      const totalSupply = await getLpSupply()
      return BigNumber.from(totalSupply)
    } catch (e: any) {
      console.log('getTotalSupply', e)
      //TODO: handle errors
    }
  }

  async balanceOf(address: string): Promise<any> {
    try {
      const contract = this.getContract()
      const balanceOf = promisify(contract.methods.balanceOf(address).call)
      const balance = await balanceOf()
      return BigNumber.from(balance)
    } catch (e: any) {
      console.log('balanceOf', e)
      //TODO: handle errors
    }
  }

  async allowance(owner: string, spender: string): Promise<any> {
    try {
      const contract = this.getContract()
      const allowance = promisify(contract.methods.allowance(owner, spender).call)
      const amount = await allowance()
      return BigNumber.from(amount)
    } catch (e: any) {
      //TODO: handle errors
    }
  }

  async approve({ spender, amount, onError, onSuccess }: ContractMethodCallProps): Promise<void> {
    const accounts: string[] = await this.getAccount()
    try {
      const contract = this.getContract()
      const result = await contract.methods.approve(spender, amount.toString()).send({ from: accounts[0] })
      if (result.status) {
        onSuccess(result.transactionHash)
      } else {
        onError()
      }
    } catch (e: any) {
      console.log('error: ', e)
      onError()
    }
  }
}

const instance = new LPService()
Object.freeze(instance)

export default instance
