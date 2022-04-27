import React from 'react'
import { useDispatch } from 'react-redux'

import Togglable from './togglable'
import {deleteBlogService, likeBlogService} from "../reducers/blogReducer";

const BlogElement = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        listStyle: 'none'
    }

    const dispatch = useDispatch()

    const likeCurrentBlog = () => {
        const newBlog = { ...blog, likes: blog.likes+1 }
        dispatch(likeBlogService({id: blog.id, newBlog}))
    }

    return (
        <li key={blog.id} style={blogStyle}>
            <Togglable blockTitle={blog.title} buttonLabel='details'>
                <h2>{blog.title}</h2>
                <p>{blog.author}</p>
                <p>{blog.likes} <button onClick={likeCurrentBlog}>like</button></p>
                <p>{blog.url}</p>
                <button onClick={() => dispatch(deleteBlogService(blog.id))}>remove blog</button>
            </Togglable>
        </li>
    )
}

export default BlogElement

