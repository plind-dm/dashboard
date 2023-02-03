import { NextApiRequest, NextApiResponse } from 'next'
import { getSupportedApps } from '../../api-services/zapper.services'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { stakingType } = req.query
  const result = await getSupportedApps(stakingType as string)
  res.status(200).json(result)
}
