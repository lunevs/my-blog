import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import filterReducer from './reducers/filterReducer'
import authReducer from './reducers/authReducer'

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        filter: filterReducer,
        user: authReducer,
    }
})

export default store
