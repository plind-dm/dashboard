import { NextApiRequest, NextApiResponse } from 'next'
import { getPricesByToken } from '../../api-services/zapper.services'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { network } = req.query
  const result = await getPricesByToken(network as string)
  res.status(200).json(result)
}
