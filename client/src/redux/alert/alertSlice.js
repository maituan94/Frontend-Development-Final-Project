
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
  modal: {}
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createAlert: (state, action) => {
      state.notifications.push({
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type
      })
    },
    openModalStack: (state, action) => {
      state.modal = {
        type: action.payload.type,
        title: action.payload.title,
      }
    },
    closeModalStack: (state, action) => {
      state.modal = {}
    }
  },
})

export const {
  createAlert,
  openModalStack,
  closeModalStack,
} = alertSlice.actions;

export default alertSlice.reducer
