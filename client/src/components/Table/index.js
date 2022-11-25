import React from 'react';

const Table = ({ headers, data }) => {
  return (
    <div
      className='flex flex-col overflow-y-scroll'
      style={{
        height: 'calc(100vh - 320px)',
      }}
    >
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
                {data}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
