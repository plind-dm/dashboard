import styled from 'styled-components'
import lensIcon from '../../public/images/test/lensIcon.svg'
import Image from 'next/image'
import { Devices } from '../../styles/constants/devices'

interface SearchBarPropsInterface {
  text: string
  displayBar?: boolean
}

interface SearchBarStyleInterface {
  displayBar?: boolean
}

const $SearchBarContainer = styled.div<SearchBarStyleInterface>`
  display: ${(props) => (props.displayBar ? 'flex' : 'none')};
  align-items: center;
  position: relative;
  left: -20px;
`

const $SearchBar = styled.input<SearchBarStyleInterface>`
  display: ${(props) => (props.displayBar ? 'inline-block' : 'none')};
  height: 40px;
  font-size: 16px;
  padding: 0 0 0 40px;
  font-weight: 400;
  color: ${(props) => props.theme.dark.text};
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: none;
  border-radius: 8px;
  @media ${Devices.laptop} {
    min-width: 320px;
  }
`

const $LensWrapper = styled.span<SearchBarStyleInterface>`
  display: ${(props) => (props.displayBar ? 'inline-block' : 'none')};
  position: relative;
  height: 20px;
  width: 20px;
  left: 30px;
`

export const SearchBar = ({ text, displayBar }: SearchBarPropsInterface): React.ReactElement => {
  return (
    <$SearchBarContainer displayBar={displayBar}>
      <$LensWrapper displayBar={displayBar}>
        <Image src={lensIcon} layout="fill" />
      </$LensWrapper>
      <$SearchBar type="search" placeholder={text} displayBar={displayBar} />
    </$SearchBarContainer>
  )
}
