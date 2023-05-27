import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, postNote } from "../../store/note";
import { Link, Switch, Route, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Notes() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const notes = useSelector((state) => state.notes);
    const currentUser = useSelector(state => state.session.user)
    const notesArr = Object.values(notes);
    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState("New Note");

    const notebookId = location.pathname.split("/")[3];

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch]);

    const handleAddNote = () => {
        setShowInput(true);
    };

    const handleInputBlur = () => {
        if (name.trim() === "") {
            return "Note name cannot be blank"
        } else if (name.trim()) {
            setShowInput(false);
        }
    };

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const note = { name, user_id: currentUser.id, notebook_id: parseInt(notebookId) }
        let newNote = await dispatch(postNote(note))

        setName("");
        setShowInput(false);
        history.push(`/app/notebook/${newNote.notebookId}/note/${newNote.id}`)
    };

    return (
        <div class="notesListContainer">
            <h3>Notes</h3>
            <Switch>
                <Route exact path='/app'>
                    <div>Select a notebook to view its notes.</div>
                </Route>
                <Route path='/app/notebook/:notebookId'>
                    {notesArr.map((noteObj) => {
                        if (noteObj.notebookId === parseInt(notebookId)) {
                            return <Link to={`/app/notebook/${notebookId}/note/${noteObj.id}`}><div key={noteObj.id}>{noteObj.name}</div></Link>
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
                                autofocus
                            />
                        </form>
                    }
                    <div className="addNB" onClick={handleAddNote}>
                        <i className="fa-solid fa-plus"></i>Add a New Note
                    </div>
                </Route>
            </Switch>
        </div>
    );
};

export default Notes;
