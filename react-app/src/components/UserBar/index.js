import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/session";

function UserBar() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [darkMode, setDarkMode] = useState(false);

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

    return (
        <div className='userbar'>
            <i className="fa-solid fa-arrow-right-from-bracket" onClick={handleLogout}></i>
            {sessionUser.firstName} {sessionUser.lastName} |
            {/* Rest of your content */}
            <i className="fa-solid fa-magnifying-glass"></i>
            <input />
            <div className='mode' style={darkMode ? { display: 'none' } : {}} onClick={handleDarkModeToggle}>
                <i className="fa-solid fa-toggle-off" />
                <i className="fa-regular fa-sun" />
            </div>
            <div className='mode' style={darkMode ? {} : { display: 'none' }} onClick={handleDarkModeToggle}>
                <i className="fa-solid fa-toggle-on" />
                <i className="fa-solid fa-moon" />
            </div>
          {console.log(darkMode)}
            {/* <i class="fa-solid fa-angles-left"></i> */}
        </div>
    )
}

export default UserBar
