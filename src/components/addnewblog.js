import Togglable from './togglable'
import React from 'react'

const AddBlogForm = ({
    newBlog,
    addBlogHandle,
    titleChangeHandle,
    authorChangeHandle,
    urlChangeHandle
}) => {
    return (
        <Togglable buttonLabel='add New blog'>
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

