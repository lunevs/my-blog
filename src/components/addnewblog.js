import blogService from '../services/blogs'
import { useState, useRef } from 'react'
import Togglable from './togglable'


const AddBlogForm = ({ concatNewBlog }) => {

    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        likes: 0,
        url: ''
    })
    const blogFormRef = useRef()

    const addBlogHandle = (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        const newBlogObj = {
            title: newBlog.title,
            author: newBlog.author,
            likes: newBlog.likes,
            url: newBlog.url
        }
        blogService
            .create(newBlogObj)
            .then(returnedBlog => {
                concatNewBlog(returnedBlog)
                setNewBlog({
                    title: '',
                    author: '',
                    likes: 0,
                    url: ''
                })
            })
    }

    const titleChangeHandle = (event) => (setNewBlog({ ...newBlog, title: event.target.value }))
    const authorChangeHandle = (event) => (setNewBlog({ ...newBlog, author: event.target.value }))
    const urlChangeHandle = (event) => (setNewBlog({ ...newBlog, url: event.target.value }))

    return (
        <Togglable buttonLabel='add New blog' ref={blogFormRef}>
            <form onSubmit={ addBlogHandle }>
                <p>Enter Title: <input value={newBlog.title} onChange={titleChangeHandle}/></p>
                <p>Enter Author: <input value={newBlog.author} onChange={authorChangeHandle}/></p>
                <p>Enter Url: <input value={newBlog.url} onChange={urlChangeHandle}/></p>
                <button type='submit'>save data</button>
            </form>
        </Togglable>
    )
}

export default AddBlogForm

