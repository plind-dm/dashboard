import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TransactionModal } from '../transaction/transaction-modal'
import { useTransactionState, useTransactionDispatch, getTransactions } from '../../context/transactions'
import noAssetImage from '../../public/images/no-assets.svg'
import { PaginatedTransaction } from '../transaction/transaction.pagination.module'
import { EmptyCard, UnderMaintenanceCard, Loader } from '../uiKit'
import { useAuthState } from '../../context/auth'
import { Devices } from '../../styles/constants/devices'
import { config } from '../../config/env.config'
import { NetworkDropdown } from '../network-dropdown/network-dropdown'

const $TransactionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 16px;
  @media ${Devices.laptop} {
    margin: 24px;
  }
`
const $NetworkDropdownWrapper = styled.div`
  width: min(80%, 224px);
  @media ${Devices.laptop} {
    width: max(25%, 330px);
  }
`

export const TransactionHistory = (): React.ReactElement => {
  const { groupedTransactions } = useTransactionState()
  const [modalOpen, setModalOpen] = useState(false)
  const dispatchTransaction = useTransactionDispatch()
  const { currentNetworkName, walletAddress } = useAuthState()

  const toggleModal = (): void => setModalOpen(!modalOpen)

  useEffect(() => {
    walletAddress && dispatchTransaction(getTransactions(walletAddress, currentNetworkName))
  }, [currentNetworkName, walletAddress])

  if (config.site.underMaintenanceMood) {
    return <UnderMaintenanceCard />
  }
  return (
    <>
      {groupedTransactions && groupedTransactions.length > 0 && (
        <$TransactionsGrid>
          <PaginatedTransaction itemsPerPage={9} onClick={toggleModal} />
        </$TransactionsGrid>
      )}
      {modalOpen && <TransactionModal isOpen={modalOpen} onClose={toggleModal} />}
      {groupedTransactions && groupedTransactions.length === 0 && (
        <$TransactionsGrid>
          <$NetworkDropdownWrapper>
            <NetworkDropdown menuPlacement="bottom" />
          </$NetworkDropdownWrapper>
          <EmptyCard image={noAssetImage} text="No transactions found">
            {`You haven’t gotten any transaction ${currentNetworkName} in yet.`}
          </EmptyCard>
        </$TransactionsGrid>
      )}
      {!groupedTransactions && <Loader />}
    </>
  )
}
