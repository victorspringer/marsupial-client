const scriptsData = (state = {}, action) => {
    switch (action.type) {
      case 'LOADING_SCRIPTS':
      case 'LOADING_SCRIPT':
      case 'LOADING_SCRIPT_VERSION':
      case 'SAVING_SCRIPT':
        return Object.assign({}, state, {
          isFetching: true
        })
      case 'LOADED_SCRIPTS':
      case 'LOADED_SCRIPT':
        return Object.assign({}, state, {
          isFetching: false,
          scripts: action.scripts
        })
      case 'LOADED_SCRIPT_VERSION':
        return Object.assign({}, state, {
          isFetching: false,
          script: action.script
        })
      case 'SAVED_SCRIPT':
        return Object.assign({}, state, {
          isFetching: false,
          savedScript: action.savedScript
        })
      default:
        return state;
    }
  };
  
  export default scriptsData;