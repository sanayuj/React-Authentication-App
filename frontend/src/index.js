import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import Store from './Store/Store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>       
        <ToastContainer />
        <Provider store={Store}>
        <App />
        </Provider>
        </React.StrictMode>
   


);
