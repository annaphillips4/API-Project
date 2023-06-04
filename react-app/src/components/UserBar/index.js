import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import './style.css'

function UserBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes)
    const [darkMode, setDarkMode] = useState(false);
    let notesArr = Object.values(notes)

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const [query, setQuery] = useState("")

    const show = () => {
        document.querySelector(".search-results").classList.remove("hidden");
    };

    const hide = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            document.querySelector(".search-results").classList.add("hidden");
        };
    };

    const edit = (notebookId, id) => {
        document.querySelector(".search-results").classList.add("hidden");
        history.push(`/app/notebook/${notebookId}/note/${id}`);
        setQuery("");
    };

    return (
        <div className='userbar'>
            <i className="fa-solid fa-arrow-right-from-bracket" onClick={handleLogout}></i>

            <div className="search-bar" onBlur={(e) => hide(e)}>
                <input onChange={(e) => setQuery(e.target.value)} onFocus={() => show()} className="search-input" type="text" placeholder="Search..." ></input>
            </div>

            <div className="search-results hidden">
                <div className='sidebar-header'>Search</div>
                {notesArr.filter(note => {
                    if (query === "") {
                        return null;
                    } else if (note.name.toLowerCase().includes(query.toLowerCase())) {
                        return notes;
                    } else return null;
                }).map((post, idx) => (
                    <div className="search-results-box" key={idx}>
                        <div className="search-card" onMouseDown={() => edit(post.notebookId, post.id)}>
                            <span>{post.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mode' style={darkMode ? { display: 'none' } : {}} onClick={handleDarkModeToggle}>
                <i className="fa-solid fa-toggle-off" />
                <i className="fa-regular fa-sun" />
            </div>
            <div className='mode' style={darkMode ? {} : { display: 'none' }} onClick={handleDarkModeToggle}>
                <i className="fa-solid fa-toggle-on" />
                <i className="fa-solid fa-moon" />
            </div>
        </div>
    )
}

export default UserBar
