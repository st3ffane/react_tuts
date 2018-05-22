import React from 'react'
import { connect } from 'react-redux'
import {dumbAdd} from '../actions/dumb.action'

require('./button.scss');

class ButtonComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    shouldComponentUpdate(np, ns){
        return true;
    }

    
    render(){
        return <button onClick={()=>this.props.dispatch(dumbAdd(this.props.amount))}>{this.props.title}</button>
    }
}


export default connect()(ButtonComponent);