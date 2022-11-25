import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import Form from '../Form/index'

import { createProductElements } from '../Products/constants';
import { createSupplierElements } from '../Suppliers/constants'
import { createCustomerElements } from '../Customers/constants'
import { createProduct } from '../../api/products'
import { createSupplier } from '../../api/suppliers'
import { createCustomers } from '../../api/customers'

import {
  updateCustomers,
  updateSuppliers,
  updateProducts,
} from '../../redux/records/recordsSlice';

const ModalStack = () => {
  const { modal } = useSelector(state => state.alerts)

  const formProps = {
    'products': {
      elements: createProductElements,
      createAPICallMethod: createProduct,
      alertSuccessMessage: 'Product created successfully',
      formKey: 'addProduct',
      updateStore: updateProducts,
    },
    'customers': {
      elements: createCustomerElements,
      createAPICallMethod: createCustomers,
      alertSuccessMessage: 'Customer created successfully',
      formKey: 'addCustomer',
      updateStore: updateCustomers,
    },
    'suppliers': {
      elements: createSupplierElements,
      createAPICallMethod: createSupplier,
      alertSuccessMessage: 'Supplier created successfully',
      formKey: 'addSupplier',
      updateStore: updateSuppliers,
    },
  }[modal.type]

  return (
    ReactDOM.createPortal(

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id='modalStack'
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden='true'
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div
            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div
              className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                {modal.title}
              </h5>
              <button type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body relative p-4">
              <Form {...formProps} />
            </div>
          </div>
        </div>
      </div>
      ,
      document.getElementById('modals-portal')
    )
  )
}

export default ModalStack;
