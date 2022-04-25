import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        filter: filterReducer
    }
})

export default store
