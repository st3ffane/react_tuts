import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';


import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import InputMask from 'react-input-mask';

import AnimatedWrapper from '../../../animated.wrapper';

const expect = require('expect.js');
import * as GENERAL from '../../../actions/general';

const HEXA_FORMAT = {
    'H': '[0-9a-fA-F]'
};
const IS_HEXA = new RegExp("^[0-9a-fA-F]{8}$")
const IS_SERIAL = new RegExp("^3K [0-9]{2}\.[0-9]{2}\.[0-9]{5}$")
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
            type:'',
            code:'',
            serial:'',

            type_error: {},
            code_error: {},
            serial_error:{},
        }
    }

    componentWillMount() {
        // check if got devices types
        if(!this.props.generalState.devicesTypes){
            // load devices
            this.props.dispatch(GENERAL.loadDevicesTypes());
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
    _setHexaValue(field, evt){
        let tmp = evt.target.value;
        if(IS_HEXA.test(tmp)) this.setState(Object.assign({}, this.state,{code:tmp}))
    }

    validateType(type){
        let tmp = {
            type: type,
            type_error : {}
        };
        let res = true;
        try{
            expect(type).to.not.be.empty();
        } catch(err){
            tmp.type_error = {
                code: 1,
                message:'You must select a device type.'
            };
            res = false;
        }
        this.setState( (old,p)=>{return {...old, ...tmp}});
        return res;

    }
    
    validateCode(code){
        console.log(code)
        let tmp = {
            code: code,
            code_error : {}
        };
        let res = true;
        try{
            expect(code).to.not.be.empty();
            expect(code.length).to.equal(8);
            expect(code).to.match(IS_HEXA);
        } catch(err){
            console.log(err)
            tmp.code_error = {
                code: 1,
                message:'The device code must be a 8 charcaters hexadecimal digit.'
            };
            res = false;
        }
        this.setState( (old,p)=>{return {...old, ...tmp}});
        return res;
    }
    validateSerial(serial){
        
        let tmp = {
            serial: serial,
            serial_error : {}
        };
        let res = true;
        try{
            expect(serial).to.not.be.empty();
            expect(serial.length).to.equal(14);
            expect(serial).to.match(IS_SERIAL);
        } catch(err){
            console.log(err)
            tmp.serial_error = {
                code: 1,
                message:'The device serial is not valid.'
            };
            res = false;
        }
        this.setState( (old,p)=>{return {...old, ...tmp}});
        return res;
    }

    submit(evt){
        evt.preventDefault();
        evt.stopPropagation();
        let res = this.validateType(this.state.type)
                & this.validateCode(this.state.code)
                & this.validateSerial(this.state.serial);
        if(res)
            this.props.history.push('/homepage')
        return false;
    }
    render(){
        
        // devices types
        
        return (
        <div id="form">
            <div className={"switch ra_switch animated" + (this.props.registerState.error || this.props.generalState.has_error  ? ' animation shake' : '')} id="switch">
            {this.props.registerState.error  || this.props.generalState.error  ?
                <div className="alert animation fadeInDown">
                <i className="material-icons">
                error
                </i>{this.props.registerState.message || this.props.generalState.error || 'Error'}
                </div> :
                null}
            </div>
          <div className="left-col resume">
            <h2>3. Last piece of datas</h2>
            
            <p>what to do and why Lore ipsum dolore sit amet, lore ipsum dolore sit amet, lore ipsum dolore sit amet</p>
            <RaisedButton type="button"  label="Back"
                className="secondary" onClick={()=>this.props.history.push({
                    pathname: '/register/site',
                    state: { prevPath: 'intern' }
                  })} />
          </div>
          <div className="right-col forms rform">
            
            {
                this.props.generalState.is_loading ?

                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div> 
                :

                    <form onSubmit={(evt)=>this.submit(evt)}>
                    <h2>Add your device</h2>
                    <p>lore ipsum dolore sit amet, lore ipsum dolore sit amet lore ipsum dolore sit amet, lore ipsum dolore sit amet</p>
                    
                    <SelectField
                    floatingLabelText="Device Type"
                    value={this.state.type} onChange ={(evt, index, value)=>this.validateType(value)}
                    fullWidth={true}
                    errorText={this.state.type_error.message}
                    >
                        {
                            (this.props.generalState.devicesTypes || []).map( (el)=><MenuItem key={el.code} value={el.code} primaryText={el.name}/>)
                        }
                        
                    </SelectField>
                    
                        <TextField
                            value={this.state.code}
                            floatingLabelText="Device Code"
                            fullWidth={true}
                            errorText={this.state.code_error.message}
                            ><InputMask mask="HHHHHHHH" formatChars={HEXA_FORMAT} maskChar=" " value={this.state.code} onChange ={(evt)=>this.validateCode(evt.target.value)}/>
                        </TextField>
                        <TextField
                            value={this.state.serial} 
                            floatingLabelText="Device Serial"
                            fullWidth={true}
                            errorText={this.state.serial_error.message}
                        ><InputMask mask="3K 99.99.99999" maskChar="_" value={this.state.serial} onChange ={(evt)=>this.validateSerial(evt.target.value)}/></TextField>
                    
                    {this.props.registerState.sending ?
                            <CircularProgress className="centered-progress" size={60} thickness={5} />
                            : <RaisedButton type="submit" id="lsubmit" label="Validate"
                                className="primary" />
                            
                    }
                    </form>
            }
          </div>
        </div>);
        
    }
}

function mapStateToProps(state){
    return {
        registerState: state.registerState,
        generalState: state.generalState
    }
}
export default connect(mapStateToProps)(AnimatedWrapper(RegisterComponent,{
    'default': "page", // toujours appliquer ces classes
    'enter': ' trans_reg_account_enter'
}));
