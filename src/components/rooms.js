import React from "react";
import { useEffect, useState } from "react";
import roomService from "../services/rooms";
import locationService from "../services/locations";

const Rooms = () => {

    const [roomsList, setRoomsList] = useState([])
    const [locationsList, setLocationsList] = useState([])

    useEffect(() => {
        roomService
            .getAll()
            .then((response) => {
                console.log('get Rooms:', response)
                setRoomsList(response)
            })

        locationService
            .getAll()
            .then((response) => {
                console.log('get Locations:', response)
                setLocationsList(response)
            })

    }, [])

    const addRoomHandler = async (event) => {
        event.preventDefault()
        const newRoom = {
            roomName: event.target.roomName.value,
            roomCode: event.target.roomCode.value,
            availableBed: event.target.availableBed.value,
            isMan: event.target.isMan.checked,
            locationId: event.target.locationId.value

        }
        console.log('addRoomHandler', newRoom)
        const response = await roomService.create(newRoom)
        console.log('after addRoomHandler', response)

        setRoomsList(roomsList.concat(response))

        event.target.roomName.value = ''
        event.target.roomCode.value = ''
        event.target.availableBed.value = ''
        event.target.isMan.checked = false
        event.target.locationId.selected = null
    }

    return (
        <div>
            <ul>
                {roomsList.map(el => (
                    <li key={el.id}>{el.roomName}</li>
                ))}
            </ul>
            <form onSubmit={addRoomHandler} id='addRoomForm'>
                <input type='text' name='roomName' /><br />
                <input type='text' name='roomCode' /><br />
                <input type='text' name='availableBed' /><br />
                <input type='checkbox' name='isMan' /><br />
                <select name='locationId'>
                    {
                        locationsList.map(el => (
                            <option value={el.id} key={el.id}>{el.name}</option>
                        ))
                    }
                </select>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default Rooms

