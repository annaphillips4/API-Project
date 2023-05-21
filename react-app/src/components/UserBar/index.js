import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/session";

function UserBar() {
    const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div>
            Hello, {sessionUser.firstName} {sessionUser.lastName}! <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default UserBar
