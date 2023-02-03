export interface liquidityCalculationReturn {
  dailyFeeShare: string
  yearlyFeeShare: string
  aprYear: string
  aprWeek: string
  aprDay: string
  dailyRewardUsd?: string
}

export const liquidityCalculation = (
  liquidity: number,
  volume: number,
  fee: number,
  tokenAmount?: number
): liquidityCalculationReturn => {
  const dailyFeeShare = volume * fee
  const yearlyFeeShare = dailyFeeShare * 365
  const aprYear = (yearlyFeeShare / liquidity) * 100
  const aprWeek = aprYear / (4 * 12)
  const aprDay = aprYear / 365
  let dailyRewardUsd = 'N/A'
  if (tokenAmount) {
    dailyRewardUsd = ((aprDay / 100) * tokenAmount).toString()
  }
  if (liquidity === 0 || volume === 0 || fee === 0) {
    return {
      dailyFeeShare: 'N/A',
      yearlyFeeShare: 'N/A',
      aprYear: 'N/A',
      aprWeek: 'N/A',
      aprDay: 'N/A',
      dailyRewardUsd
    }
  }
  return {
    dailyFeeShare: dailyFeeShare.toFixed(2),
    yearlyFeeShare: yearlyFeeShare.toFixed(2),
    aprYear: `${aprYear.toFixed(2)}% (1y)`,
    aprWeek: `${aprWeek.toFixed(2)}% (1w)`,
    aprDay: `${aprDay.toFixed(2)}% (1d)`,
    dailyRewardUsd
  }
}
