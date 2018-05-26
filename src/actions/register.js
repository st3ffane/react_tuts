import STATUS_CODES  from "../api/status";

'use strict';

export const REGISTER_START = "start_register";
export const REGISTER_ERROR = "error_register";
export const REGISTER_CHECK_MAIL_OK = "check_mail_ok_register";
export const REGISTER_CHECK_MAIL_ERROR = 'check_mail_error_register';
export const REGISTER_CHECK_MAIL_KNOWN = 'check_mail_known_register';

export const REGISTER_CHECK_ACCOUNT_OK = 'success_reg_account';
export const REGISTER_ACCOUNT_LOGIN_ALREADY_IN_USE = 'used_login_reg_account';
export const REGISTER_ACCOUNT_PASSWRD_ALREADY_IN_USE = 'used_passwrd_reg_account';
export const REGISTER_ACCOUNT_INVALID_LICENSE_KEY = 'invalid_license_reg_account';


export const REGISTER_CREATE_SITE_OK = 'success_rg_site';
// check if mail not known!
// Breaking change: return http status code from request!
export function checkUserInfos( user, history) {
    return (dispatch, getState, api) => {
        dispatch({
            type:REGISTER_START,
            user: user
        });

        api.checkUserMail (user.email)
        .then ( (res)=>{
            // OK or KNOWN
            if(res.status == STATUS_CODES.OK) {
                dispatch({
                    type:REGISTER_CHECK_MAIL_OK,
                    message:res.message || 'ERROR',
                    user: user,
                });
                history.push('/register/account');
            }
            else {
                dispatch({
                    type: REGISTER_CHECK_MAIL_KNOWN,
                    message:res.message || 'KNOWN'
                });
            }
            
        })
        .catch ( (err)=>{
            console.log(err)
            // Error server
            dispatch({
                type: REGISTER_CHECK_MAIL_ERROR,
                message:err.message || 'ERROR'
            });
        })
    }
}

export function checkUserAccount(user, history){
    return (dispatch, getState, api) => {
        dispatch({
            type:REGISTER_START,
            user: user
        });

        api.checkUserAccountInfos (user)
        .then ( (res)=>{
            // OK or KNOWN
            
            if(res.status == STATUS_CODES.OK) {
                dispatch({
                    type:REGISTER_CHECK_ACCOUNT_OK,
                    message:res.message || 'ERROR',
                    user: user
                });
                history.push('/register/site');
            }
            else if(res.status == STATUS_CODES.REGISTER_INVALID_LICENSE) {
                dispatch({
                    type:REGISTER_ACCOUNT_INVALID_LICENSE_KEY
                });
            }
            else {
                let type = res.status == STATUS_CODES.REGISTER_LOGIN_ALREADY_IN_USE ?
                    REGISTER_ACCOUNT_LOGIN_ALREADY_IN_USE : REGISTER_ACCOUNT_PASSWRD_ALREADY_IN_USE;
                dispatch({
                    type: type,
                    message:res.message || 'KNOWN'
                });
            }
            
        })
        .catch ( (err)=>{
            console.log(err)
            // Error server
            dispatch({
                type: REGISTER_CHECK_MAIL_ERROR,
                message:err.message || 'ERROR'
            });
        })
    }
}

export function createSite(user, history){
    return (dispatch, getState, api) => {
        dispatch({
            type:REGISTER_START,
            user: user
        });
        api.createUserSite(user.siteName)
        .then( (res)=>{
            // only OK
            dispatch({
                type: REGISTER_CREATE_SITE_OK,
                user: user
            });
            history.push('/register/device');
        })
        .catch( (err)=>{
            dispatch({
                type: REGISTER_ERROR,
                message: err.message || 'ERROR'
            });
        });

    };
}