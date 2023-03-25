import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "https://inotebook-8t59.onrender.com";
    const [notes, setNotes] = useState([])

    // Read Note/s
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    // Create Note
    const addNote = async (title, description, tag) => {

        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        getNotes();
    }

    // Delete Note
    const deleteNote = async (id) => {

        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        getNotes();
        // console.log("Deleting the note with id" + id);
        // const newNotes = notes.filter((note) => { return note._id !== id })
        // setNotes(newNotes)
    }

    // Update Note
    const editNote = async (id, title, description, tag) => {


        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        getNotes();
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;