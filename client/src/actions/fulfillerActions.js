import axios from 'axios';

import { GET_FULFILLER, FULFILLER_LOADING, GET_ERRORS, CLEAR_CURRENT_FULFILLER, SET_CURRENT_USER } from './types';

// Get current fulfiller
export const getCurrentFulfiller = () => dispatch => {
    dispatch(setFulfillerLoading());
    axios.get('/api/fulfiller')
        .then(res =>
            dispatch({
                type: GET_FULFILLER,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_FULFILLER,
                payload: {}
            })
        );
}

// Create Fulfiller
export const createFulfiller = (fulfillerData, history) => dispatch => {
    axios   
        .post('/api/fulfiller', fulfillerData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Delete account & fulfiller profile
export const deleteFulfillerAccount = () => dispatch => {
    if(window.confirm('Are you sure? This will remove all your profile as well as delete your account and can NOT be undone!')) {
        axios   
            .delete('/api/fulfiller')
            .then(res =>
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );

    }
}

// Fulfiller loading
export const setFulfillerLoading = () => {
    return {
        type: FULFILLER_LOADING
    }
}

// Clear Fulfiller profile
export const clearCurrentFulfiller = () => {
    return {
        type: CLEAR_CURRENT_FULFILLER
    }
}