import React from 'react'
import { useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import Togglable from './togglable'


const AddBlogForm = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => (Object.keys(state.user).length === 0 ? null : state.user))

    const blogFormRef = useRef()

    const addBlogHandle = (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        const target = event.target
        const newBlogObj = {
            title: target.title.value,
            author: target.author.value,
            likes: 0,
            url: target.url.value
        }
        target.title.value = ''
        target.author.value = ''
        target.url.value = ''
        dispatch(createBlog(newBlogObj))
    }

    return (
        <div>
            {user === null ? <div/> :
                <Togglable blockTitle='New blog' buttonLabel='add' ref={blogFormRef}>
                    <form onSubmit={addBlogHandle}>
                        <p>Enter Title: <input id='addBlogTitle' name='title'/></p>
                        <p>Enter Author: <input id='addBlogAuthor' name='author'/></p>
                        <p>Enter Url: <input id='addBlogUrl' name='url'/></p>
                        <button type='submit'>save data</button>
                    </form>
                </Togglable>
            }
        </div>
    )
}

export default AddBlogForm

