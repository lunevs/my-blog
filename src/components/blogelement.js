import Togglable from './togglable'
import React from 'react'

const BlogElement = ({ blog, deleteBlog, likeCurrentBlog, blogLikes }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        listStyle: 'none'
    }

    return (
        <li style={blogStyle}>
            <Togglable blockTitle={blog.title} buttonLabel='details'>
                <h2>{blog.title}</h2>
                <p>{blog.author}</p>
                <p>{blogLikes} <button onClick={likeCurrentBlog}>like</button></p>
                <p>{blog.url}</p>
                <button onClick={deleteBlog}>remove blog</button>
            </Togglable>
        </li>
    )
}

export default BlogElement

