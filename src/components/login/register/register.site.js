import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import CircularProgress from 'material-ui/CircularProgress';
import AnimatedWrapper from '../../../animated.wrapper';



import * as REGISTER from '../../../actions/register';
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
            siteName:'',
            siteName_error:{}
        }
    }

    shouldComponentUpdate(np, ns){
        return true;
    }

    componentDidMount(){
        let tmp = {
            siteName: this.props.registerState.siteName  || '',
        }
        this.setState(Object.assign({}, this.state, tmp))
    }


    _setValue(field, evt){
        // todo
        let t = {};
        t[field] = evt.target.value;
        this.setState(Object.assign({}, this.state,t))
    }
    validateName(name){
        let tmp = {
            siteName: name.trim(),
            siteName_error: {}
        };
        let retval = true;
        try{
            expect(name).to.not.be.empty();
            expect(name.length).to.be.above(3);
            expect(name.length).to.be.below(21);
        } catch( err ){
            tmp.siteName_error = {
                code: 1,
                message: 'The name must be at least 4 characters long and at most 20.'
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
        if(this.validateName(this.state.siteName))
            this.props.dispatch(REGISTER.createSite(this.state, this.props.history));//this.props.history.push('/register/device')
        return false;
    }
    render(){
        
        return (
        <div id="form">
            <div className={"animated ra_switch" + (this.props.registerState.error || this.props.registerState.known  ? ' animation shake' : '')} id="switch">
            {this.props.registerState.error ?
                <div className="alert animation fadeInDown">
                <i className="material-icons">
                error
                </i>{this.props.registerState.error_message || 'Error'}
                </div> :
                null}
            </div>
          <div className="left-col resume">
            <h2>2. Next register infos</h2>
            
            <p>what to do and why Lore ipsum dolore sit amet, lore ipsum dolore sit amet, lore ipsum dolore sit amet</p>
            <RaisedButton type="button"  label="Back"
                className="secondary" onClick={()=>this.props.history.push({
                    pathname: '/register/account',
                    state: { prevPath: 'intern' }
                  })} />
            
          </div>
          <div className="right-col forms rform">
            
          <form  onSubmit={(evt)=>this.submit(evt)}>
            <h2>create your first site</h2>
            <p>lore ipsum dolore sit amet, lore ipsum dolore sit amet lore ipsum dolore sit amet, lore ipsum dolore sit amet</p>
            <TextField
                    autoFocus
                    value={this.state.siteName} onChange ={(evt)=>this.validateName(evt.target.value)}
                    floatingLabelText="Site name"
                    fullWidth={true}
                    errorText={this.state.siteName_error.message}
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
    'enter': ' trans_reg_account_enter'
}));
