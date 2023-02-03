import { NextApiRequest, NextApiResponse } from 'next'
import { getFiatRates } from '../../api-services/zapper.services'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const result = await getFiatRates()
  res.status(200).json(result)
}
