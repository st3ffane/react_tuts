import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import AnimatedWrapper from '../../animated.wrapper';

import { FORGET_CLEAN_ACTION, FORGET_UNKNOWN_ACTION, sendMeaMail } from '../../actions/forget';
import { AUTH_ACTION } from '../../actions/login';


const expect = require('expect.js');
const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/**
 * Main container for login page:
 * can login
 * can register
 * can get lost password by mail
 */
class ForgetComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login:'',
            login_error:{},
            email: "",
            email_error:{}
        }
    }

    shouldComponentUpdate(np, ns){
        return true;
    }
    componentWillReceiveProps(np, ns){
        if(np.forgetState.known === false) {
            // add error message
             this.setState(Object.assign({}, this.state, {
                 login_error:{code: 1, message:"Unknown user!"},
                 email_error: {code: 1, message:"Unknown user!"}
             }));
        }
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
            'login_error': ''
        };
        let retval = true;
        try{
            expect(log).to.not.be.empty();
            expect(log.length).to.be.above(7);      
            
        } catch( err){
            tmp.login_error = {
                code: 1,
                message: 'Login must be at least 8 characters long.'
            }; 
            retval = false;
        }
        // will set state later...
        this.setState((old, np)=> {
            return {...old, ...tmp};
        });
        return retval;
        
    }

    validateMail(mail) {
        let tmp = {
            email: mail.trim(),
            email_error: {}
        };
        let retval = true;
        try{
            expect(mail).to.not.be.empty();
            expect(mail).to.match(MAIL_REGEX);
        } catch( err ){
            tmp.email_error = {
                code: 1,
                message: 'You must provide a valid email.'
            };
            retval = false;
        }
        this.setState( (os, p)=>{
            return {...os, ...tmp};
        });
        return retval;


    }
    submit(evt){
        evt.preventDefault();
        evt.stopPropagation();
        let res = this.validateLogin(this.state.login) & this.validateMail(this.state.email);
        
        if(res) 
            return this.props.dispatch(sendMeaMail(this.state, this.props.history));

    }
    render(){
        
        return (
        
        <div id="form">
          <div className={"switch f_switch animated" + (this.props.forgetState.error  ? ' animation shake' : '')}>
          {this.props.forgetState.error && this.props.forgetState.reason != FORGET_UNKNOWN_ACTION ?
                <div className="alert animation fadeInDown">
                <i className="material-icons">
                error
                </i>{this.props.forgetState.message || 'Error'}
                </div> :
                null}
          </div>
          <div className="left-col forms f_forms">

            { this.props.forgetState.done &&
            <div>
                <h2 className="title">Check Your Mail!</h2>
                <p>A temporary password had been sent tou your email adress. You will be asked to change it as soon as you log in.</p>
                <div className="textcenter"> 
                    <svg id="successAnimation" className="animated sized" 
                    xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 75 75">
                        <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" strokeWidth="2" strokeLinecap="round" 
                    fill="transparent"/>
                    <polyline id="successAnimationCheck" stroke="#979797" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent"/>
                </svg>
               </div>
            </div>
            }
            { !this.props.forgetState.done && 
            <form onSubmit={(evt)=>this.submit(evt)}>
                <h2>forget password?</h2>
                
                <p>Lore ipsum dolore sit amet Lore ipsum dolore sit amet Lore ipsum dolore sit amet</p>
                <TextField
                    autoFocus
                    value={this.state.login} onChange ={(evt)=>this.validateLogin(evt.target.value)}
                    floatingLabelText="Login"
                    fullWidth={true}
                    type="text"
                    errorText={this.state.login_error.message}
                    />
                <TextField
                    
                    value={this.state.email} onChange ={(evt)=>this.validateMail(evt.target.value)}
                    floatingLabelText="Email"
                    fullWidth={true}
                    type="email"
                    errorText={this.state.email_error.message}
                    />
              
              
              {this.props.forgetState.sending ?
                    <CircularProgress className="centered-progress" size={60} thickness={5} />
                    : <RaisedButton type="submit" id="lsubmit" label="Confirm"
                        className="primary" />
                    
              }
             
              
            </form>}
            

             <a href="#" onClick={(evt)=>{
                evt.preventDefault();
                if(!this.props.forgetState.sending){
                    this.props.dispatch({
                        type: AUTH_ACTION
                    });
                    this.props.dispatch({
                        type: FORGET_CLEAN_ACTION
                    });
                    
                    return  this.props.history.push({pathname: '/login', state: { prevPath: 'forget' }});
                }
                return false;
            }} >Back To Login</a>
                
          </div>
          
          
        </div>)
        ;
        
    }
}


function select(state){
    return {
        forgetState: state.forgetState,
    
    }
}
export default connect(select)(AnimatedWrapper(ForgetComponent,{
    'default': "page", // toujours appliquer ces classes
    'enter': ' trans_forget_enter' // affichage du composant
}));
