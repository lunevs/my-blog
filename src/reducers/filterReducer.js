import { createSlice } from '@reduxjs/toolkit'

const filterReducer = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            return action.payload
        }
    }
})

export const { filterChange } = filterReducer.actions

export default filterReducer.reducer