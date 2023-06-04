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
            <div className="main-container">
                <Notebooks />
                <Notes />

                <div className="note-container">
                    <Switch>
                        <Route exact path='/app'>
                            <div className='message'>
                                <h1>You don't have any notebooks yet.</h1>
                                <h2>Click Add a Notebook to start.</h2>
                            </div>
                        </Route>
                        <Route exact path='/app/notebook/:notebookId'>
                            <div className='message'>
                                <h1>This notebook doesn't have notes yet.</h1>
                                <h2>Click Add a New Note to start taking notes.</h2>
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
