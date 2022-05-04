import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'
import { InputGroup, FormControl } from 'react-bootstrap'

const VisibilityFilter = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => (Object.keys(state.user).length === 0 ? null : state.user))


    return (
        <div>
            {user === null
                ? <div />
                : <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Фильтр:</InputGroup.Text>
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="filter"
                        onChange={(event) => dispatch(filterChange(event.target.value))}
                    />
                </InputGroup>
            }
        </div>
    )
}

export default VisibilityFilter