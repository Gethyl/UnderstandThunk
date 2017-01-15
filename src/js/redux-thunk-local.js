
//compose from redux/compose.js
 function compose(...funcs) {
	console.info("$$$ compose function ")
  console.dir( funcs)
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

//applyMiddleware from redux/applyMiddleware.js
export const applyMiddleware = function applyMiddleware(...middlewares) {
	//console.info("applyMiddleware")
  return  function (createStore) {
    return function (reducer, preloadedState, enhancer)  {
      const store = createStore(reducer, preloadedState, enhancer)
      let dispatch = store.dispatch
      let chain = []

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      }

      chain = middlewares.map(middleware => {
      	console.info("~~~~~~middleware ")
     		console.dir( middleware)
        const middlewareReturn = middleware(middlewareAPI)
        console.info("~~~~~~middlewareReturn ")
     		console.dir( middlewareReturn)
      	return middlewareReturn
      })
      console.info("~~~chain ")
      console.dir( chain)
      // console.info("~~~store.dispatch ")
      // console.dir( store.dispatch)
      
      //dispatch = compose(...chain)(store.dispatch)
      let composedFunc = compose(...chain)
      console.info("~~~composedFunc ")
      console.dir( composedFunc)
      
      dispatch = composedFunc(store.dispatch)
      console.info("~~~new dispatch AFTER compose  i.e composedFunc RETURNED ")
      console.dir( dispatch)
      
      return {
        ...store,
        dispatch
      }
    }
  }
}
 
//  createThunkMiddleware from redux-thunk.js
 export function createThunkMiddleware(extraArgument) {
    return function thunkFunction ({ dispatch, getState }) {
      return function nextFunction (next) { 
          console.info("In next function")
          console.dir(next)
         return function actionFunction (action) {
            console.info("action RETURNED")
            console.dir(action)
            
            if (typeof action === 'function') {
              console.info("++++++++++++++++++++++++++++++++++++++")
              console.info("action is function")
              console.info("++++++++++++++++++++++++++++++++++++++")
              return action(dispatch, getState, extraArgument);
            }
            
            console.info("+++++++++++++++++calling NEXT++++++++++++++")
            console.dir(next)
            return next(action);
          }
       }
    }
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk