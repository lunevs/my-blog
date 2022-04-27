import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <input
                type="text"
                name="filter"
                onChange={(event) => dispatch(filterChange(event.target.value))}
            />
        </div>
    )
}

export default VisibilityFilter