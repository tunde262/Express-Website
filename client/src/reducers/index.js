import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import companyReducer from './companyReducer';
import fulfillerReducer from './fulfillerReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    company: companyReducer,
    fulfiller: fulfillerReducer
});