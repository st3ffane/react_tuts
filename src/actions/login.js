'use strict'
import STATUS from '../api/status';

export const AUTH_ACTION_START = 'START_AUTHENTICATE';
export const AUTH_ACTION = 'AUTHENTICATE';
export const AUTH_SUCCESS_ACTION = 'SUCCESS_AUTHENTICATE';
export const AUTH_ERROR_ACTION = 'ERROR_AUTHENTICATE';
export const AUTH_FIRST_CONNECT_ACTION = 'FIRST_AUTHENTICATE';
export const AUTH_TOO_OLD_ACTION = 'OLD_AUTHENTICATE';
export const AUTH_NOT_FOUND_ACTION = 'NOT_FOUND_AUTHENTICATE';

/**
 * Authenticate to server
 * @param {*} login 
 * @param {*} passwrd 
 */
export function authenticate (login, passwrd, history){
    return (dispatch, getState, api) => {
        // lance le travail...
        dispatch({
            type:AUTH_ACTION_START
        });
       
        // you can use api and something else here here
        api.authenticate(login, passwrd)
        .then ( (res)=>{

            switch(res.status){
                case STATUS.NOT_FOUND:{
                    dispatch({
                        type: AUTH_NOT_FOUND_ACTION,
                        message: res.message || 'OK',
                        datas: res.data || {}
                    });
                    break;
                }
                case STATUS.USER_AUTH_FIRST_CONNECT:{
                    dispatch({
                        type: AUTH_FIRST_CONNECT_ACTION,
                        message: res.message || 'OK',
                        datas: res.data || {}
                    });
                    history.push('/renew'); 
                    break;
                }
                case STATUS.USER_AUTH_TOO_OLD :{
                    dispatch({
                        type: AUTH_TOO_OLD_ACTION,
                        message: res.message || 'OK',
                        datas: res.data || {}
                    });
                    history.push('/renew'); 
                    break;
                }
                default:{
                    dispatch({
                        type: AUTH_SUCCESS_ACTION,
                        message: res.message || 'OK',
                        datas: res.data || {}
                    });
                    history.push('/homepage'); 
                    break;
                }
                
            }
            
        })
        .catch( (err)=>{
            dispatch({
                type: AUTH_ERROR_ACTION,
                message: err.message || 'EPIC_FAIL'
            });
        });
      }
}