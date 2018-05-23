'use strict';

module.exports = (state, action) => {
    console.log(action.type)
    switch (action.type) {
        default:
            return state || {};
    }

};