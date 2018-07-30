import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import AddIcon from '@material-ui/icons/Add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from '@material-ui/core/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            modelOpen: false,
            value: '',
            secondValue: '',
            animal: 'Cow',
            animalUpdate: '',
            picture: '',
            sacrifice: '',
            animalData: {
                age: null,
                color: '',
                description: '',
            },
            animalDetail: {},
            animalId: '',
            orders: [],
            totalOrders: 0,
            userID: null
        };

    }

    componentWillReceiveProps(nextProps) {
        this.animalDetail = nextProps.animalData;
        // console.log(this.animalDetail);
        this.setState({animalDetail: this.animalDetail});
        {this.animalDetail.id != undefined ? this.loadOrders() : null}
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    modelOpen = () => {
        this.setState({modelOpen: true});
    };

    modelClose = () => {
        this.setState({modelOpen: false});
        // this.setState({animalDetail: this.animalDetail, modelOpen: false});
        // console.log(this.state.animalData);
    };

    textChange(p, e, v) {
        var animalData = this.state.animalData;
        animalData[p] = e.target.value;
        // console.log(animalData);
        this.setState({animalData: animalData});
        // console.log(this.state.animalData);
    };

    updateText(p, e, i) {
        var animalData = this.state.animalData;
        animalData[p] = e.target.value;
        // console.log(p, e.target.value);
        this.setState({animalDetail: '', animalData: animalData});
    }

    updateAnimal(e) {
        var value = e.target.value;
        // console.log(value);
        this.setState({animal: '', animalUpdate: value});
        // console.log(this.state.animalUpdate);
    }

    updateData() {
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var id = this.state.animalId;
        var updateData = this.state.animalData;
        updateData.animal = this.state.animalUpdate;
        updateData.id = id;
        db.collection('animal').doc(id).update(updateData);
        this.setState({modelOpen: false})
    }

    saveAnimalData() {
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var animalData = this.state.animalData;
        animalData.animal = this.state.animal;
        animalData.sacrifice = this.state.sacrifice;
        console.log(animalData);
        db.collection('animal').add(animalData);
        this.setState({open: false});
    }

    handleChange(event, index, value) {
        var animal = event.target.textContent;
        this.setState({value: value, animal: animal});
    }

    changeSecondValue(event, index, value){
        var sacrifice = event.target.textContent;
        console.log(value , sacrifice);
        this.setState({sacrifice: sacrifice , secondValue : value});


    }
    handleChangeS(event, index, value) {
        var sacrifice = event.target.textContent;
        // console.log(sacrifice);
        this.setState({valueS: value, sacrifice: sacrifice});
    }

    loadOrders() {
        var arr = [];
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var animalID = this.animalDetail.id;
        db.collection('orders').where('animalID', '==', animalID).get().then((orders) => {
            orders.forEach((order) => {
                var orders = order.data();
                orders.orderID = order.id;
                arr.push(orders);
                this.setState({orders: arr})
            });
        })
    }

    confirmOrder(data) {
        this.db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        this.db.settings(settings);
        var orderData = data;
        orderData.status = 'CONFIRMED!';
        this.setState({totalOrders : orderData.totalOrders});
        console.log(orderData);
        this.db.collection('orders').doc(orderData.orderID).update(orderData);
        this.loadOrders();
    }

    rejectOrder(data){
        this.db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        this.db.settings(settings);
        var orderData = data;
        orderData.status = 'REJECTED!';
        console.log(orderData);
        this.db.collection('orders').doc(orderData.orderID).update(orderData);
        this.loadOrders();
    }

    // picture(e) {
    //     var picture = e.target.files[0];
    //     console.log(picture.name);
    //     var event = firebase.storage().ref().child(picture.name).put(picture);
    //     event.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //         console.log(downloadURL);
    //     })
    //     // .then((snapshot) => {
    //     //     console.log(snapshot);
    //     //     var picturePath = snapshot.downloadURL;
    //     //     console.log(picturePath);
    //     //     this.setState({picture: picturePath});
    // }


    render() {
        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleClose}/>,
            <FlatButton label="Add" primary={true} keyboardFocused={true} onClick={this.saveAnimalData.bind(this)}/>];
        const button = [
            <FlatButton label='Cancel' primary={true} onClick={this.modelClose}/>,
            <FlatButton label='Edit' primary={true} keyboardFocused={true} onClick={this.updateData.bind(this)}/>
        ];
        return (
            <div>
                <div style={{position: 'fixed', right: '10px', bottom: '16px'}}>
                    <Button variant="fab" color="primary" aria-label="add" onClick={this.handleOpen} className='button'>
                        <AddIcon/>
                    </Button>
                </div>
                <Dialog actions={actions} model={false} open={this.state.open} onRequestClose={this.handleClose}>
                    <SelectField value={this.state.value} onChange={this.handleChange.bind(this)}
                                 floatingLabelText="Choose Animal">
                        <MenuItem key={1} value={1} primaryText="Cow"/>
                        <MenuItem key={2} value={2} primaryText="Goat"/>
                        <MenuItem key={3} value={3} primaryText="Camel"/>
                    </SelectField><br/>
                    <TextField label='Animal age' type="number" value={this.state.animalData.age}
                               onChange={this.textChange.bind(this, 'age')}/><br/>
                    <TextField label="Animal color" type="text" value={this.state.animalData.color}
                               onChange={this.textChange.bind(this, 'color')}/><br/>
                    <SelectField value={this.state.secondValue} onChange={this.changeSecondValue.bind(this)}
                                 floatingLabelText="Sacrifice will be">
                        <MenuItem key={1} value={1} primaryText="1st day"/>
                        <MenuItem key={2} value={2} primaryText="2nd day"/>
                        <MenuItem key={3} value={3} primaryText="3rd day"/>
                    </SelectField><br/>
                    <TextField label="Description" type="text" value={this.state.animalData.description}
                               onChange={this.textChange.bind(this, 'description')}/><br/>
                </Dialog>
                <div style={{width: '500px'}}>
                    <Card>
                        <CardText>Animal : {this.state.animalDetail.animal}</CardText>
                        <CardText>Age : {this.state.animalDetail.age}</CardText>
                        <CardText>Color : {this.state.animalDetail.color}</CardText>
                        <CardText>Sacrifice : {this.state.animalDetail.sacrifice}</CardText>
                        <CardText>Description : {this.state.animalDetail.description}</CardText>
                        <CardText>totalOrders : {1}</CardText>
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <Button color="primary" className='button' onClick={this.modelOpen}>Edit</Button>
                        </div>
                    </Card>
                </div>
                <div>
                    <h3 style={{color: '#3f51b5'}}>Orders in this Animal!</h3>
                    <div style={{display : 'flex' , justifyContent: 'space-around',  width: '75%'}}>
                    {this.state.orders.map((orders) => {
                        return (
                            <div style={{width: '350px'  , margin:"10px" }}>
                                <Card key={orders.totalOrders} >
                                    <CardText>Status : {orders.status}</CardText>
                                    <CardText>Order : {orders.order}</CardText>
                                    <CardText>Name : {orders.userName}</CardText>
                                    <CardText>Phone/No : {orders.userPhone}</CardText>
                                    <CardText>Time : {new Date(orders.time).toLocaleString()}</CardText>
                                    <CardText style={{display: 'flex' , justifyContent: 'space-between'}}>
                                        <Button color="primary" onClick={this.confirmOrder.bind(this , orders)}>Confirm Order</Button>
                                        <Button color="primary" onClick={this.rejectOrder.bind(this , orders)}>Reject Order</Button>
                                    </CardText>
                                </Card>
                            </div>
                        )
                    })}
                </div>
                </div>

                <Dialog actions={button} modal={false} open={this.state.modelOpen} onRequestClose={this.handleClose}>
                    <TextField label='Animal' value={this.state.animal} onChange={this.updateAnimal.bind(this)}/>
                    <TextField id="age" label="age" value={this.state.animalDetail.age}
                               onChange={this.updateText.bind(this, 'age')}/><br/>
                    <TextField label='color' value={this.state.animalDetail.color}
                               onChange={this.updateText.bind(this, 'color')}/>
                    <TextField label='description' value={this.state.animalDetail.description}
                               onChange={this.updateText.bind(this, 'description')}/>
                </Dialog>

            </div>
        )

    }
}

export default Dashboard;