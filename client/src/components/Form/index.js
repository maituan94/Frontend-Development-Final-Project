import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { renderDropdown, renderRadio, renderSimpleInput } from '../../utils'
import { closeModalStack, createAlert } from '../../redux/alert/alertSlice'
import { getSuppliers } from '../../api/suppliers';

import { ALERT } from '../../redux/constants'
import { API_STATUS_CODES } from '../../api/constants'
import { provinces } from './constants';
import { getCustomers } from '../../api/customers';


const Form = ({
  elements,
  createAPICallMethod,
  alertSuccessMessage,
  formKey,
  updateStore,
}) => {
  const [suppliers, setSuppliers] = useState({});
  const { customers, setCustomers } = useState({});
  const [options, setOptions] = useState(provinces);

  const {
    handleSubmit,
    reset,
    setError,
    control,
    register,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
  });
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  useEffect(() => {
    if (formKey === 'addProduct' || formKey === 'addPurchase') {
      const fetchData = async () => {
        const response = await getSuppliers()
        console.log({ response });
        const suppliers = response.data
        setOptions(suppliers?.map(supplier => ({
          value: supplier.id,
          name: supplier.companyName
        })))
        setSuppliers(suppliers)
      }
      fetchData();

    }
    if (formKey === 'addSale') {
      const fetchData = async () => {
        const response = await getCustomers()
        const customers = response.data
        setOptions(customers?.map(customer => ({
          value: customer.id,
          name: customer.firstName + " " + customer.lastName
        })))
        setCustomers(customers)
      }
      fetchData();

    }
    if (formKey === 'addPurchase') {
      const fetchData = async () => {
        const response = await getCustomers()
        console.log({ response });
        const customers = response.data
        setOptions(customers?.map(customer => ({
          value: customer.id,
          name: customer.firstName + " " + customer.lastName
        })))
        setCustomers(customers)
      }
      fetchData();

    } else {
      setOptions(provinces)
    }
  }, [formKey])


  const onSubmit = async (data) => {
    const { data: responseData } = await createAPICallMethod(data)
    if (responseData.statusCode === API_STATUS_CODES.BAD_REQUEST) {
      const keyError = Object.keys(responseData.error.keyPattern)[0]
      setError(keyError, { message: responseData.error.message })
    } else if (responseData.statusCode === API_STATUS_CODES.SUCCESS) {
      dispatch(updateStore(responseData.data))
      dispatch(closeModalStack())
      const closeButton = document.getElementById(`dismiss-${formKey}`)
      closeButton.click()
      setTimeout(() => {
        dispatch(
          createAlert({
            title: 'Success',
            message: alertSuccessMessage,
            type: ALERT.SUCCESS
          })
        )
      }, 2000)
    }
  }

  return (
    <form
      key={formKey}
      className='form'
      onSubmit={handleSubmit(data => onSubmit(data))}
    >
      {elements?.map((ele, index) => {
        if (ele.type === "radio") {
          return renderRadio({
            data: ele,
            control,
            errors,
            index,
            register
          })
        }
        if (ele.type === "dropdown") {
          return renderDropdown({
            id: ele.name,
            name: ele.name,
            label: ele.placeholder,
            options,
            control,
            errors,
            index,
            register,
          })
        }
        return renderSimpleInput(ele, control, errors, index)
      })}

      <div
        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md pr-0">
        <button
          id={`dismiss-${formKey}`}
          type="button"
          className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className={`${!isValid && 'disabled:opacity-50'} inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1`}
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default Form;
