import React from 'react'
import { loginUser } from '../reducers/authReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
    const dispatch = useDispatch()

    const handleLogin = (event) => {
        event.preventDefault()
        const reqUser = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        dispatch(loginUser(reqUser))
    }

    return (
        <div>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control
                        id='username'
                        type='text'
                        name='username'
                    />
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        id='password'
                        type='password'
                        name='password'
                    />
                    <Button variant='primary' id='login-button' type='submit'>
                        login
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default LoginForm