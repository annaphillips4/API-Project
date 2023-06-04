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
    const noteId = location.pathname.split("/")[5]

    if (location.pathname === '/app') {
        dispatch(getNotes())}

    if (location.pathname.split("/").length === 4 && location.pathname.split("/")[2] === 'notebook') {
        if (notesArr[0]) {
            const notebookFirstNote = notesArr.find(note => note.notebookId === parseInt(notebookId))
            if (notebookFirstNote) {
                history.push(`/app/notebook/${notebookId}/note/${notebookFirstNote.id}`)
            }
        }
    }

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch]);

    const handleAddNote = () => {
        setShowInput(true);
    };

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const note = { name, user_id: currentUser.id, notebook_id: parseInt(notebookId) }
        let newNote = await dispatch(postNote(note))

        setName("New Note");
        setShowInput(false);
        history.push(`/app/notebook/${newNote.notebookId}/note/${newNote.id}`)
    };

    function removeHTMLTags(content) {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = content;
        return tempElement.textContent || tempElement.innerText;
    }

    return (
        <div className="notesListContainer">
            <div className="sidebar-header">Notes</div>
            <Switch>
                <Route exact path='/app'>
                    <div>Select a notebook to view its notes.</div>
                </Route>
                <Route path='/app/notebook/:notebookId'>
                    {notesArr.map((noteObj) => {
                        if (noteObj.notebookId === parseInt(notebookId)) {
                            const textContent = removeHTMLTags(noteObj.content);
                            return (
                                <Link to={`/app/notebook/${notebookId}/note/${noteObj.id}`} className="tab-links">
                                    <div className={`note-whole-tab ${parseInt(noteId) === noteObj.id ? 'selected' : ''}`}>
                                        <div className="note-name" key={noteObj.id}>{noteObj.name}</div>
                                        <div className="note-first-lines">{textContent}</div>
                                    </div>
                                </Link>
                            );
                        }
                        return null;
                    })}
                    {showInput ? (
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className="add-input"
                                type="text"
                                value={name}
                                onChange={handleInputChange}
                                autoFocus
                            />
                            <div className='submit' onClick={(e) => { setName("New Note"); setShowInput(false); handleFormSubmit(e); }}><i class="fa-solid fa-check"></i> Submit</div>
                            <div className='cancel' onClick={() => { setName("New Note"); setShowInput(false) }}><i class="fa-solid fa-x"></i> Cancel</div>
                        </form>
                    ) : (
                        <div className="add-new" onClick={handleAddNote}>
                            <i className="fa-solid fa-plus"></i>Add a New Note
                        </div>
                    )
                    }
                </Route>
            </Switch>
        </div>
    );
};

export default Notes;
