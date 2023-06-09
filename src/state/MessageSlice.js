import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    type: false,
    title: 'title'
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessageOpen: (state,action) => {
            state.open = action.payload
        },
        setMessageType: (state, action) => {
            state.type = action.payload
        },
        setMessageTitle: (state, action) => {
            state.title = action.payload
        },
    },
})


export const { setMessageOpen, setMessageType, setMessageTitle } = messageSlice.actions

export default messageSlice.reducer