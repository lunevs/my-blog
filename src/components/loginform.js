import React from 'react'
import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import Togglable from './togglable'
import loginService from '../services/login'
import blogService from '../services/blogs'


const LoginForm = ({ handleSetUser }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginFormRef = useRef()

    const handleUsernameChange = (event) => setUsername(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)

    const handleLogin = (event) => {
        event.preventDefault()
        try {
            loginService
                .login({ username, password })
                .then(response => {
                    console.log('handleLogin', response)
                    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response))
                    blogService.setToken(response.token)
                    handleSetUser(response)
                    return response
                })
            setPassword('')
            setUsername('')
        } catch (e) {
            console.log('Wrong credentials')
        }
    }

    return (
        <Togglable buttonLabel='login' ref={loginFormRef}>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            id='username'
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        password
                        <input
                            id='password'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button id='login-button' type="submit">login</button>
                </form>
            </div>
        </Togglable>
    )
}

LoginForm.propTypes = {
    handleSetUser: PropTypes.func.isRequired
}

export default LoginForm