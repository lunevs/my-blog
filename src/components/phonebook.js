import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import Notification from "./notification";

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
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [filterPhones, setFilterPhones] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        axios
            .get("/api/persons")
            .then(response => setPersons(response.data))
    }, [])

    console.log("get persons:", persons)
    console.log("current filter:", filterPhones)

    const showPhones = persons.filter(el => el.name.toLowerCase().includes(filterPhones.toLowerCase()));

    const submitHandler = (event) => {
        event.preventDefault();
        let elIndex = persons.findIndex(el => el.name === newName);
        console.log("submit handler", elIndex, newName);
        if (elIndex === -1) {
            const newPerson = {
                name: newName,
                number: newPhone
            }
            axios
                .post("/api/persons", newPerson)
                .then(response => {
                    console.log(response.data)
                    setPersons(persons.concat(response.data))
                })
                .catch(error => {
                    const mes = error.response.data.error
                    setErrorMessage(mes)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
            setNewName('');
            setNewPhone('');
        } else {
            elIndex = persons[elIndex].id;
            const newPerson = {
                name: newName,
                number: newPhone,
                id: elIndex
            }
            const isTrue = true; //window.confirm(`Are you sure? You want change the number ${newName}?`);
            if (isTrue) {
                axios
                    .put(`/api/persons/${elIndex}`, newPerson)
                    .then(response => {
                        setPersons(persons.map(p => p.id !== elIndex ? p : response.data))
                    })
                    .catch(error => {
                        setErrorMessage(`user ${newName} already deleted`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        console.log("remove person", elIndex)
                        setPersons(persons.filter(p => p.id !== elIndex))
                        console.log("removed")
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
            .delete(`/api/persons/${phoneId}`)
            .then(response => {
                console.log(response.data)
                setPersons(persons.filter(p => p.id !== phoneId))
            })
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={errorMessage} />

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
