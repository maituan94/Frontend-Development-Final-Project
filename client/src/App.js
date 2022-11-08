import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './_global.scss'
import { Header, Footer } from './layout'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
      </Routes>
      <Footer />
    </Router>
  )
}
