import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteLocation } from "../reducers/locationsReducer";


const LocationElement = ({ location }) => {

    const dispatch = useDispatch()

    const delElementHandler = (id) => {
        dispatch(deleteLocation(id))
    }

    return (
        <tr key={location.id}>
            <td>{location.index}</td>
            <td>
                <Link to={`/location/${location.id}`}>{location.name}</Link>
            </td>
            <td>{location.description}</td>
            <td>
                <Button onClick={() => delElementHandler(location.id)} variant="outline-danger" size="sm">
                    удалить
                </Button>
            </td>
        </tr>
    )
}

export default LocationElement

