import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteRoom } from "../reducers/roomReducer";



const RoomElement = ({ room }) => {

    const dispatch = useDispatch()
    const location = room.location

    const delElementHandler = (id) => {
        dispatch(deleteRoom(id))
    }

    return (
        <tr key={room.id}>
            <td>{room.roomCode}</td>
            <td>
                <Link to={`/room/${room.id}`}>{room.roomName}</Link>
            </td>
            <td>{room.availableBed}</td>
            <td>{room.isMan ? 'М' : 'Ж'}</td>
            <td>{room.location === null ? 'null' : location.name}</td>
            <td>
                <Button onClick={() => delElementHandler(room.id)} variant="outline-danger" size="sm">
                    удалить
                </Button>
            </td>
        </tr>
    )
}

export default RoomElement

