import { Button, Col, Form, Row } from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../reducers/locationsReducer";

const LocationEdit = () => {

    const id = useParams().id
    const dispatch = useDispatch()
    const location = useSelector(state => state.locations.find(el => el.id === id))

    const [locName, setLocName] = useState('')
    const [locDescription, setLocDescription] = useState('')
    useEffect(() => {
        setLocName(location === undefined ? '' : location.name)
        setLocDescription(location === undefined ? '' : location.description)
    }, [location])

    const editLocationHandler = (event) => {
        event.preventDefault()
        const newLocation = {
            name: locName,
            description: locDescription
        }
        dispatch(updateLocation({id, newLocation}))
    }

    return (
        <div className='pageBody'>
            <Form onSubmit={editLocationHandler}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Название объекта:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            name='locationName'
                            value={locName}
                            onChange={(e) => setLocName(e.currentTarget.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Описание объекта:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            name='locationDescription'
                            value={locDescription}
                            onChange={(e) => setLocDescription(e.currentTarget.value)}
                        />
                    </Col>
                </Form.Group>

                <Button variant="outline-primary" type="submit">Сохранить</Button>

            </Form>
        </div>
    )
}

export default LocationEdit
