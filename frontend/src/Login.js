import React, { useState, Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, Redirect } from "react-router-dom";
import "./Login.css";
import axios from 'axios'
// import {Redirect} from 'react-router'


class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            token: {},
            username:'',
            password: '',
            usernameErrorMessage: '',
            passwordErrorMessage:'',
            loginMessage:''

        }
    }

    hangleChange = event => {
        event.preventDefault()
        const{value, name} = event.target
        if(this.state.username){
            this.setState({usernameErrorMessage: ''})
        }
        if (this.state.password){
            this.setState({passwordErrorMessage: ''})
        }
        this.setState({[name]:value})
    }

    handleSubmit = event => {
        event.preventDefault()

        if(!this.state.username){
            this.setState({usernameErrorMessage: 'The value of the username is required'})
            return
        }
        if (!this.state.password){
            this.setState({passwordErrorMessage: 'The value of the password is required'})
            return;
        }

        const loginInfo = {
            'username': this.state.username,
            'password': this.state.password
        }

        axios.post('http://localhost:8080/login', loginInfo)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                // this.setState({toke: response.headers.token})
                this.setState({loginMessage: response.data.body})
            })
            .catch(error => {
                alert("Wrong login")
            })

    }


    handleRegister = event => {
        event.preventDefault()

        if(!this.state.username){
            this.setState({usernameErrorMessage: 'The value of the username is required'})
            return
        }
        if (!this.state.password){
            this.setState({passwordErrorMessage: 'The value of the password is required'})
            return;
        }

        const loginInfo = {
            'username': this.state.username,
            'password': this.state.password
        }

        axios.post('http://localhost:8080/signup', loginInfo)
            .then(response => {
                alert(response.data)
            })

    }




    handleChange = event => {
        event.preventDefault()
        const {value, name} = event.target
        if (this.state.username){
            this.setState({messageError: 'This field is required'})
        }
        this.setState({[name]: value})

    }

    render() {
        if (this.state.loginMessage == 'Login Successful') {
           return <Redirect to={{pathname: '/main'}}/>
        }

        return (
            <>
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>

                        <TextField variant="outlined" margin="normal" fullWidth  required
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value ={this.state.password}
                            onChange={this.handleChange}
                        />
                        <Button
                            onClick={this.handleSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Sign In</Button>
                        <Button
                            onClick={this.handleRegister}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Register</Button>
                    </form>
                </div>

            </>

        );
    }

}
export default Login;
