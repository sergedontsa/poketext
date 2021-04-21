import React, { useState, Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'

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

        let token = ''

        axios.post('http://localhost:8080/auth', admin)
            .then(response => {token = response.data.jwt})
            .catch(function (error){
                console.log("ERROR WHILE FETCH THE TOKEN")
            })

        // get the id
        let x = Math.floor((Math.random() * 1118)+1)
        //perform the request
        axios.post('http://localhost:8080/pokemon/'+x, {
            headers:{

                'Authorization': 'Bearer ' +token
            }})
            .then(response => {console.log(response.data)})
            .catch(function (error){
                console.log('REQUEST ERROR')
                return Promise.reject(error)
            })

    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default PokemonSelection