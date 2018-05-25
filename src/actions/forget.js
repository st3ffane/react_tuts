'use strict'

export const FORGET_START_ACTION = 'forget_start';
export const FORGET_UNKNOWN_ACTION = 'forget_unknown';
export const FORGET_ERROR_ACTION = 'forget_error';
export const FORGET_OK_ACTION = 'forget_OK';
export const FORGET_CLEAN_ACTION = 'forget_clean';


import STATUS  from '../api/status';
import { generateNewMail } from '../api/rest.api';


export function sendMeaMail (forget, history){
    return (dispatch, getState,  api ) => {
        // you can use api and something else here here
        dispatch({
            type: FORGET_START_ACTION
        });
        api.generateNewMail(forget)
        .then( (res)=>{
            switch(res.status){
                case STATUS.NOT_FOUND:{
                    dispatch({
                        type: FORGET_UNKNOWN_ACTION,
                    });
                    break;
                }
                default:{
                    dispatch({
                        type: FORGET_OK_ACTION,
                    });
                   
                    break;
                }
                
            }
            
        })
        .catch( (err)=>{
            console.log(err)
            dispatch({
                type: FORGET_ERROR_ACTION,
                message: err.message || 'EPIC_FAIL'
            });
        });
        
      }
}