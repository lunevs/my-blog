import React from "react";
import { useState } from 'react'
import { useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";

const AddEvent = () => {

    const [regStatus, setRegStatus] = useState(true)
    const currentUser = useSelector(state => state.user)

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
    }

    return (
        <div className='pageBody'>

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
                            label={regStatus ? 'открыта' : 'закрыта'}
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

        </div>
    )
}

export default AddEvent