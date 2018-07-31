import React, {Component} from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import Dashboard from "./dashboard";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
class DashboardS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animalsData: [],
            animalData : {}
        };
        this.loadAnimalData();
    }

    loadAnimalData() {
        var arr = [];
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('animal').onSnapshot((animals) => {
            animals.docChanges().forEach((animalData) => {
                // console.log(animalData);
                var data = animalData.doc.data();
                data.id = animalData.doc.id;
                // console.log(data);
                arr.push(data);
                this.setState({animalsData: arr})
            })
        })
    }

    sendData(animalData) {
        // console.log(animalData);
        this.setState({animalData: animalData})
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar><Typography variant="title" color="inherit">Dashboard</Typography></Toolbar>
                </AppBar>
                <GridList cols={4} cellHeight='auto'>
                    <GridTile cols={1}>
                        <List style={{borderRight: '3px solid #3f51b5',}}>
                            {this.state.animalsData.map((data , index) => {
                                return (
                                    <div key={index} >
                                        <ListItem onClick={this.sendData.bind(this, data)}>
                                            {data.animal}
                                        </ListItem>
                                    </div>
                                )
                            })}
                        </List>
                    </GridTile>
                    <GridTile cols={3}>
                        {this.state.animalData.id ? <Dashboard animalData={this.state.animalData}/> : null}
                    </GridTile>
                </GridList>
            </div>
        )
    }
}

export default DashboardS;
