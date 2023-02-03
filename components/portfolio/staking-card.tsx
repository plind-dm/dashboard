import { ExhibitCard } from '../exhibit-card/exhibit-card'
import stakingIcon from '../../public/images/staking-icon.svg'
import { useStakingState } from '../../context/staking'
import { Loader } from '../uiKit/loader'
import { AmountCard } from '../../interfaces/card-props'
import { useFormatter } from '../../hooks/useFormatter'

export const StakingCard = ({ loading }: AmountCard): React.ReactElement => {
  const { stakedBalanceFiat } = useStakingState()
  const { formatFiatValue } = useFormatter()

  if (stakedBalanceFiat === 'loading')
    return (
      <ExhibitCard text="Staking" image={stakingIcon}>
        {loading && <Loader size={0.75} />}
      </ExhibitCard>
    )
  if (parseFloat(stakedBalanceFiat) > 0)
    return (
      <ExhibitCard text="Staking" image={stakingIcon}>
        {formatFiatValue(+stakedBalanceFiat)}
      </ExhibitCard>
    )
  return <></>
}
