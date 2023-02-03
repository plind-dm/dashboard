import { useMemo } from 'react'
import styled from 'styled-components'
import { $PoolTable, $PoolHeader, $TableHeader, $PoolBody, $HeaderItem } from './pool-table'
import { InvestedElement } from './invested-element'
import { StakedAsset, StakedBalance, StakedProduct } from '../../types'
import { Devices } from '../../styles/constants/devices'

interface InvestmentListPropsInterface {
  data: Array<StakedBalance>
  poolNetwork: string
}

const $InvestmentTable = styled($PoolTable)``

const $InvestmentTableHeader = styled($PoolHeader)``

const $InvestmentHeader = styled($TableHeader)``

const $InvestmentHeaderItem = styled($HeaderItem)`
  @media ${Devices.laptop} {
    :first-child {
      padding: 24px 56px;
    }
  }
`

export const InvestmentTable = ({ data, poolNetwork }: InvestmentListPropsInterface): React.ReactElement => {
  const headers = useMemo(() => ['Pool', 'Value', ' '], [])
  return (
    <$InvestmentTable>
      <$InvestmentTableHeader>
        <tr>
          {headers.map((header) => {
            if (header === ' ') {
              return (
                <$InvestmentHeaderItem key={header} className="not-in-mobile">
                  {header}
                </$InvestmentHeaderItem>
              )
            } else {
              if (header === 'Pool') {
                return (
                  <$InvestmentHeaderItem key={header} className="in-mobile">
                    <$InvestmentHeader className="pool-header">{header}</$InvestmentHeader>
                  </$InvestmentHeaderItem>
                )
              } else {
                return (
                  <$InvestmentHeaderItem key={header} className="in-mobile pool-header">
                    <$InvestmentHeader>{header}</$InvestmentHeader>
                  </$InvestmentHeaderItem>
                )
              }
            }
          })}
        </tr>
      </$InvestmentTableHeader>
      <$PoolBody>
        {data.map((element) => {
          return element.products.map((product: StakedProduct) => {
            return product.assets.map((asset: StakedAsset, index: number) => {
              return (
                <InvestedElement key={index} index={index} poolNetwork={poolNetwork}>
                  {asset}
                </InvestedElement>
              )
            })
          })
        })}
      </$PoolBody>
    </$InvestmentTable>
  )
}
