import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Blogs from './components/blogs'
import VisibilityFilter from './components/visibilityfilter'
import AddBlogForm from './components/addnewblog'
import AuthUser from './components/authuser'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/authReducer'

import './App.css'


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
            <AddBlogForm />
            <Blogs />
        </div>
    )
}

export default App
