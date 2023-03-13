// import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const state = "sapan"
    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    );
}
export default NoteState