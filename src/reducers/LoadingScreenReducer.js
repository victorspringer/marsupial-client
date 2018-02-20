const loadingScreenStatus = (state = {}, action) => {
    switch (action.type) {
      case 'LOGGING_IN':
      case 'LOGGING_OUT':
      case 'LOADING_SCRIPTS':
      case 'LOADING_SCRIPT':
      case 'SAVING_SCRIPT':
        return Object.assign({}, state, {
          active: true
        });
      case 'LOGGED_IN':
      case 'LOGGED_OUT':
      case 'LOADED_SCRIPTS':
      case 'LOADED_SCRIPT':
      case 'SAVED_SCRIPT':
        return Object.assign({}, state, {
          active: false
        });
      default:
        return state;
    }
  };
  
  export default loadingScreenStatus;
  