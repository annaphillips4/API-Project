import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotebooks, postNotebook } from "../../store/notebook";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Notebooks() {
    const dispatch = useDispatch();
    const notebooks = useSelector((state) => state.notebooks);
    const currentUser = useSelector(state => state.session.user)
    const notebooksArr = Object.values(notebooks);
    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState("New Notebook");
    const [errors, setErrors] = useState([]);

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

        try {
            await dispatch(postNotebook(notebook))
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        }

        setName("");
        setShowInput(false);
    };

    return (
        <div class="notebooksListContainer">
            <h3>Notebooks</h3>
            {notebooksArr.map((notebookObj) => {
                let notebookId = notebookObj.id
                return <div key={notebookObj.id}><Link to={`/app/notebook/${notebookId}`}>{notebookObj.name}</Link></div>
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
        </div>
    );
};

export default Notebooks;
