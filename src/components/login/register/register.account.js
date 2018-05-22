import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import AnimatedWrapper from '../../../animated.wrapper';
import * as REGISTER from '../../../actions/register';

const expect = require('expect.js');
const ERROR_VALIDATION = 1;
const ERROR_EQ = 3;

/**
 * Main container for login page:
 * can login
 * can register
 * can get lost password by mail
 */
class RegisterComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login:'',
            passwrd:'',
            repasswrd:'',

            login_error: {},
            passwrd_error: {},
            repasswrd_error: {}
        }
    }
    componentDidMount(){
        let tmp = {
            login: this.props.registerState.login  || '',
            passwrd: this.props.registerState.passwrd  || '', 
            repasswrd: this.props.registerState.repasswrd || ''
        }
        this.setState(Object.assign({}, this.state, tmp))
    }
    componentWillReceiveProps(np, ns){
        
        if(np.registerState.known) {
            this.setState(Object.assign({}, this.state, {
                login_error : {
                    code: 3,
                    message: 'Login already in use, please change.'
                }
            } ))
            
        } else if(np.registerState.known_passwrd)
            this.setState(Object.assign({}, this.state, {
                passwrd_error : {
                    code: 3,
                    message: 'Password already in use, please change.'
                }
            } ))        

    }
    shouldComponentUpdate(np, ns){
        return true;
    }

    _setValue(field, evt){
        // todo
        let t = {};
        t[field] = evt.target.value;
        this.setState(Object.assign({}, this.state,t))
    }
    validateLogin(log = ''){
        log = log.trim();
        let tmp = {
            'login': log,
            'login_error': {}
        };
        let retval = true;
        try{
            expect(log).to.not.be.empty();
            expect(log.length).to.be.above(7);      
            
        } catch( err){
            tmp.login_error = {
                code:1,
                message:'Login must be at least 8 characters long.'
            }; 
            retval = false;
        }
        // will set state later...
        this.setState((old, np)=> {
            return {...old, ...tmp};
        });
        return retval;
        
    }
    __validate_password(pass){
        try{
            expect(pass).to.not.be.empty();
            expect(pass.length).to.be.above(7);
        } catch (err){
            throw ERROR_VALIDATION;
        }
    }
    __validate_password_eq(pass, np){
        try{
            expect(pass).to.equal(np);
        } catch (err){
            throw ERROR_EQ;
        }
    }
    validateNewPassword(pass){
        let tmp = {
            'passwrd': pass.trim(),
            'passwrd_error': {},
            //'confirm_password_error': this.state.confirm_password_error
        };
        let retval = true;
        try{
            this.__validate_password(tmp.passwrd);
            this.__validate_password_eq(tmp.passwrd, this.state.repasswrd);

            //remet a zero
            if(this.state.repasswrd_error.code == ERROR_EQ) tmp.repasswrd_error = {}
        }
        catch(err){
            
            if(err == ERROR_VALIDATION)
                tmp.passwrd_error = {
                    code: err,
                    message:'Password must be at least 8 characters long.'
                };
            else if(err == ERROR_EQ) {                
                tmp.repasswrd_error = {
                    code: err,
                    message:'Your confirm password does not match your new password.'
                };
            }
            retval = false;
        } 
        //this.setState(Object.assign({}, this.state,tmp))
        // will set state later...
        this.setState((old, np)=> {
            console.log(tmp)
            return {...old, ...tmp};
        });
        return retval;
    }
    validateConfirmPassword(pass){
        let tmp = {
            'repasswrd': pass.trim(),
            'repasswrd_error': {}
        };
        let retval = true;
        try{
            this.__validate_password(tmp.repasswrd);
            this.__validate_password_eq(tmp.repasswrd, this.state.passwrd);

            
        }
        catch(err){
            if(err == ERROR_VALIDATION)
                tmp.repasswrd_error = {
                    code: err,
                    message:'Password must be at least 8 characters long.'
                };
            else if(err == ERROR_EQ )
                tmp.repasswrd_error = {
                    code: err,
                    message: 'Your confirm password does not match your new password.'
                }; 
            retval = false;
        } 
        
        //this.setState(Object.assign({}, this.state,tmp))
        // will set state later...
        this.setState((old, np)=> {
            return {...old, ...tmp};
        });
        return retval;
    }


    submit(evt){
        
        evt.preventDefault();
        evt.stopPropagation();
        let res = this.validateLogin(this.state.login)
            & this.validateNewPassword(this.state.passwrd)
            & this.validateConfirmPassword(this.state.repasswrd);

        if(res)
            this.props.dispatch(REGISTER.checkUserAccount(this.state, this.props.history));// this.props.history.push('/register/site')
        return false;
    }


    render(){
        
        return (
        <div id="form">
            <div className={"animated ra_switch" + (this.props.registerState.error || this.props.registerState.known  ? ' animation shake' : '')} id="switch">
            {this.props.registerState.error && !this.props.registerState.known ?
                <div className="alert animation fadeInDown">
                <i className="material-icons">
                error
                </i>{this.props.registerState.error_message || 'Error'}
                </div> :
                null}
            </div>
          <div className="left-col resume">
            <h2>1. Hello</h2>
            
            <p>what to do and why Lore ipsum dolore sit amet, lore ipsum dolore sit amet, lore ipsum dolore sit amet</p>
            <RaisedButton type="button"  label="Back"
                className="secondary" onClick={()=>this.props.history.push({
                    pathname: '/register',
                    state: { prevPath: 'intern' }
                  })} />
            
          </div>
          <div className="right-col forms rform">
            
            <form  onSubmit={(evt)=>this.submit(evt)}>
            <h2>your account</h2>
            <p>lore ipsum dolore sit amet, lore ipsum dolore sit amet lore ipsum dolore sit amet, lore ipsum dolore sit amet</p>
            <TextField
                    autoFocus
                    value={this.state.login} onChange ={(evt)=>this.validateLogin(evt.target.value)}
                    floatingLabelText="Login"
                    fullWidth={true}
                    errorText={this.state.login_error.message}
                    />
            <TextField
                    value={this.state.passwrd} onChange ={(evt)=>this.validateNewPassword(evt.target.value)}
                    type="password"
                    floatingLabelText="Password"
                    fullWidth={true}
                    errorText={this.state.passwrd_error.message}
                    />
            <TextField
                    value={this.state.repasswrd} onChange ={(evt)=>this.validateConfirmPassword(evt.target.value)}
                    floatingLabelText="Confirm password"
                    fullWidth={true}
                    type="password"
                    errorText={this.state.repasswrd_error.message}
                    />
              
              
              {this.props.registerState.sending ?
                    <CircularProgress className="centered-progress" size={80} thickness={5} />
                    : <RaisedButton type="submit" id="lsubmit" label="Next"
                        className="primary" />
                    
              }

            </form>
          </div>
        </div>);
        
    }
}

function mapStateToProps(state){
    return {
        registerState: state.registerState
    }
}
export default connect(mapStateToProps)(AnimatedWrapper(RegisterComponent,{
    'default': "page", // toujours appliquer ces classes
    'enter':' trans_reg_account_enter'
}));
