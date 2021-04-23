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

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import "../Selection.css"


class PokemonSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonSelection: {}
        }
        this.headers = {
            headers: {
                'token': localStorage.getItem('token')
            }
        }
        this.data = {}
    }

    componentDidMount = event => {
        let botHead = {
            headers:
                {
                    'token': 'bottoken'
                }
        }
        axios.delete('http://localhost:8080/pokemon/all', this.headers)
        axios.delete('http://localhost:8080/pokemon/all', botHead)
    }

    choosePokemon = event => {
        event.preventDefault()

        let x = Math.floor((Math.random() * 5) + 4)

        axios.post('http://localhost:8080/pokemon/' + x, this.data, this.headers)
            .then(response =>{

                axios.get('http://localhost:8080/pokemon/0', this.headers)
                    .then(response => {
                        console.log(response.data)
                        this.setState({pokemonSelection: response.data})
                    })
                }
            )
            .catch(function (error) {
                return Promise.reject(error)
            })


    }

    deletePokemon = event => {
        event.preventDefault()

        axios.delete('http://localhost:8080/pokemon/all', this.headers)
            .then(response => {
                console.log(response.data)
                this.setState({pokemonSelection: {}})
            })
            .catch(function (error) {
                console.log("ERROR WHILE DELETING")
                return Promise.reject(error)
            })

    }


    render() {
        return (
            <>
                <div className="selectionRoot" >
                    <Card>
                        <CardActionArea>
                            <CardMedia className="image"
                                image={this.state.pokemonSelection.sprite}
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
                        <CardActions display='flex' justifyContent='center'>
                            <button onClick={this.choosePokemon} variant="contained" color="primary">Catch a Pokemon </button>
                        </CardActions>
                    </Card>
                </div>
            </>
        );
    }
}

export default PokemonSelection
