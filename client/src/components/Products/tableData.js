import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

const RowItem = ({ children }) => (
  <th
    scope='row'
    className='px-6 py-4 text-sm font-medium text-gray-900'
  >
    {children}
  </th>
)

const TableData = ({
  data
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
    <RowItem>
      <div className='flex items-center'>
        <FontAwesomeIcon size='lg' color='' className='mr-3' icon={Icons['faEdit']} />
        <FontAwesomeIcon size='lg' color='' className='' icon={Icons['faRemove']} />
      </div>
    </RowItem>
  </tr>
))

export default TableData;
