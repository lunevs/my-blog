import { Button, Col, Form, Row } from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRoom } from "../reducers/roomReducer";

const RoomEdit = () => {

    const id = useParams().id
    const dispatch = useDispatch()
    const room = useSelector(state => state.rooms.find(el => el.id === id))

    const [roomItem, setRoomItem] = useState({
        roomCode: '',
        roomName: '',
        availableBed: 0,
        isMan: false,
        locationId: ''
    })
    useEffect(() => {
        setRoomItem(room === undefined ? '' : room)
    }, [room])

    const editRoomHandler = (event) => {
        event.preventDefault()
        console.log('try update room: ', roomItem)
        dispatch(updateRoom({id, newRoom: roomItem}))
    }

    return (
        <div className='pageBody'>
            <Form onSubmit={editRoomHandler}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">Название комнаты:</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            name='roomName'
                            value={roomItem.roomName}
                            onChange={
                                (e) =>
                                    setRoomItem({...roomItem, roomName: e.currentTarget.value})
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">Код (номер) комнаты:</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            name='roomCode'
                            value={roomItem.roomCode}
                            onChange={
                                (e) =>
                                    setRoomItem({...roomItem, roomCode: e.currentTarget.value})
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">Кроватей в комнате:</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="number"
                            name='availableBed'
                            value={roomItem.availableBed}
                            onChange={
                                (e) =>
                                    setRoomItem({...roomItem, availableBed: Number(e.currentTarget.value)})
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">Комната для:</Form.Label>
                    <Col sm="8">
                        <Form.Check
                            type="checkbox"
                            name='isMan'
                            checked={roomItem.isMan}
                            label='мужская'
                            onChange={
                                (e) =>
                                    setRoomItem({...roomItem, isMan: e.currentTarget.checked})
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">Объект расположения комнаты:</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            name='location'
                            value={room === undefined ? '' : room.location.name}
                            readOnly
                        />
                    </Col>
                </Form.Group>

                <Button variant="outline-primary" type="submit">Сохранить</Button>

            </Form>
        </div>
    )
}

export default RoomEdit
