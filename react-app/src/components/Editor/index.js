import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Quill from 'quill';

function Editor() {
    const { noteId } = useParams();
    const note = useSelector((state) => state.notes[noteId]);
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
            theme: 'snow',
        });

        quill.on('text-change', () => {
            const content = quill.root.innerHTML;
            setEditorContent(content);
        });

        if (note) {
            quill.root.innerHTML = note.content; // Set initial content from the note
        }
        console.log(editor)

        return () => {
            if (document.getElementById('editor-container')) {
                const editorContainer = document.getElementById('editor-container');
                editorContainer.innerHTML = '';
            }
        };
    }, [note]);

    const handleSaveNote = () => {
        // Perform the save action with the updated editorContent
        console.log('Saving note editorContent:', editorContent);
    };

    return (
        <div className="note-container">
            <div id="editor-container"></div>
            <button onClick={handleSaveNote}>Save</button>
        </div>
    );
}

export default Editor;
