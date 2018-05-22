import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router";

import Register from '../components/login/register/register';
import RegisterAccount from '../components/login/register/register.account';
import RegisterSite from '../components/login/register/register.site';
import RegisterDevice from '../components/login/register/register.device';


import AdminRoute from './admin.route';
// require('./dumb.scss');


class RegisterRouteComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    shouldComponentUpdate(np, ns){
        return true;
    }

    render(){
        return <div>
            
            <Route exact={true} path='/register/account' component={RegisterAccount}/>
            <Route exact={true} path='/register/site' component={RegisterSite}/>
            <Route exact={true} path='/register/device' component={RegisterDevice}/>
            <Route exact={true} path='/register' component={Register}/>
            </div>
    }
}


export default withRouter(connect()(RegisterRouteComponent));