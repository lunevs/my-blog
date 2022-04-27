import React from 'react'
import { loginUser } from '../reducers/authReducer'
import { useDispatch } from 'react-redux'

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
            <form onSubmit={handleLogin}>
                <div>
                    username <input id='username' name='username' />
                </div>
                <div>
                    password <input id='password' type="password" name='password' />
                </div>
                <button id='login-button' type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm