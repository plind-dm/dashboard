import styled from 'styled-components'
import { StakingItem } from '../../types'
import { PoolElement } from './pool-element'
import { useMemo } from 'react'
import { Devices } from '../../styles/constants/devices'
import { $NormalTextBold } from '../uiKit'

export const $PoolTable = styled.table`
  border-collapse: collapse;
  border-radius: 8px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  @media ${Devices.laptop} {
    padding: 0;
    margin: 0 24px 12px 24px;
  }
`

export const $PoolHeader = styled.thead`
  th,
  td {
    border-bottom: 1px solid ${(props) => props.theme.palette.paleGrey};
  }
  .not-in-mobile {
    display: none;
    @media ${Devices.laptop} {
      display: table-cell;
      :first-child {
        text-align: center;
      }
    }
  }
  /* tr {
    &:hover {
      background-color: ${(props) => props.theme.palette.defaultGrey} !important;
      border-radius: 8px !important;
    }
  } */
`

export const $TableHeader = styled($NormalTextBold)`
  padding-top: 16px;
  padding-bottom: 8px;
  @media ${Devices.laptop} {
    padding: 0;
  }
`

export const $HeaderItem = styled.th`
  text-align: start;
  padding-left: 24px;
  @media ${Devices.laptop} {
    padding: 24px 0;
    :first-child {
      padding: 24px 32px;
    }
    :last-child {
      padding: 24px 32px;
    }
  }
`

export const $PoolBody = styled.tbody`
  tr {
    &:hover {
      background: ${(props) => props.theme.palette.hover};
    }
  }
  tr:last-child {
    border: none;
  }
  tr:last-child {
    &:hover {
      border-bottom-left-radius: 8px;
    }
  }
  tr:last-child td:first-child {
    &:hover {
      border-bottom-left-radius: 8px;
    }
  }
  tr:last-child {
    &:hover {
      border-bottom-right-radius: 8px;
    }
  }
  tr:last-child td:last-child {
    &:hover {
      border-bottom-right-radius: 8px;
    }
  }
`

export interface PoolListPropsInterface {
  data: Array<StakingItem>
  poolNetwork: string
  itemsPerPage: number
  paginationIndex: number
}

export const PoolTable = ({
  data,
  poolNetwork,
  itemsPerPage,
  paginationIndex
}: PoolListPropsInterface): React.ReactElement => {
  const headers = useMemo(() => ['#', 'Available pools', 'Liquidity', 'Fee APR', ' '], [])

  return (
    <$PoolTable>
      <$PoolHeader>
        <tr>
          {headers.map((header) => {
            if (header === '#' || header === 'Fee APR' || header === ' ') {
              return (
                <$HeaderItem key={header} className="not-in-mobile">
                  <$TableHeader>{header}</$TableHeader>
                </$HeaderItem>
              )
            } else {
              return (
                <$HeaderItem key={header} className="in-mobile">
                  <$TableHeader>{header}</$TableHeader>
                </$HeaderItem>
              )
            }
          })}
        </tr>
      </$PoolHeader>
      <$PoolBody>
        {data?.map((item, index) => {
          if (index >= itemsPerPage * (paginationIndex - 1) && index < itemsPerPage * paginationIndex)
            return (
              <PoolElement key={index} index={index} poolNetwork={poolNetwork}>
                {item}
              </PoolElement>
            )
        })}
      </$PoolBody>
    </$PoolTable>
  )
}
