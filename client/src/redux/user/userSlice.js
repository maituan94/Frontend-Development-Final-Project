import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {},
  extraReducers: {},
})

export const actions = userSlice.actions;

export default userSlice.reducer
