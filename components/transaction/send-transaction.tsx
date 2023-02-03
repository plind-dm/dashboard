import React, { useEffect, useState } from 'react'
import SentArrow from '../../public/images/sent-arrow.svg'
import ArrowTransaction from '../../public/images/arrow-transaction-icon.svg'
import GasIcon from '../../public/images/gas-icon.svg'
import { TransactionProps } from './transaction-types'
import Image from 'next/image'
import { paletteColors } from '../../styles/colors'
import dummyImage from '../../public/images/test/dummy-image.svg'
import FromIcon from '../../public/images/from-icon.svg'
import { Card } from './transaction-card'
import { TokenWrapper } from './transaction-token-wrapper'
import { GasFee } from './transaction-gas-fee'
import { networkLogo } from './transaction-types'
import { TransactionDetails } from './transaction-details'
import { ArrowAndTransactionTypeWrapper } from './transaction-arrow-and-type'
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
  $FromText,
  $ArrowWrapperSent,
  $ArrowNetworkImageWrapperDesktop,
  $GasFeeMobile
} from './transaction-styles'
import { useAuthState } from '../../context/auth'
import { $MediumTextRegular } from '../uiKit'
import { TokensSymbol } from '../../types'
import { getImageSrc } from '../../utils/transactions.utils'

export const SendTransaction = ({ transaction, onClick, isFirst, isLast }: TransactionProps): React.ReactElement => {
  const [transactionImage, setTransactionImage] = useState(dummyImage)
  const { currentNetworkName } = useAuthState()

  const imageGetter = async (): Promise<void> => {
    const transactionImageUrl = await getImageSrc(transaction.network, transaction.address)
    fetch(transactionImageUrl).then((response) =>
      response.status === 404 ? setTransactionImage(dummyImage) : setTransactionImage(transactionImageUrl)
    )
  }

  useEffect(() => {
    imageGetter()
  }, [])

  return (
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
            <Image src={SentArrow} />
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
            {transaction.gas.toPrecision(2)} {TokensSymbol[currentNetworkName]}
          </$MediumTextRegular>
        </$GasFeeMobile>
      </$TransactionContainer>
      <$TransactionContainer>
        <TransactionDetails>
          <TokenWrapper>
            <Image width="32px" height="32px" src={FromIcon} layout="fixed" />
          </TokenWrapper>
          <$SubTransaction>
            <$FromText>To</$FromText>
            <$SubTransactionText>
              {transaction.destination.slice(0, 4) +
                '...' +
                transaction.destination.slice(transaction.destination.length - 3, transaction.destination.length)}{' '}
            </$SubTransactionText>
          </$SubTransaction>
        </TransactionDetails>
        <$ArrowWrapperSent>
          <Image src={ArrowTransaction} width="17.6px" height="11px" />
        </$ArrowWrapperSent>
        <TransactionDetails>
          <TokenWrapper>
            <Image width="32px" height="32px" src={transactionImage} layout="fixed" />
          </TokenWrapper>
          <$SubTransactionText>{` ${
            Number(transaction.amount) < 1
              ? Number(transaction.amount).toPrecision(2)
              : Number(transaction.amount).toFixed(2)
          } ${transaction.symbol}`}</$SubTransactionText>
        </TransactionDetails>
      </$TransactionContainer>
      <GasFee>
        <Image src={GasIcon} width="16" height="16px" />
        <$HighLightTextGas>
          {transaction.gas.toPrecision(2)} {TokensSymbol[currentNetworkName]}
        </$HighLightTextGas>
      </GasFee>
    </Card>
  )
}
