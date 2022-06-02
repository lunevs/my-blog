import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLocation } from "../reducers/locationsReducer";
import { Table, Form, Row, Col, Button, Card  } from 'react-bootstrap'
import LocationElement from "./locationElement";

const Locations = () => {

    const locationsList = useSelector(state => state.locations)
    const dispatch = useDispatch()

    const addLocationHandler = async (event) => {
        event.preventDefault()
        const form = event.target
        const newLocation = {
            name: event.target.locationName.value,
            description: event.target.locationDescription.value
        }
        dispatch(createLocation(newLocation))
        form.reset()
    }

    return (
        <div className='pageBody'>
            <Card body  style={{ height: '70px' }}>
                <Form onSubmit={addLocationHandler}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formLocationName">
                            <Form.Control placeholder="Название" name='locationName' />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formLocationDescription">
                            <Form.Control placeholder="Описание" name='locationDescription' />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Button variant="outline-primary" type="submit">
                                Добавить
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Card>

            <Table striped>
                <thead>
                <tr>
                    <th>Номер</th>
                    <th>Название</th>
                    <th>Описание</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {locationsList.map((el, idx) => (
                        <LocationElement location={{...el, index: idx}} key={el.id}>{el.name}</LocationElement>
                    ))}
                </tbody>
            </Table>

        </div>
    )
}

export default Locations

