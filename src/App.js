import React from 'react'
import { useEffect } from 'react'
import './App.css'
import Blogs from './components/blogs'
import VisibilityFilter from './components/visibilityfilter'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/authReducer'
import { useDispatch } from 'react-redux'
import AuthUser from './components/authuser'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
    }, [dispatch])

    return (
        <div>
            <h1>Blogs</h1>
            <AuthUser />
            <VisibilityFilter />
            <AddBlogForm concatNewBlog={() => dispatch(createBlog(newBlog)))} />
            <Blogs />
        </div>
    )
}

export default App
