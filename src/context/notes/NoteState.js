import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

    // Read
    const notesInitial = [
        {
            "_id": "640d62071b30a2cf598331b11",
            "user": "640d5f907ceb1e35cbb6fdad",
            "title": "hello title 23",
            "description": "hello description",
            "tag": "Youtube",
            "date": "2023-03-12T05:24:23.308Z",
            "__v": 0
        },
        {
            "_id": "640d62071b30a2cf598331b12",
            "user": "640d5f907ceb1e35cbb6fdad",
            "title": "hello title 23",
            "description": "hello description",
            "tag": "Youtube",
            "date": "2023-03-12T05:24:23.308Z",
            "__v": 0
        },
        {
            "_id": "640d62071b30a2cf598331b13",
            "user": "640d5f907ceb1e35cbb6fdad",
            "title": "hello title 23",
            "description": "hello description",
            "tag": "Youtube",
            "date": "2023-03-12T05:24:23.308Z",
            "__v": 0
        },
        {
            "_id": "640d62071b30a2cf598331b4",
            "user": "640d5f907ceb1e35cbb6fdad",
            "title": "hello title 23",
            "description": "hello description",
            "tag": "Youtube",
            "date": "2023-03-12T05:24:23.308Z",
            "__v": 0
        },
        {
            "_id": "640d62071b30a2cf598331b5",
            "user": "640d5f907ceb1e35cbb6fdad",
            "title": "hello title 23",
            "description": "hello description",
            "tag": "Youtube",
            "date": "2023-03-12T05:24:23.308Z",
            "__v": 0
        },
        {
            "_id": "640d62071b30a2cf598331b16",
            "user": "640d5f907ceb1e35cbb6fdad",
            "title": "hello title 23",
            "description": "hello description",
            "tag": "Youtube",
            "date": "2023-03-12T05:24:23.308Z",
            "__v": 0
        },
        {
            "_id": "640d62071b30a2cf598331b17",
            "user": "640d5f907ceb1e35cbb6fdad",
            "title": "hello title 23",
            "description": "hello description",
            "tag": "Youtube",
            "date": "2023-03-12T05:24:23.308Z",
            "__v": 0
        },
        {
            "_id": "640d62071b30a2cf598331b18",
            "user": "640d5f907ceb1e35cbb6fdad",
            "title": "hello title 23",
            "description": "hello description",
            "tag": "Youtube",
            "date": "2023-03-12T05:24:23.308Z",
            "__v": 0
        }
    ];
    const [notes, setNotes] = useState(notesInitial);
    // Create
    const addNote = (title, description, tag) => {
        const note = {
            "_id": "640d62071b30a2cf598331b18",
            "user": "640d5f907ceb1e35cbb6fdad",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-03-12T05:24:23.308Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
        console.log(notes);
    }
    // Update
    const editNote = () => {

    }
    // Delete
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}
export default NoteState