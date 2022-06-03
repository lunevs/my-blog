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
        changeDiscount(state, action) {
            const updatedDiscount = action.payload
            return state.map(el => (el.id !== updatedDiscount.id) ? el : updatedDiscount)
        }
    }
})

export const { popDiscount, appendDiscount, setDiscount, changeDiscount } = discountReducer.actions

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

export const updateDiscount = ({id, newDiscount}) => {
    return async dispatch => {
        await discountService.update(id, newDiscount)
        dispatch(changeDiscount({...newDiscount, id}))
    }
}

export default discountReducer.reducer