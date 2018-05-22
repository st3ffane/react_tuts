'use strict'

export const DUMB_ACTION = 'DUMB';

export function dumbAdd (amount){
    return (dispatch, getState, { api }) => {
        // you can use api and something else here here
        dispatch({
            type: 'DUMB_ADD',
            amount: amount
        })
      }
}