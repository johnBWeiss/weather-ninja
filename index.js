import React from "react";
import { store } from "./store/store"
import { createRoot } from "react-dom/client";
import Main from "./Main";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "./src/styles/WailTind.scss";
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Main />
    </Provider>
);

serviceWorkerRegistration.register();
