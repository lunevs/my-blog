import React from 'react'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import LoginForm from './loginform'
import Togglable from './togglable'
import BlogElement from './blogelement'
import AddBlogForm from './addnewblog'


const Blog = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        likes: 0,
        url: ''
    })

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

    const addBlogHandle = (event) => {
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
                    <AddBlogForm
                        newBlog={newBlog}
                        addBlogHandle={addBlogHandle}
                        titleChangeHandle={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
                        authorChangeHandle={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
                        urlChangeHandle={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
                    />
                </div>
            }
            <br />
            <ul>
                {
                    blogs.map(blog =>
                        <BlogElement
                            key={blog.id}
                            blog={blog}
                            deleteBlog = {() => deleteBlog(blog.id)}
                        />
                    )
                }
            </ul>
        </div>
    )
}


export default Blog


