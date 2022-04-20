import Togglable from './togglable'
import React from 'react'

const BlogElement = ({ blog, deleteBlog }) => {
    return (
        <li>
            <h2>{blog.title} <button>hide</button></h2>
            <Togglable buttonLabel='details'>
                <p>{blog.url}</p>
                <p>{blog.likes}</p>
                <p>{blog.author}</p>
                <button onClick={deleteBlog}>remove blog</button>
            </Togglable>
        </li>
    )
}

export default BlogElement

