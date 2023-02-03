import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import walletIcon from '../../public/images/test/wallet-icon.svg'
import { WalletCard } from './wallet-card'
import { $Divider, $H2, ChildPageContainer, BackArrow, $H3, $H5 } from '../uiKit'
import { useBalanceState } from '../../context/balances'
import { useEffect, useState } from 'react'
import { Devices } from '../../styles/constants/devices'
import { useFormatter } from '../../hooks/useFormatter'
import { Routes, Tabs } from '../../types'

const $TitleWrapper = styled($H2)`
  display: flex;
  column-gap: 16px;
`

const $TitleSectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media ${Devices.laptop} {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 16px;
    > h5 {
      font-weight: 900;
      font-style: normal;
      font-size: 2.5rem;
      line-height: 2.75rem;
    }
  }
`

const $Title = styled($H3)``

const $CurrencyAmount = styled($H5)``

const $WalletImage = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
`

const $HorizontalDivider = styled($Divider)`
  @media ${Devices.laptop} {
    width: calc(100% + 70px);
    margin: 0 0 0 -35px;
  }
`

const $CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 16px;
  row-gap: 16px;
  @media ${Devices.mobileM} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${Devices.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 16px;
    column-gap: 24px;
    row-gap: 24px;
  }
  @media ${Devices.laptopM} {
    grid-template-columns: repeat(4, 212px);
  }
`

export const Wallet = (): React.ReactElement => {
  const { networks, fiatRates, balanceFiat, convertedBalances, currentCurrency } = useBalanceState()
  const [totalBalance, setTotalBalance] = useState(balanceFiat)
  const [filteredTokens, setFilteredTokens] = useState(convertedBalances)
  const { formatFiatValue } = useFormatter()

  useEffect(() => {
    if (fiatRates) setTotalBalance((parseFloat(balanceFiat) * fiatRates[currentCurrency]).toFixed(2))
  }, [fiatRates, currentCurrency])

  useEffect(() => {
    if (convertedBalances) {
      const ar = convertedBalances.filter((token) => {
        return networks[token.networkId.split('-')[0].toUpperCase()]
      })
      setFilteredTokens(ar)
    }
  }, [currentCurrency, networks])

  return (
    <ChildPageContainer>
      <BackArrow redirectTo={`${Routes.PORTFOLIO}?tab=${Tabs.MAIN}`} />
      <$TitleWrapper>
        <$WalletImage>
          <Image src={walletIcon} layout="fill" />
        </$WalletImage>
        <$TitleSectorWrapper>
          <$Title>Wallet</$Title>
          <$CurrencyAmount>{`${formatFiatValue(+totalBalance)}`}</$CurrencyAmount>
        </$TitleSectorWrapper>
      </$TitleWrapper>
      <$HorizontalDivider />
      <$CardsContainer>
        {filteredTokens &&
          filteredTokens.map((network) => {
            return network.products.map((token) => {
              return (
                <Link href={`/${token.network}/token/${token.address}`} passHref key={token.address}>
                  <a>
                    <WalletCard tokenInformation={token} networkImage={network.networkImage} />
                  </a>
                </Link>
              )
            })
          })}
      </$CardsContainer>
    </ChildPageContainer>
  )
}
