import { NextApiRequest, NextApiResponse } from 'next'
import { getPriceHistoryByTokenAddress } from '../../api-services/zapper.services'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { address, network, timeFrame, currency } = req.query
  const result = await getPriceHistoryByTokenAddress(
    address as string,
    network as string,
    timeFrame as string,
    currency as string
  )
  res.status(200).json(result)
}
