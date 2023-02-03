import { NextApiRequest, NextApiResponse } from 'next'
import { getGasPrice } from '../../api-services/zapper.services'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { network } = req.query
  const result = await getGasPrice(network as string)
  res.status(200).json(result)
}
