/* eslint-disable react-hooks/rules-of-hooks */
// TODO Refactor
import styled from 'styled-components'
import usdImage from '../../public/images/test/usd-image.svg'
import eurImage from '../../public/images/test/eur-image.svg'
import cadImage from '../../public/images/test/canada-dollar-image.svg'
import gbpImage from '../../public/images/test/gbp-image.svg'
import arrowDown from '../../public/images/arrow-down.svg'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Devices } from '../../styles/constants/devices'
import { changeCurrency } from '../../context/balances/balance.actions'
import { fiatCurrencies } from '../../context/balances/balance.reducer.types'
import { useBalanceDispatch, useBalanceState } from '../../context/balances'
import { $NormalTextBold } from '../uiKit'
import { useDropdownState, useDropdownDispatch, setCurrencyDropdownState } from '../../context/dropdown'

const $TopBar = styled.div`
  position: relative;
  background-color: transparent;
  margin-bottom: 24px;
  color: ${(props) => props.theme.palette.text};
  width: 103px;
`

const $SelectedCurrency = styled(motion.div)`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  border-radius: 8px;
  @media ${Devices.laptop} {
    transition: all 0.3s ease-in-out;
    :hover {
      background-color: ${(props) => props.theme.palette.hover};
      cursor: pointer;
    }
  }
`

const $CurrencyOptions = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  top: 25px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  border-radius: 8px;
`

const $CurrencyItem = styled.div`
  width: 100px;
  display: flex;
  padding: 8px 16px 8px 0px;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  @media ${Devices.laptop} {
    top: 75px;
  }
  :hover {
    background-color: ${(props) => props.theme.palette.hover};
    cursor: pointer;
  }
`

const $ImageArrow = styled.div`
  position: relative;
  transition: all 0.3s;
  width: 11px;
  height: 6.3px;
  &[data-selected='false'] {
    img {
      transform: rotateZ(180deg);
    }
  }
`

export const TopBar = (): React.ReactElement => {
  const { currencyDropdownState } = useDropdownState()
  const currencyDropdownDispatch = useDropdownDispatch()
  const { currentCurrency } = useBalanceState()
  const useDispatch = useBalanceDispatch()
  const [isOpen, toggleOpen] = useState<boolean>()
  const [currency, setCurrency] = useState(currentCurrency)

  const toogleCurrencyDropdown = (): void => {
    currencyDropdownDispatch(setCurrencyDropdownState(!currencyDropdownState))
  }

  const usdCurrency = (): void => {
    setCurrency(fiatCurrencies.USD)
    currencyDropdownDispatch(setCurrencyDropdownState(!currencyDropdownState))
    useDispatch(changeCurrency(fiatCurrencies.USD))
  }
  const eurCurrency = (): void => {
    setCurrency(fiatCurrencies.EUR)
    currencyDropdownDispatch(setCurrencyDropdownState(!currencyDropdownState))
    useDispatch(changeCurrency(fiatCurrencies.EUR))
  }
  const cadCurrency = (): void => {
    setCurrency(fiatCurrencies.CAD)
    currencyDropdownDispatch(setCurrencyDropdownState(!currencyDropdownState))
    useDispatch(changeCurrency(fiatCurrencies.CAD))
  }
  const gbpCurrency = (): void => {
    setCurrency(fiatCurrencies.GBP)
    currencyDropdownDispatch(setCurrencyDropdownState(!currencyDropdownState))
    useDispatch(changeCurrency(fiatCurrencies.GBP))
  }

  useEffect(() => {
    toggleOpen(currencyDropdownState)
  }, [currencyDropdownState])

  const dropdownVariants = {
    open: {
      scaleY: 1,
      translateY: '-120%'
    },
    close: {
      scaleY: 0,
      translateY: '-70%',
      transition: {
        type: 'initial'
      }
    }
  }

  return (
    <$TopBar>
      <$SelectedCurrency onClick={() => toogleCurrencyDropdown()}>
        {currency === fiatCurrencies.USD ? (
          <>
            <Image src={usdImage} height="24px" width="24px" />
            <$NormalTextBold>USD</$NormalTextBold>
          </>
        ) : currency === fiatCurrencies.EUR ? (
          <>
            <Image src={eurImage} height="24px" width="24px" />
            <$NormalTextBold>EUR</$NormalTextBold>
          </>
        ) : currency === fiatCurrencies.GBP ? (
          <>
            <Image src={gbpImage} height="24px" width="24px" />
            <$NormalTextBold>GBP</$NormalTextBold>
          </>
        ) : (
          <>
            <Image src={cadImage} height="24px" width="24px" />
            <$NormalTextBold>CAD</$NormalTextBold>
          </>
        )}
        <$ImageArrow data-selected={isOpen}>
          <Image src={arrowDown} layout="fill" />
        </$ImageArrow>
      </$SelectedCurrency>
      <$CurrencyOptions variants={dropdownVariants} animate={isOpen ? 'open' : 'close'} initial={false}>
        <$CurrencyItem onClick={eurCurrency}>
          <Image src={eurImage} height="24px" width="24px" />
          <$NormalTextBold>EUR</$NormalTextBold>
        </$CurrencyItem>
        <$CurrencyItem onClick={usdCurrency}>
          <Image src={usdImage} height="24px" width="24px" />
          <$NormalTextBold>USD</$NormalTextBold>
        </$CurrencyItem>
        <$CurrencyItem onClick={cadCurrency}>
          <Image src={cadImage} height="24px" width="24px" />
          <$NormalTextBold>CAD</$NormalTextBold>
        </$CurrencyItem>
        <$CurrencyItem onClick={gbpCurrency}>
          <Image src={gbpImage} height="24px" width="24px" />
          <$NormalTextBold>GBP</$NormalTextBold>
        </$CurrencyItem>
      </$CurrencyOptions>
    </$TopBar>
  )
}
