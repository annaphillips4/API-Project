import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Notebooks from '../Notebooks';
import Notes from '../Notes';
import UserBar from '../UserBar';
import Quill from 'quill';
import { useRef } from 'react';

function Main() {
    const sessionUser = useSelector((state) => state.session.user);
    const editorRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const editor = document.createElement('div');
        editorRef.current.appendChild(editor);

        const quill = new Quill(editor, {
            debug: 'info',
            modules: {
                // toolbar: '#toolbar'
            },
            placeholder: 'Take notes...',
            readOnly: false,
            theme: 'snow'
        });

        return () => {
            if (editorRef.current && editorRef.current.contains(editor)) {
                editorRef.current.removeChild(editor);
            }
        };
    }, []);

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <div className="app-container">
            <UserBar />
            <Notebooks />
            <Notes />

            <div className="note-container">
                <div ref={editorRef}></div>
            </div>
        </div>

    );
}

export default Main;
