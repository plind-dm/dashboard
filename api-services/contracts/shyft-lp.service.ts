/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3'
import { promisify } from 'util'
import { Contract } from 'web3-eth-contract'
import { config } from '../../config/env.config'
import { BigNumberish, BigNumber } from '@ethersproject/bignumber'

interface ContractMethodCallProps {
  amount: BigNumberish
  onError: () => void
  onSuccess: (txHash: string) => void
}

interface ContractMethodCallRewardsProps {
  onError: () => void
  onSuccess: (txHash: string) => void
}
class ShyftLPService {
  private getContract(): Contract {
    const web3: Web3 = new Web3((window as any).ethereum)
    return new web3.eth.Contract(config.shyftLPContract.shyftLPAbi, config.shyftLPContract.shyftLPContractAddress)
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
      const getLpSupply = promisify(contract.methods.getLpSupply(0).call)
      const totalSupply = await getLpSupply()
      return BigNumber.from(totalSupply)
    } catch (e: any) {
      console.log('getTotalSupply', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async balanceOf(address: string): Promise<any> {
    try {
      const contract = this.getContract()
      const userInfo = promisify(contract.methods.userInfo(0, address).call)
      const balance = (await userInfo()).amount
      return BigNumber.from(balance)
    } catch (e: any) {
      console.log('balanceOf', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async earned(address: string): Promise<any> {
    try {
      const contract = this.getContract()
      const pendingShyftReward = promisify(contract.methods.pendingShyftReward(address).call)
      const amount = await pendingShyftReward()
      return BigNumber.from(amount)
    } catch (e: any) {
      console.log('pendingShyftReward', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async rewardRate(): Promise<any> {
    try {
      // TODO: delete console.log after test amount of call to SC
      console.log('Call to SC to get the rate rewards')
      const contract = this.getContract()
      const poolInfo = promisify(contract.methods.poolInfo(0).call)
      const rate = (await poolInfo()).perBlockShyftAllocated
      return BigNumber.from(rate)
    } catch (e: any) {
      console.log('poolInfo', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async rewardsForAddress(address: string): Promise<any> {
    try {
      const contract = this.getContract()
      const pendingShyftReward = promisify(contract.methods.pendingShyftReward(0, address).call)
      const rewards = await pendingShyftReward()
      return BigNumber.from(rewards)
    } catch (e: any) {
      console.log('pendingShyftReward', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async stake({ amount, onError, onSuccess }: ContractMethodCallProps): Promise<void> {
    const accounts: string[] = await this.getAccount()
    try {
      const contract = this.getContract()
      const result = await contract.methods.deposit(0, amount.toString()).send({ from: accounts[0] })
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

  async unstake({ amount, onError, onSuccess }: ContractMethodCallProps): Promise<any> {
    const accounts: string[] = await this.getAccount()
    try {
      const contract = this.getContract()
      const result = await contract.methods.withdraw(0, amount.toString()).send({ from: accounts[0] })
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

  async claimRewards({ onError, onSuccess }: ContractMethodCallRewardsProps): Promise<any> {
    const accounts: string[] = await this.getAccount()
    try {
      const contract = this.getContract()
      const result = await contract.methods.harvest(0).send({ from: accounts[0] })
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

const instance = new ShyftLPService()
Object.freeze(instance)

export default instance
