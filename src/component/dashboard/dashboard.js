import React , {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: true,
            value: '',
            animal: '',
            animalData: {
                age: null,
                color: '',
                description: '',
                animal: '',
                sacrifice: '',

            }
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    textChange(p, e, v){
        var animalData = this.state.animalData;
        animalData[p] = e.target.value;
        console.log(animalData);
        this.setState({animalData: animalData});
        console.log(this.state.animalData);
    }

    saveAnimalData(){
        var db = firebase.firestore();
        var animalData = this.state.animalData;
        animalData.animal = this.state.animal;
        console.log(animalData);
        db.collection('animal').add(animalData);
        this.setState({open: false});
    }

    handleChange(event, index, value) {
        var animal = event.target.textContent;
        this.setState({value: value, animal: animal});
    }

    render(){
        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleClose}/>,
            <FlatButton label="Add" primary={true} keyboardFocused={true} onClick={this.saveAnimalData.bind(this)}/>];
        return(
            <div>
                <AppBar title='Dashboard'/>
                <div style={{position: 'fixed', right: '10px', bottom: '16px'}}>
                    <Button variant="fab" color="secondary" aria-label="add" onClick={this.handleOpen} className='button'>
                        <AddIcon/>
                    </Button>
                </div>
                <Dialog actions={actions} model={false} open={this.state.open} onRequestClose={this.handleClose}>
                    {/*<p>Choose Animal</p>*/}
                    {/*<RadioButtonGroup name="gender" labelPosition="right" defaultSelected="male">*/}
                        {/*<RadioButton style={{display: 'inline-block', width: '11%'}} value={this.state.animalData.animal} label="Cow"/>*/}
                        {/*<RadioButton style={{display: 'inline-block', width: '12%'}} value={this.state.animalData.animal} label="Goat"/>*/}
                        {/*<RadioButton style={{display: 'inline-block', width: '11%'}} value={this.state.animalData.animal} label="Camel"/>*/}
                    {/*</RadioButtonGroup> <br/>*/}
                    <SelectField value={this.state.value} onChange={this.handleChange.bind(this)} floatingLabelText="Choose Animal">
                        <MenuItem key={1} value={1} primaryText="Cow"/>
                        <MenuItem key={2} value={2} primaryText="Goat"/>
                        <MenuItem key={3} value={3} primaryText="Animal"/>
                    </SelectField><br/>
                    <TextField hintText="Animal age" type="number" value={this.state.animalData.age}
                               onChange={this.textChange.bind(this, 'age')}/><br/>
                    <TextField hintText="Animal color" type="text" value={this.state.animalData.color}
                               onChange={this.textChange.bind(this , 'color')}/><br/>
                    <p>sacrifice will be</p>
                    <RadioButtonGroup name="gender" labelPosition="right" defaultSelected="male">
                        <RadioButton style={{display: 'inline-block', width: '16%'}} value="1st" label="1st day"/>
                        <RadioButton style={{display: 'inline-block', width: '17%'}} value="2nd" label="2nd day"/>
                        <RadioButton style={{display: 'inline-block', width: '16%'}} value="3rd" label="3rd day"/>
                    </RadioButtonGroup>
                    <TextField hintText="Description" type="text" value={this.state.animalData.description}
                               onChange={this.textChange.bind(this, 'description')}/><br/>
                </Dialog>
            </div>
        )

    }
}
export default Dashboard;