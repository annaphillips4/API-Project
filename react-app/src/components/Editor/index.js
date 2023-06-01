import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { putNote } from '../../store/note';
import Quill from 'quill';

function Editor() {
    const { noteId } = useParams();
    const note = useSelector((state) => state.notes[noteId]);
    const dispatch = useDispatch()
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        const editor = document.createElement('div');
        editor.setAttribute('id', 'quill-editor');
        document.getElementById('editor-container').appendChild(editor);

        const toolbarOptions = [
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }],
            ['clean']                                         // remove formatting button
        ];

        const quill = new Quill(editor, {
            debug: 'info',
            modules: {
                toolbar: toolbarOptions,
            },
            placeholder: 'Take notes...',
            readOnly: false,
            scrollingContainer: '.ql-editor',
            theme: 'snow',
        });

        quill.on('text-change', () => {
            const content = quill.root.innerHTML;
            setEditorContent(content);
        });

        if (note) {
            quill.root.innerHTML = note.content; // Set initial content from the note
        }

        return () => {
            if (document.getElementById('editor-container')) {
                const editorContainer = document.getElementById('editor-container');
                editorContainer.innerHTML = '';
            }
        };
    }, [note]);

    const handleSaveNote = async (e) => {
        e.preventDefault()
        const noteContents = document.querySelector('.ql-editor').innerHTML
        const newNote = { id: note.id, content: noteContents, name: note.name }
        await dispatch(putNote(newNote))
    };

    return (
        <>
            <h1 className="note-title">{note.name}</h1>
            <h2 className="note-updated">
                {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                })}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {new Date(note.updatedAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric"
                })}
            </h2>

            <div id="editor-container"></div>
            <button onClick={handleSaveNote}>Save</button>
        </>
    );
}

export default Editor;
