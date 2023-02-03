import Head from 'next/head'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'

const $PageWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.palette.black};
  height: 100%;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media ${Devices.tablet} {
    margin: 16px auto;
    max-width: 344px;
  }
  @media ${Devices.laptop} {
    max-width: unset;
    margin: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`

interface ILayout {
  children: ReactNode
}

const LoginSignupLayout = (props: ILayout): React.ReactElement => {
  return (
    <>
      <Head>
        <title>{'Shyft Network Dashboard'}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={'The All-in-One cryptocurrency management system'} />
        <meta name="keywords" content={'Crypto, Wallet, Bitcoin, Ethereum, Exchange, Shyft Network, SHFT, Shyft'} />
        <meta name="robots" content={'index,follow'} />
        <meta httpEquiv="expires" content="10800" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>
      <$PageWrapper>{props.children}</$PageWrapper>
    </>
  )
}

export default LoginSignupLayout
