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

const Table = ({ headers, data }) => {
  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-center'>
              <thead className='border-b bg-gray-200'>
                <tr>
                  {headers.map((item, idx) => (
                    <th
                      key={idx}
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-2 whitespace-nowrap'
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item, idx) => (
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
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
