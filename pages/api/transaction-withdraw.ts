import { NextApiRequest, NextApiResponse } from 'next'
import { getZapOutTransaction } from '../../api-services/zapper.services'
import { Networks, StakingTypes } from '../../types'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const {
      ownerAddress,
      type,
      slippagePercentage,
      gasPrice,
      appId,
      network,
      poolAddress,
      sellAmount,
      toTokenAddress
    } = req.query
    const result = await getZapOutTransaction({
      ownerAddress: ownerAddress as string,
      type: type as StakingTypes,
      sellAmount: sellAmount as string,
      slippagePercentage: parseFloat(slippagePercentage as string),
      poolAddress: poolAddress as string,
      toTokenAddress: toTokenAddress as string,
      appId: appId as string,
      network: network as Networks,
      gasPrice: gasPrice as string
    })
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    throw err
  }
}
