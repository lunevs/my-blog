import React from "react";
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Togglable from "./togglable";

const Events = () => {

    const [eventsList, setEventsList] = useState([{
        title: 'выезд в Опарино. Май 2022',
        fromDate: '30/04/2022',
        toDate: '04/05/2022',
        description: 'какое-то подробное описание мероприятия... какое-то подробное описание мероприятия... ' +
            'какое-то подробное описание мероприятия... какое-то подробное описание мероприятия... ' +
            'какое-то подробное описание мероприятия... какое-то подробное описание мероприятия... ' +
            'какое-то подробное описание мероприятия... какое-то подробное описание мероприятия... ' +
            'какое-то подробное описание мероприятия... какое-то подробное описание мероприятия... ' +
            'какое-то подробное описание мероприятия... какое-то подробное описание мероприятия... ' +
            'какое-то подробное описание мероприятия... какое-то подробное описание мероприятия... ' +
            'какое-то подробное описание мероприятия... какое-то подробное описание мероприятия... ',
        isClosed: false,
        images: []
    }])
    const [regStatus, setRegStatus] = useState(true)

    const currentUser = useSelector(state => state.user)

    useEffect(() => {
        if (currentUser.status && currentUser.status === 'admin') {
            console.log('you are Admin', currentUser)
        } else {
            console.log('you are NOT Admin', currentUser)
        }

    }, [])

    const addEventHandle = (event) => {
        event.preventDefault()

        const newEvent = {
            title: event.target.title.value,
            fromDate: event.target.fromDate.value,
            toDate: event.target.toDate.value,
            description: event.target.description.value,
            isClosed: event.target.status.value,
            author: event.target.author.value,
            images: []
        }
        console.log(newEvent)
        setEventsList(eventsList.concat(newEvent))
    }

    return (
        <div className='pageBody'>

            <Togglable blockTitle={null} buttonLabel='Создать новое мероприятие'>
                <Form onSubmit={addEventHandle}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Название мероприятия:</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" id='addEventTitle' name='title' />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Дата начала:</Form.Label>
                        <Col sm="9">
                            <Form.Control type="date" id='addEventStart' name='fromDate' />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Дата завершения:</Form.Label>
                        <Col sm="9">
                            <Form.Control type="date" id='addEventEnd' name='toDate' />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Описание:</Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" id='addEventDescription' name='description' rows={3} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Статус регистрации:</Form.Label>
                        <Col sm="9">
                            <Form.Check
                                type="switch"
                                id="addEventStatus"
                                label="открыта"
                                name='status'
                                checked={regStatus}
                                onChange={() => setRegStatus(!regStatus)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Создатель мероприятия:</Form.Label>
                        <Col sm="9">
                            <Form.Control readOnly type="text" id='addEventAuthor' name='author' defaultValue={currentUser.username} />
                        </Col>
                    </Form.Group>

                    <Button variant="outline-dark" type='submit'>Сохранить</Button>
                </Form>
            </Togglable>


            <Table striped>
                <thead>
                    <tr>
                        <th>Мероприятие</th>
                        <th>Даты</th>
                        <th>Регистрация</th>
                    </tr>
                </thead>
                <tbody>
                    {eventsList.map(event =>
                        <tr>
                            <td>{event.title}</td>
                            <td>{event.fromDate} - {event.toDate}</td>
                            <td>{event.isClosed ? 'закрыта' : 'открыта'}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Events