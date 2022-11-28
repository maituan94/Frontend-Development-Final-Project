import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customers: [],
  suppliers: [],
  products: [],
  purchases: [],
  sales: [],
}

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    initializeCustomers: (state, action) => {
      state.customers = action.payload
    },
    updateCustomers: (state, action) => {
      state.customers.push(action.payload)
    },
    initializeSuppliers: (state, action) => {
      state.suppliers = action.payload
    },
    updateSuppliers: (state, action) => {
      state.suppliers.push(action.payload)
    },
    initializeProducts: (state, action) => {
      state.products = action.payload
    },
    updateProducts: (state, action) => {
      state.products.push(action.payload)
    },
    initializePurchases: (state, action) => {
      state.pruchases = action.payload
    },
    updatePurchases: (state, action) => {
      state.purhcases.push(action.payload)
    },
    initializeSales: (state, action) => {
      state.sales = action.payload
    },
    updateSales: (state, action) => {
      state.sales.push(action.payload)
    },
  },
  extraReducers: {},
})

export const {
  updateCustomers,
  initializeCustomers,
  updateSuppliers,
  initializeSuppliers,
  updateProducts,
  initializeProducts,
  updatePurchases,
  initializePurchases,
  updateSales,
  initializeSales
} = recordsSlice.actions;

export default recordsSlice.reducer
