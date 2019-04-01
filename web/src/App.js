import React, { Component } from "react";
import DuckFeedContainer from "./components/duck-feed-container";
import "./App.css";
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducers from './reducers'
import { createStore, applyMiddleware, combineReducers } from 'redux'

let store = createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <DuckFeedContainer />
        </Provider>
    );
  }
}
