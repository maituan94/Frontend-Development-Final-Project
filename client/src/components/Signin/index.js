import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'

import { createAlert } from '../../redux/alert/alertSlice'
import { renderSimpleInput, renderToggle } from '../../utils'
import { defaultSigninValue, signInElements } from './constants'
import { login } from '../../api/user'
import { ALERT } from '../../redux/constants'

const Signin = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { handleSubmit, reset, control, formState: { errors } } = useForm({ mode: 'all', defaultValues: defaultSigninValue });
  const [data, setData] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      reset()
    }
  }, [isOpen, reset])

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const onSubmit = async (data) => {
    console.log({ data });
    const { error, data: responseData } = await login(data)
    if (error || responseData.statusCode === 404) {
      dispatch(
        createAlert({
          title: 'Error',
          message: responseData.message,
          type: ALERT.ERROR
        })
      )
    } else {
      toggleModal()
      setTimeout(() => {
        dispatch(
          createAlert({
            title: 'Success',
            message: 'Login sucessfully',
            type: ALERT.SUCCESS
          })
        )
      }, 1000)

    }
  }

  return (
    <>
      <button
        type='button'
        onClick={toggleModal}
        className={className}>
        Sign in
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
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900 mb-5'>
                    Sign In
                    <XMarkIcon className='absolute top-3 right-3 h-6 w-6' aria-hidden='true' onClick={() => toggleModal()} />
                  </Dialog.Title>
                  <div className='mt-2'>
                    <form
                      className='form'
                      onSubmit={handleSubmit((data) => onSubmit(data))}
                    >
                      {signInElements.map((ele, index) => {
                        if (ele.type === 'toggle') return renderToggle(ele, control, index)
                        return renderSimpleInput(ele, control, errors, index)
                      })}
                      <div className='mt-4'>
                        <button
                          type='submit'
                          className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
                          Log in
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

export default Signin;
