import React from "react";
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Nav, Table } from "react-bootstrap";
import eventService from '../services/events'


const Events = () => {

    const [eventsList, setEventsList] = useState([])
    useEffect(() => {
        eventService
            .getAll()
            .then((response) => {
                console.log('get events:', response)
                setEventsList(response)
            })
    }, [])

    return (
        <div className='pageBody'>

            <Nav variant="pills" activeKey="1">
                <Nav.Item>
                    <Nav.Link href='/addevent' eventKey="1">Добавить мероприятие</Nav.Link>
                </Nav.Item>
            </Nav>

            <Table striped>
                <thead>
                    <tr>
                        <th>Мероприятие</th>
                        <th>Начало</th>
                        <th>Регистрация</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {eventsList.map((event, idx) =>
                        <tr key={idx}>
                            <td><a href={`/event/${event.id}`}>{event.title}</a></td>
                            <td>{event.fromDate}</td>
                            <td>{event.isClosed ? 'закрыта' : 'открыта'}</td>
                            <td>{event.isClosed ? <div /> : <a href={`/regevent/${event.id}`}>зарегистрироваться</a>}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Events