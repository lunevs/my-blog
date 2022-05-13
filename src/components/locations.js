import React from "react";
import { useEffect, useState } from "react";
import locationService from "../services/locations";

const Locations = () => {

    const [locationsList, setLocationsList] = useState([])
    useEffect(() => {
        locationService
            .getAll()
            .then((response) => {
                console.log('get Locations:', response)
                setLocationsList(response)
            })
    }, [])

    const addLocationHandler = async (event) => {
        event.preventDefault()
        const newLocation = {
            name: event.target.locationName.value,
            description: event.target.locationDescription.value
        }
        console.log('addLocationHandler', newLocation)
        const response = await locationService.create(newLocation)
        console.log('after addLocationHandler', response)

        setLocationsList(locationsList.concat(newLocation))
    }

    return (
        <div>
            {locationsList.map(el => (
                <p key={el.id}>{el.name}</p>
            ))}
            <form onSubmit={addLocationHandler}>
                <input type='text' name='locationName' /><br />
                <input type='text' name='locationDescription' /><br />
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default Locations

