import _ from 'lodash';

import {
    INIT_LOGIN_USER,
    LOGIN_USER_SUCCESS,
    INIT_ERROR_LOGIN_USER,
    InitialLoginUser
} from './constants';


export default (logUser = InitialLoginUser, action = {}) => {
    const type = _.get(action, 'type', null);
    if (type === INIT_LOGIN_USER){
        return {
            logging: true, 
            logged: false,
            data: {},
            error: null,
        }
    }

    if (type === LOGIN_USER_SUCCESS){
        return {
            logging: false, 
            logged: true,
            data: _.get(action, 'payload', {}),
            error: null,
        }
    }

    if (type === INIT_ERROR_LOGIN_USER){
        return {
            logging: false, 
            logged: false,
            data: {},
            error: _.get(action, 'error', null),
        }
    }

    return logUser;
}
