import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Months } from "../helper";
import applicationService from "../services/applications";


const RegEvent = () => {

    const [datesRange, setDatesRange] = useState([])
    const [startDate, setStartDate] = useState(new Date())

    const id = useParams().id
    const user = useSelector(state => state.user)
    const currentEvent = useSelector(state => state.events.find(el => el.id === id))
    useEffect(() => {
        if (currentEvent !== undefined) {
            let dt1 = new Date(currentEvent.startDate)
            setStartDate(dt1.toDateString())

            const dt2 = new Date(currentEvent.endDate)
            let dtRange = []
            while (dt1 < dt2) {
                const el = {
                    dtname: `${dt1.getDate()} ${Months[dt1.getMonth()]} ${dt1.getFullYear()}`,
                    dtcode: dt1.toDateString()
                }
                dtRange.push(el)
                dt1.setDate(dt1.getDate() + 1);
            }
            setDatesRange(dtRange)
        }
    }, [currentEvent])

    const discountsList = useSelector(state => state.discounts)

    const roomsList = useSelector(state => {
        if (currentEvent === undefined || currentEvent.location === null) {
            return state.rooms
        } else {
            console.log('currentEvent.location', currentEvent)
            return state.rooms.filter(el => el.location.id === currentEvent.location.id)
        }
    })

    const regEventSubmitHandler = (event) => {
        event.preventDefault()
        const application = {
            status: "new",
            startDate: event.target.startDate.value,
            endDate: event.target.endDate.value,
            user: user.id,
            eventId: currentEvent.id,
            roomId: event.target.bookedRoom.value,
            discountId: event.target.discount.value
        }
        console.log("request application = ", application)
        console.log('currentEvent 2', currentEvent)
        applicationService.create(application).then(response => {console.log(response)})
    }

    const changeStartDate = (event) => {
        setStartDate(event.currentTarget.value)
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

                <Form.Group as={Row} className="mb-3" controlId="regFormStartDate">
                    <Form.Label column sm="3">Дата заезда:</Form.Label>
                    <Col sm="9">
                        <Form.Select
                            name='startDate'
                            onChange={changeStartDate}
                        >
                            {
                                datesRange.map((el, idx) => (
                                    <option
                                        value={el.dtcode}
                                        key={`start-dt-${idx}`}
                                    >
                                        {el.dtname}
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormEndDate">
                    <Form.Label column sm="3">Дата выезда:</Form.Label>
                    <Col sm="9">
                        <Form.Select
                            name='endDate'
                        >
                            {
                                datesRange
                                    .filter(el => {
                                        const d1 = new Date(el.dtcode)
                                        const d2 = new Date(startDate)
                                        return d1 >= d2
                                    })
                                    .map((el, idx) => (
                                        <option value={el.dtcode} key={`end-dt-${idx}`}>{el.dtname}</option>
                                    ))
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormRoom">
                    <Form.Label column sm="3">Спальное место:</Form.Label>
                    <Col sm="9">
                        <Form.Select
                            name='bookedRoom'
                        >
                            <option value='0A' key='0A'>Без спального места</option>
                            {
                                roomsList.map(el => (
                                    <option value={el.id} key={el.id}>
                                        {el.roomName} (свободно {el.availableBed} мест)
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="regFormDiscount">
                    <Form.Label column sm="3">Тариф:</Form.Label>
                    <Col sm="9">
                        <Form.Select
                            name='discount'
                        >
                            {
                                discountsList.map(el => (
                                    <option value={el.id} key={el.id}>
                                        {el.name} (оплата {el.coefficient * 100}%)
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Button type="submit">Зарегистрироваться</Button>

            </Form>



        </div>
    )
}

export default RegEvent