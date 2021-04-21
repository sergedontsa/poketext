import React, { useState, Component } from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class ItemSelection() extends Component{
    constructor(props){
        super(props);
        this.state= {
            itemSelection: {}
        }
    }
    handleSubmit = event => {
        event.preventDefault();
        let x = 17;
        let data = {};
        let conf = {
            headers:{
                'token': 'dummytoken'
            }
        }
        axios.get('http://localhost:8080/item/'+x, conf)
            .then(response => {this.setState({itemSelection: response.data})})
            .catch(function (error){
            console.log("ERROR WHILE FETCHING ITEM")
            return Promise.reject(error)
        })
    }
    render(){
        return(
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell hover={true}><h2>HP: {this.state.itemSelection.attribute}</h2></TableCell>
                                <TableCell hover={true}><h2>Name: {this.state.itemSelection.name}</h2></TableCell>
                                <TableCell hover={true}><img width={400} height={400} src={this.state.itemSelection.sprite}/></TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                <Button
                    variant="contained"
                    color="primary">
                    type="submit"
                    Select Heal Potion
                </Button>
            </div>
        );
    }
    // return(
    //     <div>
    //         <Button
    //             variant="contained"
    //             color="primary">
    //             Select Heal Potion
    //         </Button>
    //     </div>
    // );
}
export default ItemSelection