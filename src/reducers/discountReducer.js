import { createSlice } from '@reduxjs/toolkit'
import discountService from "../services/discounts";

const discountReducer = createSlice({
    name: 'discounts',
    initialState: [],
    reducers: {
        popDiscount(state, action) {
            const id = action.payload
            return state.filter(el => el.id !== id)
        },
        appendDiscount(state, action) {
            state.push(action.payload)
        },
        setDiscount(state, action) {
            return action.payload
        },
        updateDiscount(state, action) {
            return action.payload
        }
    }
})

export const { popDiscount, appendDiscount, setDiscount, updateDiscount } = discountReducer.actions

export const initializeDiscounts = () => {
    return async dispatch => {
        const discounts = await discountService.getAll()
        dispatch(setDiscount(discounts))
    }
}

export const createDiscount = (content) => {
    return async dispatch => {
        const newDiscount = await discountService.create(content)
        dispatch(appendDiscount(newDiscount))
    }
}

export const deleteDiscount = (id) => {
    return async dispatch => {
        await discountService.remove(id)
        dispatch(popDiscount(id))
    }
}

export default discountReducer.reducer