import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../store/note";

function Notes() {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes);
    const notesArr = Object.values(notes);

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch]);

    return (<>
        <h3>Notes</h3>
        {notesArr.map((noteObj) => {
            return <div key={noteObj.id}>{noteObj.name}</div>
        })}
    </>);
};

export default Notes;
