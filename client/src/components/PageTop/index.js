import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

const PageTop = ({
  heading,
  description,
  btnOnClick,
  btnLabel,
}) => {
  return (
    <div className='flex justify-between py-5 relative'>
      <div>
        <h2 className='font-medium text-left leading-tight text-3xl mt-0 mb-2 text-indigo-600'>
          {heading}
        </h2>
        <p className='mt-1 text-sm font-normal text-gray-500'>
          {description}
        </p>
      </div>
      <div className='text-right'>
        <button
          className='bg-green-300 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded inline-flex items-center'
          onClick={btnOnClick}
          data-bs-toggle="modal"
          data-bs-target='#modalStack'
        >
          <FontAwesomeIcon
            size='lg'
            className='mr-3'
            icon={Icons['faAdd']}
          />
          <span>{btnLabel}</span>
        </button>
      </div>
    </div>
  );
}

export default PageTop;
