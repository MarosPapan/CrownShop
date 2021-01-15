import _ from 'lodash';

import {
    INIT_CREATE_USER,
    CREATE_USER_SUCCESS,
    INIT_ERROR_CREATE_USER,
    InitialCreateUser
} from './constants';


export default (createUSer = InitialCreateUser, action = {}) => {
    const type = _.get(action, 'type', null);
    if (type ===INIT_CREATE_USER){
        return {
            creating: true, 
            created: false,
            data: {},
            error: null,
        }
    }

    if (type === CREATE_USER_SUCCESS){
        return {
            creating: false, 
            created: true,
            data: _.get(action, 'payload', {}),
            error: null,
        }
    }

    if (type === INIT_ERROR_CREATE_USER){
        return {
            creating: false, 
            created: false,
            data: {},
            error: _.get(action, 'error', null),
        }
    }

    return createUSer;
}