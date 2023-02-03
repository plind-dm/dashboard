import { NextApiRequest, NextApiResponse } from 'next'
import { getStakingBalance } from '../../api-services/zapper.services'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { appId, network, walletAddress } = req.query
  const result = await getStakingBalance(appId as string, network as string, walletAddress as string)
  res.status(200).json(result)
}
