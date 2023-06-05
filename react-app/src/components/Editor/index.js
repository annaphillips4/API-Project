import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteNote, getNotes, putNote } from '../../store/note';
import Quill from 'quill';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Editor() {
    const dispatch = useDispatch()
    const { notebookId, noteId } = useParams();
    const note = useSelector((state) => state.notes[noteId]);
    // const notebook = useSelector((state) => state.notebooks[notebookId])
    const notebooks = useSelector(state => state.notebooks)
    const history = useHistory()
    const [editorContent, setEditorContent] = useState('');
    const [rename, setRename] = useState(false)
    const [newName, setNewName] = useState(note?.name)
    const notebooksArr = Object.values(notebooks)

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
            setNewName(note.name)
        }

        quill.focus();

        setTimeout(() => {
            const length = quill.getLength();
            quill.setSelection(length, length);
        }, 0);

        return () => {
            if (document.getElementById('editor-container')) {
                const editorContainer = document.getElementById('editor-container');
                editorContainer.innerHTML = '';
            }
        };
    }, [note]);

    useEffect(() => {
        const autosaveTimer = setTimeout(() => {
            handleSaveNote();
        }, 1000);

        return () => {
            clearTimeout(autosaveTimer);
        };
    }, [editorContent]);

    const handleSaveNote = async () => {
        // e.preventDefault()
        const noteContents = document.querySelector('.ql-editor').innerHTML
        const newNote = { id: note.id, content: noteContents, name: note.name, notebook_id: note.notebookId }
        await dispatch(putNote(newNote))
    };

    const handleDeleteNote = async (e, note) => {
        e.preventDefault()
        await dispatch(deleteNote(note))
        await dispatch(getNotes())
        history.push(`/app`)
    }

    const handleRename = async (e) => {
        e.preventDefault()
        const noteContents = document.querySelector('.ql-editor').innerHTML
        const newNote = { id: note.id, name: newName, content: noteContents, notebook_id: note.notebookId }
        await dispatch(putNote(newNote))
        setRename(false)
    }

    const handleChangeNotebook = async (e) => {
        e.preventDefault()
        const selectedNotebookId = e.target.value;
        const noteContents = document.querySelector('.ql-editor').innerHTML
        const newNote = { id: note.id, name: newName, content: noteContents, notebook_id: selectedNotebookId }
        await dispatch(putNote(newNote))
        e.target.value = ''
        history.push(`/app/notebook/${selectedNotebookId}/note/${note.id}`)
    };

    const handlePrint = () => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`<h1>${note.name}</h1>${note.content}`);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <>
            <div className='note-bar'>
                <button onClick={handleSaveNote}>Save</button>
                <button onClick={(e) => handleDeleteNote(e, note)}>Delete</button>
                <select onChange={handleChangeNotebook} defaultValue={''}>
                    <option value={''} disabled>
                        Move to notebook...
                    </option>
                    {notebooksArr.map((notebook) => (
                        notebook.id !== parseInt(notebookId) && (
                            <option key={notebook.id} value={notebook.id}>
                                {notebook.name}
                            </option>
                        )
                    ))}
                </select>
                <button onClick={() => handlePrint()}>Print</button>
            </div>
            {rename ? (
                <form onSubmit={handleRename}>
                    <h1><input
                        className='rename-note'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={() => setRename(false)}
                        autoFocus
                    /></h1>
                </form>
            ) : (
                <h1 className="note-title" onClick={() => setRename(true)}>{note?.name}</h1>
            )}
            <h2 className="note-updated">
                {new Date(note?.updatedAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                })}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {new Date(note?.updatedAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric"
                })}
            </h2>

            <div id="editor-container"></div>
        </>
    );
}

export default Editor;
