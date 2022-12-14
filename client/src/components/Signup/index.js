import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'

import { createAlert } from '../../redux/alert/alertSlice'
import { renderSimpleInput, renderToggle } from '../../utils'
import { defaultSignupValue, signUpElements } from './constants'
import { createUser } from '../../api/user'
import { ALERT } from '../../redux/constants'


const Signup = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { handleSubmit, reset, setError, control, formState: { errors }, watch } = useForm({ mode: 'all', defaultValues: defaultSignupValue })
  const dispatch = useDispatch()

  const passwordRef = useRef({})
  passwordRef.current = watch('password', '')

  const isSupplierRef = useRef({})
  isSupplierRef.current = watch('isSupplier', false)

  useEffect(() => {
    return () => {
      reset()
    }
  }, [isOpen, reset])

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const onSubmit = async (data) => {
    const { error, data: responseData } = await createUser(data)
    if (error) {
      const keyError = Object.keys(error.keyPattern)[0]
      setError(keyError, { message: error.message })
    }

    if (responseData) {
      toggleModal()
      setTimeout(() => {
        dispatch(
          createAlert({
            title: 'Success',
            message: 'The user has been created',
            type: ALERT.SUCCESS
          })
        )
      }, 1000)
    }
  }

  const elementsToRender = (passwordRef) => {
    if (isSupplierRef.current) {
      return signUpElements(passwordRef)
        .filter(element => {
          if (element.name === 'firstName')
            return false
          if (element.name === 'lastName')
            return false

          return true
        })
    } else {
      return signUpElements(passwordRef)
        .filter(element => {
          if (element.name === 'companyName')
            return false
          return true
        })
    }

  }

  return (
    <>
      <button
        type='button'
        onClick={toggleModal}
        className={className}
      >
        Sign up
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={toggleModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900 mb-5'>
                    Sign up
                    <XMarkIcon className='absolute top-3 right-3 h-6 w-6' aria-hidden='true' onClick={() => toggleModal()} />
                  </Dialog.Title>
                  <div className='mt-2'>
                    <form
                      onSubmit={handleSubmit((data) => onSubmit(data))}
                      className='form'
                    >
                      {elementsToRender(passwordRef).map((ele, index) => {
                        if (ele.type === 'toggle') return renderToggle(ele, control, index)
                        return renderSimpleInput(ele, control, errors, index)
                      })}
                      <div className='mt-4'>
                        <button
                          onClick={() => dispatch(
                            createAlert({
                              title: 'Success',
                              message: 'The user has been created',
                              type: ALERT.SUCCESS
                            })
                          )}
                          type='submit'
                          className='inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2'>
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Signup
