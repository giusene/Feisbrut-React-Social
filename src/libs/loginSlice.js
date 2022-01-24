import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: {
      logged: false
    },
    userReload: true
  },
  reducers: {
    setLogin: (state, action) => {
      state.value = action.payload
    },
    setUserReload: (state) => {
      state.userReload = !state.userReload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLogin, setUserReload } = loginSlice.actions

export default loginSlice.reducer