/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3'
import { promisify } from 'util'
import { Contract } from 'web3-eth-contract'
import { config } from '../../config/env.config'
import { BigNumberish, BigNumber } from '@ethersproject/bignumber'
import { UnBondingDetail } from '../../types/un-bonding'

interface ContractMethodCallProps {
  amount: BigNumberish
  onError: () => void
  onSuccess: (txHash: string) => void
}

interface ContractMethodCallRewardsProps {
  onError: () => void
  onSuccess: (txHash: string) => void
}
class ShyftService {
  private getContract(): Contract {
    const web3: Web3 = new Web3((window as any).ethereum)
    return new web3.eth.Contract(config.shyftContract.shyftAbi, config.shyftContract.shyftContractAddress)
  }

  private async getAccount(): Promise<string[]> {
    const web3: Web3 = new Web3((window as any).ethereum)
    return await web3.eth.getAccounts()
  }

  async getGasPrice(): Promise<BigNumber> {
    const web3: Web3 = new Web3((window as any).ethereum)
    try {
      const result = await web3.eth.getGasPrice()
      return BigNumber.from(result)
    } catch (e: any) {
      console.log('getGasPrice', e)
      return BigNumber.from(0)
    }
  }

  async getTotalSupply(): Promise<any> {
    try {
      // TODO: delete console.log after test amount of call to SC
      console.log('Call to SC to get the total supply')
      const contract = this.getContract()
      const totalSupply = promisify(contract.methods.totalSupply().call)
      const total = await totalSupply()
      return BigNumber.from(total)
    } catch (e: any) {
      console.log('getTotalSupply', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async getTotalUnbondings(): Promise<any> {
    try {
      const contract = this.getContract()
      const totalUnbondings = promisify(contract.methods.totalUnbondings().call)
      const total = await totalUnbondings()
      return BigNumber.from(total)
    } catch (e: any) {
      console.log('getTotalUnbondings', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async getUnbondingPeriod(): Promise<any> {
    try {
      const contract = this.getContract()
      const unbondingPeriod = promisify(contract.methods.unbondingPeriod().call)
      const period = await unbondingPeriod()
      return period
    } catch (e: any) {
      console.log('getUnbondingPeriod', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async getPrePurchasersRelease(): Promise<any> {
    try {
      const contract = this.getContract()
      const prePurchasersReleaseTimestamp = promisify(contract.methods.prePurchasersReleaseTimestamp().call)
      const release = await prePurchasersReleaseTimestamp()
      return release
    } catch (e: any) {
      console.log('getPrePurchasersRelease', e)
      return BigNumber.from(0)
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
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async earned(address: string): Promise<any> {
    try {
      const contract = this.getContract()
      const earned = promisify(contract.methods.earned(address).call)
      const amount = await earned()
      return BigNumber.from(amount)
    } catch (e: any) {
      console.log('earned', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async rewardRate(): Promise<any> {
    try {
      // TODO: delete console.log after test amount of call to SC
      console.log('Call to SC to get the rate rewards')
      const contract = this.getContract()
      const rewardRate = promisify(contract.methods.rewardRate().call)
      const rate = await rewardRate()
      return BigNumber.from(rate)
    } catch (e: any) {
      console.log('rewardRate', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async rewardsForAddress(address: string): Promise<any> {
    try {
      const contract = this.getContract()
      const rewardForAddress = promisify(contract.methods.rewards(address).call)
      const rewards = await rewardForAddress()
      return BigNumber.from(rewards)
    } catch (e: any) {
      console.log('rewards', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async getUnbondingIdsLength(address: string): Promise<any> {
    try {
      const contract = this.getContract()
      const getUnbondingIdsLength = promisify(contract.methods.getUnbondingIdsLength(address).call)
      const length = await getUnbondingIdsLength()
      return length
    } catch (e: any) {
      console.log('getUnbondingIdsLength', e)
      return BigNumber.from(0)
      //TODO: handle errors
    }
  }

  async getUnbondingIds(address: string, offset: BigNumberish, size: BigNumberish): Promise<any> {
    try {
      const contract = this.getContract()
      const getUnbondingIds = promisify(contract.methods.getUnbondingIds(address, offset, size).call)
      const ids = await getUnbondingIds()
      return ids
    } catch (e: any) {
      console.log('getUnbondingIds', e)
      return []
      //TODO: handle errors
    }
  }

  async getUnbondingsDetailForAddress(address: string): Promise<any> {
    try {
      const unBondingIdsLength = await this.getUnbondingIdsLength(address)
      const unBondingIds = await this.getUnbondingIds(address, 0, unBondingIdsLength)
      const unBondsDetail = new Array<UnBondingDetail>()

      if (unBondingIds[0] && unBondingIds[0].length > 0) {
        for (let index = 0; index < unBondingIds[0].length; index++) {
          const response = await this.unbondingDetailsForId(unBondingIds[0][index])
          const unBonding: UnBondingDetail = {
            unbondingId: unBondingIds[0][index],
            address: response.account,
            remainingAmount: BigNumber.from(response.remainingAmount),
            unstakeEnabledTimestamp: Number(response.unstakeEnabledTimestamp),
            arrayPosition: response.indexIntoUnbondingArray
          }
          if (unBonding) {
            unBondsDetail[index] = unBonding
          }
        }
      }
      return unBondsDetail
    } catch (e: any) {
      console.log('getTotalSupply', e)
      return []
      // TODO: handle errors
    }
  }

  async unbondingIdsPerAddress(address: string, id: BigNumberish): Promise<any> {
    try {
      const contract = this.getContract()
      const unbondingIdsPerAddress = promisify(contract.methods.unbondingIdsPerAddress(address, id).call)
      const unbondingId = await unbondingIdsPerAddress()
      return unbondingId
    } catch (e: any) {
      console.log('unbondingIdsPerAddress', e)
      return []
      //TODO: handle errors
    }
  }

  async unbondingDetailsForId(id: BigNumberish): Promise<any> {
    try {
      const contract = this.getContract()
      const unbondingDetailsForId = promisify(contract.methods.unbondingDetailsForId(id).call)
      const detail = await unbondingDetailsForId()
      return detail
    } catch (e: any) {
      console.log('unbondingDetailsForId', e)
      return {}
      //TODO: handle errors
    }
  }

  async stakeEstimateGas(amount: BigNumberish): Promise<any> {
    const accounts: string[] = await this.getAccount()
    try {
      const contract = this.getContract()
      const result = await contract.methods.stake().estimateGas({ from: accounts[0], value: amount })
      const gas = await this.getGasPrice()
      return gas.mul(BigNumber.from(result).add(BigNumber.from(200000)))
    } catch (e: any) {
      console.log('stakeEstimateGas', e)
      return BigNumber.from(0)
    }
  }

  async stake({ amount, onError, onSuccess }: ContractMethodCallProps): Promise<void> {
    const accounts: string[] = await this.getAccount()
    try {
      const contract = this.getContract()
      const result = await contract.methods.stake().send({ from: accounts[0], value: amount })
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

  async unbond({ amount, onError, onSuccess }: ContractMethodCallProps): Promise<any> {
    const accounts: string[] = await this.getAccount()
    try {
      const contract = this.getContract()
      const result = await contract.methods.unbond(amount.toString()).send({ from: accounts[0] })
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

  async unbondAll(): Promise<any> {
    const accounts: string[] = await this.getAccount()
    try {
      const contract = this.getContract()
      const promise = contract.methods
        .unbondAll()
        .send({ from: accounts[0] })
        .on('error', function (error: any) {
          console.log('error: ', error)
          return error
        })

      return promise
    } catch (e: any) {
      console.log('error: ', e)
      return e
    }
  }

  async unstake({
    idUnbonding,
    amount,
    onError,
    onSuccess
  }: {
    idUnbonding: BigNumberish
    amount: BigNumberish
    onError: () => void
    onSuccess: (txHash: string) => void
  }): Promise<any> {
    const accounts: string[] = await this.getAccount()
    try {
      const contract = this.getContract()
      const result = await contract.methods.unstake(idUnbonding, amount.toString()).send({ from: accounts[0] })
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
      const result = await contract.methods.getReward().send({ from: accounts[0] })
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

const instance = new ShyftService()
Object.freeze(instance)

export default instance
