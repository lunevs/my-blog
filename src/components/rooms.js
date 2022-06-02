import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../reducers/roomReducer";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import RoomElement from "./roomElement";

const Rooms = () => {

    const roomsList = useSelector(state => state.rooms)
    const locationsList = useSelector(state => state.locations)

    const dispatch = useDispatch()

    const addRoomHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const newRoom = {
            roomName: event.target.roomName.value,
            roomCode: event.target.roomCode.value,
            availableBed: event.target.availableBed.value,
            isMan: event.target.isMan.checked,
            locationId: event.target.locationId.value

        }
        dispatch(createRoom(newRoom))
        form.reset()
    }

    return (
        <div className='pageBody'>
            <Card body  style={{ height: '130px' }}>
                <Form onSubmit={addRoomHandler}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formLocationName">
                            <Form.Control placeholder="Название" name='roomName' />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formLocationDescription">
                            <Form.Control placeholder="Код комнаты" name='roomCode' />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formLocationName">
                            <Form.Check type="checkbox" label='мужская' name='isMan' />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formLocationDescription">
                            <Form.Control type='number' placeholder="Количество кроватей" name='availableBed' />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formLocationDescription">
                            <Form.Select defaultValue="Локация..." name='locationId'>
                                <option>Локация...</option>
                                {
                                    locationsList.map(el => (
                                        <option value={el.id} key={el.id}>{el.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Button variant="primary" type="submit">
                                Добавить
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Card>

            <Table striped>
                <thead>
                <tr>
                    <th>Код комнаты</th>
                    <th>Описание</th>
                    <th>Кроватей</th>
                    <th>Пол</th>
                    <th>Локация</th>
                </tr>
                </thead>
                <tbody>
                    {roomsList.map(el => (
                        <RoomElement key={el.id} room={el} />
                    ))}
                </tbody>
            </Table>

            <ul>
            </ul>
        </div>
    )
}

export default Rooms

