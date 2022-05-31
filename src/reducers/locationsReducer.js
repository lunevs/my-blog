import { createSlice } from '@reduxjs/toolkit'
import locationService from "../services/locations";


const locationsReducer = createSlice({
    name: 'locations',
    initialState: [],
    reducers: {
        popLocation(state, action) {
            const id = action.payload
            return state.filter(el => el.id !== id)
        },
        appendLocation(state, action) {
            state.push(action.payload)
        },
        setLocation(state, action) {
            return action.payload
        },
        updateLocation(state, action) {
            return action.payload
        }
    }
})

export const { popLocation, appendLocation, setLocation, updateLocation } = locationsReducer.actions

export const initializeLocations = () => {
    return async dispatch => {
        const locations = await locationService.getAll()
        dispatch(setLocation(locations))
    }
}

export const createLocation = (content) => {
    return async dispatch => {
        const newLocation = await locationService.create(content)
        dispatch(appendLocation(newLocation))
    }
}

export const deleteLocation = (id) => {
    return async dispatch => {
        await locationService.remove(id)
        dispatch(popLocation(id))
    }
}

export default locationsReducer.reducer