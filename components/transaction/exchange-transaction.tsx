import { useEffect, useState } from 'react'
import { TransactionProps } from './transaction-types'
import Image from 'next/image'
import ArrowTransaction from '../../public/images/arrow-transaction-icon.svg'
import GasIcon from '../../public/images/gas-icon.svg'
import exchangeImage from '../../public/images/exchange-icon.svg'
import { paletteColors } from '../../styles/colors'
import dummyImage from '../../public/images/test/dummy-image.svg'
import { Card } from './transaction-card'
import { TokenWrapper } from './transaction-token-wrapper'
import { networkLogo } from './transaction-types'
import { TransactionDetails } from './transaction-details'
import { ArrowAndTransactionTypeWrapper } from './transaction-arrow-and-type'
import { GasFee } from './transaction-gas-fee'
import {
  $ArrowImageWrapper,
  $ArrowNetworkImageWrapper,
  $TextTransactionName,
  $TransactionNameWrapper,
  $HighLightTextGas,
  $TransactionContainer,
  $HighLightTextDate,
  $SubTransaction,
  $SubTransactionText,
  $ArrowWrapper,
  $ArrowNetworkImageWrapperDesktop,
  $GasFeeMobile
} from './transaction-styles'
import { useAuthState } from '../../context/auth'
import { TokensSymbol } from '../../types'
import { $MediumTextRegular } from '../uiKit'
import { getImageSrc } from '../../utils/transactions.utils'

export const ExchangeTransaction = ({
  transaction,
  onClick,
  isFirst,
  isLast
}: TransactionProps): React.ReactElement => {
  const [sendTransactionImage, setSendTransactionImage] = useState(dummyImage)
  const [receiveTransactionImage, setReceiveTransactionImage] = useState(dummyImage)
  const { currentNetworkName } = useAuthState()

  const sendImageGetter = async (): Promise<void> => {
    const transactionImageUrl = await getImageSrc(transaction.network, transaction.subTransactions[1].address)
    fetch(transactionImageUrl).then((response) =>
      response.status === 404 ? setSendTransactionImage(dummyImage) : setSendTransactionImage(transactionImageUrl)
    )
  }
  const receiveImageGetter = async (): Promise<void> => {
    const transactionImageUrl = await getImageSrc(transaction.network, transaction.subTransactions[0].address)
    fetch(transactionImageUrl).then((response) =>
      response.status === 404 ? setReceiveTransactionImage(dummyImage) : setReceiveTransactionImage(transactionImageUrl)
    )
  }

  useEffect(() => {
    sendImageGetter()
    receiveImageGetter()
  }, [])

  return (
    <>
      <Card onClick={onClick} isFirst={isFirst} isLast={isLast}>
        <$TransactionContainer data-is-first>
          <ArrowAndTransactionTypeWrapper>
            <$ArrowNetworkImageWrapperDesktop>
              <Image src={networkLogo(transaction)} width="32px" height="32px" />
            </$ArrowNetworkImageWrapperDesktop>
            <$ArrowNetworkImageWrapper>
              <Image src={networkLogo(transaction)} width="22px" height="22px" />
            </$ArrowNetworkImageWrapper>
            <$ArrowImageWrapper>
              <Image src={exchangeImage} />
            </$ArrowImageWrapper>
            <$TransactionNameWrapper>
              <$TextTransactionName>{transaction.name}</$TextTransactionName>
              <$HighLightTextDate color={paletteColors.greyV4}>
                {new Date(parseInt(transaction.timeStamp)).toLocaleTimeString(navigator.language, {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}
              </$HighLightTextDate>
            </$TransactionNameWrapper>
          </ArrowAndTransactionTypeWrapper>
          <$GasFeeMobile>
            <Image src={GasIcon} width="13" height="14px" />
            <$MediumTextRegular>
              {transaction.gas.toFixed(4)} {TokensSymbol[currentNetworkName]}
            </$MediumTextRegular>
          </$GasFeeMobile>
        </$TransactionContainer>
        <$TransactionContainer>
          <TransactionDetails>
            <TokenWrapper>
              <Image width="32px" height="32px" src={receiveTransactionImage} layout="fixed" />
            </TokenWrapper>
            <$SubTransaction>
              <$SubTransactionText>{transaction.subTransactions[0].amount.toFixed(2)}</$SubTransactionText>
              <$SubTransactionText>{transaction.subTransactions[0].symbol}</$SubTransactionText>
            </$SubTransaction>
          </TransactionDetails>
          <$ArrowWrapper>
            <Image src={ArrowTransaction} width="17.6px" height="11px" />
          </$ArrowWrapper>
          <TransactionDetails>
            <TokenWrapper>
              <Image width="32px" height="32px" src={sendTransactionImage} layout="fixed" />
            </TokenWrapper>
            <$SubTransactionText>{`${transaction.subTransactions[1].amount.toFixed(2)} ${
              transaction.subTransactions[1].symbol
            }`}</$SubTransactionText>
          </TransactionDetails>
        </$TransactionContainer>
        <GasFee>
          <Image src={GasIcon} width="16" height="16px" />
          <$HighLightTextGas>
            {transaction.gas.toFixed(4)} {TokensSymbol[currentNetworkName]}
          </$HighLightTextGas>
        </GasFee>
      </Card>
    </>
  )
}
