import styled from 'styled-components'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, useCycle } from 'framer-motion'
import logo from '../../public/images/shyft-sidebar-logo.svg'
import textLogo from '../../public/images/text-logo.svg'
import overviewIconEnabled from '../../public/images/overview-icon-enabled.svg'
import overviewIconDisabled from '../../public/images/overview-icon-disabled.svg'
// import poolIconDisabled from '../../public/images/pool-icon-disabled.svg'
// import poolIconEnabled from '../../public/images/pool-icon-enabled.svg'
import shyftPoolIconDisabled from '../../public/images/shyft-pool-icon-disabled.svg'
import shyftPoolIconEnabled from '../../public/images/shyft-pool-icon-enabled.svg'
import { Devices } from '../../styles/constants/devices'
import { MenuToggle } from './menu-toggle'
import defaultTheme from '../../styles/themes'
import { ConnectedWalletDropdown } from './connected-wallet-dropdown'
import { NetworkDropdown } from '../network-dropdown/network-dropdown'
import { TopBar } from '../top-bar/top-bar'
import { Routes, Tabs } from '../../types'

const $MobileSideBar = styled(motion.aside)`
  position: fixed;
  left: 0;
  top: 0;
  width: 320px;
  height: 100%;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.palette.black};
  display: flex;
  z-index: 2;
  & > .aside-wrapper {
    height: 100%;
    width: 100%;
    position: relative;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: auto;
    .logo-wrapper {
      display: flex;
      flex-direction: row;
      column-gap: 15px;
      margin-top: 25px;
      h2 {
        display: inline-block;
      }
    }
    li {
      text-decoration: none;
      list-style: none;
    }
    .menu-item {
      display: flex;
      column-gap: 15px;
      padding: 10px;
      margin-bottom: 20px;
      transition: all 0.3s ease-in-out;
    }
  }

  .activeTitle {
    color: white;
    font-family: 'Neuzeit Grotesk';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
  }
  .text-item {
    color: ${(props) => props.theme.palette.greyV4};
    font-family: 'Neuzeit Grotesk';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
  }
  @media ${Devices.laptop} {
    display: none !important;
  }
`

const $SideBar = styled(motion.aside)`
  display: none;
  @media ${Devices.laptop} {
    position: fixed;
    grid-area: sidebar;
    display: block;
    border-right: 1px solid;
    border-color: ${(props) => props.theme.palette.paleGrey};
    width: 320px;
    height: 100vh;
    padding: 0px 10px;
    background-color: ${(props) => props.theme.palette.black};
    .aside-wrapper {
      height: 100vh;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      row-gap: auto;
      .logo-wrapper {
        display: flex;
        margin-top: 20px;
        h2 {
          display: inline-block;
        }
      }
      li {
        text-decoration: none;
        list-style: none;
      }
      .menu-item {
        display: flex;
        column-gap: 15px;
        background-color: ${(props) => props.theme.palette.black};
        padding: 10px 10px;
        margin-bottom: 10px;
        margin-left: 3px;
        transition: all 0.3s ease-in-out;
        :hover {
          color: white;
          background-color: ${(props) => props.theme.palette.hover};
          border-radius: 8px;
        }
      }
      .active {
        display: flex;
        column-gap: 15px;
        padding: 10px 10px;
        border-radius: 8px;
        margin-bottom: 10px;
        margin-left: 3px;
        transition: all 0.3s ease-in-out;
        background-color: ${(props) => props.theme.palette.defaultGrey};
      }
    }
    .activeTitle {
      color: white;
      font-family: 'Neuzeit Grotesk';
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
    }
    .text-item {
      color: ${(props) => props.theme.palette.greyV4};
      font-family: 'Neuzeit Grotesk';
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
    }
  }
`

interface MobileDisplayProps {
  walletmenu: string
}

const $MobileDisplay = styled(motion.div)<MobileDisplayProps>`
  position: absolute;
  right: 0;
  top: 0;
  width: 27px;
  @media ${Devices.laptop} {
    display: none !important;
  }
  display: ${(props) => props.walletmenu} !important;
`

const $TextLogo = styled.div`
  margin-top: 8px;
  margin-bottom: 29px;
  margin-left: 10px;
`
interface $SidebarBackdropInterface {
  variable: boolean
}

const $SidebarBackdrop = styled.div<$SidebarBackdropInterface>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => (props.variable ? '100vw' : '0px')};
  height: 100vh;
  backdrop-filter: blur(4px) brightness(40%);
  transition: all 0.05s ease-in-out;
  @media ${Devices.laptop} {
    display: none;
  }
`
const $DropdownWrapper = styled.div`
  @media ${Devices.laptop} {
    margin: 20px 0;
  }
`

export const SideBar = (): React.ReactElement => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const router = useRouter()
  const selectTitlePortfolio = router.pathname == Routes.PORTFOLIO ? 'activeTitle' : 'text-item'
  const selectTabPortfolio = router.pathname == Routes.PORTFOLIO ? 'active' : 'menu-item'
  // const selectTitlePool = router.pathname == Routes.POOL ? 'activeTitle' : 'text-item'
  // const selectTabPool = router.pathname == Routes.POOL ? 'active' : 'menu-item'
  const selectTabShyftPool = router.pathname == Routes.POOL_SHYFT ? 'active' : 'menu-item'
  const selectTitleShyftPool = router.pathname == Routes.POOL_SHYFT ? 'activeTitle' : 'text-item'
  const selectTabShyftLPPool = router.pathname == Routes.POOL_SHYFT_LP ? 'active' : 'menu-item'
  const selectTitleShyftLPPool = router.pathname == Routes.POOL_SHYFT_LP ? 'activeTitle' : 'text-item'
  const walletmenu =
    router.pathname === Routes.WALLET || router.pathname === Routes.COLLECTION || router.pathname.includes('token')
      ? 'none'
      : 'flex'

  const menuVariants = {
    open: {
      width: '80%',
      display: 'flex',
      transition: {
        background: defaultTheme.palette.defaultGrey,
        staggerChildren: 0.1,
        delayChildren: 0,
        type: 'initial',
        stiffness: 100
      }
    },
    close: {
      width: '0%',
      display: 'none',
      transition: {
        background: 'transparent'
      }
    }
  }

  return (
    <>
      <$SidebarBackdrop variable={isOpen} />
      <$MobileDisplay
        animate={isOpen ? 'open' : 'close'}
        variants={{
          open: { right: '16px', top: '16px' },
          close: { left: '20px', top: '20px', zIndex: -9 }
        }}
        walletmenu={walletmenu}
      >
        <MenuToggle toggle={() => toggleOpen()} />
      </$MobileDisplay>
      <$MobileSideBar initial={false} variants={menuVariants} animate={isOpen ? 'open' : 'close'}>
        <div className="aside-wrapper">
          <div>
            <$TextLogo>
              <Image src={logo} layout="fixed" />
              &nbsp;
              <Image src={textLogo} layout="fixed" />
            </$TextLogo>
            <ConnectedWalletDropdown />
            <Link href={`${Routes.PORTFOLIO}?tab=${Tabs.MAIN}`} passHref>
              <a className="menu-item">
                <Image src={router.pathname == Routes.PORTFOLIO ? overviewIconEnabled : overviewIconDisabled} />
                <span className={selectTitlePortfolio}>{'Overview'}</span>
              </a>
            </Link>
            {/* <Link href={Routes.POOL} passHref>
              <a className="menu-item">
                <Image src={router.pathname == Routes.POOL ? poolIconEnabled : poolIconDisabled} />
                <span className={selectTitlePool}>{'Pool'}</span>
              </a>
            </Link> */}
            <Link href={Routes.POOL_SHYFT} passHref>
              <a className="menu-item">
                <Image src={router.pathname == Routes.POOL_SHYFT ? shyftPoolIconEnabled : shyftPoolIconDisabled} />
                <span className={selectTitleShyftPool}>{'SHFT Stake'}</span>
              </a>
            </Link>
            <Link href={Routes.POOL_SHYFT_LP} passHref>
              <a className="menu-item">
                <Image src={router.pathname == Routes.POOL_SHYFT_LP ? shyftPoolIconEnabled : shyftPoolIconDisabled} />
                <span className={selectTitleShyftLPPool}>{'SHFT LP Stake'}</span>
              </a>
            </Link>
          </div>
          <$DropdownWrapper>
            <TopBar />
            <NetworkDropdown menuPlacement="top" />
          </$DropdownWrapper>
        </div>
      </$MobileSideBar>
      <$SideBar>
        <div className="aside-wrapper">
          <div>
            <div className="logo-wrapper">
              <Image src={logo} layout="fixed" />
              <$TextLogo>
                <Image src={textLogo} layout="fixed" />
              </$TextLogo>
            </div>
            <ConnectedWalletDropdown />
            <li>
              <Link href={`${Routes.PORTFOLIO}?tab=${Tabs.MAIN}`} passHref>
                <a className={selectTabPortfolio}>
                  <Image src={router.pathname == Routes.PORTFOLIO ? overviewIconEnabled : overviewIconDisabled} />
                  <span className={selectTitlePortfolio}>{'Overview'}</span>
                </a>
              </Link>
            </li>
            {/* <li>
              <Link href={Routes.POOL} passHref>
                <a className={selectTabPool}>
                  <Image src={router.pathname == Routes.POOL ? poolIconEnabled : poolIconDisabled} />
                  <span className={selectTitlePool}>{'Pool'}</span>
                </a>
              </Link>
            </li> */}
            <li>
              <Link href={Routes.POOL_SHYFT} passHref>
                <a className={selectTabShyftPool}>
                  <Image src={router.pathname == Routes.POOL_SHYFT ? shyftPoolIconEnabled : shyftPoolIconDisabled} />
                  <span className={selectTitleShyftPool}>{'SHFT Stake'}</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href={Routes.POOL_SHYFT_LP} passHref>
                <a className={selectTabShyftLPPool}>
                  <Image src={router.pathname == Routes.POOL_SHYFT_LP ? shyftPoolIconEnabled : shyftPoolIconDisabled} />
                  <span className={selectTitleShyftLPPool}>{'SHFT LP Stake'}</span>
                </a>
              </Link>
            </li>
          </div>
          <$DropdownWrapper>
            <TopBar />
            <NetworkDropdown menuPlacement="top" />
          </$DropdownWrapper>
        </div>
      </$SideBar>
    </>
  )
}
