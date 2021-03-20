import React, { useContext, useState } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onSubmit = (e) => {
        e.preventDefault();

        contactContext.addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Add Contact</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type="phone" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" onChange={onChange} checked={type === 'personal'} id="personal" /> <label htmlFor="personal">Personal{' '}</label>
            <input type="radio" name="type" value="professional" onChange={onChange} checked={type === 'professional'} id="professional" /> <label htmlFor="professional">Professional{' '}</label> 
            <div>
                <input type="submit" value="Add Contact" className="btn btn-primary btn-block" />
            </div>
        </form>
    )
}

export default ContactForm
