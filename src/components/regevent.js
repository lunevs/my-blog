import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Months } from "../helper";
import eventService from "../services/events";
import applicationService from "../services/applications";
import roomService from "../services/rooms";
import discountService from "../services/discounts";


const RegEvent = () => {

    const id = useParams().id
    const user = useSelector(state => state.user)
    const [roomsList, setRoomsList] = useState([])
    const [currentEvent, setCurrentEvent] = useState({})
    const [datesRange, setDatesRange] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [discountsList, setDiscountsList] = useState([])


    useEffect(() => {

        async function fetchData() {
            const events = await eventService.getOne(id)
            const rooms = await roomService.getAll()
            const discounts = await discountService.getAll()

            if (discounts) {
                setDiscountsList(discounts)
            }

            if (events) {
                setCurrentEvent(events)

                let dt1 = new Date(events.startDate)
                setStartDate(dt1.toDateString())

                const dt2 = new Date(events.endDate)
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

                if (rooms) {
                    const newRooms = rooms.filter(el => el.location.id === events.location.id)
                    setRoomsList(newRooms)
                    console.log(newRooms)
                }
            }

        }
        const resEvents = fetchData()

    }, [])

    const regEventSubmitHandler = (event) => {
        event.preventDefault()
        const application = {
            status: "new",
            startDate: event.target.startDate.value,
            endDate: event.target.endDate.value,
            user: user.id,
            event: currentEvent.id,
            roomId: event.target.bookedRoom.value,
            discountId: event.target.discount.value
        }
        console.log("request application = ", application)
        applicationService
            .create(application)
            .then(response => {
                console.log(response)
            })
    }

    const changeStartDate = (event) => {
        //console.log('change start date to:', event.currentTarget.value)
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
                                        {el.name} (коэффициент {el.coefficient})
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