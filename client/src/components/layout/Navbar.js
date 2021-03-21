import React from 'react'
import PropTypes from 'prop-types'
import { AiOutlineContacts } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = ({ title }) => {
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
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
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