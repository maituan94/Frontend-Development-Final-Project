import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'

const Alert = () => {
  const { notifications } = useSelector(state => state.notifications)
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (notifications.length > 0) {
      setAlert(notifications[notifications.length - 1])
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000)
    }
  }, [notifications])

  const color = alert.type === 'success' ? 'green' : 'red'

  return ReactDOM.createPortal(show && (
    <div
      className={`absolute mb-10 bottom-5 px-4 sm:px-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 align-content-end z-10 w-8/12 bg-${color}-100 border-t-4 border-${color}-500 rounded-b text-${color}-900 px-4 py-3 shadow-md`}
      role='alert'
    >
      <div className='flex'>
        <div className='py-1'>
          <svg
            className={`fill-current h-6 w-6 text-${color}-500 mr-4`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'><path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
          </svg>
        </div>
        <div>
          <p className={`font-bold text-${color}-700`}>{alert.title || ''}</p>
          <p className='text-sm'>{alert.message || ''}</p>
        </div>
      </div>
    </div>
  ),
    document.getElementById("notification-portal")
  )
}

export default Alert
