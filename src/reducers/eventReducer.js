import { createSlice } from '@reduxjs/toolkit'
import eventService from '../services/events'

const eventReducer = createSlice({
    name: 'events',
    initialState: [],
    reducers: {
        popEvent(state, action) {
            const id = action.payload
            return state.filter(el => el.id !== id)
        },
        appendEvent(state, action) {
            state.push(action.payload)
        },
        setEvents(state, action) {
            return action.payload
        },
        updateEvent(state, action) {
            return action.payload
        }
    }
})

export const { popEvent, appendEvent, updateEvent, setEvents } = eventReducer.actions

export const initializeEvents = () => {
    return async dispatch => {
        const events = await eventService.getAll()
        dispatch(setEvents(events))
    }
}

export const createEvent = (content) => {
    return async dispatch => {
        const newEvent = await eventService.create(content)
        dispatch(appendEvent(newEvent))
    }
}

export const deleteEvent = (id) => {
    return async dispatch => {
        await eventService.remove(id)
        dispatch(popEvent(id))
    }
}

export default eventReducer.reducer