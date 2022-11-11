import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'

import './_global.scss'
import { store } from './redux/store'
import { Header, Footer } from './layout'
import Alert from './components/Alert'
import ProductTable from './pages/supplierproducts'


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='relative flex-auto'>
          <Routes>
            {/* Add Route here */}
          </Routes>
          <ProductTable />
          <Alert />
        </main>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App;
