import React from 'react';

const Note = (note) => {
    console.log('note:', note)
    return (
        <li key={note.id}>{note.content}</li>
    )
}

export default Note


