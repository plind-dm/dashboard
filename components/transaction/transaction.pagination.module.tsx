import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import RightArrowTransaction from '../../public/images/arrow-transaction-icon.svg'
import GreyArrow from '../../public/images/grey-arrow.svg'
import LeftArrowTransaction from '../../public/images/left-arrow.svg'
import Image from 'next/image'
import { NetworkDropdown } from '../network-dropdown/network-dropdown'
import { setCurrentTransaction, useTransactionDispatch, useTransactionState } from '../../context/transactions'
import { Transaction, TransactionWithDate } from '../../types'
import { ReceivedTransaction } from './received-transaction'
import { SendTransaction } from './send-transaction'
import { TransactionDateText } from '../transaction/transaction.date.text'
import { ExchangeTransaction } from './exchange-transaction'

const $PaginationIndexes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
`

const $PaginationIndexButton = styled(Image)`
  background-color: transparent;
  color: ${(props) => props.theme.dark.text};
  border: none;
  font-size: 24px;
  margin-left: 10px;
  transition: all 0.3s;
  @media ${Devices.laptop} {
    &:hover {
      color: ${(props) => props.theme.dark.primary};
      cursor: pointer;
    }
  }
`

const $PaginationIndexButtonRight = styled(Image)`
  background-color: transparent;
  color: ${(props) => props.theme.dark.text};
  border: none;
  font-size: 24px;
  margin-right: 10px;
  transition: all 0.3s;
  @media ${Devices.laptop} {
    &:hover {
      color: ${(props) => props.theme.dark.primary};
      cursor: pointer;
    }
  }
`

const $PaginationIndexValue = styled.div`
  display: none;
  @media ${Devices.laptop} {
    display: inline-block;
    min-width: 10ch;
    font-family: 'Neuzeit Grotesk';
    font-size: 0.875rem;
    align-self: center;
    text-align: center;
  }
`

const $PaginationSearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const $PaginationImageWrapper = styled.div`
  margin-left: 24px;
  margin-top: 4px;
  @media ${Devices.laptop} {
    margin-left: 0px;
  }
`
const $NetworkDropdownWrapper = styled.div`
  width: min(80%, 224px);
  @media ${Devices.laptop} {
    width: max(25%, 330px);
  }
`
type CallbackFunction = () => React.ReactElement
interface ITransactionTypes {
  [key: string]: CallbackFunction
}
interface IPaginationProps {
  itemsPerPage: number
  onClick: VoidFunction
}

export const PaginatedTransaction = ({ itemsPerPage, onClick }: IPaginationProps): React.ReactElement => {
  const [paginationIndex, setPaginationIndex] = useState(1)
  const { groupedTransactions } = useTransactionState()
  const dispatchTransaction = useTransactionDispatch()
  const [transactionsToShow, setTransactionsToShow] = useState<Array<TransactionWithDate>>([])

  useEffect(() => {
    if (groupedTransactions) {
      const paginatedTx = groupedTransactions.filter(
        (transaction) =>
          groupedTransactions.indexOf(transaction) >= itemsPerPage * (paginationIndex - 1) &&
          groupedTransactions.indexOf(transaction) <= itemsPerPage * paginationIndex
      )
      setTransactionsToShow(paginatedTx)
    }
  }, [paginationIndex, groupedTransactions])

  if (transactionsToShow.length === 0) {
    return <></>
  }

  const onTransactionClick = (transaction: Transaction): void => {
    dispatchTransaction(setCurrentTransaction(transaction))
    onClick()
  }

  const previous = (): void => {
    setPaginationIndex(paginationIndex - 1)
  }

  const next = (): void => {
    setPaginationIndex(paginationIndex + 1)
  }

  const getTransactionType = (transaction: Transaction, isFirst: boolean, isLast: boolean): React.ReactElement => {
    const receivedTransaction = (): React.ReactElement => (
      <ReceivedTransaction
        transaction={transaction}
        key={transaction.hash}
        onClick={() => onTransactionClick(transaction)}
        isFirst={isFirst}
        isLast={isLast}
      />
    )
    const sendTransaction = (): React.ReactElement => (
      <SendTransaction
        transaction={transaction}
        key={transaction.hash}
        onClick={() => onTransactionClick(transaction)}
        isFirst={isFirst}
        isLast={isLast}
      />
    )
    const exchangeTransaction = (): React.ReactElement => (
      <ExchangeTransaction
        transaction={transaction}
        key={transaction.hash}
        onClick={() => onTransactionClick(transaction)}
        isFirst={isFirst}
        isLast={isLast}
      />
    )

    const transactionsTypes: ITransactionTypes = {
      Receive: receivedTransaction,
      Send: sendTransaction,
      Exchange: exchangeTransaction
    }

    return transactionsTypes[transaction.name]()
  }

  return (
    <>
      <$PaginationSearchWrapper>
        <$NetworkDropdownWrapper>
          <NetworkDropdown menuPlacement="bottom" />
        </$NetworkDropdownWrapper>
        <$PaginationIndexes>
          <$PaginationIndexButtonRight
            src={paginationIndex > 1 ? LeftArrowTransaction : GreyArrow}
            width="17.6px"
            height="11px"
            onClick={() => (paginationIndex > 1 ? previous() : null)}
          />
          <$PaginationIndexValue>
            {paginationIndex} of {Math.ceil(transactionsToShow.length / itemsPerPage)}
          </$PaginationIndexValue>
          <$PaginationImageWrapper>
            <$PaginationIndexButton
              src={RightArrowTransaction}
              width="17.6px"
              height="11px"
              onClick={() => (paginationIndex < Math.ceil(transactionsToShow.length / itemsPerPage) ? next() : null)}
            />
          </$PaginationImageWrapper>
        </$PaginationIndexes>
      </$PaginationSearchWrapper>
      {transactionsToShow.map((transactionWithDate, index: number) => {
        return (
          <div key={index}>
            <TransactionDateText>{transactionWithDate.date}</TransactionDateText>
            {transactionWithDate.transactions.map((transaction, index) => {
              const isFirst = index === 0
              const isLast = index === transactionWithDate.transactions.length - 1
              return getTransactionType(transaction, isFirst, isLast)
            })}
          </div>
        )
      })}
    </>
  )
}
