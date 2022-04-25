import React from 'react'
import { useEffect } from 'react'
import './App.css'
import Blogs from './components/blogs'
import blogService from './services/blogs'
import { setBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        blogService
            .getAll().then(blogs => dispatch(setBlogs(blogs)))
    }, [dispatch])
    return (
        <div>
            <Blogs />
        </div>
    )
}

export default App
