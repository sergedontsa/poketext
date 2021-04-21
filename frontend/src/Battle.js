import React, { useState, Component } from 'react';
import "./Battle.css";
import Pikachu from './pictures/pokemon-pikachu-neon-i71936.jpg';
import Charmander from './pictures/F7S8p4xK.jpg';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

class Battle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userPokemon: {},
            userItem: {},
            botPokemon: {},
            moves1: {},
            moves2: {},
            moves3: {},
            moves4: {}
        }
    }
    componentDidMount = event => {
        let conf = {
            headers:{
                'token': 'dummytoken'
            }
        }
        //hardcoded pokemon atm
        axios.get('http://localhost:8080/pokemon/0', conf)
            .then(response => {this.setState({userPokemon: response.data})})
            .catch(function (error){
                console.log("ERROR WHILE FETCHING POKEMON")
                return Promise.reject(error)
            })
        //hardcoded pokemon move atm
        axios.get('http://localhost:8080/pikachu/0', conf)
            .then(response =>{this.setState{moves1: response.data}})
            .catch(function (error){
            console.log("ERROR WHILE FETCHING MOVES FOR POKEMON")
            return Promise.reject(error)
        })
        //hardcoded pokemon move atm
        axios.get('http://localhost:8080/pikachu/1', conf)
            .then(response =>{this.setState{moves2: response.data}})
            .catch(function (error){
                console.log("ERROR WHILE FETCHING MOVES FOR POKEMON")
                return Promise.reject(error)
            })
        //hardcoded pokemon move atm
        axios.get('http://localhost:8080/pikachu/2', conf)
            .then(response =>{this.setState{moves3: response.data}})
            .catch(function (error){
                console.log("ERROR WHILE FETCHING MOVES FOR POKEMON")
                return Promise.reject(error)
            })
        //hardcoded pokemon move atm
        axios.get('http://localhost:8080/pikachu/3', conf)
            .then(response =>{this.setState{moves3: response.data}})
            .catch(function (error){
                console.log("ERROR WHILE FETCHING MOVES FOR POKEMON")
                return Promise.reject(error)
            })
        //hardcoded item atm
        axios.get('http://localhost:8080/item/17', conf)
            .then(response => {this.setState{userItem: response.data}})
            .catch(function (error){
                console.log("ERROR WHILE FETCHING ITEM)
                return Promise.reject(error)
            })
    }
    handleMove = event => {

    }
    render(){
        return(
            <div className="parentContainer">
                <div className="usersContainer">
                    <div className="battlerContainer">
                        <h3>Username</h3>
                        <div className="pictureContainer">
                            <img src={Pikachu}/>
                        </div>
                        <h4>Pikachu</h4>
                    </div>
                    <div className="battlerContainer">
                        <h3>Bot</h3>
                        <div className="pictureContainer">
                            <img src={Charmander}/>
                        </div>
                        <h4>Charmander</h4>
                    </div>
                </div>
                <div className="buttonsContainer">
                    <Button variant="contained" color="primary">{this.state.moves1.name}</Button>
                    <Button variant="contained" color="primary">{this.state.moves2.name}</Button>
                    <Button variant="contained" color="primary">{this.state.moves3.name}</Button>
                    <Button variant="contained" color="primary">{this.state.moves4.name}</Button>
                    <Button variant="contained" color="secondary">{this.state.item.name}</Button>
                </div>
                <div className="dialogueContainer">
                    <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
                        The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

                        The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
                    <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
                        The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

                        The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
                    <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
                        The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

                        The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
                </div>
            </div>
        );
    }
}
export default Battle