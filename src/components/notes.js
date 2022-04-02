import React from 'react';
import {useState, useEffect} from 'react';
import noteService from '../services/notes';
import Notification from "./notification";

const NoteElement = ({note, toggleImportance, deleteNote}) => {
    const label = note.important ? 'make not important' : 'make important'
    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
            <button onClick={deleteNote}>del</button>
        </li>
    )
}

const Note = () => {
    const [notes, setNotes] = useState([]);
    const [newnote, setNewnote] = useState('new note ...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
        }, [])

    const addNote = (event) => {
        event.preventDefault();
        const newNoteObj = {
            content: newnote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1
        }
        noteService
            .create(newNoteObj)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
                setNewnote('');
            })

    }
    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewnote(event.target.value);
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(el => el.id === id)
        const toggleNote = {...note, important: !note.important}
        noteService
            .update(id, toggleNote)
            .then(returnedNote => {
                setNotes(notes.map(el => el.id !== id ? el : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(el => el.id !== id))
            })
    }

    const deleteNote = (id) => {
        console.log("delete node", id)
        noteService
            .remove(id)
            .then(response => {
                console.log(response.data)
                setNotes(notes.filter(el => el.id !== id))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? "important" : "all"}
            </button>
            <ul>
                {
                    notesToShow.map(note =>
                        <NoteElement
                            key={note.id}
                            note={note}
                            toggleImportance={() => toggleImportanceOf(note.id)}
                            deleteNote = {() => deleteNote(note.id)}
                        />
                    )
                }
            </ul>
            <form onSubmit={addNote}>
                <input value={newnote} onChange={handleNoteChange} />
                <button type="submit">save data</button>
            </form>
        </div>
    )
};


export default Note


