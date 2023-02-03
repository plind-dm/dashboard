import { ExhibitCard } from '../exhibit-card/exhibit-card'
import walletIcon from '../../public/images/test/wallet-icon.svg'
import { useBalanceState } from '../../context/balances'
import { Loader } from '../uiKit/loader'
import { AmountCard } from '../../interfaces/card-props'
import Link from 'next/link'
import { useFormatter } from '../../hooks/useFormatter'
import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'

const $CustomLink = styled.a`
  width: 100%;
  @media ${Devices.laptop} {
    width: 330px;
  }
`
export const WalletCard = ({ loading }: AmountCard): React.ReactElement => {
  const { balanceFiat } = useBalanceState()
  const { formatFiatValue } = useFormatter()

  if (balanceFiat === 'loading')
    return (
      <ExhibitCard text="Wallet" image={walletIcon}>
        {loading && <Loader size={0.75} />}
      </ExhibitCard>
    )
  if (parseFloat(balanceFiat) > 0)
    return (
      <Link href={'/wallet'} passHref>
        <$CustomLink>
          <ExhibitCard text="Wallet" image={walletIcon}>
            {formatFiatValue(+balanceFiat)}
          </ExhibitCard>
        </$CustomLink>
      </Link>
    )
  return <></>
}
