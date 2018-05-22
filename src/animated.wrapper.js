import React, { Component } from "react";
import { connect } from 'react-redux'
import Transition from "react-transition-group/Transition";


// FadeIn animation
/*const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
};
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}*/



const AnimatedWrapper = (WrappedComponent, styles = {}) => class AnimatedWrapper
 extends Component {
 constructor(props) {
  super(props);
  this.state = {
   in: true,
   appear: true,
  };
 }

 componentWillReceiveProps(np, ns){
     console.log(np.location.pathname, this.props.location.pathname)
    this.setState({in:true, appear: np.location.pathname != this.props.location.pathname})
 }

 render() {
    let classes = styles.default || '';
    let duration = styles.duration || 200;
    // suivant d'ou provient le router, charge l'animation?
    if(this.state.appear && this.props.location.state && this.props.location.state.prevPath ){
        classes += " trans_"+this.props.location.state.prevPath;
    } else if(this.state.appear){
        // si le path est different, charge l'animation par defaut
        classes += styles.enter || '';
    }
    return <Transition appear={this.state.appear} in={this.state.in} timeout={duration} >
        {(state) => (
            <div className={classes}>
                <WrappedComponent {...this.props} />
            </div>
            )}
            
        </Transition>;
 }
};
export default AnimatedWrapper;