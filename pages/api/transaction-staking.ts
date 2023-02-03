import { NextApiRequest, NextApiResponse } from 'next'
import { getZapInTransaction } from '../../api-services/zapper.services'
import { Networks, StakingTypes } from '../../types'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const {
      ownerAddress,
      type,
      sellTokenAddress,
      slippagePercentage,
      appId,
      network,
      gasPrice,
      poolAddress,
      sellAmount,
      payoutTokenAddress,
      toTokenAddress
    } = req.query
    const result = await getZapInTransaction({
      ownerAddress: ownerAddress as string,
      type: type as StakingTypes,
      sellTokenAddress: sellTokenAddress as string,
      sellAmount: sellAmount as string,
      slippagePercentage: parseFloat(slippagePercentage as string),
      poolAddress: poolAddress as string,
      payoutTokenAddress: payoutTokenAddress as string,
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
