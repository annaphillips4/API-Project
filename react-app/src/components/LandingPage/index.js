import React, { useState } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { login, signUp } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

function LandingPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector((state) => state.session.user);
    if (sessionUser) return <Redirect to="/app" />;


    const handleLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data);
            }
        } else {
            setErrors([
                "Confirm Password field must be the same as the Password field",
            ]);
        }
    };

    return (
        <div>
            <Link to='/'>
                <h1>Inkling</h1>
                <h3>a note app</h3>
            </Link>
            <Switch>
                <Route exact path='/'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Sign Up</Link>
                </Route>
                <Route path='/login'>
                    <form onSubmit={handleLogin}>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                        <label>
                            Email
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Log In</button>
                    </form>
                    <Link to='/signup'>Or make a new account</Link>
                </Route>
                <Route path='/signup'>
                    <form onSubmit={handleSignup}>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                        <label>
                            Email
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Username
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Confirm Password
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Sign Up</button>
                    </form>
                    Already have an account? <Link to='/login'>Click here to log in</Link>
                </Route>
            </Switch>
        </div>
    )
}

export default LandingPage;