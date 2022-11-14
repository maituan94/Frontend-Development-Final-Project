import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './_global.scss'

import { Header, Footer } from './layout'
import Alert from './components/Alert'
// import ProductTable from './pages/supplierproducts'
import Login from './components/Login'
import Sidebar from './components/Sidebar'

const Main = ({ children }) => {
  return (
    <main className='relative flex-auto w-full bg-white mx-auto max-w-7xl px-4 sm:px-6'>
      {children}
    </main>
  )
}

const App = () => {
  const { user } = useSelector(state => state)

  return (
    <Router>
      {!user.user
        ? <Login />
        : <>
          <Header />
          <Main>
            <Routes>
              {/* Add Route here */}
            </Routes>
            <Sidebar />
            {/* <ProductTable /> */}
            <Alert />
          </Main>
          <Footer />
        </>
      }
    </Router>
  )
}

export default App;
