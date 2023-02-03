import Head from 'next/head'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { setLogoutModalState, useLogoutModalDispatch, useLogoutModalState } from '../../context/logout-modal'
import { Devices } from '../../styles/constants/devices'
import Footer from '../footer/footer'
import { LogOutModal } from '../modal/log-out-modal'
import { SideBar } from '../side-bar/side-bar'

interface IPageLayout {
  title?: string
  description?: string
  keywords?: string
  robots?: boolean
  expireSeconds?: number
  children: ReactNode
}

const $Main = styled.main`
  position: relative;
  width: 100%;
  grid-area: main;
`

const $Container = styled.div`
  margin: auto 16px;
  @media ${Devices.laptop} {
    margin: auto;
    display: grid;
    grid-template-columns: 320px calc(100% - 320px);
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas: 'sidebar content';
  }
`

const $MainFooterWrapper = styled.div`
  @media ${Devices.laptop} {
    display: grid;
    position: relative;
    grid-area: content;
    grid-template-columns: 1fr;
    grid-template-rows: calc(100% - 170px) 120px;
    gap: 0px 0px;
    grid-auto-flow: column;
    grid-template-areas:
      'main'
      'footer';
  }
  @media ${Devices.desktop} {
    grid-template-rows: calc(100% - 170px) 400px;
  }
`

const PageLayout = (props: IPageLayout): React.ReactElement => {
  const { isOpen } = useLogoutModalState()
  const dispatch = useLogoutModalDispatch()
  return (
    <>
      <Head>
        <title>{props.title ? props.title : 'Shyft Network Dashboard'}</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={props.description ? props.description : 'The All-in-One cryptocurrency management system'}
        />
        <meta
          name="keywords"
          content={
            props.keywords ? props.keywords : 'Crypto, Wallet, Bitcoin, Ethereum, Exchange, Shyft Network, SHFT, Shyft'
          }
        />
        <meta name="robots" content={'index,follow'} />
        <meta httpEquiv="expires" content="10800" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>

      <$Container>
        <$MainFooterWrapper>
          <$Main>{props.children}</$Main>
          <LogOutModal
            isOpen={isOpen}
            onClose={() => {
              dispatch(setLogoutModalState(false))
            }}
          />
          <Footer />
        </$MainFooterWrapper>
        <SideBar />
      </$Container>
    </>
  )
}

export default PageLayout
