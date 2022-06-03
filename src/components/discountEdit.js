import { Button, Col, Form, Row } from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateDiscount } from "../reducers/discountReducer";

const DiscountEdit = () => {

    const id = useParams().id
    const dispatch = useDispatch()
    const discount = useSelector(state => state.discounts.find(el => el.id === id))

    const [discountItem, setDiscountItem] = useState({
        name: '',
        coefficient: 1
    })
    useEffect(() => {
        setDiscountItem(discount === undefined ? '' : discount)
    }, [discount])

    const editDiscountHandler = (event) => {
        event.preventDefault()
        console.log('try update discount', discountItem)
        dispatch(updateDiscount({id, newDiscount: discountItem}))
    }

    return (
        <div className='pageBody'>
            <Form onSubmit={editDiscountHandler}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Название тарифа:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            name='discountName'
                            value={discountItem.name}
                            onChange={
                                (e) =>
                                    setDiscountItem({...discountItem, name: e.currentTarget.value})
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Коэффициент оплаты %:</Form.Label>
                    <Col sm="9">
                        <Form.Label style={{ margin: '0' }}>Оплата по тарифу: {discountItem.coefficient * 100}%</Form.Label>
                        <Form.Range
                            value={discountItem.coefficient * 100}
                            name='discountCoefficient'
                            onChange={
                                (e) =>
                                    setDiscountItem({...discountItem, coefficient: Number(e.currentTarget.value)/100})
                            }
                        />
                    </Col>
                </Form.Group>

                <Button variant="outline-primary" type="submit">Сохранить</Button>

            </Form>
        </div>
    )
}

export default DiscountEdit
