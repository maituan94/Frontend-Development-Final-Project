import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import SignIn from '../components/Signin'
import Signup from '../components/Signup'

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false)

  const mobileHeader = () => {
    return <Transition
      as={Fragment}
      show={menuVisible}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-5 pt-5 pb-6">
            <div className="flex items-center justify-between">
              <a className="flex items-center" href="/">
                <img
                  className="opacity-70 h-8 w-auto sm:h-10"
                  src="/assets/logo/moon.png"
                  alt=""
                />
                <span className="ml-4 font-medium text-gray-500">Moon</span>
              </a>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500">
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" onClick={(e) => setMenuVisible(false)} />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="space-y-6 py-6 px-5">
            <Signup className="flex w-full items-center justify-center rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-700" />
            <div className="mt-6 text-center text-base font-medium text-gray-500">
              Existing customer?{' '}
              <SignIn className="text-slate-600 hover:text-slate-500" />
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  }

  return (
    <>
      <Popover className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a className="flex items-center" href="/">
                <img
                  className="opacity-70 h-8 w-auto sm:h-10"
                  src="/assets/logo/moon.png"
                  alt="" />
                <span className="ml-4 font-medium text-gray-500">Moon</span>
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500">
                <Bars3Icon className="h-6 w-6" aria-hidden="true" onClick={(e) => setMenuVisible(true)} />
              </Popover.Button>
            </div>
            <div className="cursor-pointer hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <SignIn className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900" />
              <Signup className="cursor-pointer ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-700" />
            </div>
          </div>
        </div>
        {mobileHeader()}
      </Popover>
    </>
  )
}

export default Header;

