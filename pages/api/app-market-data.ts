import { NextApiRequest, NextApiResponse } from 'next'
import { getAppMarketData } from '../../api-services/zapper.services'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { stakingType, network, appId } = req.query
  const result = await getAppMarketData(appId as string, network as string, stakingType as string)
  res.status(200).json(result)
}
