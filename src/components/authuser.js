import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './loginform'
import UserForm from './userform'

const AuthUser = () => {

    const user = useSelector(state => {
        console.log('AuthUser', state.user)
        return Object.keys(state.user).length === 0 ? null : state.user
    })

    return (
        <div>
            { user === null ? <LoginForm /> : <UserForm /> }
        </div>
    )
}

export default AuthUser
