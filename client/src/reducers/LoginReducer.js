import { cloneDeep, isEmpty } from 'lodash';
import jwt_decode from 'jwt-decode';
// import { createBrowserHistory } from 'history';

import { registerUser, loginUser } from '../actions';
import { setJwtToken, setUser } from '../cookie';

// const history = createBrowserHistory();

const SET_LOGIN_FIELDS = 'LoginReducer/SET_LOGIN_FIELDS';
const SET_REGISTER_FIELDS = 'LoginReducer/SET_REGISTER_FIELDS';
const SET_ALERT = 'LoginReducer/SET_ALERT';
const HIDE_ALERT = 'LoginReducer/HIDE_ALERT';
const SET_LOGGING_IN = 'LoginReducer/SET_LOGGING_IN';
const SET_REGISTERING = 'LoginReducer/SET_REGISTERING';
const SET_CURRENT_USER = 'LoginReducer/SET_CURRENT_USER';

const setLoginFields = fields => ({ type: SET_LOGIN_FIELDS, fields });
const setRegisterFields = fields => ({ type: SET_REGISTER_FIELDS, fields });
const setAlert = (bool, alertType, alertMsg) => ({ type: SET_ALERT, bool, alertType, alertMsg });
const setLogging = bool => ({ type: SET_LOGGING_IN, bool });
const setRegistering = bool => ({ type: SET_REGISTERING, bool });
export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user });

const defaultState = {
  showAlert: false,
  alertType: '',
  alertMsg: '',
  loadingApp: true,
  loginFields: {},
  registerFields: {},
  loggingIn: false,
  registering: false,
  currentUser: {},
  isAuthenticated: false,
};

const changeLoginForm = (fieldName, value) => (dispatch, getState) => {
  const { loginFields } = getState().login;
  const newFields = cloneDeep(loginFields);

  newFields[fieldName] = value

  dispatch(setLoginFields(newFields));
}

const changeRegisterForm = (fieldName, value) => (dispatch, getState) => {
  const { registerFields } = getState().login;
  const newFields = cloneDeep(registerFields);

  newFields[fieldName] = value

  dispatch(setRegisterFields(newFields));
}

const login = e => async (dispatch, getState) => {
  e.preventDefault();
  
  const { loginFields } = getState().login;
  const { number, pin } = loginFields;

  if (!number || !pin) {
    dispatch(setAlert(true, 'danger', 'All fields are required'));

    return setTimeout(() => {
      return dispatch(setAlert(false, 'danger', 'All fields are required'));
    }, 2000);
  }

  dispatch(setLogging(true));
  
  try {
    const response = await loginUser(number, pin);

    if (!response.success) {
      dispatch(setLogging(false));
      dispatch(setAlert(true, 'danger', response.result));

      return setTimeout(() => {
        return dispatch(setAlert(false, 'danger', response.result));
      }, 2000);
    }

    const { result: token } = response;

    setJwtToken(token);
    const decoded = jwt_decode(token);
    setUser(JSON.stringify(decoded));
    dispatch(setCurrentUser(decoded));
    // history.push('/')
    window.location.href = '/';
  } catch (err) {
    console.log(err);
    dispatch(setLogging(false));
    dispatch(setAlert(true, 'danger', 'Something went wrong'));
    setTimeout(() => {
      dispatch(setAlert(false, 'danger', 'Something went wrong'));
    }, 2000);
  }
}

const register = e => async (dispatch, getState) => {
  e.preventDefault();

  const { registerFields } = getState().login;
  const { number, name, pin } = registerFields;

  if (!number || !name || !pin) {
    dispatch(setAlert(true, 'danger', 'All fields are required'));

    return setTimeout(() => {
      return dispatch(setAlert(false, 'danger', 'All fields are required'));
    }, 2000);
  }

  if (pin.length !== 6) {
    dispatch(setAlert(true, 'danger', 'PIN should be 6 digit only'));

    return setTimeout(() => {
      return dispatch(setAlert(false, 'danger', 'PIN should be 6 digit only'));
    }, 2000);
  }
  
  dispatch(setRegistering(true));

  try {
    const response = await registerUser(name, number, pin);

    if (!response.success) {
      dispatch(setRegistering(false));
      dispatch(setAlert(true, 'danger', response.result));

      return setTimeout(() => {
        return dispatch(setAlert(false, 'danger', response.result));
      }, 2000);
    }

    const { result: token, } = response;
    setJwtToken(token);
    const decoded = jwt_decode(token);
    setUser(JSON.stringify(decoded));
    dispatch(setCurrentUser(decoded));
    window.location.href = '/';
  } catch (err) {
    console.log(err);
    dispatch(setRegistering(false));
    dispatch(setAlert(true, 'danger', 'Something went wrong'));
    setTimeout(() => {
      dispatch(setAlert(false, 'danger', 'Something went wrong'));
    }, 2000);
  }
}

export const ACTIONS = {
  changeLoginForm,
  changeRegisterForm,
  login,
  register,
  hideAlert: () => ({ type: HIDE_ALERT }),
};

function LoginReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_LOGIN_FIELDS:
      return Object.assign({}, state, { loginFields: action.fields });
    case SET_REGISTER_FIELDS:
      return Object.assign({}, state, { registerFields: action.fields });
    case SET_ALERT:
      return Object.assign({}, state, {
        showAlert: action.bool,
        alertType: action.alertType,
        alertMsg: action.alertMsg,
      });
    case HIDE_ALERT:
      return Object.assign({}, state, { showAlert: false });
    case SET_LOGGING_IN:
      return Object.assign({}, state, { loggingIn: action.bool });
    case SET_REGISTERING:
      return Object.assign({}, state, { registering: action.bool });
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.user,
        isAuthenticated: !isEmpty(action.user),
      });
    default:
      return state;
  }
}

export default LoginReducer;