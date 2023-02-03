import styled from 'styled-components'
import { NetworksLogo, Routes } from '../../types'
import { Networks, NetworksId } from '../../types'
import { useEffect, useState } from 'react'
import { switchNetwork, useAuthDispatch } from '../../context/auth'
import Image from 'next/image'
import Select, { MenuPlacement } from 'react-select'
import { addBinanceRPC, addPolygonRPC, addShyftTestnetRPC, addShyftRPC } from '../../api-services/web3.service'
import dropdownIcon from '../../public/images/dropdownIcon.svg'
import { useAuthState } from '../../context/auth'
import { $NormalTextBold } from '../uiKit'
import { useRouter } from 'next/router'
import {
  useDropdownState,
  useDropdownDispatch,
  setNetworkDropdownState,
  setResetDropdown
} from '../../context/dropdown'
import { isInvalidNetworkName } from '../../utils/network-utils'
import { IProps } from '../../interfaces/Iprops'
import { config } from '../../config/env.config'

interface NetworkListItem {
  value: string
  label: React.ReactElement
}

const $DropdownMenu = styled(Select)`
  .react-select__indicator-separator {
    opacity: 0;
  }
  .react-select__control--is-focused {
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.palette.paleGrey};
    background-color: ${(props) => props.theme.palette.defaultGrey};
    box-shadow: unset;
  }
  .react-select__control {
    min-height: 48px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.palette.paleGrey};
    border-color: ${(props) => props.theme.palette.paleGrey} !important;
    background-color: ${(props) => props.theme.palette.defaultGrey};
    :hover {
      background-color: ${(props) => props.theme.palette.hover};
    }
  }
  .react-select__menu {
    background-color: ${(props) => props.theme.palette.defaultGrey};
    border-radius: 8px;
  }
  .react-select__option {
    border-radius: 8px;
  }
  .react-select__option:hover,
  .react-select__option--is-focused {
    border-radius: 8px;
    background-color: ${(props) => props.theme.palette.hover};
  }

  .react-select__option--is-selected {
    border-radius: 8px;
    background-color: ${(props) => props.theme.palette.hover};
  }
  .react-select__indicator,
  .react-select__dropdown-indicator {
    :hover {
      color: ${(props) => props.theme.dark.text};
    }
  }
  .react-select__value-container {
    font-family: 'Neuzeit Grotesk' !important;
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 16px !important;
    line-height: 16px !important;
  }
  .arrow {
    transform: rotateZ(180deg);
  }
  .react-select__control--menu-is-open {
    .arrow {
      transform: rotateZ(0deg);
    }
  }
`

const $DropdownElement = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  color: ${(props) => props.theme.dark.text};
`

const $ImageContainer = styled.div<IProps>`
  ${(props) => props.isDisabled && 'display: none'};
  margin-right: 21px;
`

export const NetworkDropdown = ({ menuPlacement }: { menuPlacement: string }): React.ReactElement => {
  const { networkDropdownState } = useDropdownState()
  const networkDropdownDispatch = useDropdownDispatch()
  const authDispatch = useAuthDispatch()
  const { currentNetworkName } = useAuthState()
  const [selectedTab, setSelectedTab] = useState<NetworkListItem>()
  const router = useRouter()

  const DropdownIndicator: React.FC = () => {
    return (
      <>
        <$ImageContainer
          className="arrow"
          isDisabled={isInvalidNetworkName(currentNetworkName) && router.pathname === Routes.POOL_SHYFT}
        >
          <Image src={dropdownIcon} />
        </$ImageContainer>
      </>
    )
  }
  const dropdownList: Array<NetworkListItem> = [
    {
      value: Networks.ETHEREUM,
      label: (
        <$DropdownElement>
          <Image src={NetworksLogo.ETHEREUM} height={'32px'} width={'32px'} />
          <$NormalTextBold>Ethereum</$NormalTextBold>
        </$DropdownElement>
      )
    },
    {
      value: Networks.POLYGON,
      label: (
        <$DropdownElement>
          <Image src={NetworksLogo.POLYGON} height={'32px'} width={'32px'} />
          <$NormalTextBold>Polygon</$NormalTextBold>
        </$DropdownElement>
      )
    },
    {
      value: Networks['BINANCE-SMART-CHAIN'],
      label: (
        <$DropdownElement>
          <Image src={NetworksLogo.BINANCE} height={'32px'} width={'32px'} />
          <$NormalTextBold>Binance</$NormalTextBold>
        </$DropdownElement>
      )
    },
    {
      value: config.site.isMainnet ? Networks.SHYFT : Networks.SHYFT_TESTNET,
      label: (
        <$DropdownElement>
          <Image
            src={config.site.isMainnet ? NetworksLogo.SHYFT : NetworksLogo.SHYFT_TESTNET}
            height={'32px'}
            width={'32px'}
          />
          <$NormalTextBold>Shyft</$NormalTextBold>
        </$DropdownElement>
      )
    }
  ]

  useEffect(() => {
    const current = dropdownList.find((d) => d.value.toLocaleLowerCase() === currentNetworkName)
    if (current === undefined) {
      setSelectedTab({
        value: Networks.SHYFT_TESTNET,
        label: (
          <$DropdownElement>
            <Image src={NetworksLogo.SHYFT} height={'32px'} width={'32px'} />
            <$NormalTextBold>Shyft</$NormalTextBold>
          </$DropdownElement>
        )
      })
    } else {
      setSelectedTab(current)
    }
  }, [currentNetworkName])

  const switchTab = (networkId: NetworksId, network: Networks, callback?: () => void): void => {
    if (callback) {
      callback()
    }
    authDispatch(switchNetwork(networkId, network))
  }

  const onDropdownChangeHandler = (newValue: unknown): void => {
    const valueOption = newValue as NetworkListItem
    setSelectedTab(valueOption)
    switch (valueOption.value) {
      case Networks.POLYGON:
        switchTab(NetworksId[Networks.POLYGON], Networks.POLYGON, addPolygonRPC)
        networkDropdownDispatch(setNetworkDropdownState(!networkDropdownState))
        break
      case Networks['BINANCE-SMART-CHAIN']:
        switchTab(NetworksId[Networks['BINANCE-SMART-CHAIN']], Networks['BINANCE-SMART-CHAIN'], addBinanceRPC)
        networkDropdownDispatch(setNetworkDropdownState(!networkDropdownState))
        break
      case Networks.SHYFT_TESTNET:
        switchTab(NetworksId[Networks.SHYFT_TESTNET], Networks.SHYFT_TESTNET, addShyftTestnetRPC)
        networkDropdownDispatch(setNetworkDropdownState(!networkDropdownState))
        break
      case Networks.SHYFT:
        switchTab(NetworksId[Networks.SHYFT], Networks.SHYFT, addShyftRPC)
        networkDropdownDispatch(setNetworkDropdownState(!networkDropdownState))
        break
      default:
        switchTab(NetworksId[Networks.ETHEREUM], Networks.ETHEREUM)
        networkDropdownDispatch(setNetworkDropdownState(!networkDropdownState))
        break
    }
  }

  const onDropdownOpenHandler = (): void => {
    networkDropdownDispatch(setNetworkDropdownState(!networkDropdownState))
  }

  const onDropdownCloseHandler = (): void => {
    networkDropdownDispatch(setResetDropdown())
  }
  return selectedTab ? (
    <$DropdownMenu
      isDisabled={isInvalidNetworkName(currentNetworkName) && router.pathname === Routes.POOL_SHYFT}
      components={{ DropdownIndicator }}
      options={dropdownList}
      menuPlacement={(menuPlacement as MenuPlacement) || 'top'}
      value={false}
      placeholder={selectedTab.label}
      className="react-select-container"
      classNamePrefix="react-select"
      onChange={onDropdownChangeHandler}
      onMenuOpen={() => onDropdownOpenHandler()}
      onMenuClose={() => onDropdownCloseHandler()}
    />
  ) : (
    <></>
  )
}
