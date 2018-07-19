import React , {Component} from 'react'

class DashboardS extends Component  {
    render(){
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
                    {/*<p>sacrifice will be</p>*/}
                    {/*<RadioButtonGroup name="gender" labelPosition="right" defaultSelected="male">*/}
                    {/*<RadioButton style={{display: 'inline-block', width: '16%'}} value="1st" label="1st day"/>*/}
                    {/*<RadioButton style={{display: 'inline-block', width: '17%'}} value="2nd" label="2nd day"/>*/}
                    {/*<RadioButton style={{display: 'inline-block', width: '16%'}} value="3rd" label="3rd day"/>*/}
                    {/*</RadioButtonGroup>*/}
                    {/*<SelectField value={this.state.value} onChange={this.handleChangeS.bind(this)} floatingLabelText="Sacrifice will be">*/}
                    {/*<MenuItem key={1} value={1} primaryText="1st day"/>*/}
                    {/*<MenuItem key={2} value={2} primaryText="2nd day"/>*/}
                    {/*<MenuItem key={3} value={3} primaryText="3rd day"/>*/}
                    {/*</SelectField><br/>*/}
                    <TextField hintText="Description" type="text" value={this.state.animalData.description}
                               onChange={this.textChange.bind(this, 'description')}/><br/>
                    <TextField hintText="picture" type="file" onChange={this.picture.bind(this)}/><br/>
                </Dialog>
            </div>
        )
    }
}