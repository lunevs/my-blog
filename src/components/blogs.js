import React from 'react'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import LoginForm from './loginform'
import BlogElement from './blogelement'
import AddBlogForm from './addnewblog'

const Blog = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService
            .getAll()
            .then(initialBlogs => {
                setBlogs(initialBlogs)
                console.log(initialBlogs)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const concatNewBlog = (newBlog) => {
        return setBlogs(blogs.concat(newBlog))
    }

    const handleSetUser = (user) => {
        console.log('handleSetUser', user)
        return setUser(user)
    }

    const deleteBlog = (id) => {
        blogService
            .remove(id)
            .then(() => {
                setBlogs(blogs.filter(el => el.id !== id))
            })
    }

    const likeCurrentBlog = (id) => {
        let newBlog = blogs.find(el => el.id === id)
        newBlog = { ...newBlog, likes: newBlog.likes+1 }

        blogService
            .update(id, newBlog)
            .then(() => {
                setBlogs(blogs.map(el => (el.id !== id) ? el : newBlog))
            })
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        blogService.setToken(null)
    }

    return (
        <div>
            <h1>Blogs</h1>
            <br />
            {user === null ?
                <LoginForm handleSetUser={handleSetUser} /> :
                <div>
                    <p>
                        {user.name} logged-in
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    <AddBlogForm concatNewBlog={concatNewBlog} />
                </div>
            }
            <br />
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


