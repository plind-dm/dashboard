import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { getTokenHistory } from '../../../context/token/token.actions'
import { useTokenDispatch } from '../../../context/token'
import PageLayout from '../../../components/layouts/page-layout'
import { TokenDetail } from '../../../components/token-detail'
import { useBalanceState } from '../../../context/balances'
import { Networks } from '../../../types'

const Post = (): ReactElement => {
  const { currentCurrency, graphTimeFrame } = useBalanceState()
  const tokenDispatch = useTokenDispatch()
  const router = useRouter()
  const { network, tokenId } = router.query

  useEffect(() => {
    const net = (network as string) !== Networks.SHYFT ? (network as string) : 'ethereum'
    tokenDispatch(
      getTokenHistory({
        address: tokenId as string,
        network: net,
        timeFrame: graphTimeFrame,
        currency: currentCurrency
      })
    )
  }, [network, tokenId, currentCurrency, graphTimeFrame])

  return (
    <>
      <PageLayout>
        <TokenDetail network={network as string} />
      </PageLayout>
    </>
  )
}

export default Post
