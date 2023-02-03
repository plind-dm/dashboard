import styled from 'styled-components'
import Image from 'next/image'
import { Devices } from '../../styles/constants/devices'
import { Transaction } from '../../types'
import { $H6, $HighLightText } from '../uiKit'
import { paletteColors } from '../../styles/colors'

const $Card = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border-radius: 8px;
  width: 100%;
  padding: 15px 5px;
  margin: 10px auto;
  justify-content: space-evenly;
  align-items: center;
  @media ${Devices.laptop} {
    width: 30%;
  }
`

const $TokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  @media ${Devices.laptop} {
  }
`

export const TransactionItem = ({ transaction }: { transaction: Transaction }): React.ReactElement => {
  return (
    <$Card>
      <div>
        <$H6>{transaction.name}</$H6>
        <$HighLightText color={paletteColors.greyV4}>
          {new Date(parseInt(transaction.timeStamp)).toLocaleTimeString('en-US')}
        </$HighLightText>
      </div>

      <div>
        <$HighLightText color={paletteColors.greyV4}>{transaction.name === 'Receive' ? 'From' : 'To'}</$HighLightText>
        <$H6>
          {transaction.from.slice(0, 5) +
            '...' +
            transaction.from.slice(transaction.from.length - 4, transaction.from.length)}
        </$H6>
      </div>
      <$TokenWrapper>
        <Image
          width="40px"
          height="40px"
          src={
            'https://storage.googleapis.com/zapper-fi-assets/tokens/' +
            transaction.network +
            '/' +
            transaction.address +
            '.png'
          }
          layout="fixed"
        />
        <$HighLightText color={paletteColors.greyV4}>{transaction.symbol}</$HighLightText>
      </$TokenWrapper>
    </$Card>
  )
}
