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

const Main = ({ children }) => {
  return (
    <main className='relative flex flex-row flex-auto w-full bg-white mx-auto max-w-7xl px-4 sm:px-6'>
      {children}
    </main>
  )
}

const ContentWrapper = ({ children }) => {
  return (
    <div className='w-full shadow-md'>
      {children}
    </div>
  )
}

const App = () => {
  const { user } = useSelector(state => state)

  return (
    <Router>
      {false 
        ? <Login />
        : <>
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
              <Alert />
            </ContentWrapper>
          </Main>
          <Footer />
        </>
      }
    </Router>
  )
}

export default App;
