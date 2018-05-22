import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
            email: "",
            email_error:{}
        }
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
        return this.validateMail(this.state.email);
    }
    render(){
        
        return (
        <div id="form">
          <div className="animated switch f_switch"></div>
          <div className="left-col forms f_forms">
            <form onSubmit={(evt)=>this.submit(evt)}>
                <h2>forget password?</h2>
                
                <p>Lore ipsum dolore sit amet Lore ipsum dolore sit amet Lore ipsum dolore sit amet</p>
              
                <TextField
                    autoFocus
                    value={this.state.email} onChange ={(evt)=>this.validateMail(evt.target.value)}
                    floatingLabelText="Email"
                    fullWidth={true}
                    type="email"
                    errorText={this.state.email_error.message}
                    />
              
              
              <RaisedButton type="submit" id="lsubmit" label="Send me a mail"
                className="primary" />
                <Link to={{pathname: '/login', state: { prevPath: 'forget' }}}>Back to login</Link>
                
              
            </form>
            
          </div>
          
          
        </div>);
        
    }
}


export default connect()(ForgetComponent);
