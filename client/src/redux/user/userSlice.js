import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogged: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLogged = action.payload
    },
    userLogout: (state, action) => {
      state.isLogged = action.payload
    }
  },
  extraReducers: {},
})

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer
