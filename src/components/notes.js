import React from 'react';
import {useState, useEffect} from 'react';
import noteService from '../services/notes';

const NoteElement = ({note, toggleImportance}) => {
    const label = note.important ? 'make not important' : 'make important'
    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

const Note = () => {
    const [notes, setNotes] = useState([]);
    const [newnote, setNewnote] = useState('new note ...');
    const [showAll, setShowAll] = useState(true);

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

    useEffect(() => {
        noteService
            .getAll()
            .then(response => setNotes(response.data))
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
            .then(response => {
                setNotes(notes.concat(response.data));
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
            .then(response => {
                setNotes(notes.map(el => el.id !== id ? el : response.data))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
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


