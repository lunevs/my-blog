import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import {useDispatch, useSelector} from 'react-redux'

const VisibilityFilter = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => (Object.keys(state.user).length === 0 ? null : state.user))


    return (
        <div>
            {user === null ? <div /> :
                <input
                    type="text"
                    name="filter"
                    onChange={(event) => dispatch(filterChange(event.target.value))}
                />
            }
        </div>
    )
}

export default VisibilityFilter