const LOAD_NOTES = 'notes/LOAD_NOTES'
const ADD_NOTE = 'notes/ADD_NOTE'
const EDIT_NOTE = 'notes/EDIT_NOTE'
const REMOVE_NOTE = 'notes/REMOVE_NOTE'

// Action Creators
const load = notes => ({
    type: LOAD_NOTES,
    notes
});
const add = note => ({
    type: ADD_NOTE,
    note
});
const edit = note => ({
    type: EDIT_NOTE,
    note
})
const remove = note => ({
    type: REMOVE_NOTE,
    note
})

// Thunk Actions
export const getNotes = () => async (dispatch) => {
    const res = await fetch('/api/notes', {
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
export const postNote = (note) => async (dispatch) => {
    const res = await fetch('/api/notes/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(add(data));
        return data;
    };
};
export const putNote = (note) => async (dispatch) => {
    const res = await fetch(`/api/notes/${note.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(edit(data));
        return data;
    };
};
export const deleteNote = (note) => async (dispatch) => {
    const res = await fetch(`/api/notes/${note.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const deleteMessage = await res.json();
    dispatch(remove(note));
    return deleteMessage;
}

const initialState = {}
// Reducer
const notes = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case LOAD_NOTES:
            return { ...state, ...action.notes };
        case ADD_NOTE:
            newState = { ...state, [action.note.id]: action.note };
            return newState;
        case EDIT_NOTE:
            return { ...state, [action.note.id]: { ...action.note }}
        case REMOVE_NOTE:
            newState = { ...state }
            delete newState[action.note.id]
            return newState
        default:
            return state;
    };
};

export default notes;
