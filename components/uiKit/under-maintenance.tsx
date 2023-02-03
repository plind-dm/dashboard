import styled from 'styled-components'
import Image from 'next/image'
import { $Text } from '.'
import { Devices } from '../../styles/constants/devices'
import SettingsIcon from '../../public/images/settings.svg'

const $Card = styled.div`
  min-width: 316px;
  min-height: 161px;
  height: auto;
  width: 100%;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 8px;
  position: relative;
  margin-top: 40px;
  @media ${Devices.tablet} {
    max-width: 411px;
    margin: auto;
    height: 100%;
    min-height: 207px;
    margin-top: 100px;
  }
`

const $ImageToShow = styled.div`
  position: relative;
  height: 56px;
  width: 56px;
  @media ${Devices.tablet} {
    margin-bottom: 30px;
  }
`

const $Title = styled($Text)`
  font-size: 1rem;
  line-height: 1.375rem;
  font-style: normal;
  font-weight: bold;
  @media ${Devices.laptop} {
    font-size: 1.125rem;
    line-height: 1.5625rem;
  }
`

const $Subtitle = styled($Text)`
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1.25rem;
  @media ${Devices.laptop} {
    font-size: 1rem;
    line-height: 1.375rem;
  }
`

export const UnderMaintenanceCard = (): React.ReactElement => {
  return (
    <$Card>
      <$ImageToShow>
        <Image src={SettingsIcon} layout="fill" />
      </$ImageToShow>
      <$Title>{'Sorry, we’re down for maintenance.'}</$Title>
      <$Subtitle>{'We’ll be back up shortly.'}</$Subtitle>
    </$Card>
  )
}
