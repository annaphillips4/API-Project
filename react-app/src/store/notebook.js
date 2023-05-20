const LOAD_NOTEBOOKS = 'notebooks/LOAD_NOTEBOOKS'

// Action Creators
const load = notebooks => ({
    type: LOAD_NOTEBOOKS,
    notebooks
})

// Thunk Actions
export const getNotebooks = () => async dispatch => {
    const res = await fetch('/api/notebooks')
    if(res.ok) {
        res = await res.json()
        dispatch(load(res))
    }
}

const initialState = {}
// Reducer
const notebooks = (state=initialState, action) => {
    switch(action.type){
        case LOAD_NOTEBOOKS:
            return { ...state, ...action.reviews}
        default:
            return state
    }
}
