import React, {useEffect} from "react";
import { useState } from 'react'
import { Button, Col, Form, Row } from "react-bootstrap";
import locationService from "../services/locations";
import eventService from "../services/events";

const AddEvent = () => {

    const [locationsList, setLocationsList] = useState([])

    useEffect(() => {
        locationService
            .getAll()
            .then((response) => {
                console.log('get Locations AddEvent:', response)
                setLocationsList(response)
            })
    }, [])

    const addEventHandle = async (event) => {

        event.preventDefault()

        const newEvent = {
            status: 'new',
            title: event.target.title.value,
            startDate: event.target.startDate.value,
            endDate: event.target.endDate.value,
            isRegistrationOpen: event.target.isRegistrationOpen.checked,
            basePrice: event.target.basePrice.value,
            locationId: event.target.locationId.value
        }
        console.log(newEvent)
        const response = await eventService.create(newEvent)
        console.log('after addEventHandle', response)
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
                        <Form.Control type="date" id='addEventStart' name='startDate' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Дата завершения:</Form.Label>
                    <Col sm="9">
                        <Form.Control type="date" id='addEventEnd' name='endDate' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Статус регистрации:</Form.Label>
                    <Col sm="9">
                        <Form.Check
                            type="checkbox"
                            name="isRegistrationOpen"
                            label='открыта'
                            onChange={(e) => console.log(e.currentTarget.checked)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Базовая стоимость в день:</Form.Label>
                    <Col sm="9">
                        <Form.Control type="number" id='addEventPrice' name='basePrice' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Площадка мероприятия:</Form.Label>
                    <Col sm="9">
                        <Form.Select name='locationId'>
                            <option value='undefined' key='000'>...</option>
                            {
                                locationsList.map(el => (
                                    <option value={el.id} key={el.id}>{el.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Button variant="outline-dark" type='submit'>Сохранить</Button>
            </Form>

        </div>
    )
}

export default AddEvent