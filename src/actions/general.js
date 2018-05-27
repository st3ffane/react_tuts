'use strict';

export const GENERAL_STATE_LOADING = 'loading_general';
export const GENERAL_STATE_DEVICES_TYPES_LOADED = 'devices_loaded_general';
export const GENERAL_STATE_DEVICES_ERROR = 'general_error';

export function loadDevicesTypes() {
    return (dispatch, getState, api)=>{
        dispatch({
            type: GENERAL_STATE_LOADING
        });
        return api.getDevicesTypes()
        .then ( (types)=>{
            dispatch({
                type:GENERAL_STATE_DEVICES_TYPES_LOADED,
                types: types
            });
        }).catch ( (err)=>{
            dispatch({
                type:GENERAL_STATE_DEVICES_ERROR,
                message: err.message || err
            });
        })
    }
}