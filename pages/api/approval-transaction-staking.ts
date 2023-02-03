import { NextApiRequest, NextApiResponse } from 'next'
import { getZapInApprovalTransaction } from '../../api-services/zapper.services'
import { Networks, StakingTypes } from '../../types'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { ownerAddress, type, sellTokenAddress, amount, appId, network, gasPrice } = req.query
  const result = await getZapInApprovalTransaction({
    ownerAddress: ownerAddress as string,
    type: type as StakingTypes,
    sellTokenAddress: sellTokenAddress as string,
    amount: amount as string,
    appId: appId as string,
    network: network as Networks,
    gasPrice: gasPrice as string
  })
  res.status(200).json(result)
}
