import React, {useEffect, useState} from "react";
import discountService from '../services/discounts'

const Discount = () => {

    const [discountsList, setDiscountsList] = useState([])

    useEffect(() => {
        discountService
            .getAll()
            .then(response => {
                console.log(response)
                setDiscountsList(response)
            })
    }, [])

    const addDiscountHandler = (event) => {
        event.preventDefault()
        console.log(event.target.discountName.value, event.target.discountCoefficient.value)
        const newDiscount = {
            name: event.target.discountName.value,
            coefficient: event.target.discountCoefficient.value,

        }
        discountService
            .create(newDiscount)
            .then(response => {
                console.log(response)
                setDiscountsList(discountsList.concat(response))
            })
    }

    return (
        <div>
            {discountsList.map(el => (
                <p key={el.id}>{el.name} = {el.coefficient}</p>
            ))}
            <form onSubmit={addDiscountHandler} id='addDiscountForm'>
                <input type='text' name='discountName' /><br />
                <input type='text' name='discountCoefficient' /><br />
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default Discount

