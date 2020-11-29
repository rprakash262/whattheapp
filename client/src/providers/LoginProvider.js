import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import { ACTIONS } from '../reducers/LoginReducer';
import { getUserCookie } from '../cookie';

class LoginProvider extends React.Component {
  componentDidMount() {
    const { history } = this.props;

    const token = getUserCookie('token');

    if (token) {
      history.push('/');
    }
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
  const pageProps = Object.assign({}, state.login);

  return {
    pageProps,
  };
};

export default connect(mapState)(withRouter(LoginProvider));