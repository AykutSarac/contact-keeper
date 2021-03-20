import React, { useReducer } from 'react';
import {v4 as uuidv4} from 'uuid';
import contactContext from './contactContext';
import ContactReducer from './ContactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Harry White',
                email: 'harry@gmail.com',
                phone: '111-111-111',
                type: 'professional'
            },
            {
                id: 2,
                name: 'Steve Rogers',
                email: 'steve@gmail.com',
                phone: '333-333-333',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Bill Gates',
                email: 'bill@gmail.com',
                phone: '444-444-444',
                type: 'professional'
            }
        ]
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    const addContact = (contact) => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }

    // Delete Contact

    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contacts

    // Clear Filter

    return (
        <contactContext.Provider
        value={{
            contacts: state.contacts,
            addContact
        }}>
            { props.children }
        </contactContext.Provider>
    )

};

export default ContactState;