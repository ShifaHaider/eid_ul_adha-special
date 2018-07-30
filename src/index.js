import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './component/login/login'
import Dashboard from './component/dashboard/dashboard'
import DashboardS from './component/dashboard/dashboardS'
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider> <App/> </MuiThemeProvider>
    , document.getElementById('root')
);

registerServiceWorker();
