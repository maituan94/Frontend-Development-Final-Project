import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { renderSimpleInput } from '../../utils'
import { defaultSigninValue, signInElements } from './constants'
import { createAlert } from '../../redux/alert/alertSlice'
import { userLogin } from '../../redux/user/userSlice'
import { login } from '../../api/user'
import { ALERT } from '../../redux/constants'
import { API_STATUS_CODES } from '../../api/constants'

const Login = () => {
  const { handleSubmit, reset, control, formState: { errors, isValid } } = useForm({
    mode: 'all',
    defaultValues: defaultSigninValue,
  });
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('ENTRA');
    return () => {
      reset()
    }
  }, [reset])

  const onSubmit = async (data) => {
    const { error, data: responseData } = await login(data)
    if (error || responseData.statusCode === API_STATUS_CODES.BAD_REQUEST) {
      dispatch(
        createAlert({
          title: 'Error',
          message: responseData.error,
          type: ALERT.ERROR
        })
      )
    } else if (responseData.statusCode === API_STATUS_CODES.SUCCESS) {
      dispatch(userLogin(!!responseData))
      dispatch(
        createAlert({
          title: 'Success',
          message: 'Login sucessfully',
          type: ALERT.SUCCESS
        })
      )
    }
  }

  return (
    <section className='h-screen'>
      <div className='px-6 h-full text-gray-800'>
        <div
          className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'
        >
          <div
            className='grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0'
          >
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
              className='w-full'
              alt='Login view'
            />
          </div>

          <div className='xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
            <form
              className='form'
              onSubmit={handleSubmit((data) => onSubmit(data))}
            >
              <div
                className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'
              >
                <p className='text-center font-semibold mx-4 mb-0'>
                  Please Login to your account
                </p>
              </div>

              {signInElements.map((ele, index) => {
                return renderSimpleInput(ele, control, errors, index)
              })}

              <div
                className='text-center lg:text-left'>
                <button
                  type='submit'
                  disabled={isValid ? false : true}
                  className={`${!isValid && 'disabled:opacity-50'} inline-block px-7 py-3 bg-indigo-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out`}
                >
                  Login
                </button>
                {/* <p className='text-sm font-semibold mt-2 pt-1 mb-0'>
                  Don't have an account?
                  <a
                    href='#!'
                    className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'
                  >Register</a>
                </p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login