import React from "react";
import { store } from "./store/store"
// import { createRoot } from "react-dom/client";
import Main from "./Main";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "./src/styles/wailTind.scss";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";


// createRoot(document.getElementById('root')).render(
//     <Provider store={store}>
//         <Main />
//     </Provider>
// );

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Main />
        </Provider>,  </React.StrictMode>, document.getElementById('root')
);


serviceWorkerRegistration.register();



// import React from "react";
// // import "./src/styles/main.scss";
// import { store } from "./store/store"
// import { Provider } from "react-redux";
// import App from "./App";


// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <Main />
//         </Provider>,  </React.StrictMode>, document.getElementById('root')
// );

