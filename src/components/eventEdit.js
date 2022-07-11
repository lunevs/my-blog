import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import ApplicationsList from "./applicationsList";

const curDt = new Date()

const EventEdit = () => {

    const id = useParams().id
    const locationsList = useSelector(state => state.locations)
    const currentEvent = useSelector(state => state.events.find(el => el.id === id))
    const [editedEvent, setEditedEvent] = useState({
        title: '',
        startDate: curDt.toISOString().substring(0, 10),
        endDate: curDt.toISOString().substring(0, 10),
        isRegistrationOpen: false,
        basePrice: 0,
        locationId: ''
    })
    useEffect(() => {
        console.log('currentEvent', currentEvent)
        if (currentEvent !== undefined) {
            const updatedEvent = {
                title: currentEvent.title,
                startDate: new Date(currentEvent.startDate).toISOString().substring(0, 10),
                endDate: new Date(currentEvent.endDate).toISOString().substring(0, 10),
                isRegistrationOpen: currentEvent.isRegistrationOpen,
                basePrice: currentEvent.basePrice,
                locationId: currentEvent.location === null ? '-1' : currentEvent.location.id
            }
            setEditedEvent(updatedEvent)
        }
    }, [currentEvent])

    const editEventHandler = (event) => {
        event.preventDefault()
        console.log('editedEvent', editedEvent)
        console.log('date', curDt.toISOString().substring(0, 10))
    }

    return (

    <div className='pageBody'>
        <Form onSubmit={editEventHandler}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">Название события:</Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        name='eventTitle'
                        value={editedEvent.title}
                        onChange={
                            (e) =>
                                setEditedEvent({...editedEvent, title: e.currentTarget.value})
                        }
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">Дата начала:</Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="date"
                        name='eventStartDate'
                        value={editedEvent.startDate}
                        onChange={
                            (e) =>
                                setEditedEvent({...editedEvent, startDate: e.currentTarget.value})
                        }
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">Дата завершения:</Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="date"
                        name='eventEndDate'
                        value={editedEvent.endDate}
                        onChange={
                            (e) =>
                                setEditedEvent({...editedEvent, endDate: e.currentTarget.value})
                        }
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">Базовая цена за день:</Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="number"
                        name='eventBasePrice'
                        value={editedEvent.basePrice}
                        onChange={
                            (e) =>
                                setEditedEvent({...editedEvent, basePrice: Number(e.currentTarget.value)})
                        }
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">Место проведения:</Form.Label>
                <Col sm="9">
                    <Form.Select
                        name='eventLocationId'
                        value={editedEvent.locationId}
                        onChange={
                            (e) =>
                                setEditedEvent({...editedEvent, locationId: e.currentTarget.value})
                        }
                    >
                        <option value='-1' key='-1'>не определено</option>
                        {locationsList.map(el => (
                            <option value={el.id} key={el.id}>{el.name}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">Статус регистрации:</Form.Label>
                <Col sm="9">
                    <Form.Check
                        type="checkbox"
                        name='eventRegistration'
                        label={`регистрация ${editedEvent.isRegistrationOpen ? 'открыта' : 'закрыта'}`}
                        checked={editedEvent.isRegistrationOpen}
                        onChange={
                            (e) =>
                                setEditedEvent({...editedEvent, isRegistrationOpen: e.currentTarget.checked})
                        }
                    />
                </Col>
            </Form.Group>

            <Button variant="outline-primary" type="submit">Сохранить</Button>

        </Form>
        <br />

        <div>
            моя заявка: / изменить / отменить
        </div>

        <br />

        <div>
            все заявки: / подтвердить / отказать - указать причину
            <ApplicationsList />
        </div>




    </div>

    )
}

export default EventEdit

