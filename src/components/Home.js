// rafc
import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Home = () => {
    const a = useContext(NoteContext);
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            This is Home {a.state.name}
        </div>
    );
}

export default Home