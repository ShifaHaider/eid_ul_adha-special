import React, {Component} from 'react';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import './style.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                logEmail: '',
                logPassword: ''
            }
        }
    }

    loginAccount() {
        firebase.auth().signInWithEmailAndPassword(this.state.loginData.logEmail, this.state.loginData.logPassword)
            .then((data) => {
                console.log(data.user.uid);
                // localStorage.setItem('userId', data.uid);
                // this.props.history.push('/dashboard');
            })
            .catch((error) => {
                this.setState({message: error.message, isAlertOpen: true});
            });
    }

    handleChangeLog(p, e) {
        var loginData = this.state.loginData;
        loginData[p] = e.target.value;
        this.setState({loginData: loginData})
    }

    render() {
        return (
            <div>
             <AppBar title='Login'/>
                <Card className='card'>
                    <CardText>
                        <TextField hintText="Email Field" floatingLabelText="Email" type="text"
                            value={this.state.loginData.logEmail} onChange={this.handleChangeLog.bind(this, 'logEmail')}/><br/>
                        <TextField hintText="Password Field" floatingLabelText="Password" type="password"
                            value={this.state.loginData.logPassword} onChange={this.handleChangeLog.bind(this, 'logPassword')}/>
                    </CardText>
                    <CardText>
                        <RaisedButton label='Login' secondary={true} onClick={this.loginAccount.bind(this)} />
                </CardText>
                </Card>
            </div>
        )
    }
}

export default Login;
{/*<img src={logo} className="App-logo" alt="logo" />*/}