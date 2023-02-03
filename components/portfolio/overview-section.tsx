import { ReactNode } from 'react'
import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'

const $OverviewSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 16px 0;
  flex-wrap: wrap;
  @media ${Devices.laptop} {
    margin: 40px 24px;
    gap: 24px;
    .loading {
      width: 100%;
      justify-content: center;
    }
  }
`

interface IOverviewSection {
  children: ReactNode
}

export const OverviewSection = (props: IOverviewSection): React.ReactElement => {
  return <$OverviewSection>{props.children}</$OverviewSection>
}
