import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, postNote } from "../../store/note";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Notes() {
    const dispatch = useDispatch();
    const location = useLocation();
    const notes = useSelector((state) => state.notes);
    const currentUser = useSelector(state => state.session.user)
    const notesArr = Object.values(notes);
    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState("New Note");
    const [errors, setErrors] = useState([]);

    const notebookId = location.pathname.split("/")[3];

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch]);

    const handleAddNote = () => {
        setShowInput(true);
    };

    const handleInputBlur = () => {
        if (name.trim() === "") {
            setShowInput(false);
        }
    };

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const note = { name, user_id: currentUser.id, notebook_id: parseInt(notebookId) }

        console.log(note)
        try {
            await dispatch(postNote(note))
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        }
        setName("");
        setShowInput(false);
    };

    return (
        <div class="notesListContainer">
            <h3>Notes</h3>
            {notesArr.map((noteObj) => {
                if (noteObj.notebookId === parseInt(notebookId)) {
                    return <div key={noteObj.id}><Link to={`/app/notebook/${notebookId}/note/${noteObj.id}`}>{noteObj.name}</Link></div>
                }
                return null
            })}
            {showInput &&
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                </form>
            }
            <div className="addNB" onClick={handleAddNote}>
                <i className="fa-solid fa-plus"></i>Add a New Note
            </div>
        </div>
    );
};

export default Notes;
