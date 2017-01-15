import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import {createThunkMiddleware,applyMiddleware} from './redux-thunk-local'

import reducer from './reducers/reducer'
import Layout from "./components/Layout";

const app = document.getElementById('app')

const thunk = createThunkMiddleware()

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<Layout/>
	</Provider>
	, app);
