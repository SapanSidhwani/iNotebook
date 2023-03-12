import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const [state, setState] = useState({
        "name": "Sapan",
        "class": "5b"
    });
    const update = () => {
        setTimeout(() => {
            setState({
                name: "sapana",
                class: "10b"
            });
        }, 2000);
    }

    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    );
}
export default NoteState