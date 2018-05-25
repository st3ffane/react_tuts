import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const expect = require('expect.js');
const ERROR_VALIDATION = 1;
const ERROR_DIFF = 2;
const ERROR_EQ = 3;


import AnimatedWrapper from '../../animated.wrapper';
import { AUTH_ACTION, AUTH_NOT_FOUND_ACTION, renew_password } from '../../actions/login';
/**
 * Main container for login page:
 * can login
 * can register
 * can get lost password by mail
 */
class ReNewPasswrdComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: "",
            passwrd: '',
            new_password: '',
            confirm_password: '',

            login_error : {},
            password_error : {},
            new_password_error : {},
            confirm_password_error : {}
        }
    }

    shouldComponentUpdate(np, ns){
        return true;
    }
    componentWillReceiveProps(np, ns){
        if(np.loginState.reason==AUTH_NOT_FOUND_ACTION) {
            // add error message
             this.setState(Object.assign({}, this.state, {
                 login_error:{code: 1, message:"Unknown user!"},
                 password_error: {code: 1, message:"Unknown user!"}
             }));
        }
     }
    _setValue(field, evt){
        // todo
        let t = {};
        t[field] = evt.target.value;
        this.setState(Object.assign({}, this.state,t))
    }
    

    validateLogin(log){
        
            let tmp = {
                'login': log.trim(),
                'login_error': {}
            };
            let retval = true;
            try{
                expect(tmp.login).to.not.be.empty();
                expect(tmp.login.length).to.be.above(7);            
            }
            catch(err){
                
                tmp.login_error = {
                    code: ERROR_VALIDATION,
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
    validatePassword(pass = ''){
        let tmp = {
            'passwrd': pass.trim(),
            'password_error': {},
            //'new_password_error' : this.state.new_password_error
        };
        let retval = true;
        // check own value
        try{
            this.__validate_password(tmp.passwrd);
            this.__validate_password_diff(tmp.passwrd, this.state.new_password);
            // remet a zero si possible
            if(this.state.new_password_error.code == ERROR_DIFF) tmp.new_password_error = {};
        }
        catch(err){
            
            if(err == ERROR_VALIDATION)
                tmp.password_error = {
                    code: err,
                    message:'Login must be at least 8 characters long.'
                };
            else if(err == ERROR_DIFF)
                tmp.new_password_error = {
                    code: err,
                    message:'Your new password must be different from the old one.'
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

    __validate_password(pass){
        try{
            expect(pass).to.not.be.empty();
            expect(pass.length).to.be.above(7);
        } catch (err){
            throw ERROR_VALIDATION;
        }
    }
    __validate_password_diff(pass, np){
        try{
            expect(pass).to.not.equal(np);
        } catch (err){
            throw ERROR_DIFF;
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
            'new_password': pass.trim(),
            'new_password_error': {},
            //'confirm_password_error': this.state.confirm_password_error
        };
        let retval = true;
        try{
            this.__validate_password(tmp.new_password);
            this.__validate_password_diff(tmp.new_password, this.state.passwrd);
            this.__validate_password_eq(tmp.new_password, this.state.confirm_password);

            //remet a zero
            if(this.state.confirm_password_error.code == ERROR_EQ) tmp.confirm_password_error = {}
        }
        catch(err){
            
            if(err == ERROR_VALIDATION)
                tmp.new_password_error = {
                    code: err,
                    message:'Password must be at least 8 characters long.'
                };
            else if(err == ERROR_DIFF)
                tmp.new_password_error = {
                    code: err,
                    message:'Your new password must be different from the old one.'
                }; 
            else if(err == ERROR_EQ) {                
                console.log("error not eq")
                tmp.confirm_password_error = {
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
            'confirm_password': pass.trim(),
            'confirm_password_error': {}
        };
        let retval = true;
        try{
            this.__validate_password(tmp.confirm_password);
            this.__validate_password_eq(tmp.confirm_password, this.state.new_password);

            
        }
        catch(err){
            if(err == ERROR_VALIDATION)
                tmp.confirm_password_error = {
                    code: err,
                    message:'Password must be at least 8 characters long.'
                };
            else if(err == ERROR_EQ )
                tmp.confirm_password_error = {
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
        let result = this.validateLogin(this.state.login)  & this.validatePassword(this.state.passwrd)
            & this.validateNewPassword(this.state.new_password) & this.validateConfirmPassword(this.state.confirm_password)
        if(result)
            this.props.dispatch(renew_password(this.state, this.props.history));// this.props.history.push('/renew')
        
        return false;
    }



    render(){
        
        
        return (
        <div id="form">
          <div className={"switch rn_switch animated" + (this.props.loginState.error  ? ' animation shake' : '')}>
          {this.props.loginState.error && this.props.loginState.reason != AUTH_NOT_FOUND_ACTION ?
                <div className="alert animation fadeInDown">
                <i className="material-icons">
                error
                </i>{this.props.loginState.message || 'Error'}
                </div> :
                null}
            </div>
          <div className="left-col forms">
            <form className="login renew" onSubmit={(evt)=>this.submit(evt)}>
                <h2>Update Password</h2>
                
            <TextField
                    autoFocus
                    value={this.state.login} onChange ={(evt)=>this.validateLogin(evt.target.value)}
                    floatingLabelText="Login"
                    fullWidth={true}
                    errorText={this.state.login_error.message}
                    />
            <TextField
                    value={this.state.passwrd} onChange ={(evt)=>this.validatePassword(evt.target.value)}
                    floatingLabelText="Password"
                    fullWidth={true}
                    type="text"
                    errorText={this.state.password_error.message}
                    />
            <TextField
                    value={this.state.new_password} onChange ={(evt)=>this.validateNewPassword(evt.target.value)}
                    floatingLabelText="New Password"
                    fullWidth={true}
                    type="text"
                    errorText={this.state.new_password_error.message}
                    />
            <TextField
                    value={this.state.confirm_password} onChange ={(evt)=>this.validateConfirmPassword(evt.target.value)}
                    floatingLabelText="Confirm Password"
                    fullWidth={true}
                    type="text"
                    errorText={this.state.confirm_password_error.message}
                    />
              
              
              {this.props.loginState.sending ?
                    <CircularProgress className="centered-progress" size={80} thickness={5} />
                    : <RaisedButton type="submit" id="lsubmit" label="Confirm"
                        className="primary" />
                    
              }
              
            </form>
            <a href="#" onClick={(evt)=>{
                evt.preventDefault();
                if(!this.props.loginState.sending){
                    this.props.dispatch({
                        type: AUTH_ACTION
                    });
                    return  this.props.history.push({pathname: '/login', state: { prevPath: 'renew' }});
                }
                return false;
            }} >Back To Login</a>
            
          </div>
          <div className="right-col resume">
            <h2>CFR-21 Normas</h2>
            
            <p>Lore ipsum dolore sit amet, lore ipsum dolore sit amet, lore ipsum dolore sit amet 
            Lore ipsum dolore sit amet, lore ipsum dolore sit amet, lore ipsum dolore sit amet 
            Lore ipsum dolore sit amet, lore ipsum dolore sit amet, lore ipsum dolore sit amet
            </p>
            
          </div>
          
        </div>);
        
    }
}

function select(state){
    return {
        loginState: state.loginState,
    
    }
}
export default connect(select)(AnimatedWrapper(ReNewPasswrdComponent,{
    'default': "page", // toujours appliquer ces classes
    'enter': ' trans_renew_enter' // affichage du composant
}));
