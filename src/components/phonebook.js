import React from "react";
import {useState} from "react";

const PhonebookDisplay = ({showPhones}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {showPhones.map(p => (
                <div key={p.id}>{p.name} - {p.phone}</div>
            ))}
        </div>
    )
}

const PhonebookAddContact = (props) => {
    return (
        <div>
            <h2>add new contact</h2>
            <form onSubmit={props.submitHandler}>
                <div>
                    {props.addStatus}
                </div>
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
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-123456', id: 1 },
        { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [addStatus, setAddStatus] = useState('')
    const [filterPhones, setFilterPhones] = useState('')

    const showPhones = persons.filter(el => el.name.toLowerCase().includes(filterPhones.toLowerCase()));

    const submitHandler = (event) => {
        event.preventDefault();
        if (persons.findIndex(el => el.name === newName) === -1) {
            const newPerson = {
                name: newName,
                phone: newPhone,
                id: persons.length + 1
            }
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewPhone('');
            setAddStatus('');
        } else {
            const newStatus = `${newName} is already added to phonebook`;
            setAddStatus(newStatus);
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

    return (
        <div>
            <h1>Phonebook</h1>

            <PhonebookFilter clickHandler={changeFilterHandler} />

            <PhonebookAddContact
                submitHandler={submitHandler}
                addStatus={addStatus}
                newName={newName}
                newPhone={newPhone}
                changeNameHandler={changeNameHandler}
                changePhoneHandler={changePhoneHandler}
            />

            <PhonebookDisplay showPhones={showPhones} />

        </div>
    )
};

export default Phonebook;
