import React, {useState, Component} from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios'


import {makeStyles} from '@material-ui/core/styles';
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




class ItemSelection extends Component {
        constructor(props) {
            super(props);
            this.state = {
                itemSelection: {}
            }
            this.data = {}
            this.headers = {
                headers: {
                    'token': 'dummytoken'
                }
            }
        }

        componentDidMount = event => {
            axios.post('http://localhost:8080/item/choose', this.data, this.headers)
                .then(response => {
                    console.log(response.data)
                })
                .catch(function (error) {
                console.log('REQUEST ERROR')
                return Promise.reject(error)
            })
        }



    getItem = event => {
        event.preventDefault()

        axios.get('http://localhost:8080/item', this.headers)
            .then(response => {
                console.log(response.data)
                this.setState({itemSelection: response.data})
            })
            .catch(function (error) {
                console.log("ERROR WHILE GETTING ITEM")
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
                                image={this.state.itemSelection.sprite}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.itemSelection.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    HP: {this.state.itemSelection.attributes}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button
                                onClick={this.getItem}
                                variant="contained"
                                color="primary">
                                Select Heal Potion</Button>
                        </CardActions>
                    </Card>
                </div>
            </>

        );
    }
}

export default ItemSelection
