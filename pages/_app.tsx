import React, { ReactElement } from 'react'
import type { AppProps } from 'next/app'
//* Styles and Theming
import GlobalStyle from '../styles/globalStyles'
import useTheme from '../hooks/useTheme'
//* Context Providers
import { AuthProvider } from '../context/auth'
import { BalanceProvider } from '../context/balances'
import { NftProvider } from '../context/nfts'
import { TransactionProvider } from '../context/transactions'
import { TokenProvider } from '../context/token'
import { StakingProvider } from '../context/staking/'
import { LogoutModalProvider } from '../context/logout-modal'
import { DropdownProvider } from '../context/dropdown'
import { ShyftStakeProvider } from '../context/shyft-stake'
import { ShyftLPStakeProvider } from '../context/shyft-lp-stake'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const { theme, ThemeProvider } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <BalanceProvider>
        <LogoutModalProvider>
          <NftProvider>
            <TransactionProvider>
              <TokenProvider>
                <StakingProvider>
                  <DropdownProvider>
                    <ShyftStakeProvider>
                      <ShyftLPStakeProvider>
                        <AuthProvider>
                          <GlobalStyle />
                          <Component {...pageProps} />
                        </AuthProvider>
                      </ShyftLPStakeProvider>
                    </ShyftStakeProvider>
                  </DropdownProvider>
                </StakingProvider>
              </TokenProvider>
            </TransactionProvider>
          </NftProvider>
        </LogoutModalProvider>
      </BalanceProvider>
    </ThemeProvider>
  )
}

export default MyApp
