import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { loginUser, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {

        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === "Email and password doesn't match!") setAlert(error, 'danger');
        clearErrors();

    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        loginUser({
            email,
            password
        });
    }

    return (
        <div className="container">
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-blocck" />
            </form>
        </div>
    )
}

export default Login
