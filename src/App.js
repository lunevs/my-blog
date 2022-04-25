import React from 'react'
import { useEffect } from 'react'
import './App.css'
import Blogs from './components/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    return (
        <div>
            <Blogs />
        </div>
    )
}

export default App
