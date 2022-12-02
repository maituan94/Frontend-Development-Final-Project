import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { renderDropdown, RenderDynamicDropdown, renderRadio, renderSimpleInput } from '../../utils'
import { closeModalStack, createAlert } from '../../redux/alert/alertSlice'
import { getSuppliers } from '../../api/suppliers';

import { ALERT } from '../../redux/constants'
import { API_STATUS_CODES } from '../../api/constants'
import { getCustomers } from '../../api/customers';
import { getProducts } from '../../api/products';

const optionsInitialState = [
  {
    value: '',
    name: ''
  }
]


const InvoiceForm = ({
  elements,
  createAPICallMethod,
  alertSuccessMessage,
  formKey,
  updateStore,
}) => {
  const [products, setProducts] = useState([]);
  const [productsToSubmit, setProductsToSubmit] = useState([]);
  const [options, setOptions] = useState(optionsInitialState);

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
    if (formKey === 'addPurchase') {
      // Get suppliers
      const fetchData = async () => {
        const response = await getSuppliers()
        const suppliersRes = response.data
        setOptions([
          ...[optionsInitialState],
          ...suppliersRes?.map(({ id, companyName }) => ({
            value: id,
            name: companyName
          }))
        ])
      }
      fetchData();

    }

    if (formKey === 'addSale') {
      const fetchData = async () => {
        const response = await getCustomers()
        const customersRes = response.data
        setOptions([
          ...[optionsInitialState],
          ...customersRes?.map(({ id, firstName, lastName }) => ({
            value: id,
            name: `${firstName} ${lastName}`
          }))
        ])
      }
      fetchData();

    }

    const fetchData = async () => {
      const response = await getProducts()
      const products = response.data
      setProducts(products?.map(({ id, productName }) => ({
        value: id,
        name: productName
      })))
    }
    fetchData();

  }, [formKey])

  const handleOnChangeProducts = (products) => {
    setProductsToSubmit(products)
  }

  const onSubmit = async (data) => {
    const { customerId, supplierId } = data

    const body = {
      'addSale': {
        customerId,
        products: productsToSubmit
      },
      'addPurchase': {
        supplierId,
        products: productsToSubmit
      },
    }[formKey]

    const { data: responseData } = await createAPICallMethod(body)
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

        if (ele.type === "dynamic") {
          return RenderDynamicDropdown({
            id: ele.name,
            name: ele.name,
            label: ele.placeholder,
            options: products,
            control,
            errors,
            index,
            register,
            onChangeProducts: handleOnChangeProducts,
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

export default InvoiceForm;
