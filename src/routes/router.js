import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router";

import Dumb from '../components/dumb.component';
import Hello from '../components/hello';
import Admin from '../components/admin';

import Login from '../components/login/login';
// import Register from '../components/login/register/register';
import RegisterRoutes from './register.route';
import Forgot from '../components/login/forget';
import ReNewPasswrdComponent from '../components/login/renew';



import AdminRoute from './admin.route';
// require('./dumb.scss');


class AppComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    shouldComponentUpdate(np, ns){
        return true;
    }

    render(){
        return <div className="App">
            <Route exact={true} path='/' component={Hello}/>
            <Route path='/dumb' component={Dumb}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={RegisterRoutes}/>
            <Route path='/forgot' component={Forgot}/>
            <Route path='/renew' component={ReNewPasswrdComponent}/>


            <Route path='/admin' render={(props) => this.props.loginState.isAuth === true
                ? <Admin {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
        
      </div>
    }
}

function mapStateToProps(state){
    return {
        loginState: state.loginState || {isAuth: false}
    }
}

export default withRouter(connect(mapStateToProps)(AppComponent));