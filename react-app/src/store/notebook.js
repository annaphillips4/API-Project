const LOAD_NOTEBOOKS = 'notebooks/LOAD_NOTEBOOKS'
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK'
const EDIT_NOTEBOOK = 'notebooks/EDIT_NOTEBOOK'
const REMOVE_NOTEBOOK = 'notebooks/REMOVE_NOTEBOOK'

// Action Creators
const load = notebooks => ({
    type: LOAD_NOTEBOOKS,
    notebooks
});
const add = notebook => ({
    type: ADD_NOTEBOOK,
    notebook
});
const edit = notebook => ({
    type: EDIT_NOTEBOOK,
    notebook
})
const remove = notebook => ({
    type: REMOVE_NOTEBOOK,
    notebook
})

// Thunk Actions
export const getNotebooks = () => async (dispatch) => {
    const res = await fetch('/api/notebooks', {
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(load(data));
        return data;
    };
};
export const postNotebook = (notebook) => async (dispatch) => {
    const res = await fetch('/api/notebooks/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(notebook)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(add(data));
        return data;
    };
};
export const putNotebook = (notebook) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebook.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(notebook)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(edit(data));
        return data;
    };
};
export const deleteNotebook = (notebook) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebook.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const deleteMessage = await res.json();
    dispatch(remove(notebook.id));
    return deleteMessage;
}

const initialState = {}
// Reducer
const notebooks = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case LOAD_NOTEBOOKS:
            return { ...state, ...action.notebooks };
        case ADD_NOTEBOOK:
            newState = { ...state, [action.notebook.id]: action.notebook };
            return newState;
        case EDIT_NOTEBOOK:
            return { ...state, [action.notebook.id]: { ...action.notebook }}
        case REMOVE_NOTEBOOK:
            newState = { ...state }
            delete newState[action.notebook.id]
            return newState
        default:
            return state;
    };
};

export default notebooks;
