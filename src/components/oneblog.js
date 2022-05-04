import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBlogService, likeBlogService } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'

const OneBlog = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useParams().id
    const blog = useSelector(state => state.blogs.find(el => el.id === id))

    const likeCurrentBlog = () => {
        const newBlog = { ...blog, likes: blog.likes+1 }
        dispatch(likeBlogService({id: blog.id, newBlog}))
    }

    const deleteCurrentBlog = () => {
        dispatch(deleteBlogService(blog.id))
        navigate('/blogs')
    }

    return (
        <div className='pageBody'>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
            <p>{blog.likes} <button onClick={likeCurrentBlog}>like</button></p>
            <p>{blog.url}</p>
            <button onClick={deleteCurrentBlog}>remove blog</button>
        </div>
    )
}

export default OneBlog

