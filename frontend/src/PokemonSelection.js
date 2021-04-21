import React, {useState, Component} from "react";
import {makeStyles} from '@material-ui/core/styles';
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

// import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class PokemonSelection extends Component {
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
        let x = Math.floor((Math.random() * 5) + 4)
        //perform the request
        let data = {}
        let conf = {
            headers: {
                'token': 'dummytoken'
            }
        }
        axios.post('http://localhost:8080/pokemon/' + x, data, conf)
            .then(response => {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log('REQUEST ERROR')
                return Promise.reject(error)
            })

    }

    choosePokemon = event => {
        event.preventDefault()

        let data = {}
        let conf = {
            headers: {
                'token': 'dummytoken'
            }
        }

        axios.get('http://localhost:8080/pokemon/0', conf)
            .then(response => {
                this.setState({pokemonSelection: response.data})
            })
            .catch(function (error) {
                console.log("ERROR WHILE FETCHING POKEMON")
                return Promise.reject(error)
            })


    }

    deletePokemon = event => {
        event.preventDefault()

        let data = {}
        let conf = {
            headers: {
                'token': 'dummytoken'
            }
        }

        axios.delete('http://localhost:8080/pokemon/0', conf)
            .then(response => {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log("ERROR WHILE DELETING")
                return Promise.reject(error)
            })

    }


    render() {
        return (
            <>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Card style={{
                        maxWidth: 345
                    }}>
                        <CardActionArea>
                            <CardMedia
                                style={{height: 120, padding: 80}}
                                image={this.state.pokemonSelection.sprite}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.pokemonSelection.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    HP: {this.state.pokemonSelection.hp}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={this.choosePokemon} variant="contained" color="primary"> Randomize a
                                Pokemon </Button>
                            <Button onClick={this.deletePokemon} variant={"contained"}
                                    color={"secondary"}>DELETE</Button>
                        </CardActions>
                    </Card>
                </div>
            </>
        );
    }
}

export default PokemonSelection
