import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

const NoteElement = (note) => <li>{note.content}</li>

const Note = () => {
    const [notes, setNotes] = useState([]);
    const [newnote, setNewnote] = useState('new note ...');
    const [showAll, setShowAll] = useState(true);

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

    useEffect(() => {
        axios
            .get('http://localhost:3001/notes')
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
        setNotes(notes.concat(newNoteObj));
        setNewnote('');
        console.log("button clicked", event.target);
    }
    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewnote(event.target.value);
    }

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? "important" : "all"}
            </button>
            <ul>
                {notesToShow.map(note => <NoteElement key={note.id} content={note.content} />) }
            </ul>
            <form onSubmit={addNote}>
                <input value={newnote} onChange={handleNoteChange} />
                <button type="submit">save data</button>
            </form>
        </div>
    )
};


export default Note


