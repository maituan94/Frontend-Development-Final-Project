import React from 'react';

import { getNoProducts, numberFormat, getDateFormat } from '../../../utils/index'

const RowItem = ({ children }) => (
  <th
    scope='row'
    className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'
  >
    {children}
  </th>
)

const TableData = ({
  data,
}) => data.map((item, idx) => (
  <tr
    key={item.id}
    className='bg-white border-b hover:bg-gray-100'
  >
    <RowItem>
      {++idx}
    </RowItem>
    <th
      scope='row'
      className='px-6 py-4 text-sm font-medium text-indigo-800'
    >
      {item.id}
    </th>
    <RowItem>
      {getDateFormat({ date: item.purchaseDate })}
    </RowItem>
    <RowItem>
      {getNoProducts(item.orders)}
    </RowItem>
    <th
      scope='row'
      className='px-6 py-4 text-sm font-bold text-gray-800'
    >
      {numberFormat(item.totalAmount)}
    </th>
  </tr>
))

export default TableData;
