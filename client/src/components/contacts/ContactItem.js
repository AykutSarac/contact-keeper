import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact }) => {

    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent } = contactContext;

    const { _id, username, email, phone, type } = contact;

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                { username } <span className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>{type[0].toUpperCase() + type.slice(1)}</span>
            </h3>
            <ul className="list">
                {email && (<li>
                    <AiOutlineMail style={{ verticalAlign: 'middle' }} /> {email}
                </li>)}
                {phone && (<li>
                    <AiOutlinePhone style={{ verticalAlign: 'middle' }} /> {phone}
                </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
                <button className="btn btn-primary btn-sm" onClick={() => deleteContact(_id)}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem
