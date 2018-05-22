'use strict';
import * as REGISTER from '../actions/register';

module.exports = (state, action) => {
    console.log(action.type)
    switch (action.type) {
        case REGISTER.REGISTER_START:{
            // send back fresh datas?
            return Object.assign({},state,{
                sending: true,
                error: false,
                known: false,
                known_passwrd: false,
                
                
            });
        }
        case REGISTER.REGISTER_CHECK_MAIL_OK: {
            // go to next step
            return Object.assign({},state,{
                sending: false,
                error: false,
                known: false,

                // keep form datas in memeory
                firstname: action.user.firstname,
                lastname: action.user.lastname,
                email: action.user.email,
                
            });
        }
        case REGISTER.REGISTER_CHECK_MAIL_KNOWN: {
            return Object.assign({},state,{
                sending: false,
                 known: true,
                 error: false
                });
        }
        case REGISTER.REGISTER_ERROR:
        case REGISTER.REGISTER_CHECK_MAIL_ERROR: {
            return Object.assign({},state,{
                sending: false,
                 error: true,
                 error_message:'SERVER_ERROR',
                known: false    
            });
        }

        case REGISTER.REGISTER_ACCOUNT_LOGIN_ALREADY_IN_USE:{
            return Object.assign({},state,{
                sending: false,
                error: false,
                known: true,
            });
        }
        case REGISTER.REGISTER_ACCOUNT_PASSWRD_ALREADY_IN_USE:{
            return Object.assign({},state,{
                sending: false,
                error: false,
                known: false,
                known_passwrd: true,
            });
        }
        case REGISTER.REGISTER_CHECK_ACCOUNT_OK: {
            return Object.assign({},state,{
                sending: false,
                error: false,
                known: false,
                known_passwrd: false,
                login: action.user.login,
                passwrd: action.user.passwrd,
                repasswrd: action.user.repasswrd,
            });
        }
        case REGISTER.REGISTER_CREATE_SITE_OK: {
            return Object.assign({},state,{
                sending: false,
                error: false,
                known: false,
                known_passwrd: false,
                siteName: action.user.siteName,
            });
        }
        default:{
            return state || {};
        }
    }
};