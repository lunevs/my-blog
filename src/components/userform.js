import React from 'react'
import { logoutUser } from '../reducers/authReducer'
import {useDispatch, useSelector} from 'react-redux'

const UserForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => {
        return state.user
    })

    return (
        <div className='pageBody'>
            <p>
                {user.username} logged-in
                <button onClick={() => dispatch(logoutUser())}>logout</button>
            </p>
        </div>
    )
}

export default UserForm