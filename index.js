// index.js
import React from "react";
import { store } from "./store/store"
import { createRoot } from "react-dom/client";
import Main from "./Main";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "./src/styles/WailTind.scss";
import { Provider } from "react-redux";

// Initialize the store and provide it to the application
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Main />
    </Provider>
);

// Register the service worker
serviceWorkerRegistration.register();
