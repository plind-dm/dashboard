import { ReactElement, useEffect, useState } from 'react'
import toast, { Toaster as ReactHotToaster, ToastBar } from 'react-hot-toast'
import styled from 'styled-components'
import Image from 'next/image'
import { $ImageWrapper } from '.'
import { useStakingState } from '../../context/staking'
import { useAuthState } from '../../context/auth'
import { getBaseNetworkScanUri } from '../../utils/transactions.utils'
import { IProps } from '../../interfaces/Iprops'
import { useDevices } from '../../hooks/useDevices'

const $Button = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  :hover {
    background-color: ${(props) => props.theme.dark.secondary};
    cursor: pointer;
  }
`

const $ButtonsContainer = styled.div`
  display: flex;
  gap: 3px;
`

const $Spinner = styled.div<IProps>`
  width: 34px;
  height: 34px;
  border-radius: 100px;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const $Loader = styled.div`
  width: 35px;
  height: 35px;
  animation: 1.5s linear infinite spinner;
  animation-play-state: inherit;
  border: solid 2px #fafafa;
  border-bottom-color: rgb(54, 50, 64);
  border-radius: 50%;
  @keyframes spinner {
    0% {
      transform: translate3d(0, 0, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(0, 0, 0) rotate(360deg);
    }
  }
`

export const Toast = toast

export const showLoadingToast = (msg: string, imgSrc: string): void => {
  toast.loading(msg, {
    icon: (
      <$Spinner img={imgSrc}>
        <$Loader />
      </$Spinner>
    ),
    duration: Infinity
  })
}

export const showErrorToast = (msg: string): void => {
  toast.error(msg, {
    icon: <Image src={'/images/error.png'} height="32px" width="32px" />,
    duration: 3000,
    style: {
      border: '2px solid #F87171'
    }
  })
}

export const showSuccessToast = (msg: string): void => {
  toast.loading(msg, {
    icon: <Image src={'/images/success.png'} height="32px" width="32px" />,
    duration: 3000,
    style: {
      border: '2px solid #34D399'
    }
  })
}
export const TxNotificationToaster = (): ReactElement => {
  const { txHash } = useStakingState()
  const { currentNetworkName } = useAuthState()
  const { isMobile } = useDevices()
  const [showTxLink, setShowTxLink] = useState<boolean>(false)

  useEffect(() => {
    txHash === '' || txHash === undefined ? setShowTxLink(false) : setShowTxLink(true)
  }, [txHash])

  const redirect = (url: string): void => {
    window.open(url, '_blank')
  }
  return (
    <ReactHotToaster
      position={isMobile ? 'top-right' : 'bottom-right'}
      toastOptions={{
        style: {
          color: '#FAFAFA',
          background: '#363240',
          borderRadius: '9px'
        }
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ message, icon }) => (
            <>
              {icon}
              {message}
              {t.type !== 'error' && (
                <$ButtonsContainer>
                  {showTxLink && (
                    <$Button onClick={() => redirect(`${getBaseNetworkScanUri(currentNetworkName)}${txHash}`)}>
                      <$ImageWrapper height="9px" width="9px">
                        <Image src="/images/link.png" layout="fill" />
                      </$ImageWrapper>
                    </$Button>
                  )}
                  <$Button onClick={() => toast.dismiss(t.id)}>
                    <$ImageWrapper height="9px" width="9px">
                      <Image src="/images/close.png" layout="fill" />
                    </$ImageWrapper>
                  </$Button>
                </$ButtonsContainer>
              )}
              {t.type === 'error' && (
                <$Button onClick={() => toast.dismiss(t.id)}>
                  <$ImageWrapper height="9px" width="9px">
                    <Image src="/images/close.png" layout="fill" />
                  </$ImageWrapper>
                </$Button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </ReactHotToaster>
  )
}
