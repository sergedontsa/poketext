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


class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSelection: {}
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
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.userSelection.username}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Wins: {this.state.userSelection.wincount}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Losses: {this.state.userSelection.losscount}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </>
        );
    }
}

export default Stats
