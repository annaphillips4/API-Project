import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotebooks } from "../../store/notebook";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Notebooks() {
    const dispatch = useDispatch();
    const notebooks = useSelector((state) => state.notebooks);
    const notebooksArr = Object.values(notebooks);

    useEffect(() => {
        dispatch(getNotebooks())
    }, [dispatch]);

    return (
        <div class="notebooksListContainer">
            <h3>Notebooks</h3>
            {notebooksArr.map((notebookObj) => {
                let notebookId = notebookObj.id
                return <div key={notebookObj.id}><Link to={`/app/notebook/${notebookId}`}>{notebookObj.name}</Link></div>
            })}
        </div>
    );
};

export default Notebooks;
