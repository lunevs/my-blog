import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { deleteDiscount } from "../reducers/discountReducer";
import { useDispatch } from "react-redux";



const DiscountElement = ({ discount }) => {

    const dispatch = useDispatch()

    return (
        <tr key={discount.id}>
            <td>
                <Link to={`/discount/${discount.id}`}>{discount.name}</Link>
            </td>
            <td>{discount.coefficient * 100} %</td>
            <td>
                <Button
                    onClick={() => dispatch(deleteDiscount(discount.id))}
                    variant="outline-danger"
                    size="sm"
                >
                    удалить
                </Button>
            </td>
        </tr>
    )
}

export default DiscountElement

