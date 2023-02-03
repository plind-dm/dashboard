import { NextApiRequest, NextApiResponse } from 'next'
import { getNFTBalances } from '../../api-services/zapper.services'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { address } = req.query
  const result = await getNFTBalances(address as string)
  res.status(200).json(result)
}
