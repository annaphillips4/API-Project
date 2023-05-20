import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotebooks } from "../../store/notebook";

function Notebooks() {
    const dispatch = useDispatch();
    const notebooks = useSelector((state) => state.notebooks);
    const notebooksArr = Object.values(notebooks);

    useEffect(() => {
        dispatch(getNotebooks())
    }, [dispatch]);

    return (<>
        {notebooksArr.map((notebookObj) => {
            return <div key={notebookObj.id}>{notebookObj.name}</div>
        })}
    </>);
};

export default Notebooks;
