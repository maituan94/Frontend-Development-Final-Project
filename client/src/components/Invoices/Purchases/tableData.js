import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

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
  onClickRemove
}) => data.map((item, idx) => (
  <tr
    key={item.id}
    className='bg-white border-b hover:bg-gray-100' >
    <th
      scope='row'
      className='px-6 py-4 text-sm font-medium text-indigo-800'
    >
      {item.customerId}
    </th>
    <RowItem>
      {item.date}
    </RowItem>
    <RowItem>
      {item.orders}
    </RowItem>
    <RowItem>
      {item.totalAmount}
    </RowItem>
    <RowItem>
      <div className='flex items-center'>
        <FontAwesomeIcon size='lg' color='green' className='mr-3' icon={Icons['faEdit']} style={{ cursor: 'pointer' }} />
        <FontAwesomeIcon
          size='lg'
          color='red'
          className=''
          icon={Icons['faRemove']}
          style={{ cursor: 'pointer' }}
          onClick={() => onClickRemove(item.id)}
        />
      </div>
    </RowItem>
  </tr>
))

export default TableData;
