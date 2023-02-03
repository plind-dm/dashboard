/* THIS IS A WORK IN PROGRESS */

// import { Column, useTable } from 'react-table'
// import { StakingItem } from '../../types'

// interface TablePropsInterface{
//   columns: Array<Column>
//   data: Array<StakingItem>
// }

// function Table(): React.ReactElement {
//   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({
//     columns,
//     data,
//   })
//   // Render the UI for your table
// return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
//             {headerGroup.headers.map(column => (
//               <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row, index) => {
//           prepareRow(row)
//           return (
//             <tr {...row.getRowProps()} key={row.id}>
//               {row.cells.map(cell => {
//                 return <td {...cell.getCellProps()} key={cell.value}>{cell.render('Cell')}</td>
//               })}
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//    )
//  }

// interface PoolReactTableInterface {
//   data: Array<StakingItem>
// }

export const PoolReactTable = (): React.ReactElement => {
  //   const columns = [
  //     {
  //       Header: '#',
  //       accessor: 'row id'
  //     },
  //     {
  //       Header: 'Available pools',
  //       accessor: 'appName',
  //       /* columns: [
  //         {
  //           Header: '',
  //           accessor: 'appName'
  //         },
  //         {
  //           Header: '',
  //           accessor: 'appId'
  //         }
  //       ] */
  //     },
  //     {
  //       Header: 'Available pools',
  //       accessor: 'liquidity'
  //     },
  //     {
  //       Header: 'Fee APR',
  //       accessor: 'fee'
  //     },
  //     {
  //       Header: ' ',
  //       accessor: ''
  //     }
  //   ]

  return (
    // <Table columns={columns} data={data} />
    <div />
  )
}
