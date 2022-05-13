import React from "react";
import { useEffect, useState } from 'react'
import eventService from "../services/events";
import { useParams } from "react-router-dom";

const EventItem = () => {

    const [currentEvent, setCurrentEvent] = useState({})
    const [location, setLocation] = useState('')

    const id = useParams().id
    useEffect(() => {
        eventService
            .getOne(id)
            .then((response) => {
                console.log('get event id:', id, response)
                setCurrentEvent(response)
                setLocation(response.location)
            })
    }, [])


    return (
        <div className='pageBody'>
            <h2>{currentEvent.title}</h2>
            <p>{currentEvent.startDate}</p>
            <p>{currentEvent.endDate}</p>
            <p>регистрация {currentEvent.isRegistrationOpen ? 'открыта' : 'закрыта'}</p>
            <p>стоимость одного дня {currentEvent.basePrice}</p>
            <p>место проведения {location.name}</p>
        </div>
    )
}

export default EventItem

