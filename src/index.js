import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './component/login/login'
import Dashboard from './component/dashboard/dashboard'
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider> <Dashboard/> </MuiThemeProvider>
    , document.getElementById('root')
);

registerServiceWorker();
