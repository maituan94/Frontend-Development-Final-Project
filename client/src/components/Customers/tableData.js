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
      {item.firstName}
    </RowItem>
    <RowItem>
      {item.lastName}
    </RowItem>
    <RowItem>
      {item.gender}
    </RowItem>
    <RowItem>
      {item.phone}
    </RowItem>
    <RowItem>
      {item.email}
    </RowItem>
    <RowItem>
      {item.homeNumber}
    </RowItem>
    <RowItem>
      {item.address}
    </RowItem>
    <RowItem>
      {item.state}
    </RowItem>
    <RowItem>
      {item.dateOfBirth}
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
