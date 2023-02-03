import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import arrowImage from '../../public/images/arrow-down.svg'

const $ArrowWrapper = styled.a`
  margin: 0 0 9px 5px;
  position: relative;
  transform: rotateZ(90deg);
  height: 10px;
  width: 18px;
`

interface BackArrowProps {
  redirectTo: string
}

export const BackArrow = ({ redirectTo }: BackArrowProps): React.ReactElement => {
  return (
    <Link href={redirectTo} passHref>
      <$ArrowWrapper>
        <Image src={arrowImage} layout="fill" />
      </$ArrowWrapper>
    </Link>
  )
}
