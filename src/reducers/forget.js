'use strict';
import * as FORGET from '../actions/forget';

module.exports = (state, action) => {
    console.log(action.type)
    switch (action.type) {
        case FORGET.FORGET_START_ACTION:{
            // send back fresh datas?
            return Object.assign({},state,{
                sending: true,
                error: false,
                known: true,              
                done: false
            });
        }
        case FORGET.FORGET_UNKNOWN_ACTION: {
            // go to next step
            return Object.assign({},state,{
                sending: false,
                error: false,
                known: false,                          
                done: false,
                reason: FORGET.FORGET_UNKNOWN_ACTION,
            });
        }
        case FORGET.FORGET_ERROR_ACTION: {
            return Object.assign({},state,{
                sending: false,
                 known: true,
                 error: true,          
                 done: false,
                 reason: action.message || 'ERROR',
                });
        }
        
        case FORGET.FORGET_OK_ACTION:{
            return Object.assign({},state,{
                sending: false,
                error: false,
                known: true,          
                done: true,
                reason: '',
                login_error:{},
                email_error: {}
            });
        }
        case FORGET.FORGET_CLEAN_ACTION:{
            return Object.assign({},state,{
                sending: false,
                error: false,
                known: true,          
                done: false,
                reason: '',
                login_error:{},
                email_error: {}
            });
        }
        
        default:{

            return state || {
                sending: false,
                error: false,
                known: true,             
                done: false ,   
                reason: '',       
                login_error:{},
                email_error: {}
            };
        }
    }
};