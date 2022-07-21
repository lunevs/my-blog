import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import filterReducer from './reducers/filterReducer'
import authReducer from './reducers/authReducer'
import statusReducer from './reducers/statusReducer'
import eventReducer from './reducers/eventReducer'
import locationsReducer from "./reducers/locationsReducer";
import roomReducer from "./reducers/roomReducer";
import discountReducer from "./reducers/discountReducer"
import applicationReducer from "./reducers/applicationReducer";

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        filter: filterReducer,
        user: authReducer,
        status: statusReducer,
        events: eventReducer,
        locations: locationsReducer,
        rooms: roomReducer,
        discounts: discountReducer,
        applications: applicationReducer
    }
})

export default store
