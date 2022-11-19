import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './_global.scss'

import { Header, Footer } from './layout'
import Alert from './components/Alert'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Customers from './components/Customers'
import Suppliers from './components/Suppliers'
import Products from './components/Products'
import Purchases from './components/Purchases'
import ModalStack from './components/ModalStack'

const Main = ({ children }) => {
  return (
    <main className='relative flex flex-row flex-auto w-full bg-white mx-auto px-4 sm:px-6'>
      {children}
    </main>
  )
}

const ContentWrapper = ({ children }) => {
  return (
    <div className='w-full shadow-md p-4 sm:p-6 relative shadow-md'>
      {children}
    </div>
  )
}

const App = () => {
  const { isLogged } = useSelector(state => state.user)

  return (
    <Router>
      {isLogged
        ? <>
          <Header />
          <Main>
            <Sidebar />
            <ContentWrapper>
              <Routes>
                {/* Add Route here */}
                <Route path="/customers" element={<Customers />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/products" element={<Products />} />
                <Route path="/purchases" element={<Purchases />} />
              </Routes>
              <ModalStack />
              <Alert />
            </ContentWrapper>
          </Main>
          <Footer />
        </>
        :
        <Login />
      }
    </Router>
  )
}

export default App;
