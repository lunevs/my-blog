import React from 'react'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import BlogElement from './blogelement'

const Blog = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => {
        if (state.filter !== '') {
            return state.blogs.filter(el => el.title.includes(state.filter))
        }
        return state.blogs
    })

    const deleteBlog = (id) => {
        blogService
            .remove(id)
            .then(() => {
                dispatch(removeBlog(id))
            })
    }

    const likeCurrentBlog = (id) => {
        let newBlog = blogs.find(el => el.id === id)
        newBlog = { ...newBlog, likes: newBlog.likes+1 }

        blogService
            .update(id, newBlog)
            .then(() => {
                dispatch(likeBlog(id))
            })
    }

    return (
        <div>
            <ul>
                {
                    blogs.map(blog =>
                        <BlogElement
                            key={blog.id}
                            blog={blog}
                            blogLikes={blog.likes}
                            deleteBlog = {() => deleteBlog(blog.id)}
                            likeCurrentBlog = {() => likeCurrentBlog(blog.id)}
                        />
                    )
                }
            </ul>
        </div>
    )
}


export default Blog


