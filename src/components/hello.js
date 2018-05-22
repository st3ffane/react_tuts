import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';

import {FormattedMessage, FormattedNumber, FormattedPlural} from 'react-intl';

require('./dumb.scss');

class HelloComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Stephane PONTEINS'
        }
    }

    shouldComponentUpdate(np, ns){
        return true;
    }

    render(){
        return <div>
            <div>
            <p>
                <FormattedMessage id="welcome" defaultMessage={'Welcome {name} '}
                values={{name:<b>{this.state.name}</b>}}/>
            </p>    
            <p>
            You have {' '}
            <FormattedNumber value={10000} /> {' '}
            <FormattedPlural value={1000}
                one="message"
                other="messages"
            />.
        </p></div>
            <ul>
            <li><Link to='/dumb'>Go to dumb page</Link></li>
            <li><Link to='/login'>Go to login page</Link></li>
            <li><Link to='/admin'>Go to admin page</Link></li>
            </ul>
        </div>
    }
}

function mapStateToProps(state){
    return {
        
    }
}

export default connect(mapStateToProps)(HelloComponent);