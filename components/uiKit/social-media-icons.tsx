import styled from 'styled-components'
import Image from 'next/image'
import { Devices } from '../../styles/constants/devices'
import { useDevices } from '../../hooks/useDevices'

const $SocialMediaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.theme.palette.black};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  @media ${Devices.laptop} {
    width: 36px;
    height: 36px;
    &:hover {
      background-color: ${(props) => props.theme.palette.hover};
      cursor: pointer;
    }
  }
`

interface SocialMediaIconProps {
  imagePath: string
}

export const SocialMediaIcon = ({ imagePath }: SocialMediaIconProps): React.ReactElement => {
  const { isMobile } = useDevices()

  return (
    <$SocialMediaWrapper>
      <Image
        src={imagePath}
        width={isMobile ? '16px' : '24px'}
        height={isMobile ? '12px' : '18px'}
        layout="fixed"
        quality="100"
      />
    </$SocialMediaWrapper>
  )
}
