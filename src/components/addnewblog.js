import React from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import Togglable from './togglable'
import {Form, Button, Row, Col} from 'react-bootstrap'

const AddBlogForm = () => {

    const dispatch = useDispatch()
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
            <Togglable blockTitle={null} buttonLabel='Создать новую запись' ref={blogFormRef}>
                <Form onSubmit={addBlogHandle}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Заголовок блога:</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" id='addBlogTitle' name='title' />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Автор блога:</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" id='addBlogAuthor' name='author' />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Url блога:</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" id='addBlogUrl' name='url' />
                        </Col>
                    </Form.Group>

                    <Button variant="outline-dark" type='submit'>save data</Button>
                </Form>
            </Togglable>
        </div>
    )
}

export default AddBlogForm

