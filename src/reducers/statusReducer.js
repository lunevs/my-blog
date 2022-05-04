import { createSlice } from '@reduxjs/toolkit'

const statusReducer = createSlice({
    name: 'status',
    initialState: {},
    reducers: {
        statusChange(state, action) {
            return action.payload
        }
    }
})

export const { statusChange } = statusReducer.actions

export default statusReducer.reducer