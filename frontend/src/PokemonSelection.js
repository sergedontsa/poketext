import React, { useState, Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



class PokemonSelection extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pokemonSelection: {}
        }
    }
    componentDidMount = event => {

        const admin = {
            'username': 'admin',
            'password': 'admin'
        }

        // get the id
        let x = Math.floor((Math.random() * 5)+4)
        //perform the request
        let data = {}
        let conf = {
            headers:{
                'token': 'dummytoken'
            }
        }
        axios.post('http://localhost:8080/pokemon/'+x, data, conf)
            .then(response => {console.log(response.data)})
            .catch(function (error){
                console.log('REQUEST ERROR')
                return Promise.reject(error)
            })

        axios.get('http://localhost:8080/pokemon/0', conf)
            .then(response => {this.setState({pokemonSelection: response.data})})
            .catch(function (error){
                console.log("ERROR WHILE FETCHING POKEMON")
                return Promise.reject(error)
            })
    }

    deletePokemon = event =>{
        event.preventDefault()

        let data = {}
        let conf = {
            headers:{
                'token': 'dummytoken'
            }
        }

        axios.delete('http://localhost:8080/pokemon/0', conf)
            .then(response => {console.log(response.data)})
            .catch(function (error){
                console.log("ERROR WHILE DELETING")
                return Promise.reject(error)
            })

    }
    render() {
        return (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell hover={true}><h2>HP: {this.state.pokemonSelection.hp}</h2></TableCell>
                                        <TableCell hover={true}><h2>Name: {this.state.pokemonSelection.name}</h2></TableCell>
                                        <TableCell hover={true}><img width={400} height={400} src={this.state.pokemonSelection.sprite}/></TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <Button variant="contained"  color="primary"> Randomize a Pokemon </Button>
                        <Button onClick={this.deletePokemon} variant={"contained"} color={"secondary"}>DELETE</Button>
                    </>
        );
    }
}

export default PokemonSelection