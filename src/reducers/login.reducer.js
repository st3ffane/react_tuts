'use strict'
import {
    AUTH_ACTION_START,
    AUTH_ACTION ,
    AUTH_SUCCESS_ACTION,
    AUTH_ERROR_ACTION,
    AUTH_FIRST_CONNECT_ACTION,
    AUTH_TOO_OLD_ACTION,
    AUTH_NOT_FOUND_ACTION,

} from '../actions/login';


module.exports = (state, action) => {
    switch (action.type) {
        case AUTH_ACTION_START:{
            return Object.assign({}, state, {
                sending: true,
                isAuth: false,
                token: '',
                status: 0,
                error: false,
                message: '',
                reason: action.type,
            })
        }
        case AUTH_NOT_FOUND_ACTION: {
            return Object.assign({}, state, {
                sending: false,
                isAuth: false,
                token: '',
                error: true,
                message: action.message,
                reason: action.type,           
            });
        }
        case AUTH_ERROR_ACTION: {
            return Object.assign({}, state, {
                sending: false,
                isAuth: false,
                token: '',
                error: true,
                message: action.message,
                reason: action.type,           
            });
        }
        case AUTH_SUCCESS_ACTION: {
            // clean datas, keep only token
            return Object.assign({}, state, {
                token: "a token"
            });
            /*    sending: false,
                isAuth: true,
                status: 0,
                message: '',
                token: action.datas,
                error: false,
                reason: action.type,
            });*/
        }
        case AUTH_FIRST_CONNECT_ACTION:
        case AUTH_TOO_OLD_ACTION:
            return Object.assign({}, state, {
                sending: false,
                isAuth: false,
                status: action.status,
                message: action.message,
                reason: action.type,
                token: '',
                error: false,
            });
            
        
        default:{
            // return initstate
            return {
                sending: false,
                isAuth: false,
                status: '',
                message: '',
                reason: '',
                token: '',
                error: false,
                reason: ''
            }
        }
    }

}
