import { configureStore, combineReducers } from '@reduxjs/toolkit'
import alertReducer from './alert/alertSlice'
import userReducer from './user/userSlice'
import recordsReducer from './records/recordsSlice'

const reducer = combineReducers({
  alerts: alertReducer,
  user: userReducer,
  records: recordsReducer,
})

export const store = configureStore({
  reducer,
})
