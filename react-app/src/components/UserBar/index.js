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
        <div class='userbar'>
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            {sessionUser.firstName} {sessionUser.lastName} | 
            <i class="fa-solid fa-book" />
            <i class="fa-regular fa-clock"></i>
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-toggle-off"></i>
            <i class="fa-solid fa-toggle-on"></i>
            <i class="fa-solid fa-angles-left"></i>
        </div>
    )
}

export default UserBar
