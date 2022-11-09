import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './_global.scss'
import { Header, Footer } from './layout'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Add Route here */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
