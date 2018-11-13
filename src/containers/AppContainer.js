import {connect} from 'react-redux'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import App from '../components/App.js'
import { tickerStarted, tickerStopped, randomizeGrid, step, activate, clearGrid } from '../actions'

class AppContainer extends PureComponent {
    
    componentDidMount() {
      const { store } = this.context
      this.unsubscribe = store.subscribe(() =>
        this.forceUpdate()
      )
    }

    componentWillUnmount() {
      this.unsubscribe()
    }
    
    // game loop functionality was taken from Swizec Teller's book 'React+D3v4', from the section 'Animating with React, Redux, and d3'
    startTicker = () => {
      const { store } = this.context

      let ticker = () => {
        if (store.getState().tickerStarted) {
          store.dispatch(step())

          window.requestAnimationFrame(ticker)
        }
      }

      if (!store.getState().tickerStarted) {
        store.dispatch(tickerStarted())
        ticker()
      }
    }

    // render the app and pass along the state and action functions
    render() {
        return (
            <App reduxState={this.props.reduxState}
              startTicker={this.startTicker}
              tickerStopped={this.props.tickerStopped}
              randomizeGrid={this.props.randomizeGrid}
              step={this.props.step}
              activate={this.props.activate}
              clearGrid={this.props.clearGrid}
            />
        )
    }
}

AppContainer.contextTypes = {
  store: PropTypes.object
}

function mapStateToProps(state) {
  return { reduxState: state }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
  { tickerStarted, tickerStopped, randomizeGrid, step, activate, clearGrid } 
  , dispatch
)}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)