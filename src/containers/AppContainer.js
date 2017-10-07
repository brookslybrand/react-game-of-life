import {connect} from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import App from '../components/App.js';
import { randomizeMap } from '../actions';

class AppContainer extends Component {
    render() {
        return (
            <App
                reduxState={this.props.reduxState}
                randomizeMap={this.props.randomizeMap}
            />
        )
    }
}

function mapStateToProps(state) {
    return { reduxState: state }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
		{ randomizeMap } 
		, dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)