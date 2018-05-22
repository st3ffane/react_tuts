import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';


const expect = require('expect.js');

import AnimatedWrapper from '../../animated.wrapper';


import {authenticate, AUTH_ACTION, AUTH_NOT_FOUND_ACTION} from '../../actions/login';


/**
 * Main container for login page:
 * can login
 * can register
 * can get lost password by mail
 */
class LoginComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: "",
            passwrd: '',
        }
    }

   
    componentWillReceiveProps(np, ns){
       if(np.loginState.reason==AUTH_NOT_FOUND_ACTION) {
           // add error message
            this.setState(Object.assign({}, this.state, {
                login_error:"Unknown user!",
                password_error: 'Unknown user!'
            }));
       }
    }
    

    _setValue(field, evt){
        // todo
        let t = {};
        t[field] = evt.target ? evt.target.value : evt;
        console.log("update:",t)
        this.setState(Object.assign({}, this.state,t))
    }
    validateLogin(log = ''){
        log = log.trim();
        let tmp = {
            'login': log,
            'login_error': ''
        };
        let retval = true;
        try{
            expect(log).to.not.be.empty();
            expect(log.length).to.be.above(7);      
            
        } catch( err){
            tmp.login_error = 'Login must be at least 8 characters long.'; 
            retval = false;
        }
        // will set state later...
        this.setState((old, np)=> {
            return {...old, ...tmp};
        });
        return retval;
        
    }
    validatePassword(pass = ''){
        pass = pass.trim();
        let tmp = {
            'passwrd': pass.trim(),
            'password_error': ''
        };
        let retval = true;
        try{
            expect(pass).to.not.be.empty();
            expect(pass.length).to.be.above(7);
        } catch( err){
            tmp.password_error = 'Password must be at least 8 characters long.';  
            retval = false;
        }
        // will set state later...
        this.setState((old, np)=> {
            return {...old, ...tmp};
        });
        return retval;
    }


    submit(evt){
        evt.preventDefault();
        evt.stopPropagation();
        let result = this.validateLogin(this.state.login)  & this.validatePassword(this.state.passwrd)
        if(result)
            this.props.dispatch(authenticate(this.state.login, this.state.passwrd, this.props.history));
            //this.props.history.push('/renew')
        return false;
    }
    render(){
        let snackErrorStyle = {
            left: 0,
            transform: 'translate(25%, 0px)'
        }
        
        return (
        <div id="form">
          <div className={"switch l_switch animated" + (this.props.loginState.error  ? ' animation shake' : '')}>
          {this.props.loginState.error && this.props.loginState.reason != AUTH_NOT_FOUND_ACTION ?
                <div className="alert animation fadeInDown">
                <i className="material-icons">
                error
                </i>{this.props.loginState.message || 'Error'}
                </div> :
                null}
                </div>
          <div className="left-col forms">
            <form className="login" onSubmit={(evt)=>this.submit(evt)}>
                <h2>Sign In</h2>
                
                <p>Login to access to your devices on Kimo Cloud. Lore ipsum dolore sit amet</p>
                <TextField
                    autoFocus
                    value={this.state.login} onChange ={(evt)=>{this.validateLogin(evt.target.value)}}
                    floatingLabelText="Login"
                    fullWidth={true}
                    errorText={this.state.login_error}
                    />
                <TextField
                    value={this.state.passwrd} onChange ={(evt)=>{this.validatePassword(evt.target.value);}}
                    floatingLabelText="Password"
                    fullWidth={true}
                    type="password"
                    errorText = {this.state.password_error}
                    />
              
              {this.props.loginState.sending ?
                    <CircularProgress className="centered-progress" size={80} thickness={5} />
                    : <RaisedButton type="submit" id="lsubmit" label="Sign In"
                        onClick={()=>this._setValue('current',{target:{value:'onclic'}})}
                        className="primary" />
                    
              }
              
            </form>
            <a href="#" onClick={(evt)=>{
                evt.preventDefault();
                if(!this.props.loginState.sending){
                    this.props.dispatch({
                        type: AUTH_ACTION
                    });
                    return  this.props.history.push('/forgot');
                }
                return false;
            }} >Forgot Password?</a>
          </div>
          <div className="right-col resume">
            <h2>Don't have an account yet?</h2>
            
            <p>Lore ipsum dolore sit amet, lore ipsum dolore sit amet, lore ipsum dolore sit amet</p>
            <RaisedButton type="button"  label="Sign Up"
                className="secondary" onClick={(evt)=>{
                    evt.preventDefault();
                    if(!this.props.loginState.sending){
                        this.props.dispatch({
                            type: AUTH_ACTION,
                        });
                        return  this.props.history.push('/register');
                    }
                    return false;
                }} />
          </div>
          
        </div>);
        
    }
}

function select(state){
    return {
        loginState: state.loginState
    }
}
export default connect(select)(AnimatedWrapper(LoginComponent,{
    'default': "page", // toujours appliquer ces classes
    'enter': ' trans_login_enter' // affichage du composant
}));
