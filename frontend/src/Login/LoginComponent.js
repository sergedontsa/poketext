import React from 'react'
import axios from 'axios'

export default class LoginComponent{
    state = {
        tokenObject:{}
    }

    handleSubmit = event =>{
        const admin = {
            'username': 'admin',
            'password': 'admin'
        }
        axios.post('http://localhost:8080/auth', admin)
            .then(res => this.setState({tokenObject: res.date}))
        console.log(this.state.tokenObject)
    }

}