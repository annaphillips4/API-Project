import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotebook, getNotebooks, postNotebook, putNotebook } from "../../store/notebook";
import { Link, useHistory } from "react-router-dom";
// import { CompactPicker } from 'react-color'

function Notebooks() {
    const dispatch = useDispatch();
    const history = useHistory();
    const notebooks = useSelector((state) => state.notebooks);
    const currentUser = useSelector(state => state.session.user)
    const notebooksArr = Object.values(notebooks);
    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState("New Notebook");
    const [showContextMenu, setShowContextMenu] = useState(false)
    const [selectedNotebook, setSelectedNotebook] = useState()
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [renamingNotebook, setRenamingNotebook] = useState(false);
    const [newName, setNewName] = useState("")
    // const [changingColor, setChangingColor] = useState(false)
    const contextMenuRef = useRef(null);

    useEffect(() => {
        dispatch(getNotebooks())
    }, [dispatch]);

    const handleAddNotebook = () => {
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
        const notebook = { name, user_id: currentUser.id }
        let newNotebook = await dispatch(postNotebook(notebook));

        setName("");
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
        console.log(selectedNotebook)
        await dispatch(deleteNotebook(selectedNotebook))
        await dispatch(getNotebooks())
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
            <h3>Notebooks</h3>
            {notebooksArr.map((notebookObj) => {
                let notebookId = notebookObj.id
                return <Link to={`/app/notebook/${notebookId}`} className='tab-links'><div
                    key={notebookObj.id}
                    className="notebook-tab"
                    onContextMenu={(e) => {
                        handleContextMenu(e, notebookObj.id);
                        setSelectedNotebook(notebookObj.id);
                    }}
                >
                    {renamingNotebook && notebookObj.id === selectedNotebook ? (
                        <form onSubmit={handleRename}>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onBlur={() => setRenamingNotebook(false)}
                                autoFocus
                            />
                        </form>
                    ) : (
                        <><i class="fa-solid fa-book" style={{ color: notebookObj.color }}></i> {notebookObj.name}</>
                    )}
                    {/* {changingColor && notebookObj.id === selectedNotebook &&
                        <div style={{ position: 'absolute', top: contextMenuPosition.y, left: contextMenuPosition.x }}>
                            <CompactPicker
                            />
                        </div>
                    } */}
                </div></Link>
            })}
            {showInput &&
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        autoFocus
                    />
                </form>
            }
            <div className="addNB" onClick={handleAddNotebook}>
                <i className="fa-solid fa-plus"></i>Add a Notebook
            </div>
            {showContextMenu &&
                <div
                    ref={contextMenuRef}
                    className="context-menu"
                    style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
                >
                    <div
                        className="context-option"
                        onClick={handleDelete}
                    ><i class="fa-solid fa-xmark" /> Delete Notebook</div>
                    <div
                        className="context-option"
                        onClick={() => startRename(selectedNotebook)}
                    ><i class="fa-solid fa-i-cursor" /> Rename Notebook</div>
                    {/* <div
                        className="context-option"
                        onClick={handleChangeColor}
                    ><i class="fa-solid fa-palette" /> Change Color</div> */}
                </div>
            }
        </div>
    );
};

export default Notebooks;
