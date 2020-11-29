import React from 'react';
import { connect } from 'react-redux';

import { ACTIONS } from '../reducers/LayoutReducer';

class LayoutProvider extends React.Component {
  componentDidMount() {
    this.props.dispatch(ACTIONS.init());
  }

  render() {
    const { children, pageProps } = this.props;

    const pageActions = {};

    Object.entries(ACTIONS).forEach(([k, v]) => {
      pageActions[k] = (...args) => this.props.dispatch(v(...args));
    });

    const childProps = {
      pageProps,
      pageActions,
    };

    return React.isValidElement(children)
      ? React.cloneElement(children, childProps) // element as children
      : React.createElement(children, childProps);
  }
}

const mapState = state => {
  const pageProps = Object.assign({}, state.layout);

  return {
    pageProps,
  };
};

export default connect(mapState)(LayoutProvider);