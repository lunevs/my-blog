import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import filterReducer from './reducers/filterReducer'
import authReducer from './reducers/authReducer'
import statusReducer from './reducers/statusReducer'
import eventReducer from './reducers/eventReducer'

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        filter: filterReducer,
        user: authReducer,
        status: statusReducer,
        events: eventReducer,
    }
})

export default store
