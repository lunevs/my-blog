import React from "react";
import { useEffect, useState } from 'react'
import eventService from "../services/events";
import { useParams } from "react-router-dom";

const OneEvent = () => {

    const [currentEvent, setCurrentEvent] = useState({})

    const id = useParams().id
    useEffect(() => {
        eventService
            .getOne(id)
            .then((response) => {
                console.log('get event id:', id, response)
                setCurrentEvent(response)
            })
    }, [])


    return (
        <div className='pageBody'>
            <h2>{currentEvent.title}</h2>
            <p>{currentEvent.fromDate}</p>
            <p>{currentEvent.toDate}</p>
            <p>{currentEvent.description}</p>
        </div>
    )
}

export default OneEvent

