import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotebooks, postNotebook } from "../../store/notebook";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Notebooks() {
    const dispatch = useDispatch();
    const history = useHistory();
    const notebooks = useSelector((state) => state.notebooks);
    const currentUser = useSelector(state => state.session.user)
    const notebooksArr = Object.values(notebooks);
    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState("New Notebook");
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [selectedNotebook, setSelectedNotebook] = useState(null);
    const editorRef = useRef(null);

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

    const rightClick = (e) => {
        e.preventDefault();
    }

    const handleContextMenu = (e, notebook) => {
        e.preventDefault();
        setSelectedNotebook(notebook);
        setMenuPosition({ top: e.clientY, left: e.clientX });
    };

    const handleDeleteNotebook = () => {
        // Implement delete notebook functionality
        console.log("Deleting notebook:", selectedNotebook);
    };

    const handleRenameNotebook = () => {
        // Implement rename notebook functionality
        console.log("Renaming notebook:", selectedNotebook);
    };

    const handleChangeColor = () => {
        // Implement change color functionality
        console.log("Changing color of notebook:", selectedNotebook);
    };

    return (
        <div class="notebooksListContainer">
            <h3>Notebooks</h3>
            {notebooksArr.map((notebookObj) => {
                let notebookId = notebookObj.id
                return <Link to={`/app/notebook/${notebookId}`} className='tab-links'><div
                    key={notebookObj.id}
                    className="notebook-tab"
                    style={{ backgroundColor: notebookObj.color }}
                    onContextMenu={(e) => handleContextMenu(e, notebookObj)}
                >
                    {notebookObj.name}
                </div></Link>
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
            <div className="addNB" onClick={handleAddNotebook}>
                <i className="fa-solid fa-plus"></i>Add a Notebook
            </div>
            {selectedNotebook && editorRef.current && (
                <menu
                    className="context-menu"
                    style={{ top: menuPosition.top, left: menuPosition.left }}
                >
                    <menuitem onClick={handleDeleteNotebook}><i class="fa-solid fa-xmark-large"></i>Delete Notebook</menuitem>
                    <menuitem onClick={handleRenameNotebook}><i class="fa-solid fa-i-cursor"></i>Rename Notebook</menuitem>
                    <menuitem onClick={handleChangeColor}><i class="fa-solid fa-palette"></i>Change Color</menuitem>
                </menu>
            )}
        </div>
    );
};

export default Notebooks;
