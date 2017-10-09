import {connect} from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import App from '../components/App.js';
import { tickerStarted, tickerStopped, randomizeGrid, step, activate } from '../actions';

class AppContainer extends Component {
    
    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    startTicker() {
        const { store } = this.context;

        let ticker = () => {
            if (store.getState().tickerStarted) {
                store.dispatch(step());

                window.requestAnimationFrame(ticker);
                //setTimeout(ticker, 500);
            }
        };

        if (!store.getState().tickerStarted) {
            store.dispatch(tickerStarted());
            ticker();
        }
    }

    // stopTicker() {
    //     this.tickerStopped();
    // }

    render() {
        return (
            <App reduxState={this.props.reduxState}
                 startTicker={() => this.startTicker()}
                 tickerStopped={this.props.tickerStopped}
                 randomizeGrid={this.props.randomizeGrid}
                 step={this.props.step}
                 activate={this.props.activate}
            />
        )
    }
}

AppContainer.contextTypes = {
    store: PropTypes.object
};

function mapStateToProps(state) {
    return { reduxState: state }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
		{ tickerStarted, tickerStopped, randomizeGrid, step, activate } 
		, dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)