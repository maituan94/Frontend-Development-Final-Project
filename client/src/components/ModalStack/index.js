import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Form from '../Form/index'

import { createProductElements } from '../Products/constants';
import { createSupplierElements } from '../Suppliers/constants'
import { createCustomerElements } from '../Customers/constants'
import { createProduct } from '../../api/products'
import { createSupplier } from '../../api/suppliers'
import { createCustomers } from '../../api/customers'

const ModalStack = () => {
  const { modal } = useSelector(state => state.alerts)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (Object.keys(modal).length !== 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [modal])

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const formProps = {
    'products': {
      elements: createProductElements,
      createAPICallMethod: createProduct,
      alertSuccessMessage: 'Product created successfully',
    },
    'customers': {
      elements: createCustomerElements,
      createAPICallMethod: createCustomers,
      alertSuccessMessage: 'Customer created successfully'
    },
    'suppliers': {
      elements: createSupplierElements,
      createAPICallMethod: createSupplier,
      alertSuccessMessage: 'Supplier created successfully'
    },
  }[modal.type]

  return ReactDOM.createPortal(
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={toggleModal}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-100'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900 mb-5'>
                  {modal.title}
                  <XMarkIcon className='absolute top-3 right-3 h-6 w-6' aria-hidden='true' onClick={() => toggleModal()} />
                </Dialog.Title>
                <div className='mt-2'>
                  <Form {...formProps} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    ,
    document.getElementById('modals-portal')
  )
}

export default ModalStack;
