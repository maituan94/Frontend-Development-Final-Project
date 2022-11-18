import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { createProduct } from '../../api/products';
import { renderSimpleInput } from '../../utils'
import { closeModalStack, createAlert } from '../../redux/alert/alertSlice'

import { ALERT } from '../../redux/constants'
import { API_STATUS_CODES } from '../../api/constants'
import { signInElements } from './constants'

const CreateProductForm = () => {
  const { handleSubmit, reset, control, formState: { errors, isValid } } = useForm({
    mode: 'all',
  });
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  const onSubmit = async (data) => {
    const { error, data: responseData } = await createProduct(data)
    console.log({ responseData });
    if (error || responseData.statusCode === API_STATUS_CODES.BAD_REQUEST) {
      dispatch(
        createAlert({
          title: 'Error',
          message: responseData.error,
          type: ALERT.ERROR
        })
      )
    } else if (responseData.statusCode === API_STATUS_CODES.SUCCESS) {
      dispatch(closeModalStack())
      setTimeout(() => {
        dispatch(
          createAlert({
            title: 'Success',
            message: 'Product created successfully',
            type: ALERT.SUCCESS
          })
        )
      }, 2000)
    }
  }

  return (
    <form
      className='form'
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      {signInElements.map((ele, index) => {
        return renderSimpleInput(ele, control, errors, index)
      })}

      <div
        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button
          type="button"
          onClick={() => dispatch(closeModalStack())}
          className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-dismiss="modal">
          Close
        </button>
        <button
          type="submit"
          disabled={isValid ? false : true}
          className={`${!isValid && 'disabled:opacity-50'} inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1`}
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateProductForm;
