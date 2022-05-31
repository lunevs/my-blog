import { createSlice } from '@reduxjs/toolkit'
import roomService from "../services/rooms";


const roomsReducer = createSlice({
    name: 'rooms',
    initialState: [],
    reducers: {
        popRoom(state, action) {
            const id = action.payload
            return state.filter(el => el.id !== id)
        },
        appendRoom(state, action) {
            state.push(action.payload)
        },
        setRoom(state, action) {
            return action.payload
        },
        updateRoom(state, action) {
            return action.payload
        }
    }
})

export const { popRoom, appendRoom, setRoom, updateRoom } = roomsReducer.actions

export const initializeRooms = () => {
    return async dispatch => {
        const rooms = await roomService.getAll()
        dispatch(setRoom(rooms))
    }
}

export const createRooms = (content) => {
    return async dispatch => {
        const newRoom = await roomService.create(content)
        dispatch(appendRoom(newRoom))
    }
}

export const deleteLocation = (id) => {
    return async dispatch => {
        await roomService.remove(id)
        dispatch(popRoom(id))
    }
}

export default roomsReducer.reducer