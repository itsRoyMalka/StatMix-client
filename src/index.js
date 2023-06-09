import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from "./state/store";
import {Provider} from "react-redux";
import {UserContextProvider} from "./context/UserContext";
import {disableReactDevTools} from "@fvilers/disable-react-devtools";

if(process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <UserContextProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </UserContextProvider>
);

