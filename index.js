import React from "react";
import { store } from "./store/store";
import Main from "./Main";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "./src/styles/wailTind.scss";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Main />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

