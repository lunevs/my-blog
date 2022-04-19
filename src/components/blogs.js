import React from 'react'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import LoginForm from './loginform'
import Togglable from './togglable'

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

const Blog = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        likes: 0,
        url: ''
    })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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



    const addBlog = (event) => {
        event.preventDefault()
        const newBlogObj = {
            title: newBlog.title,
            author: newBlog.author,
            likes: newBlog.likes,
            url: newBlog.url
        }
        blogService
            .create(newBlogObj)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNewBlog({
                    title: '',
                    author: '',
                    likes: 0,
                    url: ''
                })
            })

    }

    const deleteBlog = (id) => {
        console.log('delete blog', id)
        blogService
            .remove(id)
            .then(response => {
                console.log(response.data)
                setBlogs(blogs.filter(el => el.id !== id))
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setPassword('')
            setUsername('')
        } catch (e) {
            console.log('Wrong credentials')
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        blogService.setToken(null)
    }

    const handleTitleChange = (event) => setNewBlog({ ...newBlog, title: event.target.value })
    const handleAuthorChange = (event) => setNewBlog({ ...newBlog, author: event.target.value })
    const handleUrlChange = (event) => setNewBlog({ ...newBlog, url: event.target.value })

    const addBlogForm = () => (
        <Togglable buttonLabel='add New blog'>
            <form onSubmit={addBlog}>
                <p>Enter Title: <input value={newBlog.title} onChange={handleTitleChange} /></p>
                <p>Enter Author: <input value={newBlog.author} onChange={handleAuthorChange} /></p>
                <p>Enter Url: <input value={newBlog.url} onChange={handleUrlChange} /></p>
                <button type='submit'>save data</button>
            </form>
        </Togglable>

    )

    const loginForm = () => {
        return (
            <Togglable buttonLabel='login'>
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                />
            </Togglable>
        )
    }

    return (
        <div>
            <h1>Blogs</h1>
            <br />
            {user === null ?
                loginForm() :
                <div>
                    <p>
                        {user.name} logged-in
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    {addBlogForm()}
                </div>
            }
            <br />
            <ul>
                {
                    blogs.map(blog =>
                        <BlogElement
                            key={blog.id}
                            blog={blog}
                            deleteNote = {() => deleteBlog(blog.id)}
                        />
                    )
                }
            </ul>
        </div>
    )
}


export default Blog


