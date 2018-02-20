export const loggingIn = () => {
  return {
    type: 'LOGGING_IN'
  };
};

export const loggedIn = () => {
  return {
    type: 'LOGGED_IN'
  };
};

export const loggingOut = () => {
  return {
    type: 'LOGGING_OUT'
  };
};

export const loggedOut = () => {
  return {
    type: 'LOGGED_OUT'
  };
};

export const login = (username, awsKey, awsSecret) => {
  return dispatch => {
    dispatch(loggingIn());
    localStorage.setItem('username', username);
    localStorage.setItem('awsKey', awsKey);
    localStorage.setItem('awsSecret', awsSecret);
    return dispatch(loggedIn());
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(loggingOut());
    localStorage.removeItem('username');
    localStorage.removeItem('awsKey');
    localStorage.removeItem('awsSecret');
    dispatch(loggedOut());
    window.location = '/';
  };
};