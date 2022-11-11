import { configureStore, combineReducers } from '@reduxjs/toolkit'
import alertReducer from './alert/alertSlice'
import userReducer from './user/userSlice'

const reducer = combineReducers({
  notifications: alertReducer,
  user: userReducer,
})

export const store = configureStore({
  reducer,
})
