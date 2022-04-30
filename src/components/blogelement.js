import React from 'react'
import { Link } from 'react-router-dom'


const BlogElement = ({ blog }) => {

    return (
        <tr key={blog.id}>
            <td>
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
            </td>
            <td>
                <p>{blog.author}</p>
            </td>
            <td>
                <p>{blog.likes}</p>
            </td>
        </tr>
    )
}

export default BlogElement

