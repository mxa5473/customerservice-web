/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'react-router-redux';

import LoginContentWrapper from 'components/LoginContentWrapper';
import LoginForm from 'components/LoginForm';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { postLogin } from './../Application/actions';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <LoginContentWrapper goHome={() => this.props.redirectTo('/')} goSignup={() => this.props.redirectTo('/signup')}>
        <LoginForm onLogin={(e) => this.props.postLogin(e.email, e.password)} goLogin={() => this.props.redirectTo('/signup')} />
      </LoginContentWrapper>
    );
  }
}

LoginPage.propTypes = {
  redirectTo: PropTypes.func.isRequired,
  postLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    redirectTo: (url) => dispatch(push(url)),
    postLogin: (email, password) => dispatch(postLogin(email, password)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
