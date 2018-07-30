import React, {Component} from 'react';
import logo from './logo.svg';
import {Router, Route, Switch, Link} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import Login from './component/login/login'
import DashboardS from './component/dashboard/dashboardS'

var config = {
    apiKey: "AIzaSyDVrQX6oUeleINHU3297WSi9R1Gc_GVNoA",
    authDomain: "adding-todo-app-1f9bb.firebaseapp.com",
    databaseURL: "https://adding-todo-app-1f9bb.firebaseio.com",
    projectId: "adding-todo-app-1f9bb",
    storageBucket: "adding-todo-app-1f9bb.appspot.com",
    messagingSenderId: "479455984320"
};
firebase.initializeApp(config);

const history = createBrowserHistory();

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route exact path={'/'} component={DashboardS}/>
                            <Route exact path={'/dashboardS'} component={DashboardS}/>
                            <Route exact path={'/login'} component={Login}/>
                        </Switch>
                    </div>
                </Router>

            </div>
        );
    }
}

export default App;
