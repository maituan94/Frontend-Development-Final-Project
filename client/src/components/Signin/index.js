import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline'

import { defaultSigninValue, signInElements } from './constants'

const Signin = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { handleSubmit, reset, setValue, control, formState: { errors } } = useForm({ mode: 'all', defaultValues: defaultSigninValue });
  const [data, setData] = useState(null);

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    return () => {
      reset()
    }
  }, [isOpen, reset])


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
                    <form onSubmit={handleSubmit((data) => setData(data))} className='form'>
                      {signInElements.map((ele, index) =>
                        <Controller
                          key={`${ele.name}-${index}`}
                          name={ele.name}
                          control={control}
                          rules={ele.rules}
                          render={({ field }) => (
                            <div className='bg-white px-4 mb-6'>
                              <input
                                type={ele.type}
                                {...field}
                                className='mb-1 w-full p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                placeholder={ele.placeholder} />
                              <small className='text-red-500 d-flex flex-column'>{errors[ele.name]?.message || ''}</small>
                            </div>
                          )}
                        />
                      )}
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
