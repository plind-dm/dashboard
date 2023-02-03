import styled from 'styled-components'
import { $H5, $ImageWrapper } from '../uiKit'
import Image from 'next/image'

interface INotFound {
  text?: string
}

const $Card = styled.div`
  background-color: ${(props) => props.theme.palette.blackModal};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  border-radius: 8px;
  padding: 15px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const $NotFoundText = styled($H5)`
  margin-top: 10px;
  font-weight: normal;
`

export const NotFound = (props: INotFound): React.ReactElement => {
  return (
    <$Card>
      <$ImageWrapper height="55px" width="55px">
        <Image src="/images/not-found-icon.png" layout="fill" />
      </$ImageWrapper>
      <$NotFoundText>{props.text}</$NotFoundText>
    </$Card>
  )
}
