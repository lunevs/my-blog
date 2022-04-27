import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const authReducer = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        logoutUser(state, action) {
            window.localStorage.removeItem('loggedBlogappUser')
            blogService.setToken(null)
            return {}
        },
        saveUser(state, action) {
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(action.payload))
            blogService.setToken(action.payload.token)
            return action.payload
        }
    }
})

export const { saveUser, logoutUser } = authReducer.actions

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(saveUser(user))
        }
    }
}

export const loginUser = (content) => {
    return async dispatch => {
        const user = await loginService.login(content)
        dispatch(saveUser(user))
    }
}

export default authReducer.reducer