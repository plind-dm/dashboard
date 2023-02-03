import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import { $NormalTextBold } from '../uiKit'

interface InformationLinkPropsInterface {
  children: React.ReactText
  href: string
}

const $InformationLink = styled.a`
  display: none;
  @media ${Devices.laptop} {
    display: inline-block;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
`

export const InformationLink = ({ children, href }: InformationLinkPropsInterface): React.ReactElement => {
  return (
    <$InformationLink href={href}>
      <$NormalTextBold>{children}</$NormalTextBold>
    </$InformationLink>
  )
}
