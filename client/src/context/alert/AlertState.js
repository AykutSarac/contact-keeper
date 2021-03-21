import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext'
import AlertReducer from './AlertReducer'
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type) => {
        if (!state.some(alert => alert.msg === msg)) {
            const id = uuidv4();
            dispatch({ type: SET_ALERT, payload: { msg, type, id } });
        }

    }

    // Remove Alert
    const removeAlert = (id) => {
        dispatch({ type: REMOVE_ALERT, payload: id })
    }

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert,
                removeAlert
            }}>
            { props.children}
        </AlertContext.Provider>
    )

}

export default AlertState;
