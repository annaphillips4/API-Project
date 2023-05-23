import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Notebooks from '../Notebooks'
import Notes from '../Notes'
import UserBar from '../UserBar'
import Quill from 'quill'
import { useRef } from 'react';

function Main() {

    const sessionUser = useSelector((state) => state.session.user);
    const editorRef = useRef(null);
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
            editorRef.current.removeChild(editor);
        };
    }, []);
    if (!sessionUser) return <Redirect to="/" />;


    return (
        <div>
            <UserBar />
            <div className='app-container'>
                <Notebooks />
                <Notes />

                <div className="note-container">
                    <div ref={editorRef} />
                </div>
            </div>
        </div>
    )
}

export default Main;
