import { GET_FULFILLER, FULFILLER_LOADING, CLEAR_CURRENT_FULFILLER } from '../actions/types';
import { stat } from 'fs';

const initialState = {
    fulfiller: null,
    fulfillers: null,
    loading2: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FULFILLER_LOADING:
            return {
                ...state,
                loading2: true
            };
        case GET_FULFILLER:
            return {
                ...state,
                fulfiller: action.payload,
                loading2: false
            };
        case CLEAR_CURRENT_FULFILLER:
            return {
                ...state,
                fulfiller: null
            }
        default:
            return state;
    }
}