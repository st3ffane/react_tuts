import {combineReducers} from 'redux';

export default  combineReducers({
    dumbState: require('./dumb.reducer'),
    loginState: require('./login.reducer'),
    registerState: require('./register'),
    
});

