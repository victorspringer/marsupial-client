export const loadingScripts = () => {
  return {
    type: 'LOADING_SCRIPTS'
  };
};

export const loadedScripts = (scripts) => {
  return {
    type: 'LOADED_SCRIPTS',
    scripts: scripts
  };
};

export const loadingScript = () => {
  return {
    type: 'LOADING_SCRIPT'
  };
};

export const loadedScript = (versions) => {
  return {
    type: 'LOADED_SCRIPT',
    scripts: versions
  };
};

export const loadingScriptVersion = () => {
  return {
    type: 'LOADING_SCRIPT_VERSION'
  };
};

export const loadedScriptVersion = (script) => {
  return {
    type: 'LOADED_SCRIPT_VERSION',
    script: script
  };
};

export const savingScript = () => {
  return {
    type: 'SAVING_SCRIPT'
  };
};

export const savedScript = (script) => {
  return {
    type: 'SAVED_SCRIPT',
    savedScript: script
  };
};

export const getScripts = () => {
  return dispatch => {
    dispatch(loadingScripts());
    return fetch('http://0.0.0.0:8080/list-scripts')
      .then(response => {
        if (response.status >= 400) {
          return [];
        }
        return response.json();
      })
      .then(response => {
        dispatch(loadedScripts(response.scripts));
      });
  };
};

export const getScript = (id) => {
  return dispatch => {
    dispatch(loadingScript());
    return fetch(`http://0.0.0.0:8080/get-script/${id}`)
      .then(response => {
        if (response.status >= 400) {
          return [];
        }
        return response.json();
      })
      .then(response => {
        dispatch(loadedScript(response.scripts));
      });
  };
};

export const getScriptVersion = (id, version) => {
  return dispatch => {
    dispatch(loadingScriptVersion());
    return fetch(`http://0.0.0.0:8080/get-script-version/${id}/${version}`)
      .then(response => {
        if (response.status >= 400) {
          return {};
        }
        return response.json();
      })
      .then(response => {
        dispatch(loadedScriptVersion(response));
      });
  };
};

export const saveScript = (script) => {
  return dispatch => {
    dispatch(savingScript());
    return fetch('http://0.0.0.0:8080/insert-script', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: JSON.stringify(script)
      })
      .then(response => {
        if (response.status > 400) {
          return {};
        }
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          if (
            response.error.includes('InvalidBucketName') ||
            response.error.includes('NoSuchBucket') ||
            response.error.includes('PermanentRedirect') ||
            response.error.includes('BucketNotEmpty') ||
            response.error.includes('IllegalLocationConstraintException')
          ) {
            return {
              error: 'Invalid S3 file path.'
            };
          } else if (
            response.error.includes('InvalidAccessKeyId') ||
            response.error.includes('SignatureDoesNotMatch')
          ) {
            return {
              error: 'Invalid AWS credentials. Please, log in again with valid ones.'
            };
          } else {
            return {
              error: 'Invalid S3 region.'
            };
          }
        }
        return response;
      }).then(response => {
        dispatch(savedScript(response));
      });
  };
};
