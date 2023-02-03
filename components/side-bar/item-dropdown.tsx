import React, { useState } from 'react'
import styled from 'styled-components'
import avatarWallet from '../../public/images/avatar-wallet.svg'
import copyIcon from '../../public/images/copy.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Image from 'next/image'
import copiedIcon from '../../public/images/copied.svg'
import { useAuthDispatch } from '../../context/auth'
import { switchAccount } from '../../context/auth/auth.actions'
import { parseAddress } from '../../utils/address-utils'
import CopyIcon from './copyIcon'
import { $NormalTextBold, $SmallTextRegular, Tooltip } from '../uiKit'
import { useBalanceDispatch, resetBalance } from '../../context/balances'
import { useNftDispatch, resetNft } from '../../context/nfts'
import { useStakingDispatch, resetStaking } from '../../context/staking'

const $MenuItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.palette.hover};
  }
`
const $WalletItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`

const $WrapperWallet = styled.div`
  display: flex;
  flex-direction: column;
`

const $CopyImage = styled.div`
  background-color: transparent;
  padding-right: 15px;
`

const $RelativeDiv = styled.div`
  position: relative;
`
interface Size {
  width: string
  height: string
}

const $Images = styled.div<Size>`
  position: relative;
  width: 80px;
  width: ${(props) => props.width};
  height: 40px;
  height: ${(props) => props.height};
`
interface ItemDropdownProps {
  account: string
  toggleDropdown: React.MouseEventHandler
}

export const ItemDropdown = ({ account, toggleDropdown }: ItemDropdownProps): React.ReactElement => {
  const [copied, setCopied] = useState(false)
  const [text, setText] = useState('')
  const authDispatch = useAuthDispatch()
  const balanceDispatch = useBalanceDispatch()
  const nftDispatch = useNftDispatch()
  const stakingDispatch = useStakingDispatch()

  const changeAccount = (event: React.MouseEvent, account: string): void => {
    authDispatch(switchAccount(account))
    toggleDropdown(event)
    balanceDispatch(resetBalance())
    nftDispatch(resetNft())
    stakingDispatch(resetStaking())
  }

  const copyToClipboard = (event: React.MouseEvent): void => {
    event.stopPropagation()
    setCopied(true)
    setText(account)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <>
      <$MenuItem onClick={(event) => changeAccount(event, account)}>
        <$WalletItem>
          <Image src={avatarWallet} />
          <$WrapperWallet>
            <$NormalTextBold>{account && parseAddress(account)}</$NormalTextBold>
            <$SmallTextRegular>{'Ethereum'}</$SmallTextRegular>
          </$WrapperWallet>
        </$WalletItem>
        <$CopyImage>
          {copied === true ? (
            <$RelativeDiv>
              <$Images width="30px" height="30px">
                <Image src={copiedIcon} layout="fill" />
              </$Images>
              <Tooltip text={'Copied'} show={copied} />
            </$RelativeDiv>
          ) : (
            <CopyToClipboard text={`${text}`}>
              <CopyIcon src={copyIcon} onClick={copyToClipboard} onHoverBgColor={'#4D4A53'} />
            </CopyToClipboard>
          )}
        </$CopyImage>
      </$MenuItem>
    </>
  )
}
