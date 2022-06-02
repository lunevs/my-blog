import React, { useState} from "react";
import DiscountElement from "./discountElement";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { createDiscount } from "../reducers/discountReducer";
import { useDispatch, useSelector } from "react-redux";

const Discount = () => {

    const dispatch = useDispatch()
    const discountsList = useSelector(state => state.discounts)

    const [coefficient, setCoefficient] = useState(100)

    const addDiscountHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const newDiscount = {
            name: event.target.discountName.value,
            coefficient: event.target.discountCoefficient.value / 100,
        }
        dispatch(createDiscount(newDiscount))
        form.reset()
    }

    const changeCoefficientHandler = (event) => {
        event.preventDefault()
        setCoefficient(event.currentTarget.value)
    }

    return (
        <div className='pageBody'>
            <Card body  style={{ height: '90px' }}>
                <Form onSubmit={addDiscountHandler}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formLocationName">
                            <Form.Control placeholder="Название" name='discountName' />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formLocationDescription">
                            <Form.Label style={{ margin: '0' }}>Оплата по тарифу: {coefficient}%</Form.Label>
                            <Form.Range
                                value={coefficient}
                                onChange={changeCoefficientHandler}
                                name='discountCoefficient'
                            />
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
                    <th>Название</th>
                    <th>Оплата по тарифу</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {discountsList.map(el => (
                        <DiscountElement key={el.id} discount={el} />
                    ))}
                </tbody>
            </Table>

        </div>
    )
}

export default Discount

