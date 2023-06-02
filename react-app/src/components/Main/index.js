import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Notebooks from '../Notebooks';
import Notes from '../Notes';
import UserBar from '../UserBar';
import Editor from '../Editor'
import { getNotes } from '../../store/note';

function Main() {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <div className="app-container">
            <UserBar />
            <div className="main-container">
                <Notebooks />
                <Notes />

                <div className="note-container">
                    <Switch>
                        <Route exact path='/app'>
                            <div className='message'>
                                Select a notebook or add a new notebook to begin.
                            </div>
                        </Route>
                        <Route exact path='/app/notebook/:notebookId'>
                            <div className='message'>
                                Select a note or add a new note to begin.
                            </div>
                        </Route>
                        <Route exact path='/app/notebook/:notebookId/note/:noteId'>
                            <Editor />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Main;
