import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import { AiOutlineContacts } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const Navbar = ({ title }) => {

    const authContext = useContext(AuthContext);

    const { logoutUser, isAuthenticated } = authContext;

    const onLogout = () => {
        if (isAuthenticated) logoutUser();
    }

    return (
        <div className="navbar bg-primary">
            <Link to="/">
                <h1>
                    <AiOutlineContacts style={{ verticalAlign: 'middle' }} size={35} /> {title}
                </h1>
            </Link>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {isAuthenticated ? (
                    <Fragment>
                        <li>
                            <Link to="/" onClick={onLogout}>Logout</Link>
                        </li>
                    </Fragment>

                ) : (
                    <Fragment>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </Fragment>
                )}
            </ul>
        </div>
    )
}

export default Navbar

Navbar.propTypes = {
    title: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'Contact Keeper'
}