import { createSlice } from '@reduxjs/toolkit'

const blogReducer = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        createBlog(state, action) {
            const content = action.payload
            state.push({
                title: content.title,
                author: content.author,
                url: content.url,
                likes: 0
            })
        },
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

export const { createBlog, removeBlog, likeBlog, appendBlog, setBlogs } = blogReducer.actions

export const initializeBlogs = () = {
    
}

export default blogReducer.reducer