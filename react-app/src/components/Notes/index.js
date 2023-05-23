import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../store/note";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Notes() {
    const dispatch = useDispatch();
    const location = useLocation();
    const notes = useSelector((state) => state.notes);
    const notesArr = Object.values(notes);

    const notebookId = location.pathname.split("/")[3];

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch]);

    return (
        <div class="notesListContainer">
            <h3>Notes</h3>
            {notesArr.map((noteObj) => {
                if (noteObj.notebookId === parseInt(notebookId)) {
                    return <div key={noteObj.id}><Link to={`/app/notebook/${notebookId}/note/${noteObj.id}`}>{noteObj.name}</Link></div>
                }
                return null
            })}
        </div>
    );
};

export default Notes;
