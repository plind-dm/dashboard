import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { BaseModal } from '../modal/base-modal'
import dummyImage from '../../public/images/test/dummy-image.svg'
import { useTransactionState } from '../../context/transactions'
import { getImageSrc } from '../../utils/transactions.utils'
import FromIcon from '../../public/images/from-icon.svg'
import { parseAddress } from '../../utils/address-utils'
import { $H5 } from '../../components/uiKit'
import { Devices } from '../../styles/constants/devices'
import ReceivedIcon from '../../public/images/receive-icon.svg'
import SentArrow from '../../public/images/sent-arrow.svg'
import ExternalLink from '../../public/images/external-link.svg'
import { getBaseNetworkScanUri } from '../../utils/transactions.utils'
import closeIcon from '../../public/images/close-icon.svg'
import copyIcon from '../../public/images/copy.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import copiedIcon from '../../public/images/copied.svg'
import copiedTooltip from '../../public/images/copied-tooltip.svg'
import CopyIcon from '../side-bar/copyIcon'
import { useAuthState } from '../../context/auth'

interface IModalProps {
  isOpen: boolean
  onClose: () => void
}

const $TxModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const $ModalBoxTransaction = styled.div`
  #box {
    padding: 20px;
    @media ${Devices.laptop} {
      padding: 20px 0px;
      width: 464px;
    }
  }
`

const $TitleTimeWrapper = styled.div`
  margin-bottom: 30px;
`

const $Title = styled($H5)`
  margin-top: 10px;
  margin-left: 20px;
  font-weight: 900;
`

const $ContentTransactionModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  border-radius: 8px;
  @media ${Devices.laptop} {
    border: none;
  }
`

const $Border = styled.div`
  height: 60px;
  padding: 10px;
  width: 100%;
  border-top: #575758 solid 1px;
`

const $BorderDetailTransaction = styled.div`
  min-height: 90px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: auto;
  width: 100%;
  border-top: #575758 solid 1px;
`

const $ItemDetail = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`

const $ItemDetailDirection = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const $ItemDetailNonce = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  @media ${Devices.laptop} {
    margin-top: 5px;
  }
`

const $ItemDetailBlockNumber = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  @media ${Devices.laptop} {
    margin-top: 10px;
  }
`

const $ItemDetailTransaction = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 10px;
  @media ${Devices.laptop} {
    margin-right: 0px;
    margin-left: 20px;
  }
`

const $From = styled.p`
  font-weight: 700;
  margin-left: 10px;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
    margin-bottom: 0px;
  }
`

const $TransactionFee = styled.p`
  font-weight: 700;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
  }
`

const $TimeStamp = styled.p`
  font-weight: normal;
  margin-top: 10px;
  margin-left: 20px;
  color: ${(props) => props.theme.palette.greyV4};
  @media ${Devices.laptop} {
    font-size: 1.25rem;
  }
`

const $GasLimit = styled.p`
  font-weight: 700;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
  }
`

const $Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  @media ${Devices.laptop} {
    flex-direction: row;
  }
`

const $GasPrice = styled.p`
  font-weight: 700;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
  }
`

const $Nonce = styled.p`
  font-weight: 700;
  margin-top: 12px;
  margin-right: 10px;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
  }
`

const $BlockNumber = styled.p`
  font-weight: 700;
  margin-top: 12px;
  margin-right: 10px;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
  }
`

const $Symbol = styled.p`
  font-weight: 700;
  @media ${Devices.laptop} {
    margin-left: 10px;
    font-size: 1.25rem;
  }
`

const $TextTransaction = styled.p`
  font-weight: 700;
  margin-left: 10px;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
    margin-top: 5px;
  }
`

const $ReceiveText = styled.p`
  font-weight: 700;
  margin-right: 10px;
  margin-top: 5px;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
  }
`

const $ImageFromWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
  margin-right: 10px;
`

const $ImageWrapper = styled.div`
  @media ${Devices.laptop} {
    margin-right: 10px;
  }
`

const $ImageWrapperTransaction = styled.div`
  margin-right: 10px;
  width: auto;
  margin-top: 10px;
`

const $Row = styled.div`
  display: flex;
`

const $Column = styled.div`
  display: flex;
  flex-direction: column;
`

const $RowImageAmount = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-right: 16px;
  @media ${Devices.laptop} {
    margin-top: 5px;
    margin-bottom: 0px;
  }
`

const $Amount = styled.p`
  font-weight: 700;
  margin-top: 5px;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
  }
`

const $AmountSymbol = styled.p`
  font-weight: 700;
  @media ${Devices.laptop} {
    overflow: hidden;
    margin-left: 10px;
    margin-top: 5px;
    font-size: 1.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 3;
    width: 50px;
  }
`

const $AmountSymbolWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  margin-top: 5px;
  @media ${Devices.laptop} {
    flex-direction: row;
    margin-top: 15px;
  }
`

const $TransactionImageText = styled.div`
  display: flex;
`

const $FromText = styled.p`
  font-weight: 700;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
    margin-bottom: 10px;
  }
`

const $To = styled.p`
  font-weight: 700;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
    margin-bottom: 10px;
  }
`

const $TextNumber = styled.p`
  font-weight: 700;
  margin-left: 10px;
  margin-top: 12px;
  margin-right: 10px;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
  }
`

const $TextNonce = styled.p`
  font-weight: 700;
  margin-left: 10px;
  margin-top: 12px;
  margin-right: 10px;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
    margin-right: 0px;
    margin-top: 6px;
  }
`
const $CopyImageWrapper = styled.div`
  position: absolute;
  top: 32%;
  left: 72%;
  @media ${Devices.laptop} {
    left: 84%;
  }
`

interface Size {
  width: string
  height: string
}

const $Images = styled.div<Size>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`

const $ImageWrapperCloseLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`

const $TitleLinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const $ImageLink = styled(Image)`
  padding-top: 10px;
  background-color: transparent;
  cursor: pointer;
`

const $Links = styled.a`
  align-items: center;
  margin-top: 4px;
`

const $CopyImage = styled.div`
  background-color: transparent;
  margin-left: 16px;
`
export const TransactionModal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  const { currentTransaction } = useTransactionState()
  const { currentNetworkName } = useAuthState()
  const [subTransactionImages, setSubTransactionImages] = useState<Array<string>>([])
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setText(
      currentTransaction.destination && currentTransaction.destination === 'outgoing'
        ? currentTransaction.from
        : currentTransaction.destination
    )
  }, [])

  useEffect(() => {
    const imageGetterTransaction = (): void => {
      currentTransaction.subTransactions.map(async (tx) => {
        subTransactionImages.push(await getImageSrc(currentTransaction.network, tx.address))
        setSubTransactionImages([...subTransactionImages])
      })
    }
    imageGetterTransaction()
  }, [])

  const copyToClipboard = (event: React.MouseEvent): void => {
    event.stopPropagation()
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <$ModalBoxTransaction>
      <BaseModal isOpen={isOpen} onClose={onClose} noCloseButton>
        <$TxModalContainer>
          <$TitleTimeWrapper>
            <$TitleLinkWrapper>
              <$Title>Transaction Details</$Title>
              <$ImageWrapperCloseLink>
                <$Links
                  target="_blank"
                  href={`${getBaseNetworkScanUri(currentNetworkName)}${currentTransaction.hash}`}
                  rel="noopener noreferrer"
                >
                  <Image src={ExternalLink} width="25px" height="25px" />
                </$Links>
                <$ImageLink onClick={onClose} src={closeIcon} alt="close-icon" height="35px" width="35px" />
              </$ImageWrapperCloseLink>
            </$TitleLinkWrapper>
            <$TimeStamp>{new Date(parseInt(currentTransaction.timeStamp)).toLocaleTimeString('en-US')}</$TimeStamp>
          </$TitleTimeWrapper>
          <$ContentTransactionModal>
            <$BorderDetailTransaction>
              <$ItemDetailTransaction>
                {currentTransaction.subTransactions.map((subTransaction, index) => (
                  <>
                    <$Row>
                      <$Column>
                        <$TransactionImageText>
                          <$ReceiveText key={subTransaction.type}>
                            {subTransaction.type === 'incoming' ? 'Received' : 'Sent'}
                          </$ReceiveText>
                          <div>
                            {subTransaction.type === 'incoming' ? (
                              <Image src={ReceivedIcon} />
                            ) : (
                              <Image src={SentArrow} />
                            )}
                          </div>
                        </$TransactionImageText>
                        <$RowImageAmount>
                          <$ImageWrapperTransaction>
                            <Image src={subTransactionImages[index] || dummyImage} width="30px" height="30px" />
                          </$ImageWrapperTransaction>
                          <$AmountSymbolWrapper>
                            <$Amount>
                              {Number(subTransaction.amount) < 1
                                ? Number(subTransaction.amount).toPrecision(2)
                                : Number(subTransaction.amount).toFixed(2)}
                            </$Amount>
                            <$AmountSymbol>{subTransaction.symbol}</$AmountSymbol>
                          </$AmountSymbolWrapper>
                        </$RowImageAmount>
                      </$Column>
                    </$Row>
                  </>
                ))}
              </$ItemDetailTransaction>
            </$BorderDetailTransaction>
            <$Border>
              <$ItemDetailDirection>
                <$TextTransaction>
                  {currentTransaction.direction === 'outgoing' ? <$To>To</$To> : <$FromText>From</$FromText>}
                </$TextTransaction>
                <$ImageFromWrapper>
                  <$ImageWrapper>
                    <Image width="32px" height="32px" src={FromIcon} />
                  </$ImageWrapper>
                  <$From>
                    {currentTransaction.direction && currentTransaction.direction === 'outgoing'
                      ? parseAddress(currentTransaction.destination)
                      : parseAddress(currentTransaction.from)}
                  </$From>
                  <$CopyImage>
                    {copied === true ? (
                      <>
                        <$Images width="30px" height="30px">
                          <Image src={copiedIcon} layout="fill" />
                        </$Images>
                        <$CopyImageWrapper>
                          <$Images width="80px" height="40px">
                            <Image src={copiedTooltip} layout="fill" />
                          </$Images>
                        </$CopyImageWrapper>
                      </>
                    ) : (
                      <CopyToClipboard text={text}>
                        <CopyIcon src={copyIcon} onClick={copyToClipboard} onHoverBgColor={'#4D4A53'} />
                      </CopyToClipboard>
                    )}
                  </$CopyImage>
                </$ImageFromWrapper>
              </$ItemDetailDirection>
            </$Border>
            <$Border>
              <$ItemDetail>
                <$TextTransaction>Transaction Fee</$TextTransaction>
                <$Wrapper>
                  <$TransactionFee>{currentTransaction.gas.toFixed(8)}</$TransactionFee>
                  <$Symbol>{currentTransaction.symbol}</$Symbol>
                </$Wrapper>
              </$ItemDetail>
            </$Border>
            <$Border>
              <$ItemDetail>
                <$TextTransaction>Gas Limit</$TextTransaction>
                <$Wrapper>
                  <$GasLimit>{currentTransaction.gasLimit.toFixed(8)}</$GasLimit>
                  <$Symbol>{currentTransaction.symbol}</$Symbol>
                </$Wrapper>
              </$ItemDetail>
            </$Border>
            <$Border>
              <$ItemDetail>
                <$TextTransaction>Gas Price</$TextTransaction>
                <$Wrapper>
                  <$GasPrice>{currentTransaction.gasPrice}</$GasPrice>
                  <$Symbol>{currentTransaction.symbol}</$Symbol>
                </$Wrapper>
              </$ItemDetail>
            </$Border>
            <$Border>
              <$ItemDetailNonce>
                <$TextNonce>Nonce</$TextNonce>
                <$Nonce>{currentTransaction.nonce}</$Nonce>
              </$ItemDetailNonce>
            </$Border>
            <$Border>
              <$ItemDetailBlockNumber>
                <$TextNumber>Block Number</$TextNumber>
                <$BlockNumber>{currentTransaction.blockNumber}</$BlockNumber>
              </$ItemDetailBlockNumber>
            </$Border>
          </$ContentTransactionModal>
        </$TxModalContainer>
      </BaseModal>
    </$ModalBoxTransaction>
  )
}
