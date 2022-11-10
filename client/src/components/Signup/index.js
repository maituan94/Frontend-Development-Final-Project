import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { defaultSignupValue, signUpElements } from './constants'
import { createUser } from '../../api/user'

const Signup = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { handleSubmit, reset, setError, control, formState: { errors }, watch } = useForm({ mode: 'all', defaultValues: defaultSignupValue })

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
      // Redirect to home
      toggleModal()
    }
  }

  const renderSimpleInput = (data, index) => <Controller
    key={`${data.name}-${index}`}
    name={data.name}
    control={control}
    rules={data.rules}
    render={({ field }) => {

      let className = 'mb-1 w-full p-3 border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm'

      return <div className='bg-white px-4 mb-6'>
        <input
          type={data.type}
          {...field}
          className={className}
          placeholder={data.placeholder} />
        <small className='text-red-500 d-flex flex-column'>{errors[data.name]?.message || ''}</small>
      </div>
    }}
  />

  const renderToggle = (data, index) =>
    <Controller
      key={`${data.name}-${index}`}
      name={data.name}
      control={control}
      rules={data.rules}
      render={({ field }) => (
        <div className='bg-white px-4 mb-6'>
          <label className='inline-flex relative items-center cursor-pointer'>
            <input
              type='checkbox' {...field}
              checked={field.value}
              className='sr-only peer'
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-600"></div>
            <span className='ml-3 text-sm font-medium text-gray-700'>{data.label[field.value.toString()]}</span>
          </label>
        </div>
      )} />

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
                        if (ele.type === 'toggle') return renderToggle(ele, index)
                        return renderSimpleInput(ele, index)
                      })}
                      <div className='mt-4'>
                        <button
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
