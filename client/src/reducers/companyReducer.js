import { GET_COMPANY, COMPANY_LOADING, CLEAR_CURRENT_COMPANY } from '../actions/types';

const initialState = {
    company: null,
    companies: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case COMPANY_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_COMPANY:
            return {
                ...state,
                company: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_COMPANY:
            return {
                ...state,
                company: null
            }
        default:
            return state;
    }
}