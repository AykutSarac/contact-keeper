import React, { useReducer } from 'react';
import contactContext from './contactContext';
import ContactReducer from './ContactReducer';
import axios from 'axios';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msgg });
        }
    }

    // Add Contact
    const addContact = async (contact) => {

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }

    }

    // Delete Contact
    const deleteContact = async (id) => {
        console.log(id);

        try {
            const res = await axios.delete('/api/contacts/' + id);

            dispatch({ type: DELETE_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }


    }

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    // Update Contact
    const updateContact = async (contact) => {

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put('/api/contacts/' + contact._id , contact, config);

            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }



    }

    // Filter Contacts
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts
            }}>
            { props.children}
        </contactContext.Provider>
    )

};

export default ContactState;