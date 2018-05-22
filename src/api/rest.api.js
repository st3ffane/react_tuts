'use strict';
import STATUS from './status'; // les status http des requetes
import {
    AUTH_ACTION_START,
    AUTH_ACTION ,
    AUTH_SUCCESS_ACTION,
    AUTH_ERROR_ACTION,
    AUTH_FIRST_CONNECT_ACTION,
    AUTH_TOO_OLD_ACTION,
    AUTH_NOT_FOUND_ACTION

} from '../actions/login';
import * as REGISTER from '../actions/register';

// dumb implementation for API

// authenticate on server
export function authenticate(login, pass){
    return new Promise( (resolve, reject)=>{
        setTimeout( ()=>{
            if(login == 'stephane')
                resolve({
                    status: STATUS.USER_AUTH_FIRST_CONNECT,
                    message: 'FIRST_CONNECT'
                });
            else if(login=='stephane1')
                resolve({
                    status: STATUS.USER_AUTH_TOO_OLD,
                    message: 'TOO_OLD'
                });
            else if(login=='stephane2')
                resolve({
                    status: STATUS.OK,
                    message: 'OK',
                    datas:{
                        token:'mytoken'
                    }
                });
            else if(login=='stephane3')
                reject({
                    status: STATUS.EPIC_FAIL,
                    message: 'EPIC_FAIL',
                    
                });
            else resolve({
                status: STATUS.NOT_FOUND,
                message:'NOT_FOUND'
            });
        }, 2000);// simulate network latency...
            
    })
    
    
    return 'hello';
}

export function checkUserMail(mail){
    return new Promise( (resolve, reject)=>{
        setTimeout( ()=>{
            if(mail == 'steph.ponteins@gmail.com'){
                // known
                resolve({
                    status: STATUS.REGISTER_KNOWN_MAIL
                })
            } else if(mail == "s.ponteins@kimo.fr"){
                // check server error
                reject({
                    status: STATUS.EPIC_FAIL,
                   
                });
            } else {
                // ok
                resolve({
                    status: STATUS.OK
                });
            }
        }, 2000);
    })
    
}
export function checkUserAccountInfos(user){
    return new Promise( (resolve, reject)=>{
        setTimeout( ()=>{
            if(user.login == 'stephane'){
                resolve({
                    status: STATUS.REGISTER_LOGIN_ALREADY_IN_USE
                })
            } else if(user.passwrd == 'stephane'){
                resolve({
                    status: STATUS.REGISTER_PASSWRD_ALREADY_IN_USE
                })
            } else if(user.login == 'kimokimo'){
                resolve({
                    status: STATUS.EPIC_FAIL

                })
            } else {
                resolve({status: STATUS.OK})
            }
        }, 2000);
    });
}