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
import '../Selection.css'
import './Stats.css'


class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSelection: {},
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

        // get the id
        //perform the request

        axios.get('http://localhost:8080/info', this.headers)
            .then(response => {
                this.setState({userSelection: response.data})
            })
            .then(
                axios.get('http://localhost:8080/pokemon/0', this.headers)
                    .then(response => {
                        this.setState({pokemonSelection: response.data})
                    })
            )

    }

    getRatio = () => {
        let win = this.state.userSelection.wincount
        let loss = this.state.userSelection.losscount
        if(loss>0){
            return win/loss;
        } else if (win>0){
            return win;

        } else {
            return 0;
        }

    }


    render() {
        return (
            <>
                <div className="selectionRoot">
                                <h1>
                                    {this.state.userSelection.username}
                                </h1>
                    <div className="userImage">
                        <img className="trainerPoke" src={this.state.pokemonSelection.sprite}/>
                        <img src="https://pa1.narvii.com/7152/346bbdfb5c063750db658e4e9c6ab5c649c01312r1-200-200_hq.gif"/>
                </div>
                <h2>
                                    W/L Ratio: {this.getRatio().toFixed(1)}
                                </h2>
                                <h3>
                                    Wins: {this.state.userSelection.wincount}
                                </h3>
                                <h3>
                                    Losses: {this.state.userSelection.losscount}
                                </h3>
                </div>
            </>
        );
    }
}

export default Stats
