import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotebook, getNotebooks, postNotebook, putNotebook } from "../../store/notebook";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { deleteNote } from "../../store/note";
// import { CompactPicker } from 'react-color'

function Notebooks() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const notebooks = useSelector((state) => state.notebooks);
    const notes = useSelector((state) => state.notes);
    const currentUser = useSelector(state => state.session.user)
    const notebooksArr = Object.values(notebooks);
    const notesArr = Object.values(notes)
    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState("New Notebook");
    const [showContextMenu, setShowContextMenu] = useState(false)
    const [selectedNotebook, setSelectedNotebook] = useState()
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [renamingNotebook, setRenamingNotebook] = useState(false);
    const [newName, setNewName] = useState("")
    // const [changingColor, setChangingColor] = useState(false)
    const contextMenuRef = useRef(null);

    const notebookLocationId = location.pathname.split("/")[3];

    useEffect(() => {
        dispatch(getNotebooks())
    }, [dispatch]);

    if (location.pathname === '/app') {
        const sortedNotes = notesArr.sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateB - dateA;
        });
        if (sortedNotes[0]) {
            history.push(`/app/notebook/${sortedNotes[0].notebookId}/note/${sortedNotes[0].id}`)
        }
    }

    const handleAddNotebook = () => {
        setShowInput(true);
    };

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const notebook = { name, user_id: currentUser.id }
        let newNotebook = await dispatch(postNotebook(notebook));

        setName("New Notebook");
        setShowInput(false);
        history.push(`/app/notebook/${newNotebook.id}`)
    };

    const handleContextMenu = (e, id) => {
        e.preventDefault();
        if (selectedNotebook !== id || !showContextMenu) {
            setContextMenuPosition({ x: e.clientX, y: e.clientY });
            setShowContextMenu(true)
        } else {
            toggleContextMenu();
        }
    }

    const toggleContextMenu = () => {
        setShowContextMenu(!showContextMenu)
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
                setShowContextMenu(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleDelete = async () => {
        notesArr.map(async (note) => {
            if (note.notebookId === selectedNotebook) {
                await dispatch(deleteNote(note))
            }
        })
        await dispatch(deleteNotebook(selectedNotebook))
        history.push(`/app`)
        toggleContextMenu()
    }

    const startRename = (id) => {
        setNewName(notebooks[id].name);
        setRenamingNotebook(true);
        toggleContextMenu()
    }

    const handleRename = async (e) => {
        e.preventDefault()
        if (newName === '') {
            return 'Notebook name cannot be left blank'
        } else {
            const notebook = { id: selectedNotebook, name: newName }
            await dispatch(putNotebook(notebook))
            setRenamingNotebook(false);
            setNewName('')
        }
    }

    // const handleChangeColor = () => {
    //     setChangingColor(true);
    //     toggleContextMenu();

    // }

    return (
        <div className="notebooksListContainer">
            <div className="sidebar-header">Notebooks</div>
            {notebooksArr.map((notebookObj) => {
                let notebookId = notebookObj.id
                return <Link to={`/app/notebook/${notebookId}`} className='tab-links' key={notebookObj.id}><div
                    key={notebookObj.id}
                    className={`notebook-tab ${parseInt(notebookLocationId) === notebookObj.id ? 'selected' : ''}`}
                    onContextMenu={(e) => {
                        handleContextMenu(e, notebookObj.id);
                        setSelectedNotebook(notebookObj.id);
                    }}
                >
                    {renamingNotebook && notebookObj.id === selectedNotebook ? (
                        <form onSubmit={handleRename}>
                            <input
                                className="add-input"
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onBlur={() => setRenamingNotebook(false)}
                                autoFocus
                            />
                        </form>
                    ) : (
                        <><i className="fa-solid fa-book" style={{ color: notebookObj.color }}></i> {notebookObj.name}</>
                    )}
                    {/* {changingColor && notebookObj.id === selectedNotebook &&
                        <div style={{ position: 'absolute', top: contextMenuPosition.y, left: contextMenuPosition.x }}>
                            <CompactPicker
                            />
                        </div>
                    } */}
                </div></Link>
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
                    <div className='submit' onClick={(e) => { setName("New Notebook"); setShowInput(false); handleFormSubmit(e); }}><i className="fa-solid fa-check"></i> Submit</div>
                    <div className='cancel' onClick={() => { setName("New Notebook"); setShowInput(false) }}><i className="fa-solid fa-x"></i> Cancel</div>
                </form>
            ) : (
                <div className="add-new" onClick={handleAddNotebook}>
                    <i className="fa-solid fa-plus"></i>Add a Notebook
                </div>
            )
            }
            {showContextMenu &&
                <div
                    ref={contextMenuRef}
                    className="context-menu"
                    style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
                >
                    <table>
                        <tbody>
                            <tr className="context-option" onClick={handleDelete}>
                                <td><i className="fa-solid fa-x" /></td>
                                <td>Delete Notebook</td>
                            </tr>
                            <tr className="context-option" onClick={() => startRename(selectedNotebook)}>
                                <td><i className="fa-solid fa-i-cursor" /></td>
                                <td>Rename Notebook</td>
                            </tr>
                            {/* <div className="context-option" onClick={handleChangeColor}>
                                <tr>
                                    <td><i className="fa-solid fa-palette" /></td>
                                    <td>Change Color</td>
                                </tr>
                            </div> */}
                        </tbody>
                    </table>

                </div>
            }
        </div>
    );
};

export default Notebooks;
