import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

const PhonebookDisplay = ({showPhones, deleteHandle}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {showPhones.map(p => (
                <div key={p.id}>
                    {p.name} - {p.number}
                    <button onClick={() => deleteHandle(p.id)} >delete phone</button>
                </div>
            ))}
        </div>
    )
}

const PhonebookAddContact = (props) => {
    return (
        <div>
            <h2>add new contact</h2>
            <form onSubmit={props.submitHandler}>
                <input type="hidden" value={props.id} />
                <div>name: <input value={props.newName} onChange={props.changeNameHandler} /></div>
                <div>phone: <input value={props.newPhone} onChange={props.changePhoneHandler} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

const PhonebookFilter = ({clickHandler}) => {
    return <div>filter shown with: <input onChange={clickHandler} /></div>
}

const Phonebook = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filterPhones, setFilterPhones] = useState('')

    useEffect(() => {
        axios
            .get("http://localhost:3002/persons")
            .then(response => setPersons(response.data))
    }, [])

    const showPhones = persons.filter(el => el.name.toLowerCase().includes(filterPhones.toLowerCase()));

    const submitHandler = (event) => {
        event.preventDefault();
        let elIndex = persons.findIndex(el => el.name === newName);
        if (elIndex === -1) {
            const newPerson = {
                name: newName,
                number: newPhone,
                id: persons[persons.length - 1].id + 1
            }
            axios
                .post("http://localhost:3002/persons", newPerson)
                .then(response => setPersons(persons.concat(response.data)))
            setNewName('');
            setNewPhone('');
        } else {
            elIndex += 1;
            const newPerson = {
                name: newName,
                number: newPhone,
                id: elIndex
            }
            const isTrue = window.confirm(`Are you sure? You want change the number ${newName}?`);
            if (isTrue) {
                axios
                    .put(`http://localhost:3002/persons/${elIndex}`, newPerson)
                    .then(response => {
                        setPersons(persons.map(p => p.id !== elIndex ? p : response.data))
                    })
            }
            setNewName('');
            setNewPhone('');
        }
    }
    const changeNameHandler = (event) => {
        setNewName(event.target.value);
    }
    const changePhoneHandler = (event) => {
        setNewPhone(event.target.value);
    }
    const changeFilterHandler = (event) => {
        setFilterPhones(event.target.value);
    }

    const deleteHandle = (phoneId) => {
        console.log("delete phone: ", phoneId)
        axios
            .delete(`http://localhost:3002/persons/${phoneId}`)
            .then(response => {
                console.log(response.data)
                setPersons(persons.filter(p => p.id !== phoneId))
            })
    }

    return (
        <div>
            <h1>Phonebook</h1>

            <PhonebookFilter clickHandler={changeFilterHandler} />

            <PhonebookAddContact
                submitHandler={submitHandler}
                newName={newName}
                newPhone={newPhone}
                changeNameHandler={changeNameHandler}
                changePhoneHandler={changePhoneHandler}
            />

            <PhonebookDisplay showPhones={showPhones} deleteHandle={deleteHandle}/>

        </div>
    )
};

export default Phonebook;
