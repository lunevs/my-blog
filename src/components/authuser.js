import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './loginform'
import UserForm from './userform'

const AuthUser = () => {

    const user = useSelector(state => (Object.keys(state.user).length === 0 ? null : state.user))

    return (
        <div className='authBlock'>
            { user === null ? <LoginForm /> : <UserForm /> }
        </div>
    )
}

export default AuthUser
