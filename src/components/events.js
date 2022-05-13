import React from "react";
import { useEffect, useState } from 'react'
import { Nav, Table } from "react-bootstrap";
import eventService from '../services/events'
import { Link } from "react-router-dom";


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

            <Link to='/addevent'>Добавить мероприятие</Link>

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
                    {eventsList.map((e, idx) =>
                        <tr key={idx}>
                            <td><Link to={`/event/${e.id}`}>{e.title}</Link></td>
                            <td>{e.startDate}</td>
                            <td>{e.isRegistrationOpen ? 'открыта' : 'закрыта'}</td>
                            <td>{e.isRegistrationOpen ? <Link to={`/regevent/${e.id}`}>зарегистрироваться</Link> : <div />}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Events