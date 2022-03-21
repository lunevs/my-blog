import React from 'react'


const Hello = ({ age, name }) => {

    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}! You are {age} years old</p>
            <p>You were probably born in {bornYear()}</p>
        </div>
    )
}

export default Hello


