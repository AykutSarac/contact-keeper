import React, { useContext, Fragment, useEffect } from 'react'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    if (contacts.length === 0) return <h4>Please add a Contact...</h4>

    return (
        <Fragment>
            {filtered !== null ? filtered.map((contact, index) => (
                <ContactItem key={index} contact={contact} />
            )) :
                contacts.map((contact, index) => (
                    <ContactItem key={index} contact={contact} />
                ))}
        </Fragment>
    )
}

export default Contacts
