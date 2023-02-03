/* eslint-disable react-hooks/rules-of-hooks */
import styled from 'styled-components'
import { NetworksLogo } from '../../types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useBalanceState, useBalanceDispatch, setNetworksToShow, setChangedBalances } from '../../context/balances'
import arrowDown from '../../public/images/arrow-down.svg'
import { SwitchComponent } from './switch.component'
import { $NormalTextBold } from './text-theme'
import { $Divider } from './divider'
import { useDropdownState, useDropdownDispatch, setNetworkSwitchState } from '../../context/dropdown'

interface networksVisibilityHandlerProps {
  open: boolean
}

const $NetworksList = styled.div<networksVisibilityHandlerProps>`
  display: flex;
  height: 40px;
  justify-content: space-between;
  padding: 13.5px 16px;
  border-radius: 8px;
  align-items: center;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  &:hover {
    background-color: ${(props) => props.theme.palette.hover};
    cursor: pointer;
  }
`

const $NetworkVisibilityHandler = styled.div<networksVisibilityHandlerProps>`
  display: ${(props) => (props.open ? 'inherit' : 'none')};
  position: absolute;
  margin-top: 8px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  border-radius: 8px;
  z-index: 1;
  width: 224px;
`

const $NetworkItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  align-items: center;
  &:hover {
    border-radius: 8px;
    background-color: ${(props) => props.theme.palette.hover};
    cursor: pointer;
  }
`

const $NetworkImageContainer = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`

const $ImageArrow = styled.div`
  &[data-selected='true'] {
    img {
      transform: rotateZ(180deg);
    }
  }
  font-size: 0px;
  line-height: 0px;
`

const $NetworkInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`

export const NetworkVisibilityHandler = (): React.ReactElement => {
  const { networkVisibilitySwtichState } = useDropdownState()
  const dropdownDispatch = useDropdownDispatch()
  const { networks, balances } = useBalanceState()
  const state = useBalanceState()
  const useDispatch = useBalanceDispatch()

  const [showDropdown, setShowDropdown] = useState(false)
  const [ethereumCheckedState, setEthereumCheckedState] = useState(networks['ETHEREUM'])
  const [polygonCheckedState, setPolygonCheckedState] = useState(networks['POLYGON'])
  const [bscCheckedState, setBscCheckedState] = useState(networks['BINANCE'])
  const [shyftCheckedState, setShyftCheckedState] = useState(networks.SHYFT)

  const handleNetworkVisibilitDropdown = (): void => {
    dropdownDispatch(setNetworkSwitchState(!networkVisibilitySwtichState))
  }

  const ethereumCheckedHandler = (): void => {
    setEthereumCheckedState(!ethereumCheckedState)
    useDispatch(setNetworksToShow({ ...networks, ETHEREUM: !ethereumCheckedState }))
  }
  const polygonCheckedHandler = (): void => {
    setPolygonCheckedState(!polygonCheckedState)
    useDispatch(setNetworksToShow({ ...networks, POLYGON: !polygonCheckedState }))
  }
  const bscCheckedHandler = (): void => {
    setBscCheckedState(!bscCheckedState)
    useDispatch(setNetworksToShow({ ...networks, BINANCE: !bscCheckedState }))
  }

  const shyftCheckedHandler = (): void => {
    setShyftCheckedState(!shyftCheckedState)
    useDispatch(setNetworksToShow({ ...networks, SHYFT: !shyftCheckedState }))
  }

  useEffect(() => {
    if (balances) useDispatch(setChangedBalances(balances, state))
  }, [networks])

  useEffect(() => {
    setShowDropdown(networkVisibilitySwtichState)
  }, [networkVisibilitySwtichState])

  return (
    <>
      <$NetworksList open={showDropdown} onClick={() => handleNetworkVisibilitDropdown()}>
        <$NormalTextBold>{'Networks'}</$NormalTextBold>
        <$ImageArrow data-selected={showDropdown}>
          <Image src={arrowDown} />
        </$ImageArrow>
      </$NetworksList>
      <$NetworkVisibilityHandler open={showDropdown}>
        <$NetworkItem>
          <$NetworkInfoContainer>
            <$NetworkImageContainer>
              <Image src={NetworksLogo.ETHEREUM} layout="fill" />
            </$NetworkImageContainer>
            <$NormalTextBold>Ethereum</$NormalTextBold>
          </$NetworkInfoContainer>
          <SwitchComponent onChange={ethereumCheckedHandler} checked={ethereumCheckedState} />
        </$NetworkItem>
        <$Divider />
        <$NetworkItem>
          <$NetworkInfoContainer>
            <$NetworkImageContainer>
              <Image src={NetworksLogo.POLYGON} layout="fill" />
            </$NetworkImageContainer>
            <$NormalTextBold>Polygon</$NormalTextBold>
          </$NetworkInfoContainer>
          <SwitchComponent onChange={polygonCheckedHandler} checked={polygonCheckedState} />
        </$NetworkItem>
        <$Divider />
        <$NetworkItem>
          <$NetworkInfoContainer>
            <$NetworkImageContainer>
              <Image src={NetworksLogo.BINANCE} layout="fill" />
            </$NetworkImageContainer>
            <$NormalTextBold> BSC</$NormalTextBold>
          </$NetworkInfoContainer>
          <SwitchComponent onChange={bscCheckedHandler} checked={bscCheckedState} />
        </$NetworkItem>
        <$Divider />
        <$NetworkItem>
          <$NetworkInfoContainer>
            <$NetworkImageContainer>
              <Image src={NetworksLogo.SHYFT} layout="fill" />
            </$NetworkImageContainer>
            <$NormalTextBold>{'SHYFT'}</$NormalTextBold>
          </$NetworkInfoContainer>
          <SwitchComponent onChange={shyftCheckedHandler} checked={shyftCheckedState} />
        </$NetworkItem>
      </$NetworkVisibilityHandler>
    </>
  )
}
