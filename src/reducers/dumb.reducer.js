'use strict'

module.exports = (state, action) => {
    switch (action.type) {
        case 'DUMB': {
            return Object.assign({}, state, {payload: 0});
        }
        case 'DUMB_ADD': {
            return Object.assign({}, state, {payload: state.payload + action.amount});
        }
        default:{
            // return initstate
            return {payload:0}
        }
    }

}
