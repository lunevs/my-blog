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
        changeRoom(state, action) {
            const updatedRoom = action.payload
            return state.map(el => (el.id !== updatedRoom.id) ? el : updatedRoom)
        }
    }
})

export const { popRoom, appendRoom, setRoom, changeRoom } = roomsReducer.actions

export const initializeRooms = () => {
    return async dispatch => {
        const rooms = await roomService.getAll()
        dispatch(setRoom(rooms))
    }
}

export const createRoom = (content) => {
    return async dispatch => {
        const newRoom = await roomService.create(content)
        console.log('room added:', newRoom)
        dispatch(appendRoom(newRoom))
    }
}

export const deleteRoom = (id) => {
    return async dispatch => {
        await roomService.remove(id)
        dispatch(popRoom(id))
    }
}

export const updateRoom = ({id, newRoom}) => {
    return async dispatch => {
        await roomService.update(id, newRoom)
        dispatch(changeRoom({...newRoom, id}))
    }
}

export default roomsReducer.reducer