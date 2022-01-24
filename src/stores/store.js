import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './../libs/loginSlice'

export default configureStore({
  reducer: {
    login: loginReducer
  }
})