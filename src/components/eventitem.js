import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EventItem = () => {

    const id = useParams().id
    const currentEvent = useSelector(state => state.events.find(el => el.id === id))
    const currentLocation = currentEvent.location

    return (
        <div className='pageBody'>
            <h2>{currentEvent.title}</h2>
            <p>{currentEvent.startDate}</p>
            <p>{currentEvent.endDate}</p>
            <p>регистрация {currentEvent.isRegistrationOpen ? 'открыта' : 'закрыта'}</p>
            <p>стоимость одного дня {currentEvent.basePrice}</p>
            <p>место проведения {currentLocation.name}</p>
        </div>
    )
}

export default EventItem

