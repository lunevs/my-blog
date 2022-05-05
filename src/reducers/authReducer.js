import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { statusChange } from './statusReducer'

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
            console.log('login user', action.payload)
            return action.payload
        },
        updateUser(state, action) {
            console.log('update user', action.payload)
            return action.payload
        }
    }
})

export const { saveUser, logoutUser, updateUser } = authReducer.actions

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
        try {
            const user = await loginService.login(content)
            dispatch(saveUser(user))
            dispatch(statusChange({message: `Добро пожаловать ${user.username}`, type: 'success'}))
            setTimeout(() => dispatch(statusChange({})), 3000)
        } catch(e) {
            console.log('error', e)
            dispatch(statusChange({message: 'Ошибка авторизации', type: 'danger'}))
            setTimeout(() => dispatch(statusChange({})), 3000)
        }
    }
}

export default authReducer.reducer