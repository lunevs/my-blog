import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/authReducer'
import { initializeEvents } from './reducers/eventReducer'
import { initializeLocations } from "./reducers/locationsReducer";
import { initializeRooms } from "./reducers/roomReducer";
import { initializeDiscounts } from "./reducers/discountReducer";
import { initializeApplication } from "./reducers/applicationReducer";

import './App.css'
import Adminroutes from "./Adminroutes";
import AuthUser from './components/authuser'


const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
        dispatch(initializeEvents())
        dispatch(initializeLocations())
        dispatch(initializeRooms())
        dispatch(initializeDiscounts())
        dispatch(initializeApplication())
    }, [dispatch])

    const user = useSelector(state => (Object.keys(state.user).length === 0 ? null : state.user))
    const status = useSelector(state => (Object.keys(state.status).length === 0 ? null : state.status))


    return (
        <div>
            {
                user
                ? <Adminroutes
                        user={user}
                        status={status}
                        logoutHandle={() => dispatch(logoutUser())}
                    />
                : <AuthUser />
            }
        </div>
    )
}

export default App
