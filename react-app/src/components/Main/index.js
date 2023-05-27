import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Notebooks from '../Notebooks';
import Notes from '../Notes';
import UserBar from '../UserBar';
import Editor from '../Editor'

function Main() {
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <div className="app-container">
            <UserBar />
            <Notebooks />
            <Notes />

            <div className="note-container">
                <Switch>
                    <Route exact path='/app'>
                        <div>
                            Select a notebook or add a new notebook to begin.
                        </div>
                    </Route>
                    <Route exact path='/app/notebook/:notebookId'>
                        <div>
                            Select a note or add a new note to begin.
                        </div>
                    </Route>
                    <Route exact path='/app/notebook/:notebookId/note/:noteId'>
                        <Editor />
                    </Route>
                </Switch>
            </div>
        </div>

    );
}

export default Main;
