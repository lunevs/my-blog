import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { oparinoRooms } from "../helper";
import eventService from "../services/events";


const RegEvent = () => {

    const id = useParams().id
    const user = useSelector(state => state.user)
    const [currentEvent, setCurrentEvent] = useState({})
    const filteredRooms = oparinoRooms.filter(el => (user.sex === 'man' ? el.isMan : !el.isMan) && el.isOpen)

    useEffect(() => {
        eventService
            .getOne(id)
            .then((response) => {
                console.log('get event id:', id, response)
                setCurrentEvent(response)
            })
    }, [])

    const regEventSubmitHandler = (event) => {
        event.preventDefault()
        console.log('user2', user)
    }

    return (
        <div className='pageBody'>
            <Form onSubmit={regEventSubmitHandler}>
                <Form.Group as={Row} className="mb-3" controlId="regFormUsername">
                    <Form.Label column sm="3">Имя пользователя:</Form.Label>
                    <Col sm="9">
                        <Form.Control readOnly type="text" placeholder={user.username} name='username' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormFromDate">
                    <Form.Label column sm="3">Дата заезда:</Form.Label>
                    <Col sm="9">
                        <Form.Control type="date" name='fromDate' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormToDate">
                    <Form.Label column sm="3">Дата выезда:</Form.Label>
                    <Col sm="9">
                        <Form.Control type="date" name='toDate' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormRoom">
                    <Form.Label column sm="3">Спальное место:</Form.Label>
                    <Col sm="9">
                        <Form.Select
                            name='room'
                        >
                            <option value='0A' key='0A'>Без спального места</option>
                            {
                                filteredRooms.map(el => (
                                    <option value={el.roomCode} key={el.roomCode}>
                                        {el.roomText} (свободно {el.numOfBeds - el.booked} мест)
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormTransport">
                    <Form.Label column sm="3">Транспорт:</Form.Label>
                    <Col sm="9">
                        <Form.Select name='transport'>
                            <option value='nonSelected' key='t-1'>...</option>
                            <option value='selfCar' key='t-2'>Еду на машине, доберусь сам</option>
                            <option value='byCarCanHelp' key='t-3'>Еду на машине, могу взять попутчиков</option>
                            <option value='needCar' key='t-4'>Нужна помощь с транспортом</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormChurchStatus">
                    <Form.Label column sm="3">Дежурство:</Form.Label>
                    <Col sm="9">
                        <Form.Check label="служитель (принял крещение и активно тружусь)" name="churchStatus" type='radio' id='liderStatus' />
                    </Col>
                </Form.Group>

                <Button type="submit">Зарегистрироваться</Button>

            </Form>



        </div>
    )
}

export default RegEvent