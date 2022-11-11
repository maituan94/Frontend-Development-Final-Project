
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: []
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
    }
  },
})

export const { createAlert } = alertSlice.actions;

export default alertSlice.reducer
