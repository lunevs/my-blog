import React from 'react'
import { useSelector } from 'react-redux'

import BlogElement from './blogelement'

const Blog = () => {

    const blogs = useSelector(state => {
        if (state.filter !== '') {
            return state.blogs.filter(el => el.title.includes(state.filter))
        }
        return state.blogs
    })

    return (
        <div>
            <ul>
                {blogs.map(blog => <BlogElement key={blog.id} blog={blog} />)}
            </ul>
        </div>
    )
}


export default Blog


