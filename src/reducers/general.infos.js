'use strict';

import * as GENERAL from '../actions/general';


module.exports = (state, action) => {
    console.log(action.type)
    switch (action.type) {
        case GENERAL.GENERAL_STATE_LOADING : {
            return Object.assign({},state, {is_loading: true});
        }
        case GENERAL.GENERAL_STATE_DEVICES_TYPES_LOADED : {
            return Object.assign({},state, {
                is_loading: false,
                has_error: false,
                devicesTypes: action.types || []
            });
        }
        case GENERAL.GENERAL_STATE_DEVICES_ERROR: {
            return Object.assign({},state, {
                is_loading: false,
                has_error: true,
                error: action.message
            });
        }
        default:
            return state || {};
    }

};