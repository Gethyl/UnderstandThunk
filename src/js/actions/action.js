
export const requestLoad =  function requestLoad() {
    return {
        type: 'REQUEST_LOAD',
    };
}

export const receiveLoad = function receiveLoad(timestamp) {
    return {
        type: 'RECEIVE_LOAD',
        payload: {
            lastTimestamp: timestamp,
        }
    }
}

// Note that it's a Side Effect Function
export const startLoad =  function startLoad() {
	console.info("++++++++++startLoad function Called++++++++++++")
    return function sideEffectFunction (dispatch)  {
        console.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~dispatching requestLoad ......")
        dispatch(requestLoad()); // Sub action for REQUEST_LOAD
        return loadApi()
                .then(timestamp => {
                    // Sub action for RECEIVE_LOAD
                  console.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~dispatching receiveLoad ......")                
                  return dispatch(receiveLoad(timestamp))
                });
    }
}

function loadApi() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().getTime());
        }, 2000);
    });
}
