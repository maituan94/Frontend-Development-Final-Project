import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customers: [],
  suppliers: [],
  products: [],
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
  },
  extraReducers: {},
})

export const {
  updateCustomers,
  initializeCustomers,
  updateSuppliers,
  initializeSuppliers,
  updateProducts,
  initializeProducts
} = recordsSlice.actions;

export default recordsSlice.reducer
