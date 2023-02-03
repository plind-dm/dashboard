import Image from 'next/image'
import arrowIcon from '../../public/images/test/arrow-icon.svg'
import styled from 'styled-components'

const $ArrowIconWrapper = styled.div`
  height: 20px;
  width: 20px;
  transform: rotateZ(-90deg);
`

export const ArrowIcon = (): React.ReactElement => {
  return (
    <$ArrowIconWrapper>
      <Image src={arrowIcon} />
    </$ArrowIconWrapper>
  )
}
