import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { InteractionButton } from '../components/interaction-button/interaction-button'
import { PromoWrapper } from '../components/promo-wrapper/promo-wrapper'
import { Presentation } from '../components/presentation/presentation'
import { Alert } from '../components/alert/alert'
import LoginLayout from '../components/layouts/login-signup-layout'
import { useAuthDispatch, connectWallet, useAuthState } from '../context/auth'
import { Routes, Tabs } from '../types'
import Link from 'next/link'

const $CenteredBox = styled.div`
  text-align: center;
`

const $TermsAndConditionsWrapper = styled.div`
  color: ${(props) => props.theme.palette.greyV4};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  & > label > a {
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid ${(props) => props.theme.palette.greyV4};
    :hover {
      color: ${(props) => props.theme.palette.white};
      border-color: ${(props) => props.theme.palette.white};
    }
  }
  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-clip: content-box;
    border: 1px solid ${(props) => props.theme.palette.paleGrey};
    border-radius: 100px;
    background-color: ${(props) => props.theme.palette.greyV4};
    margin-left: 15px;
    margin-right: 15px;

    &:checked {
      background-color: ${(props) => props.theme.dark.primary};
    }

    &:focus {
      outline: none !important;
    }
  }
`

const LogInPage = (): React.ReactElement => {
  const router = useRouter()
  const authDispatch = useAuthDispatch()
  const { isWalletConnected } = useAuthState()
  const acceptanceButton = useRef<HTMLInputElement>(null)
  const [hideAlert, setHideAlert] = useState(true)

  const checkAcceptance = (): void => {
    acceptanceButton.current?.checked
      ? authDispatch(connectWallet(router, `${Routes.PORTFOLIO}?tab=${Tabs.MAIN}`))
      : setHideAlert(false)
  }

  useEffect(() => {
    if (isWalletConnected) {
      router.push(`${Routes.PORTFOLIO}?tab=${Tabs.MAIN}`)
    }
  }, [isWalletConnected])

  return (
    <LoginLayout>
      <PromoWrapper>Welcome to Your Shyft Network Dashboard.</PromoWrapper>
      <$CenteredBox>
        <Presentation
          pageTitle={`The All-in-One Cryptocurrency Management System`}
          pagePresentation={`Join the conversation`}
        />
        <InteractionButton textButton={`Connect Wallet`} onClick={checkAcceptance} />
        <$TermsAndConditionsWrapper>
          <input type="checkbox" name="terms" ref={acceptanceButton} defaultChecked={false} />
          <label htmlFor="terms">
            I agree with&nbsp;
            <Link href="/terms-and-conditions" passHref>
              <a target="_blank">terms &amp; conditions</a>
            </Link>
          </label>
        </$TermsAndConditionsWrapper>
      </$CenteredBox>
      <Alert condition={hideAlert}>Please, to proceed you need accept our terms &amp; conditions.</Alert>
    </LoginLayout>
  )
}

export default LogInPage
