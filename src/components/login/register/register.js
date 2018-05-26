import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import CircularProgress from 'material-ui/CircularProgress';
import AnimatedWrapper from '../../../animated.wrapper';
const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

import {checkUserInfos} from '../../../actions/register';
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
            firstname:'',
            lastname:'',
            email:'',

            firstname_error:{},
            lastname_error:{},
            email_error:{}
        }
    }

    shouldComponentUpdate(np, ns){
        return true;
    }

    componentDidMount(){
        let tmp = {
            firstname: this.props.registerState.firstname || '',
            lastname: this.props.registerState.lastname || '',
            email: this.props.registerState.email || ''
        }
        this.setState(Object.assign({}, this.state, tmp))
    }
    componentWillReceiveProps(np, ns){

        
        if(np.registerState.known) {
            this.setState(Object.assign({}, this.state, {
                email_error : {
                    code: 3,
                    message: 'Email already in use, please change.'
                }
            } ))
            
        }
        

    }

    _setValue(field, evt){
        // todo
        let t = {};
        t[field] = evt.target.value;
        this.setState(Object.assign({}, this.state,t))
    }
    validateFirstname(name){
        let tmp = {
            firstname: name.trim(),
            firstname_error: {}
        };
        let retval = true;
        try{
            expect(name).to.not.be.empty();
            expect(name.length).to.be.above(3);
        } catch( err ){
            tmp.firstname_error = {
                code: 1,
                message: 'Your name must be at least 4 characters long.'
            };
            retval = false;
        }
        this.setState( (os, p)=>{
            return {...os, ...tmp};
        });
        return retval;
    }
    validateLastname(name){
        let tmp = {
            lastname: name.trim(),
            lastname_error: {}
        };
        let retval = true;
        try{
            expect(name).to.not.be.empty();
            expect(name.length).to.be.above(3);
        } catch( err ){
            tmp.lastname_error = {
                code: 1,
                message: 'Your last name must be at least 4 characters long.'
            };
            retval = false;
        }
        this.setState( (os, p)=>{
            return {...os, ...tmp};
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
        let res = this.validateFirstname(this.state.firstname) 
            & this.validateLastname(this.state.lastname)
            & this.validateMail(this.state.email);

        if(res)
            this.props.dispatch(checkUserInfos(this.state, this.props.history));//this.props.history.push('/register/account')
        return false;
    }



    render(){
        
        return (
        <div id="form">
            <div className={"animated r_switch" + (this.props.registerState.error || this.props.registerState.known  ? ' animation shake' : '')} id="switch">
            {this.props.registerState.error && !this.props.registerState.known ?
                <div className="alert animation fadeInDown">
                <i className="material-icons">
                error
                </i>{this.props.registerState.error_message || 'Error'}
                </div> :
                null}
            </div>
          <div className="left-col resume">
            <h2>already Have an account?</h2>
            
            <p>Lore ipsum dolore sit amet, lore ipsum dolore sit amet, lore ipsum dolore sit amet</p>
            <RaisedButton type="button"  label="Sign In"
                className="secondary" onClick={()=>!this.props.registerState.sending && this.props.history.push('/login')} />
          </div>
          <div className="right-col forms rform bigger">
            
            <form  onSubmit={(evt)=>this.submit(evt)}>
            <h2>Sign Up</h2>
            <p>You Are 3 steps Away From Our World, Just Tell Us A Little Bit About Yourself.</p>
            <TextField
                    autoFocus
                    value={this.state.firstname} onChange ={(evt)=>this.validateFirstname(evt.target.value)}
                    floatingLabelText="First Name"
                    fullWidth={true}
                    errorText={this.state.firstname_error.message}
                    />
            <TextField
                    value={this.state.lastname} onChange ={(evt)=>this.validateLastname(evt.target.value)}
                    floatingLabelText="Last Name"
                    fullWidth={true}
                    errorText={this.state.lastname_error.message}
                    />
            <TextField
                    value={this.state.email} onChange ={(evt)=>this.validateMail(evt.target.value)}
                    floatingLabelText="Email"
                    fullWidth={true}
                    type="email"
                    errorText={this.state.email_error.message}
                    />
              
              {this.props.registerState.sending ?
                    <CircularProgress className="centered-progress" size={60} thickness={5} />
                    : <RaisedButton type="submit" id="lsubmit" label="Sign Up"
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
    'enter': ' trans_register_enter'
}));
