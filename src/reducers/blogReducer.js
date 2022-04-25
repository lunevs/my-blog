import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        removeBlog(state, action) {
            const id = action.payload
            return state.filter(el => el.id !== id)
        },
        likeBlog(state, action) {
            const id = action.payload
            let newBlog = state.find(el => el.id === id)
            newBlog = { ...newBlog, likes: newBlog.likes+1 }
            return state.map(el => (el.id !== id) ? el : newBlog)
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const { removeBlog, likeBlog, appendBlog, setBlogs } = blogReducer.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export default blogReducer.reducer