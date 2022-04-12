import React from 'react';
import {useState, useEffect, useRef} from 'react';
import noteService from '../services/notes';
import loginService from '../services/login';
import Notification from "./notification";
import LoginForm from "./loginform";
import Togglable from "./togglable";

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
    const [newNote, setNewNote] = useState('new note ...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

    const noteFormRef = useRef()

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
        }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])



    const addNote = (event) => {
        event.preventDefault();
        noteFormRef.current.toggleVisibility()

        const newNoteObj = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1
        }
        noteService
            .create(newNoteObj)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
                setNewNote('');
            })

    }
    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
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

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({username, password})

            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
            setPassword('')
            setUsername('')
        } catch (e) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
        noteService.setToken(null)
    }

    const addNoteForm = () => (
        <Togglable buttonLabel='add New note' ref={noteFormRef}>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save data</button>
            </form>
        </Togglable>

    )

    const loginForm = () => {
        return (
            <Togglable buttonLabel='login'>
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                />
            </Togglable>
        )
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <br />
            {user === null ?
                loginForm() :
                <div>
                    <p>
                        {user.name} logged-in
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    {addNoteForm()}
                </div>
            }
            <br />
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
        </div>
    )
};


export default Note


