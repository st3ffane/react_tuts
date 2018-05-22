import React from 'react'
import { connect } from 'react-redux'
import DumbButton from './simple.button'
import DumbButton2 from './simple.button.1'
import { Link, Route, Switch } from 'react-router-dom';
require('./dumb.scss');

class DumbComponent extends React.Component {
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
            <div className='message'>Dumb {this.props.payload}</div>
            <DumbButton amount={1} title="Add"/>
            <DumbButton2 amount={-1} title="Minus"/>

            <Link to='/'>Back to index</Link>
        </div>
    }
}

function mapStateToProps(state){
    return {
        payload: state.dumbState.payload
    }
}

export default connect(mapStateToProps)(DumbComponent);