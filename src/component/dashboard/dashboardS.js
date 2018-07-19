import React , {Component} from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import Dashboard from "./dashboard";
import AppBar from 'material-ui/AppBar';


class DashboardS extends Component  {
    render(){
        return(
            <div>
                <AppBar title='Dashboard'/>
                <GridList cols={12} cellHeight='auto'>
                    <GridTile cols={3}>
                        <Tabs>
                            <Tab label='Animals'>
                                <List>
                                    <ListItem>
                                        Hello
                                    </ListItem>
                                </List>
                            </Tab>
                        </Tabs>
                    </GridTile>
                    <GridTile>
                    <Dashboard/>
                    </GridTile>
                </GridList>
            </div>
        )
    }
}
export default DashboardS;