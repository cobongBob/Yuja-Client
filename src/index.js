import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";
import ScrollToTop from "./ScrollToTop";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import GlobalLoading from './components/Loading/GlobalLoading';

const middleware = [logger, thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
