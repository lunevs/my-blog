import { createSlice } from '@reduxjs/toolkit'
import applicationService from "../services/applications";

const applicationReducer = createSlice({
    name: 'applications',
    initialState: [],
    reducers: {
        popApplication(state, action) {
            const id = action.payload
            return state.filter(el => el.id !== id)
        },
        appendApplication(state, action) {
            state.push(action.payload)
        },
        setApplication(state, action) {
            return action.payload
        },
        changeApplication(state, action) {
            const updatedApplication = action.payload
            return state.map(el => (el.id !== updatedApplication.id) ? el : updatedApplication)
        }
    }
})

export const { popApplication, appendApplication, setApplication, changeApplication } = applicationReducer.actions

export const initializeApplication = () => {
    return async dispatch => {
        const applications = await applicationService.getAll()
        dispatch(setApplication(applications))
    }
}

export const createApplication = (content) => {
    return async dispatch => {
        const newApplication = await applicationService.create(content)
        console.log("new application added", newApplication)
        dispatch(appendApplication(newApplication))
    }
}

export const deleteApplication = (id) => {
    return async dispatch => {
        await applicationService.remove(id)
        dispatch(popApplication(id))
    }
}

export const updateApplication = ({id, newApplication}) => {
    return async dispatch => {
        await applicationService.update(id, newApplication)
        dispatch(changeApplication({...newApplication, id}))
    }
}

export default applicationReducer.reducer
