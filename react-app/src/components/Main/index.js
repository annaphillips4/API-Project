import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Notebooks from '../Notebooks'
import Notes from '../Notes'
import Navigation from '../Navigation';
import UserBar from '../UserBar'

function Main() {

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/" />;

    return (
        <div>
            <UserBar />
            <Notebooks />
            <Notes />

        </div>
    )
}

export default Main;
