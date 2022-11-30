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
  onClickRemove,
}) => data.map((item, idx) => (
  <tr
    key={item.id}
    className='bg-white border-b hover:bg-gray-100' >
    <th
      scope='row'
      className='px-6 py-4 text-sm font-medium text-indigo-800'
    >
      {item.id}
    </th>
    <RowItem>
      {item.productName}
    </RowItem>
    <RowItem>
      {item.supplierId}
    </RowItem>
    <RowItem>
      {item.purchasePrice}
    </RowItem>
    <RowItem>
      {item.salePrice}
    </RowItem>
    <RowItem>
      <img
        className=' text-center block w-10 h-10 rounded-full '
        src={item.imageUrl}
        alt={`Product image : ${item.productName}`}
      />
    </RowItem>
    <RowItem>
      {item.description}
    </RowItem>
    <RowItem className='flex items-center'>
      <div>
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
