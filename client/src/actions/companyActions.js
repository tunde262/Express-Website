import axios from 'axios';

import { GET_COMPANY, COMPANY_LOADING, GET_ERRORS, CLEAR_CURRENT_COMPANY, SET_CURRENT_USER } from './types';

// Get current company
export const getCurrentCompany = () => dispatch => {
    dispatch(setCompanyLoading());
    axios.get('/api/company')
        .then(res =>
            dispatch({
                type: GET_COMPANY,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_COMPANY,
                payload: {}
            })
        );
};

// Create Company
export const createCompany = (companyData, history) => dispatch => {
    axios
        .post('/api/company', companyData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Add product
export const addProduct = (prodData, history) => dispatch => {
    axios
        .post('/api/company/product', prodData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Add product
export const deleteProduct = (id) => dispatch => {
    axios
        .delete(`/api/company/product/${id}`)
        .then(res => 
            dispatch({
                type: GET_COMPANY,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Delete account & company
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This will remove all your products as well as delete your account and can NOT be undone!')) {
        axios   
            .delete('/api/company')
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

// Company loading
export const setCompanyLoading = () => {
    return {
        type: COMPANY_LOADING
    }
}

// Clear company
export const clearCurrentCompany = () => {
    return {
        type: CLEAR_CURRENT_COMPANY
    }
}