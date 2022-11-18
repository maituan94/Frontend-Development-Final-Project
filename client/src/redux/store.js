import { configureStore, combineReducers } from '@reduxjs/toolkit'
import alertReducer from './alert/alertSlice'
import userReducer from './user/userSlice'

const reducer = combineReducers({
  alerts: alertReducer,
  user: userReducer,
})

export const store = configureStore({
  reducer,
})
