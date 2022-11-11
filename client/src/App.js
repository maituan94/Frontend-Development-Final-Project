import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './_global.scss'
import { Header, Footer } from './layout'
import Alert from './components/Alert'
import ProductTable from './pages/supplierproducts'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='relative flex-auto'>
        <ProductTable/>
        <Routes>
          {/* Add Route here */}
        </Routes>
        <Alert color="red" title="Success" message="The user has been created" />
      </main>
      <Footer />
    </Router>
  )
}

export default App;
