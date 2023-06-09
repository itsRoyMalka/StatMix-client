import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './MessageSlice'


export const store = configureStore({
    reducer: {
        message: messageReducer,
    },
    devTools: false
})